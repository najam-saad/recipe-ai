'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RecipeGenerator from '../components/RecipeGenerator';
import { HorizontalAdBanner } from '@/components/AdBanner';
import { useEffect } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import type { Recipe } from '@/components/RecipeDetail';

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const allRecipes = await getAllRecipes();
        // Get the 3 most recent recipes as "trending"
        const sorted = [...allRecipes].sort((a, b) => {
          return new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime();
        });
        setTrendingRecipes(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingRecipes();
  }, []);

  const handleGetStarted = () => setShowGenerator(true);

  if (showGenerator) {
    return (
      <>
        <HorizontalAdBanner />
        <RecipeGenerator />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AIDisclaimer />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Featured recipe categories with SEO-friendly descriptions
  const recipeCategories = [
    {
      name: 'Healthy Recipes',
      description: 'Nutritious meals packed with flavor. Our healthy recipes support your wellness goals without sacrificing taste.',
      icon: '🥗',
      href: '/recipes?category=healthy'
    },
    {
      name: 'Quick & Easy',
      description: 'Delicious meals ready in 30 minutes or less. Perfect for busy weeknights when time is limited.',
      icon: '⏱️',
      href: '/recipes?category=quick'
    },
    {
      name: 'Vegetarian & Vegan',
      description: 'Plant-based recipes that are satisfying and flavorful. Discover the versatility of vegetarian cooking.',
      icon: '🌱',
      href: '/recipes?category=vegetarian'
    },
    {
      name: 'Gluten-Free',
      description: "Gluten-free recipes that don't compromise on taste. Safe and delicious options for those with gluten sensitivity.",
      icon: '🌾',
      href: '/recipes?category=gluten-free'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-20 pb-40 md:pb-56">
        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 20}%`,
                animation: `float ${8 + i * 2}s infinite ease-in-out ${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-6 relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
              <div className="relative flex items-center justify-center bg-white/10 backdrop-blur-md w-full h-full rounded-full">
                <span className="text-5xl">🍳</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-md leading-tight tracking-tight">
              <br className="md:hidden" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-100">
                Recipe Generator
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-xl mx-auto mb-10 leading-relaxed">
              Transform ingredients into gourmet recipes. Get personalized cooking instructions in seconds for just $1.
            </p>

            <button
              onClick={handleGetStarted}
              className="btn btn-lg bg-white text-red-500 hover:bg-red-50 shadow-xl group"
            >
              <span>Create Your Recipe</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            <div className="mt-4 text-white/80 text-sm">
              One-time $1 payment per recipe generation. Premium users enjoy unlimited recipes.
            </div>
          </div>
        </div>

        {/* Wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 62.125C672 71 768 88.75 864 80C960 71 1056 35.5 1152 26.5C1248 17.75 1344 35.5 1392 44.375L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Trending Recipes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Recipes</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Our most popular recipes this week. Tried, tested, and loved by our community.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-lg bg-gray-200 h-48 w-96"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trendingRecipes.map((recipe) => (
                <Link href={`/recipes/${recipe.slug}`} key={recipe.id} className="block transform transition hover:scale-105">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                    <div className="h-48 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white text-5xl">
                        {recipe.category === 'Pasta' ? '🍝' : 
                         recipe.category === 'Pizza' ? '🍕' : 
                         recipe.category === 'Dessert' ? '🍪' : 
                         recipe.category === 'Breakfast' ? '🍳' :
                         recipe.category === 'Vegan' ? '🥗' : 
                         recipe.category === 'Low-Carb' ? '🥩' : 
                         recipe.category === 'Air Fryer' ? '🍗' : 
                         recipe.category === 'Instant Pot' ? '🍲' : '🥘'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {recipe.preparationTime} prep · {recipe.cookingTime} cook
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/recipes" className="btn btn-primary">
              Explore All Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Recipe Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recipe Categories</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Find the perfect recipe for any occasion, diet, or preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipeCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link href={category.href} className="text-red-500 hover:text-red-600 font-medium inline-flex items-center">
                  Explore recipes
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Turn any ingredients or recipe idea into a detailed cooking guide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Ingredients</h3>
              <p className="text-gray-600">
                List what you have in your kitchen and let us create the perfect recipe for you
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get the Recipe</h3>
              <p className="text-gray-600">
                Receive a detailed recipe with ingredients, instructions, and cooking tips
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cook and Enjoy</h3>
              <p className="text-gray-600">
                Follow the easy step-by-step instructions to prepare a delicious meal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO and user experience */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Get answers to common questions about our recipe generator.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How does the recipe generator work?</h3>
                <p className="text-gray-600">
                  Our recipe generator uses advanced algorithms to create personalized recipes based on the ingredients you have. 
                  Simply enter what's in your kitchen, and we'll suggest delicious meals you can make.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Are the recipes suitable for dietary restrictions?</h3>
                <p className="text-gray-600">
                  Yes! You can specify dietary preferences like vegetarian, vegan, gluten-free, or keto, and our generator will 
                  create recipes that match your requirements while using your available ingredients.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I save and share my generated recipes?</h3>
                <p className="text-gray-600">
                  Absolutely! Once a recipe is generated, you can save it to your personal cookbook, print it, or share it with 
                  friends and family via email or social media.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Are nutritional details provided with the recipes?</h3>
                <p className="text-gray-600">
                  Yes, all generated recipes include detailed nutritional information, including calories, protein, carbs, and fat content, 
                  helping you make informed choices about your meals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start cooking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Turn your available ingredients into delicious meals with our recipe generator.
          </p>
          <button onClick={handleGetStarted} className="btn bg-white text-red-500 hover:bg-red-50 btn-lg">
            Create Your Recipe Now
          </button>
        </div>
      </section>

      {/* AI Disclaimer */}
      <div className="container mx-auto px-4 max-w-4xl">
        <AIDisclaimer />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

// Add this disclaimer statement to the page
const AIDisclaimer = () => (
  <div className="bg-gray-50 border-l-4 border-red-500 p-4 mt-8 mb-8 rounded-md">
    <div className="flex">
      <svg className="h-6 w-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <div>
        <p className="text-gray-700 text-sm">
          <strong>AI-Generated Content:</strong> All recipes are created using artificial intelligence. 
          While we strive for accuracy, please use your judgment regarding food safety, cooking times, 
          and ingredient substitutions. Recipes should be used as inspiration and adjusted to your preferences.
        </p>
      </div>
    </div>
  </div>
);

// Add this footer to the page - modify the end of the file where there would be a closing div
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Recipe Generator</h3>
          <p className="text-gray-400">
            Transform ingredients into delicious recipes with AI-powered suggestions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/recipes/popular/index.html" className="text-gray-400 hover:text-white transition">
                Popular Recipes
              </Link>
            </li>
            <li>
              <Link href="/recipes/seasonal" className="text-gray-400 hover:text-white transition">
                Seasonal Recipes
              </Link>
            </li>
            <li>
              <Link href="/premium" className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Premium Features ✨
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about/index.html" className="text-gray-400 hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy/index.html" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms/index.html" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Recipe Generator. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
