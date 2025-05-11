// Simple test script to verify if the Google/Gemini API key is working
const { genkit } = require('genkit');
const { googleAI } = require('@genkit-ai/googleai');

// Set the API key directly
process.env.GEMINI_API_KEY = 'AIzaSyDAmRKRhgjn2ztQbsa5qmslSmOtOxTi3Go';

async function testApiKey() {
  try {
    const ai = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-1.5-flash-latest',
    });

    console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY?.substring(0, 10) + "...");
    
    const response = await ai.generate({
      prompt: "Hello, can you tell me a simple recipe for pancakes?",
    });

    console.log("API is working! Here's the response:");
    console.log(response.text);
    return true;
  } catch (error) {
    console.error("Error testing the API key:", error.message);
    return false;
  }
}

testApiKey().then(isWorking => {
  console.log("API test completed. Working:", isWorking);
}); 