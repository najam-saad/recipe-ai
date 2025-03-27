import { NextRequest, NextResponse } from 'next/server';

const HF_API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';

export async function POST(request: NextRequest) {
  try {
    const { userInput, type } = await request.json();
    
    if (!userInput || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: userInput or type' }, 
        { status: 400 }
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

    // Call Hugging Face API
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Hugging Face API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate recipe from Hugging Face API' }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Extracting the generated text from Hugging Face response
    const generatedText = data[0]?.generated_text || '';
    
    // Clean up the response by removing the original prompt
    const cleanedText = generatedText.replace(prompt, '').trim();
    
    return NextResponse.json({ recipe: cleanedText });
    
  } catch (error) {
    console.error('Recipe generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe. Please try again.' }, 
      { status: 500 }
    );
  }
} 