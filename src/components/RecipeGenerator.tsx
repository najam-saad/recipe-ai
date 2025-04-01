'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Add recipe type
type Recipe = {
  name: string;
  preparationTime: string;
  cookingTime: string;
  ingredients: string[];
  instructions: string[];
};

// Add user plan type
type UserPlan = 'free' | 'premium';

// Helper function to format recipe text
function formatRecipe(text: string) {
  // Extract recipe sections with regex
  const formattedText = text
    // Format headings
    .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold text-red-600 mb-4">$1</h1>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold text-red-700 mt-5 mb-2">$1</h2>')
    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold text-red-600 mt-4 mb-2">$1</h3>')
    
    // Format common recipe section headers
    .replace(/^(Recipe Title:)(.*?)$/gm, '<h1 class="text-3xl font-bold text-red-600 mb-4">$2</h1>')
    .replace(/^(Description:)(.*?)$/gm, '<p class="text-xl text-gray-700 mb-6 italic">$2</p>')
    
    // Recipe metadata formatting
    .replace(/^(Preparation Time:|Cooking Time:|Total Time:|Servings:|Difficulty Level:)(.*?)$/gm, 
             '<span class="recipe-meta">$1$2</span>')
    
    // Main sections
    .replace(/^(Ingredients:|Instructions:|Directions:|Steps:|Method:)(.*?)$/gm, 
             '<h2 class="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">$1$2</h2>')
    
    // Tips and notes
    .replace(/^(Tips:|Notes:)(.*?)$/gm, 
             '<h3 class="text-lg font-semibold mt-6 mb-3 text-red-600 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>$1$2</h3>')
    
    // Format lists and steps
    .replace(/^(\d+\.|\d+\)) (.*?)$/gm, '<div class="step"><span class="step-number">$1</span><span>$2</span></div>')
    .replace(/^(\-|\*) (.*?)$/gm, '<li class="py-1">$2</li>')
    
    // Basic formatting
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br/>')
    
    // Wrap ingredients in a list if not already
    .replace(/(<h2[^>]*>Ingredients:[^<]*<\/h2>)\s*([^<]*)/g, (match, heading, list) => {
      if (!list.includes('<li')) {
        const items = list.split('\n').filter((item: string) => item.trim());
        if (items.length) {
          return `${heading}<ul class="ingredients-list">${items.map((item: string) => `<li class="py-1">${item.trim()}</li>`).join('')}</ul>`;
        }
      }
      return match;
    });
    
  return `<div class="recipe-content">${formattedText}</div>`;
}

// Parse the recipe text into a structured object
function parseRecipeText(text: string): Recipe {
  console.log('Raw recipe text:', text.substring(0, 100) + '...');
  
  // Default values
  const recipe: Recipe = {
    name: "Recipe",
    preparationTime: "N/A",
    cookingTime: "N/A",
    ingredients: [],
    instructions: []
  };

  // Extract recipe title (try multiple patterns)
  const titlePatterns = [
    /Name:\s*([^\n]+)/i,
    /Recipe Title:\s*([^\n]+)/i,
    /^# ([^\n]+)/m,
    /^([^\n:]+)(?:\n|$)/
  ];
  
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match) {
      recipe.name = match[1].trim();
      break;
    }
  }

  // Extract preparation time
  const prepTimePatterns = [
    /Preparation Time:\s*([^\n]+)/i,
    /Prep Time:\s*([^\n]+)/i,
    /Prep:\s*([^\n]+)/i
  ];
  
  for (const pattern of prepTimePatterns) {
    const match = text.match(pattern);
    if (match) {
      recipe.preparationTime = match[1].trim();
      break;
    }
  }

  // Extract cooking time
  const cookTimePatterns = [
    /Cooking Time:\s*([^\n]+)/i,
    /Cook Time:\s*([^\n]+)/i,
    /Cook:\s*([^\n]+)/i
  ];
  
  for (const pattern of cookTimePatterns) {
    const match = text.match(pattern);
    if (match) {
      recipe.cookingTime = match[1].trim();
      break;
    }
  }

  // Extract ingredients - try multiple section headers
  const ingredientSectionPatterns = [
    /Ingredients:([\s\S]*?)(?=(Instructions:|Directions:|Steps:|Method:|$))/i,
    /Ingredients List:([\s\S]*?)(?=(Instructions:|Directions:|Steps:|Method:|$))/i
  ];
  
  let ingredientsFound = false;
  for (const pattern of ingredientSectionPatterns) {
    const section = text.match(pattern);
    if (section) {
      const ingredientLines = section[1].trim().split('\n');
      recipe.ingredients = ingredientLines
        .map(line => line.replace(/^-\s*/, '').trim())
        .filter(line => line.length > 0);
      ingredientsFound = true;
      break;
    }
  }
  
  // If no ingredients section found, try to extract list items
  if (!ingredientsFound) {
    const bulletPoints = text.match(/(?:^|\n)-\s*([^\n]+)/g);
    if (bulletPoints) {
      recipe.ingredients = bulletPoints
        .map(line => line.replace(/^-\s*/, '').trim())
        .filter(line => line.length > 0);
    }
  }

  // Extract instructions - try multiple section headers
  const instructionSectionPatterns = [
    /(Instructions:|Directions:|Steps:|Method:)([\s\S]*?)(?=(Tips:|Notes:|$))/i,
    /(\d+\.\s*)([^\n]+)/g
  ];
  
  let instructionsFound = false;
  // Try to find a section first
  const section = text.match(instructionSectionPatterns[0]);
  if (section) {
    const instructionLines = section[2].trim().split('\n');
    recipe.instructions = instructionLines
      .map(line => line.replace(/^\d+\.?\s*/, '').trim())
      .filter(line => line.length > 0);
    instructionsFound = true;
  }
  
  // If no section, try to extract numbered points
  if (!instructionsFound) {
    const steps = [...text.matchAll(/(?:^|\n)(\d+)[\.\)]?\s*([^\n]+)/g)];
    if (steps.length > 0) {
      recipe.instructions = steps.map(match => match[2].trim());
      instructionsFound = true;
    }
  }
  
  // If we still couldn't find ingredients or instructions, 
  // and the text is really just a block, try splitting by double newlines
  if ((!ingredientsFound || !instructionsFound) && text.split('\n\n').length > 1) {
    const paragraphs = text.split('\n\n');
    // Assume the last few paragraphs might be instructions
    if (!instructionsFound && paragraphs.length > 1) {
      recipe.instructions = paragraphs.slice(Math.max(1, paragraphs.length - 3))
        .map(p => p.trim())
        .filter(p => p.length > 0 && !p.match(/^(ingredients|instructions|steps|directions|method):/i));
    }
  }

  console.log('Parsed recipe:', recipe);
  return recipe;
}

// Add this function near the top of the file, after the parseRecipeText function
function generateRecipeJsonLd(recipe: Recipe) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    author: {
      '@type': 'Organization',
      name: 'Recipe Generator'
    },
    datePublished: new Date().toISOString().split('T')[0],
    description: recipe.name,
    prepTime: `PT${recipe.preparationTime.replace(/\D/g, '')}M`,
    cookTime: `PT${recipe.cookingTime.replace(/\D/g, '')}M`,
    totalTime: `PT${(parseInt(recipe.preparationTime.replace(/\D/g, ''), 10) + 
                 parseInt(recipe.cookingTime.replace(/\D/g, ''), 10))}M`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step
    }))
  };
}

// Add this near the top of the file, after the parseRecipeText function
function getUserPlan(): UserPlan {
  // In a real app, this would check authentication status and user's subscription
  // For now, we'll use localStorage to simulate a subscription
  const plan = localStorage.getItem('userPlan') || 'free';
  return plan as UserPlan;
}

function getRemainingGenerations(): number {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const usageData = JSON.parse(localStorage.getItem('recipeGeneratorUsage') || '{}');
  
  // Reset if it's a new day
  if (!usageData.date || usageData.date !== today) {
    return 3; // Free tier gets 3 generations per day
  }
  
  return Math.max(0, 3 - (usageData.count || 0));
}

function trackGeneration() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const usageData = JSON.parse(localStorage.getItem('recipeGeneratorUsage') || '{}');
  
  // Reset if it's a new day
  if (!usageData.date || usageData.date !== today) {
    localStorage.setItem('recipeGeneratorUsage', JSON.stringify({
      date: today,
      count: 1
    }));
    return;
  }
  
  // Increment usage
  localStorage.setItem('recipeGeneratorUsage', JSON.stringify({
    date: today,
    count: (usageData.count || 0) + 1
  }));
}

const RecipeGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeHtml, setRecipeHtml] = useState<string>("");
  const [type, setType] = useState("ingredients");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  // Keep user plan state for premium features
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [remainingGenerations, setRemainingGenerations] = useState(3);

  // Simplify useEffect
  useEffect(() => {
    // This runs only on the client side
    setUserPlan(getUserPlan());
    setRemainingGenerations(getRemainingGenerations());
  }, []);

  const generateRecipe = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError("");
    setRecipe(null);
    setRecipeHtml("");

    try {
      // Add timeout for the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 1 minute timeout
      
      console.log(`Generating recipe for "${input}" (${type})`);
      
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userInput: input, 
          type
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to generate recipe");
        setLoading(false);
        return;
      }

      // Track usage for free tier users
      if (userPlan === 'free') {
        trackGeneration();
        const remaining = getRemainingGenerations();
        setRemainingGenerations(remaining);
      }

      // Process the recipe output
      const recipeText = data.recipe;
      
      if (!recipeText) {
        setError("Empty recipe generated. Please try again with different input.");
        setLoading(false);
        return;
      }
      
      // Here we're updating the state with the raw recipe text
      const formattedHtml = formatRecipe(recipeText);
      setRecipeHtml(formattedHtml);
      
      // Parse the recipe text into structured data
      const parsedRecipe = parseRecipeText(recipeText);
      setRecipe(parsedRecipe);
      
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError("Request timed out. Please try again.");
      } else {
        setError("Failed to generate recipe: " + (err.message || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateRecipe();
    }
  };

  const handleClear = () => {
    setRecipe(null);
    setRecipeHtml("");
    setInput("");
    setError("");
  };

  const handleSaveRecipe = () => {
    if (!recipe) return;
    
    // Create a slug from the recipe name
    const slug = recipe.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Prepare a full recipe object
    const fullRecipe = {
      ...recipe,
      id: `gen-${Date.now()}`,
      slug,
      publishedDate: new Date().toISOString().split('T')[0],
      category: 'Generated Recipe',
    };
    
    // In a real app, you would save this to a database or API
    // For now, just simulate success and show a message
    console.log('Recipe saved:', fullRecipe);
    setSaveSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 py-8 md:py-12 mb-8 md:mb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-0">
            <span className="text-4xl mr-3 animate-bounce">🍳</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Recipe Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Recipe Form */}
          <div className="recipe-form mb-10 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              What would you like to cook?
            </h2>
            
            {/* Add plan indicator and usage information */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="text-lg font-medium text-gray-700">
                {userPlan === 'premium' ? (
                  <span className="text-red-600">Premium Plan</span>
                ) : (
                  <span>Free Plan • {remainingGenerations} generations left today</span>
                )}
              </div>
            </div>
            
            <div className="animate-staggered-fade-in">
              {/* Type Toggle */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Recipe Type</label>
                <div className="toggle-group">
                  <button
                    onClick={() => setType("ingredients")}
                    className={`toggle-button ${
                      type === "ingredients" ? "toggle-button-active" : "toggle-button-inactive"
                    }`}
                  >
                    By Ingredients
                  </button>
                  <button
                    onClick={() => setType("recipe")}
                    className={`toggle-button ${
                      type === "recipe" ? "toggle-button-active" : "toggle-button-inactive"
                    }`}
                  >
                    By Recipe Name
                  </button>
                </div>
              </div>
              
              {/* Input Group */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  {type === "ingredients" ? "Ingredients" : "Recipe Name"}
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    className="input-modern"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={type === "ingredients" 
                      ? "Enter ingredients separated by commas (e.g. chicken, rice, tomatoes)" 
                      : "Enter a recipe name (e.g. Chocolate Cake)"}
                  />
                  <button
                    className="btn btn-primary flex-shrink-0"
                    onClick={generateRecipe}
                    disabled={loading || !input.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner mr-2"></span>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Generate Recipe</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded-md">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-yellow-700">{error}</p>
                </div>
              </div>
            )}
          </div>

          {recipe && (
            <div className="mb-12">
              {/* Recipe Result */}
              <div className="recipe-card animate-fade-in">
                {/* Add Schema.org JSON-LD structured data */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateRecipeJsonLd(recipe))
                  }}
                />
                
                <h1 className="text-3xl font-bold text-red-600 mb-4 text-center">{recipe.name}</h1>
                
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {recipe.preparationTime && (
                    <span className="recipe-meta">
                      <span className="font-medium">Prep:</span> {recipe.preparationTime}
                    </span>
                  )}
                  {recipe.cookingTime && (
                    <span className="recipe-meta">
                      <span className="font-medium">Cook:</span> {recipe.cookingTime}
                    </span>
                  )}
                </div>
                
                {recipeHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: recipeHtml }} />
                ) : (
                  <div className="recipe-content">
                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Ingredients:</h2>
                        <ul className="ingredients-list">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="py-1">{ingredient}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {recipe.instructions && recipe.instructions.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Instructions:</h2>
                        <div className="space-y-4">
                          {recipe.instructions.map((instruction, index) => (
                            <div key={index} className="step">
                              <div className="step-number">{index + 1}</div>
                              <div>{instruction}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                  onClick={handleClear}
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 100-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Another Recipe
                </button>
                
                <button
                  onClick={handleSaveRecipe}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Save Recipe
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Print Recipe
                </button>
              </div>
              
              {/* Success message */}
              {saveSuccess && (
                <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p>Recipe saved successfully! You can find it in your saved recipes.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Return link */}
          <div className="text-center mt-12">
            <Link
              href="/index.html"
              className="inline-flex items-center text-red-500 hover:text-red-700 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator; 