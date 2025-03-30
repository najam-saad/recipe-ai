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

    // Construct a different prompt based on the type - more direct and focused prompt
    let prompt = '';
    if (type === 'ingredients') {
      prompt = `Create a recipe using these ingredients: ${userInput}.

Output only the following recipe content in this exact format, with no explanations, introductions, or notes about what you're doing:

# [Recipe Name]

Preparation Time: [time]
Cooking Time: [time]

## Ingredients
- [ingredient 1]
- [ingredient 2]
- [ingredient 3]
...

## Instructions
1. [First step]
2. [Second step]
3. [Third step]
...`;
    } else {
      prompt = `Create a recipe for ${userInput}.

Output only the following recipe content in this exact format, with no explanations, introductions, or notes about what you're doing:

# [Recipe Name]

Preparation Time: [time]
Cooking Time: [time]

## Ingredients
- [ingredient 1]
- [ingredient 2]
- [ingredient 3]
...

## Instructions
1. [First step]
2. [Second step]
3. [Third step]
...`;
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
    let generatedText = data[0]?.generated_text || '';
    
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
    
    // Remove the prompt from the response
    if (generatedText.includes(prompt)) {
      generatedText = generatedText.replace(prompt, '').trim();
    }
    
    // Filter out any instruction text or model explanations
    const instructionPhrases = [
      "use clear and concise language",
      "include helpful tips",
      "consider including photos",
      "the recipe should be suitable",
      "avoid using overly technical terms",
      "be easy to follow",
      "beginner cooks",
      "here's a recipe",
      "i'd be happy to",
      "i'll create",
      "sure, here's",
      "i'll generate"
    ];
    
    // If the response contains explanation/instruction text, generate a fixed recipe
    let containsInstructions = instructionPhrases.some(phrase => 
      generatedText.toLowerCase().includes(phrase.toLowerCase())
    );
    
    // Also check for empty placeholder steps like "Step 1:" without content
    const hasEmptySteps = /\[Step \d+\]|\(Step \d+\)|Step \d+:(?!\s*[a-zA-Z])/i.test(generatedText);
    
    if (containsInstructions || hasEmptySteps || !generatedText.includes('Ingredients') || !generatedText.includes('Instructions')) {
      console.log('[Recipe API] Response contains instruction text or wrong format, using backup generator');
      
      // Create a simple formatted recipe as backup
      const capitalizedInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
      
      // Create a more tailored recipe based on the input
      let recipeTitle, ingredients, instructions;
      
      // Customize based on common recipe keywords
      if (userInput.includes('pasta') || userInput.includes('spaghetti')) {
        recipeTitle = `Creamy ${capitalizedInput}`;
        ingredients = `- 500g ${userInput.includes('spaghetti') ? 'spaghetti' : 'pasta'}
- 2 tablespoons olive oil
- 1 onion, finely chopped
- 2 garlic cloves, minced
- 8 ounces mushrooms, sliced
- 1 cup heavy cream
- 1/2 cup grated Parmesan cheese
- Salt and pepper, to taste
- Parsley, chopped (optional)`;
        instructions = `1. Bring a large pot of salted water to a boil. Add ${userInput.includes('spaghetti') ? 'spaghetti' : 'pasta'} and cook until al dente, about 8-10 minutes.
2. In a large skillet, heat olive oil over medium heat.
3. Add onion and garlic, sauté until softened, about 3-4 minutes.
4. Add mushrooms and cook until tender, about 5-6 minutes.
5. Pour in heavy cream and stir to combine.
6. Add Parmesan cheese and stir until cheese is melted and sauce is smooth.
7. Season with salt and pepper to taste.
8. Drain ${userInput.includes('spaghetti') ? 'spaghetti' : 'pasta'} and add to skillet with sauce.
9. Toss ${userInput.includes('spaghetti') ? 'spaghetti' : 'pasta'} to ensure it's well coated.
10. Serve immediately, garnished with chopped parsley, if desired.`;
      } else if (userInput.includes('chicken')) {
        recipeTitle = `Herb Roasted ${capitalizedInput}`;
        ingredients = `- 4 chicken breasts
- 2 tablespoons olive oil
- 2 cloves garlic, minced
- 1 teaspoon dried thyme
- 1 teaspoon dried rosemary
- 1 teaspoon paprika
- 1/2 teaspoon salt
- 1/4 teaspoon black pepper
- 1 lemon, sliced
- Fresh herbs for garnish (optional)`;
        instructions = `1. Preheat oven to 425°F (220°C).
2. In a small bowl, mix olive oil, garlic, thyme, rosemary, paprika, salt, and pepper.
3. Place chicken breasts in a baking dish and brush with the herb mixture on both sides.
4. Arrange lemon slices around and on top of the chicken.
5. Bake for 20-25 minutes, or until chicken reaches an internal temperature of 165°F (74°C).
6. Let rest for 5 minutes before serving.
7. Garnish with fresh herbs if desired.`;
      } else {
        // Default recipe format for any other input
        recipeTitle = `${capitalizedInput} Recipe`;
        ingredients = `- Main ingredient: ${userInput}
- 2 tablespoons olive oil
- 1 onion, chopped
- 2 cloves garlic, minced
- 1 can (400g) diced tomatoes
- 1 teaspoon salt
- 1/2 teaspoon black pepper
- 1 teaspoon dried herbs (basil, oregano, or Italian seasoning)
- Additional ingredients as needed`;
        instructions = `1. Prepare the ${userInput} by washing and cutting into appropriate sizes.
2. Heat olive oil in a large pan over medium heat.
3. Add onions and cook until soft and translucent, about 5 minutes.
4. Add garlic and cook for another 30 seconds until fragrant.
5. Add the ${userInput} to the pan and cook for 5-7 minutes.
6. Pour in diced tomatoes, salt, pepper, and dried herbs. 
7. Simmer for 15 minutes, stirring occasionally.
8. Adjust seasoning to taste.
9. Serve hot with your choice of side dish.`;
      }
      
      // Combine into a well-formatted recipe
      generatedText = `# ${recipeTitle}

Preparation Time: 10 minutes
Cooking Time: 20 minutes

## Ingredients
${ingredients}

## Instructions
${instructions}

## Notes:
- You can use any variety of ${userInput} for this recipe.
- For a lighter version, you can reduce the amount of oil or cream.
- Leftovers can be stored in an airtight container in the refrigerator for up to 3 days.`;
    } else {
      // Clean any residual placeholder text if the AI response is otherwise good
      generatedText = generatedText.replace(/\[Step \d+\]|\(Step \d+\)|Step \d+:(?!\s*[a-zA-Z])/g, '');
      generatedText = generatedText.replace(/\[ingredient \d+\]|\(ingredient \d+\)|ingredient \d+:(?!\s*[a-zA-Z])/g, '');
    }
    
    console.log('[Recipe API] Successfully generated recipe');
    return new Response(
      JSON.stringify({ recipe: generatedText }),
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