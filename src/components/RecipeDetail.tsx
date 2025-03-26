'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { InContentAdBanner } from './AdBanner';

// Define the Recipe type
export type Recipe = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  preparationTime: string;
  cookingTime: string;
  servings?: string;
  difficulty?: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  category?: string;
  keywords?: string;
  publishedDate?: string;
  nutrition?: {
    calories?: string;
    fat?: string;
    carbs?: string;
    protein?: string;
  };
};

type RecipeDetailProps = {
  recipe: Recipe;
};

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const [isClient, setIsClient] = useState(false);
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set isClient to true once component mounts (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate total time
  const totalTime = 
    `${parseInt(recipe.preparationTime.replace(/\D/g, ''), 10) + 
    parseInt(recipe.cookingTime.replace(/\D/g, ''), 10)} minutes`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 py-8 md:py-12 mb-8 md:mb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center text-white hover:opacity-90 transition-opacity">
              <span className="text-4xl mr-3">🍳</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Recipe Generator</h1>
            </Link>
          </div>
          <nav className="flex justify-center text-white/90">
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/popular" className="hover:text-white transition-colors">Popular Recipes</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Recipe Content */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Recipe Header */}
            <div className="p-6 md:p-8 pb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
              
              {recipe.description && (
                <p className="text-lg text-gray-700 mb-6 italic">{recipe.description}</p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="recipe-meta">
                  <span className="font-medium">Prep:</span> {recipe.preparationTime}
                </span>
                <span className="recipe-meta">
                  <span className="font-medium">Cook:</span> {recipe.cookingTime}
                </span>
                <span className="recipe-meta">
                  <span className="font-medium">Total:</span> {totalTime}
                </span>
                {recipe.servings && (
                  <span className="recipe-meta">
                    <span className="font-medium">Servings:</span> {recipe.servings}
                  </span>
                )}
                {recipe.difficulty && (
                  <span className="recipe-meta">
                    <span className="font-medium">Difficulty:</span> {recipe.difficulty}
                  </span>
                )}
              </div>
            </div>
            
            {/* Recipe Image - Lazy loaded */}
            {recipe.image && (
              <div 
                ref={imageRef} 
                className="w-full h-64 md:h-96 relative overflow-hidden"
              >
                {(isClient && imageInView) && (
                  <Image 
                    src={recipe.image} 
                    alt={recipe.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                    priority={false}
                    loading="lazy"
                  />
                )}
              </div>
            )}
            
            <div className="p-6 md:p-8">
              {/* Ingredients */}
              <h2 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Ingredients:</h2>
              <ul className="ingredients-list mb-8">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="py-1">{ingredient}</li>
                ))}
              </ul>
              
              {/* Instructions */}
              <h2 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Instructions:</h2>
              <div className="space-y-4 mb-8">
                {recipe.instructions.slice(0, Math.ceil(recipe.instructions.length / 2)).map((instruction, index) => (
                  <div key={index} className="step">
                    <div className="step-number">{index + 1}</div>
                    <div>{instruction}</div>
                  </div>
                ))}
                
                {/* Insert ad in the middle of the instructions */}
                {recipe.instructions.length > 3 && (
                  <InContentAdBanner />
                )}
                
                {recipe.instructions.slice(Math.ceil(recipe.instructions.length / 2)).map((instruction, index) => (
                  <div key={index + Math.ceil(recipe.instructions.length / 2)} className="step">
                    <div className="step-number">{index + Math.ceil(recipe.instructions.length / 2) + 1}</div>
                    <div>{instruction}</div>
                  </div>
                ))}
              </div>
              
              {/* Nutrition Info (if available) */}
              {recipe.nutrition && (
                <>
                  <h2 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Nutrition Information:</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {recipe.nutrition.calories && (
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Calories</div>
                        <div className="font-bold text-lg">{recipe.nutrition.calories}</div>
                      </div>
                    )}
                    {recipe.nutrition.fat && (
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Fat</div>
                        <div className="font-bold text-lg">{recipe.nutrition.fat}</div>
                      </div>
                    )}
                    {recipe.nutrition.carbs && (
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Carbs</div>
                        <div className="font-bold text-lg">{recipe.nutrition.carbs}</div>
                      </div>
                    )}
                    {recipe.nutrition.protein && (
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-gray-500 text-sm">Protein</div>
                        <div className="font-bold text-lg">{recipe.nutrition.protein}</div>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {/* Social Sharing */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="text-lg font-semibold mb-4">Share this recipe:</h3>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${recipe.name} recipe!`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(recipe.image || '')}&description=${encodeURIComponent(`${recipe.name} Recipe`)}`, '_blank')}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    aria-label="Share on Pinterest"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: recipe.name,
                          text: `Check out this recipe for ${recipe.name}!`,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Copy Link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Print Button */}
              <button
                onClick={() => window.print()}
                className="mt-6 flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>Print Recipe</span>
              </button>
              
              {/* Related Recipes Placeholder - This would be populated with actual related recipes */}
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-6 text-gray-900">You might also like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* This would be populated with actual related recipes */}
                  <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">
                    Related Recipe Placeholder
                  </div>
                  <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">
                    Related Recipe Placeholder
                  </div>
                  <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">
                    Related Recipe Placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Return link */}
          <div className="text-center mt-12">
            <Link
              href="/"
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
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail; 