import Link from 'next/link';
import { Metadata } from 'next';
import RecipeCard from '@/components/RecipeCard';
import { HorizontalAdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Seasonal Recipes - Recipe Generator',
  description: 'Discover our favorite seasonal recipes that highlight the best ingredients throughout the year. From spring vegetables to winter comfort foods.',
  keywords: 'seasonal recipes, summer recipes, spring recipes, fall recipes, winter recipes, seasonal cooking, seasonal ingredients',
  alternates: {
    canonical: 'https://recipe-ai.vercel.app/recipes/seasonal/index.html'
  },
};

export default function SeasonalRecipesPage() {
  const currentSeason = getCurrentSeason();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <HorizontalAdBanner />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Seasonal Recipes</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Celebrate the flavors of each season with our collection of recipes that highlight
          the freshest ingredients available throughout the year.
        </p>
      </div>
      
      <section className="bg-yellow-50 rounded-lg p-8 mb-12 border-l-4 border-yellow-400">
        <div className="flex items-start">
          <div className="bg-yellow-100 rounded-full p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">A Note From Our Chef</h2>
            <p className="text-gray-700">
              Having worked in restaurants for over 15 years, I've learned that seasonal cooking isn't just trendy—it's transformative. 
              When I first started using farmers' markets instead of supermarkets, the difference in my dishes was remarkable. 
              Tomatoes picked that morning have an intensity that's impossible to replicate with off-season produce.
            </p>
            <p className="text-gray-700 mt-3">
              My personal trick is to build a "seasonal calendar"—I note when ingredients peak in my region and plan my menus accordingly. 
              This practice has not only made me a better cook but has connected me to the rhythm of the growing seasons in ways I never expected.
              The recipes shared here reflect this philosophy of working with nature, not against it.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Current {currentSeason} Favorites</h2>
          <Link href="/recipes/seasonal/summer/index.html" className="text-red-500 hover:text-red-600 font-medium">
            View All {currentSeason} Recipes &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentSeasonRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
      
      <HorizontalAdBanner />
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">All Seasons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((season) => (
            <div key={season.name} className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden">
              <img 
                src={season.image} 
                alt={`${season.name} Recipes`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{season.name} Recipes</h3>
                <p className="text-gray-600 mb-4">{season.description}</p>
                <Link href={`/recipes/seasonal/${season.name.toLowerCase()}/index.html`} className="text-red-500 hover:text-red-600 font-medium">
                  Explore {season.name} Recipes &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Top Seasonal Shopping Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-green-500 font-bold text-xl mr-2">01</span>
              <h3 className="font-semibold text-lg">Shop The Perimeter First</h3>
            </div>
            <p className="text-gray-700">
              I always tell my cooking students to lap the farmers' market or store once before buying anything. 
              Note what looks exceptional that day and build your menu around these standouts, not the other way around.
              This single habit improved my cooking more than any technique I learned in culinary school.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-green-500 font-bold text-xl mr-2">02</span>
              <h3 className="font-semibold text-lg">The Two-Day Rule</h3>
            </div>
            <p className="text-gray-700">
              For delicate seasonal items like berries or fresh herbs, I follow a personal two-day rule: either use them 
              within two days of purchase or preserve them (freeze, pickle, etc.). After two days, quality drops dramatically, 
              and you lose the advantage of buying seasonal in the first place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-green-500 font-bold text-xl mr-2">03</span>
              <h3 className="font-semibold text-lg">Talk To The Growers</h3>
            </div>
            <p className="text-gray-700">
              At farmers' markets, I've received my best cooking education directly from producers. Ask them when they 
              harvested the produce, how they suggest preparing it, and what will be coming next week. Their inside 
              knowledge is invaluable and will transform how you cook.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-green-500 font-bold text-xl mr-2">04</span>
              <h3 className="font-semibold text-lg">The Color Principle</h3>
            </div>
            <p className="text-gray-700">
              My "color principle" is simple: aim for at least three different colored produce items in your shopping 
              basket. This guarantees nutritional variety and forces you to think beyond your usual choices. I've 
              discovered some of my favorite ingredients this way, like purple cauliflower and watermelon radishes.
            </p>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Cooking with Seasonal Ingredients</h2>
        <p className="text-gray-600 mb-4">
          Seasonal cooking is not just better for the environment, it also provides the freshest and most flavorful ingredients 
          for your meals. When you cook with in-season produce, you'll notice the difference in taste, quality, and often price.
        </p>
        <p className="text-gray-600 mb-6">
          Our seasonal recipes guide helps you make the most of what's available throughout the year, 
          with creative ideas for everything from light spring salads to hearty winter stews.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6 border-t-4 border-red-500">
          <h3 className="font-bold text-xl mb-3">Monthly Seasonal Challenge</h3>
          <p className="text-gray-700 mb-4">
            Join our community of seasonal cooks! Each month, we feature a different seasonal ingredient and challenge
            our readers to create unique recipes. Share your creation on social media with #SeasonalChef to be featured
            on our site and enter to win cooking prizes.
          </p>
          <div className="bg-red-50 p-4 rounded-md">
            <p className="font-medium">This month's ingredient: <span className="text-red-600">Sweet Corn</span></p>
            <p className="text-sm mt-2">Submissions open until August 31st. Last month's winner created an amazing Strawberry Balsamic Galette!</p>
          </div>
        </div>
        
        <Link href="/index.html" className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition inline-flex items-center mt-8">
          Create Your Own Seasonal Recipe
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </section>
      
      <HorizontalAdBanner />
    </div>
  );
}

// Helper functions and data
function getCurrentSeason() {
  const month = new Date().getMonth();
  
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Fall';
  return 'Winter';
}

const seasons = [
  {
    name: 'Spring',
    description: 'Fresh greens, asparagus, peas, and more to brighten your springtime meals.',
    image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Summer',
    description: 'Make the most of tomatoes, corn, berries, and other summer bounty.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fall',
    description: 'Cozy up with apples, pumpkins, squash, and hearty autumn fare.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Winter',
    description: 'Warm up with citrus, root vegetables, and comforting winter classics.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const currentSeasonRecipes = [
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
  }
]; 