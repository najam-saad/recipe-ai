// functions/api/recipe.js
export async function onRequest(context) {
  // Allow only POST requests
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Allow": "POST"
      }
    });
  }

  try {
    console.log('[Recipe API] Request received');
    
    const requestData = await context.request.json();
    const { userInput, type } = requestData;
    
    if (!userInput || !type) {
      console.log('[Recipe API] Missing input:', { userInput, type });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userInput or type' }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Construct a different prompt based on the type
    let prompt = '';
    if (type === 'ingredients') {
      prompt = `Generate a detailed recipe using these ingredients: ${userInput}. 
      Format the recipe with a name, preparation time, cooking time, ingredients list, and step-by-step instructions.`;
    } else {
      prompt = `Generate a detailed recipe for ${userInput}. 
      Format the recipe with a name, preparation time, cooking time, ingredients list, and step-by-step instructions.`;
    }

    // Check if API key is available
    const apiKey = context.env.HUGGING_FACE_API_KEY;
    if (!apiKey) {
      console.error('[Recipe API] Missing Hugging Face API key');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const HF_API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';
    console.log('[Recipe API] Calling Hugging Face API');
    
    // Call Hugging Face API with retry for model loading
    let response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1000,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true
        }
      })
    });
    
    let retries = 0;
    const maxRetries = 2;
    
    // Retry logic for model loading
    while (retries < maxRetries && 
           response.status === 503 && 
           response.headers.get('X-Error-Message')?.includes('Model is currently loading')) {
      
      console.log(`[Recipe API] Model loading, retry ${retries + 1}/${maxRetries}`);
      retries++;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      
      // Retry the request
      response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 1000,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true
          }
        })
      });
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[Recipe API] Hugging Face API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // More specific error messages based on status codes
      if (response.status === 401) {
        return new Response(
          JSON.stringify({ error: 'Authentication error with recipe service' }),
          { 
            status: 500,
            headers: { "Content-Type": "application/json" }
          }
        );
      } else if (response.status === 503) {
        return new Response(
          JSON.stringify({ error: 'Recipe service temporarily unavailable, please try again in a moment' }),
          { 
            status: 503,
            headers: { "Content-Type": "application/json" }
          }
        );
      } else {
        return new Response(
          JSON.stringify({ error: 'Failed to generate recipe, please try a different input' }),
          { 
            status: 500,
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }

    console.log('[Recipe API] Received response from Hugging Face');
    
    // Parse and validate the response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('[Recipe API] JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid response from recipe service' }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // Extracting the generated text from Hugging Face response
    const generatedText = data[0]?.generated_text || '';
    
    if (!generatedText) {
      console.error('[Recipe API] Empty response from Hugging Face:', data);
      return new Response(
        JSON.stringify({ error: 'Unable to generate recipe content' }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // Clean up the response by removing the original prompt
    const cleanedText = generatedText.replace(prompt, '').trim();
    
    console.log('[Recipe API] Successfully generated recipe');
    return new Response(
      JSON.stringify({ recipe: cleanedText }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error('[Recipe API] Unhandled error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate recipe. Please try again.' }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
} 