import Link from 'next/link';
import { Metadata } from 'next';
import RecipeCard from '@/components/RecipeCard';
import { HorizontalAdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Summer Recipes - Fresh & Delicious Seasonal Cooking',
  description: 'Discover our collection of delicious summer recipes featuring seasonal ingredients like tomatoes, corn, berries, and more. Perfect for BBQs, picnics, and easy summer dinners.',
  keywords: 'summer recipes, seasonal cooking, BBQ recipes, grilling recipes, summer salads, cold soups, fresh produce, berry desserts, summer fruits, picnic food',
  alternates: {
    canonical: 'https://recipe-ai.vercel.app/recipes/seasonal/summer/index.html'
  },
};

export default function SummerRecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HorizontalAdBanner />
      
      <div className="text-center mb-12">
        <span className="text-red-500 text-sm font-medium uppercase tracking-wider">Fresh & Seasonal</span>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-2">Summer Recipes</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Celebrate the bounty of summer with these fresh, vibrant recipes that showcase 
          the season's most delicious ingredients.
        </p>
      </div>
      
      <div className="relative h-96 rounded-xl overflow-hidden mb-16">
        <img 
          src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Summer food spread" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
          <h2 className="text-white text-2xl md:text-3xl font-bold">Make the Most of Summer's Bounty</h2>
          <p className="text-white/90 text-lg max-w-3xl">
            From juicy tomatoes to sweet corn, from ripe berries to fragrant herbs,
            summer offers an abundance of fresh ingredients to inspire your cooking.
          </p>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Summer Categories */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Summer Recipe Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summerCategories.map((category) => (
                <div 
                  key={category.name} 
                  className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden flex flex-col"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                    <Link href={category.url || "/recipes/seasonal/summer/index.html"} className="text-red-500 hover:text-red-600 font-medium">
                      View Recipes &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Featured Summer Recipes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Summer Recipes</h2>
            <div className="space-y-8">
              {summerRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* What's in Season */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <div className="bg-red-500 text-white p-4">
              <h3 className="font-bold text-xl">What's in Season: Summer</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {seasonalIngredients.map((category) => (
                  <div key={category.name}>
                    <h4 className="font-medium text-lg mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span 
                          key={item} 
                          className="inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-lg mb-2">Summer Cooking Tips</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Keep your kitchen cool by using the grill or slow cooker</li>
                  <li>Shop at farmers' markets for the freshest produce</li>
                  <li>Preserve summer fruits by freezing or making jams</li>
                  <li>Prepare cold soups and salads for hot days</li>
                  <li>Use herbs generously while they're fresh and abundant</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Summer Meal Planning */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <div className="bg-blue-500 text-white p-4">
              <h3 className="font-bold text-xl">Summer Meal Planning</h3>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="font-medium text-lg mb-1">BBQ & Grilling</h4>
                  <p className="text-gray-700 text-sm">Perfect for weekend gatherings and outdoor dining</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="font-medium text-lg mb-1">Picnic Ideas</h4>
                  <p className="text-gray-700 text-sm">Portable, delicious foods for outdoor adventures</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="font-medium text-lg mb-1">Light Summer Dinners</h4>
                  <p className="text-gray-700 text-sm">Quick and easy meals for hot summer evenings</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="font-medium text-lg mb-1">Frozen Treats</h4>
                  <p className="text-gray-700 text-sm">Cool down with homemade ice creams and sorbets</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Refreshing Drinks</h4>
                  <p className="text-gray-700 text-sm">Stay hydrated with fruity infusions and mocktails</p>
                </div>
              </div>
              
              <div className="mt-5">
                <Link href="/index.html" className="w-full block text-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
                  Create Custom Summer Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summer Cooking Guide */}
      <section className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Summer Cooking Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Essential Summer Cooking Techniques</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>
                  <span className="font-medium">Grilling:</span> The quintessential summer cooking method that adds smoky flavor to everything from meats to vegetables and even fruits.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>
                  <span className="font-medium">No-Cook Methods:</span> Prepare raw dishes like gazpacho, ceviche, and fresh salads to keep your kitchen cool.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>
                  <span className="font-medium">Quick Pickling:</span> Preserve the bounty of summer produce and add tangy zip to your meals.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>
                  <span className="font-medium">Cold Infusions:</span> Create flavorful oils, vinegars, and beverages by infusing with herbs and fruits.
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Making the Most of Summer Produce</h3>
            <p className="text-gray-700 mb-4">
              Summer produce is at its peak flavor and often doesn't need much preparation or cooking. Here's how to make the most of it:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>Let perfectly ripe tomatoes shine in simple preparations like bruschetta or caprese salad.</div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>Grill corn on the cob and serve with flavored butters or as elote (Mexican street corn).</div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>Use abundant zucchini in quick breads, fritters, carpaccio, or spiralized "noodles."</div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <div>Showcase berries in simple desserts, smoothies, or enjoy them fresh with a touch of cream.</div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <HorizontalAdBanner />
      
      {/* Return to Seasonal */}
      <div className="text-center mt-10">
        <Link 
          href="/recipes/seasonal/index.html"
          className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to All Seasonal Recipes
        </Link>
      </div>
    </div>
  );
}

// Data for the page
const summerCategories = [
  {
    name: "Grilling & BBQ",
    description: "Master the grill with recipes for burgers, skewers, veggies and more perfect for outdoor cooking.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/recipes/seasonal/summer/grilling/index.html"
  },
  {
    name: "Summer Salads",
    description: "Refreshing, vibrant salads featuring the best of summer produce, perfect for hot days.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/recipes/seasonal/summer/salads/index.html"
  },
  {
    name: "Cold Soups",
    description: "Beat the heat with chilled soups like gazpacho, cucumber, and fruit soups.",
    image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/recipes/seasonal/summer/soups/index.html"
  },
  {
    name: "Berry Desserts",
    description: "Sweet treats showcasing summer's bounty of strawberries, blueberries, raspberries, and more.",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/recipes/seasonal/summer/desserts/index.html"
  }
];

const seasonalIngredients = [
  {
    name: "Vegetables",
    items: ["Tomatoes", "Corn", "Zucchini", "Cucumber", "Bell Peppers", "Eggplant", "Green Beans", "Okra"]
  },
  {
    name: "Fruits",
    items: ["Strawberries", "Blueberries", "Watermelon", "Peaches", "Nectarines", "Cherries", "Plums", "Raspberries"]
  },
  {
    name: "Herbs",
    items: ["Basil", "Mint", "Cilantro", "Dill", "Parsley", "Oregano", "Thyme", "Rosemary"]
  }
];

const summerRecipes = [
  {
    id: 'summer-1',
    slug: 'grilled-peach-salad',
    name: 'Grilled Peach & Burrata Salad',
    description: 'Sweet grilled peaches paired with creamy burrata cheese, arugula, and a honey balsamic glaze.',
    preparationTime: '15 minutes',
    cookingTime: '5 minutes',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Summer Salad'
  },
  {
    id: 'summer-2',
    slug: 'watermelon-feta-mint-salad',
    name: 'Watermelon, Feta & Mint Salad',
    description: 'A refreshing summer salad with sweet watermelon, tangy feta cheese, and cooling mint.',
    preparationTime: '10 minutes',
    cookingTime: '0 minutes',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1593460354583-4150c5b6ce54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Summer Salad'
  },
  {
    id: 'summer-3',
    slug: 'grilled-corn-elote',
    name: 'Grilled Mexican Street Corn (Elote)',
    description: 'Charred corn on the cob topped with creamy sauce, cotija cheese, chili powder, and lime.',
    preparationTime: '5 minutes',
    cookingTime: '10 minutes',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1627662056605-c2c364c53f28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Summer Side'
  },
  {
    id: 'summer-4',
    slug: 'easy-gazpacho',
    name: 'Classic Spanish Gazpacho',
    description: 'A refreshing cold soup made with ripe tomatoes, cucumbers, bell peppers, and herbs - perfect for hot summer days.',
    preparationTime: '20 minutes',
    cookingTime: '0 minutes',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Cold Soup'
  },
  {
    id: 'summer-5',
    slug: 'grilled-skirt-steak-chimichurri',
    name: 'Grilled Skirt Steak with Chimichurri',
    description: 'Juicy grilled skirt steak topped with fresh, herbaceous chimichurri sauce - a perfect summer grilling recipe.',
    preparationTime: '15 minutes',
    cookingTime: '10 minutes',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Grilling'
  },
  {
    id: 'summer-6',
    slug: 'summer-berry-pavlova',
    name: 'Summer Berry Pavlova',
    description: 'Light and airy meringue topped with whipped cream and fresh summer berries - an elegant and refreshing dessert.',
    preparationTime: '30 minutes',
    cookingTime: '1 hour 30 minutes',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Dessert'
  }
]; 