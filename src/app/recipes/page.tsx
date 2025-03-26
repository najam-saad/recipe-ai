import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes } from '@/lib/recipes';
import type { Recipe } from '@/components/RecipeDetail';
import { HorizontalAdBanner, InFeedAdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'All Recipes | Browse Our Collection | Recipe Generator',
  description: 'Browse our complete collection of delicious recipes. Find recipes by category, ingredients, or preparation time. Discover new meals for every occasion.',
  keywords: 'recipes, cooking, food, collection, browse recipes, recipe finder, meal ideas, cooking inspiration, recipe search',
  alternates: {
    canonical: 'https://recipe-ai.vercel.app/recipes'
  },
  openGraph: {
    title: 'Recipe Collection | Find Your Next Favorite Recipe',
    description: 'Explore our extensive collection of recipes for every occasion and skill level. Filter by category, difficulty, or preparation time.',
    url: 'https://recipe-ai.vercel.app/recipes',
    type: 'website',
  },
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  // Create dynamic recipe icon based on category
  const getCategoryIcon = (category: string = '') => {
    const categoryMap: {[key: string]: string} = {
      'Pasta': '🍝',
      'Pizza': '🍕',
      'Dessert': '🍪',
      'Breakfast': '🍳',
      'Vegan': '🥗',
      'Low-Carb': '🥩',
      'Air Fryer': '🍗',
      'Instant Pot': '🍲'
    };
    
    return categoryMap[category] || '🥘';
  };

  return (
    <Link href={`/recipes/${recipe.slug}`} className="block h-full">
      <div className="card h-full transform transition-transform hover:scale-[1.02] shadow-sm hover:shadow-md">
        <div className="h-48 relative overflow-hidden rounded-t-lg">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="bg-gradient-to-r from-red-100 to-red-200 h-full w-full flex items-center justify-center">
              <span className="text-5xl">{getCategoryIcon(recipe.category)}</span>
            </div>
          )}
          {recipe.category && (
            <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {recipe.category}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
          
          {recipe.description && (
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{recipe.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
              {recipe.preparationTime} prep
            </span>
            <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
              {recipe.cookingTime} cook
            </span>
            {recipe.difficulty && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {recipe.difficulty}
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              {new Date(recipe.publishedDate || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="text-red-500 text-sm font-semibold">View Recipe →</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: { 
    category?: string;
    sort?: string;
    search?: string;
  };
}) {
  const allRecipes = await getAllRecipes();
  const { category, sort, search } = searchParams || {};
  
  // Filter recipes based on search params
  let recipes = [...allRecipes];
  
  // Apply category filter if provided
  if (category) {
    recipes = recipes.filter(recipe => 
      recipe.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Apply search if provided
  if (search) {
    const searchLower = search.toLowerCase();
    recipes = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description?.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchLower)) ||
      recipe.category?.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting if provided
  if (sort) {
    switch (sort) {
      case 'newest':
        recipes.sort((a, b) => new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime());
        break;
      case 'oldest':
        recipes.sort((a, b) => new Date(a.publishedDate || '').getTime() - new Date(b.publishedDate || '').getTime());
        break;
      case 'quickest':
        recipes.sort((a, b) => {
          const aTime = parseInt(a.preparationTime.replace(/\D/g, ''), 10) + parseInt(a.cookingTime.replace(/\D/g, ''), 10);
          const bTime = parseInt(b.preparationTime.replace(/\D/g, ''), 10) + parseInt(b.cookingTime.replace(/\D/g, ''), 10);
          return aTime - bTime;
        });
        break;
      default:
        // Default sorting - by newest
        recipes.sort((a, b) => new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime());
    }
  } else {
    // Default sorting if none provided
    recipes.sort((a, b) => new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime());
  }
  
  // Get unique categories for filter
  const categories = Array.from(new Set(allRecipes.map(recipe => recipe.category).filter(Boolean)));
  
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
              <li><Link href="/recipes" className="hover:text-white transition-colors font-semibold">Recipes</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <HorizontalAdBanner />
        
        <div className="my-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our collection of delicious recipes for every occasion. From quick weeknight dinners to elaborate weekend feasts, find your next favorite meal!
          </p>
        </div>
        
        {/* Category Pills */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <Link 
              href="/recipes" 
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${!category ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All Recipes
            </Link>
            {categories.map((cat) => (
              cat && (
                <Link 
                  key={cat} 
                  href={`/recipes?category=${cat}`}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${category === cat ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {cat}
                </Link>
              )
            ))}
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <form action="/recipes" method="get">
                {category && <input type="hidden" name="category" value={category} />}
                <input 
                  type="text" 
                  name="search"
                  placeholder="Search recipes..." 
                  className="input-modern w-full" 
                  defaultValue={search || ''}
                />
              </form>
            </div>
            <div className="flex gap-2">
              {/* Preserve category parameter when changing sort */}
              <select 
                className="input-modern"
                onChange={(e) => {
                  const url = new URL(window.location.href);
                  if (e.target.value) {
                    url.searchParams.set('sort', e.target.value);
                  } else {
                    url.searchParams.delete('sort');
                  }
                  window.location.href = url.toString();
                }}
                defaultValue={sort || ''}
              >
                <option value="">Sort By</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="quickest">Quickest to Make</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-6 text-gray-600">
          <p>
            Showing {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
            {category ? ` in ${category}` : ''}
            {search ? ` matching "${search}"` : ''}
          </p>
        </div>
        
        {/* Recipe Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <>
                <RecipeCard key={recipe.id} recipe={recipe} />
                {index > 0 && (index + 1) % 6 === 0 && (
                  <InFeedAdBanner key={`ad-${index}`} />
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No recipes found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria to find more recipes.
            </p>
            <Link href="/recipes" className="btn btn-primary">
              View All Recipes
            </Link>
          </div>
        )}
        
        {/* SEO Optimized Content Section */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <div className="prose prose-red max-w-none">
            <h2>Explore Our Collection of Homemade Recipes</h2>
            <p>
              Welcome to our comprehensive recipe collection, where you'll find culinary inspiration for every occasion, skill level, and dietary preference. 
              Our recipes are carefully crafted to provide clear instructions, accurate cooking times, and helpful tips to ensure your cooking success.
            </p>
            
            <h3>Something for Everyone</h3>
            <p>
              Whether you're looking for quick weeknight dinners, impressive dishes for entertaining, or healthy meal options, our diverse recipe library has you covered. 
              From traditional classics to innovative culinary creations, discover recipes that will delight your taste buds and expand your cooking repertoire.
            </p>
            
            <h3>Recipes by Category</h3>
            <p>
              Explore our recipes by category to find exactly what you're looking for. Our collection includes:
            </p>
            <ul>
              <li><strong>Quick and Easy Recipes</strong> - Delicious meals ready in 30 minutes or less, perfect for busy weeknights</li>
              <li><strong>Healthy Eating</strong> - Nutritious recipes that don't sacrifice flavor, including low-carb, keto, and plant-based options</li>
              <li><strong>International Cuisine</strong> - Authentic recipes from around the world, from Italian pasta dishes to Asian stir-fries</li>
              <li><strong>Special Diets</strong> - Recipes for various dietary needs, including gluten-free, dairy-free, and vegan options</li>
              <li><strong>Seasonal Dishes</strong> - Recipes that highlight fresh, in-season ingredients for optimal flavor</li>
            </ul>
            
            <p>
              Each recipe in our collection includes detailed ingredients lists, step-by-step instructions, preparation and cooking times, serving sizes, and nutritional information. 
              Many recipes also include helpful tips, variations, and serving suggestions to enhance your cooking experience.
            </p>
            
            <h3>Cook with Confidence</h3>
            <p>
              Our recipes are thoroughly tested to ensure reliability and delicious results. Whether you're a novice cook or an experienced chef, you'll find recipes that match your skill level 
              and inspire you to try new techniques and flavors. Happy cooking!
            </p>
          </div>
        </section>
        
        <HorizontalAdBanner />
      </div>
    </div>
  );
} 