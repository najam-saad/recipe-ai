import Link from 'next/link';
import { Metadata } from 'next';
import { HorizontalAdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Essential Cooking Tips & Techniques | Recipe Generator',
  description: 'Master your kitchen skills with our essential cooking tips and techniques. Learn knife skills, flavor pairing, meal prepping and more to take your cooking to the next level.',
  keywords: 'cooking tips, kitchen skills, cooking techniques, knife skills, flavor pairing, meal prep, kitchen organization, cooking hacks',
  alternates: {
    canonical: 'https://recipe-ai.vercel.app/blog/cooking-tips/index.html'
  },
};

export default function CookingTipsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HorizontalAdBanner />
      
      <div className="text-center mb-12">
        <span className="text-red-500 text-sm font-medium uppercase tracking-wider">Master Your Kitchen</span>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-2">Essential Cooking Tips & Techniques</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Level up your culinary skills with these practical cooking tips, kitchen hacks, and essential techniques
          that will make you a more confident and efficient home cook.
        </p>
      </div>
      
      {/* Author Bio - Adding personal credibility */}
      <div className="bg-gray-50 rounded-lg p-6 mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/4 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
              alt="Chef Michael" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-3/4 text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-2">About the Author: Chef Michael</h2>
          <p className="text-gray-700">
            After 12 years in professional kitchens and 5 years teaching cooking classes, I've distilled my most valuable 
            lessons into this guide. My journey from culinary school dropout to head chef taught me that technique matters 
            more than fancy ingredients. These are the same foundational skills I teach in my sold-out workshops, now 
            available to you at home.
          </p>
          <div className="mt-3 flex gap-2 justify-center md:justify-start">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Certified Culinary Instructor</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Restaurant Consultant</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="prose prose-lg max-w-none">
            <section id="knife-skills" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Knife Skills: The Foundation of Cooking</h2>
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Chef chopping vegetables" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p>
                A sharp knife is safer than a dull one. Keep your knives properly sharpened and honed for better control
                and efficiency in the kitchen. Here are some essential knife techniques every home cook should master:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>The claw grip:</strong> Curl your fingertips under and use your knuckles as a guide for the knife
                  to protect your fingertips.
                </li>
                <li>
                  <strong>Slicing:</strong> Draw the knife backward and forward through food in a smooth motion, letting the
                  knife do the work rather than applying pressure.
                </li>
                <li>
                  <strong>Dicing:</strong> Make even, parallel cuts in one direction, then rotate and cut perpendicular to
                  create uniform pieces.
                </li>
                <li>
                  <strong>Mincing:</strong> Rock the knife back and forth over finely diced ingredients, keeping the tip of
                  the knife on the cutting board.
                </li>
              </ul>
              <p className="mt-4">
                Practice these techniques with soft vegetables like onions and bell peppers before moving on to more challenging
                ingredients. Consistent, even cuts not only make your dishes look professional but also ensure even cooking.
              </p>

              {/* Personal Story Block */}
              <div className="bg-blue-50 p-6 rounded-lg mt-6 border-l-4 border-blue-500">
                <h4 className="font-semibold mb-2 text-blue-800">My Kitchen Disaster Story</h4>
                <p className="text-gray-700 text-base italic">
                  "When I was a line cook at my first restaurant job, I once had to prep 50 pounds of onions for French onion soup. 
                  My knife skills were sloppy, and I had blisters within an hour. The head chef stopped me, demonstrated the proper 
                  technique, and had me start over. It was humbling but transformative—my prep time was cut in half, and I didn't 
                  cry once during the second batch. That day taught me that proper technique isn't about showing off; it's about 
                  efficiency and self-preservation."
                </p>
              </div>
            </section>
            
            <section id="flavor-building" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Building Flavor: Beyond Salt & Pepper</h2>
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Various spices and herbs" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p>
                Great cooking is all about building and balancing flavors. Understanding how to layer different taste elements
                will transform your cooking from good to exceptional.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">The Five Taste Elements</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Salt:</strong> More than just sodium chloride, salt enhances other flavors and reduces bitterness.
                  Try different types like kosher, sea salt, and specialty salts for different applications.
                </li>
                <li>
                  <strong>Acid:</strong> Brightens flavors and provides balance. Use citrus juices, vinegars, wine, or fermented
                  ingredients to add much-needed acidity to rich dishes.
                </li>
                <li>
                  <strong>Sweet:</strong> Balances acidity and heat. Beyond sugar, try honey, maple syrup, or fruit juices to
                  add complexity.
                </li>
                <li>
                  <strong>Umami:</strong> The savory taste found in mushrooms, aged cheeses, soy sauce, tomatoes, and fermented
                  foods that adds depth to dishes.
                </li>
                <li>
                  <strong>Bitter:</strong> Creates complexity and balance. Found in dark greens, coffee, chocolate, and certain
                  herbs and spices.
                </li>
              </ol>
              <p className="mt-4">
                Remember to taste your food as you cook and adjust these elements accordingly. The goal is balance—no single
                taste should overwhelm the others unless that's your intention for the dish.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">Pro Tip: The Importance of Mise en Place</h4>
                <p className="text-gray-700">
                  "Mise en place" is French for "everything in its place." Prepare and organize all your ingredients before
                  you start cooking. This simple practice will make you more efficient, reduce stress, and help you avoid
                  mistakes or forgotten ingredients.
                </p>
              </div>
            </section>
            
            <section id="temperature-control" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Temperature Control: The Secret to Perfect Cooking</h2>
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Cooking over flame" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p>
                Understanding and controlling heat is perhaps the most important cooking skill. Whether you're searing a steak,
                simmering a sauce, or baking a delicate cake, temperature control is crucial.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Principles</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Preheat properly:</strong> Always preheat your pan, oven, or grill before adding food. This prevents
                  sticking and promotes proper browning.
                </li>
                <li>
                  <strong>Understand your heat sources:</strong> Gas provides immediate temperature changes, while electric
                  and induction have different response times. Adjust your cooking style accordingly.
                </li>
                <li>
                  <strong>Don't overcrowd the pan:</strong> When sautéing or searing, leave space between food items. Overcrowding
                  leads to steaming rather than browning.
                </li>
                <li>
                  <strong>Pat food dry:</strong> Before searing meat or fish, pat it dry with paper towels. Moisture creates steam,
                  preventing proper browning.
                </li>
                <li>
                  <strong>Invest in a good thermometer:</strong> For perfect results every time, use a reliable meat thermometer
                  and an oven thermometer to verify your equipment's accuracy.
                </li>
              </ul>
              <p className="mt-4">
                Remember that carryover cooking occurs after you remove food from heat, especially with larger items like roasts.
                Plan for this by removing food from heat 5-10°F below your target temperature.
              </p>

              {/* Temperature Guide Box */}
              <div className="bg-gray-100 p-6 rounded-lg mt-6">
                <h4 className="font-semibold mb-3 text-gray-900">My Temperature Cheat Sheet</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Meat Doneness Temperatures</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Rare Beef/Lamb</span>
                        <span className="font-medium">125°F (52°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Medium-Rare Beef/Lamb</span>
                        <span className="font-medium">135°F (57°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Medium Beef/Lamb</span>
                        <span className="font-medium">145°F (63°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Medium Pork</span>
                        <span className="font-medium">145°F (63°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Chicken/Turkey</span>
                        <span className="font-medium">165°F (74°C)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Sugar Cooking Stages</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>Thread Stage</span>
                        <span className="font-medium">230-235°F (110-112°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Soft Ball</span>
                        <span className="font-medium">235-240°F (112-116°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Firm Ball</span>
                        <span className="font-medium">245-250°F (118-121°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hard Ball</span>
                        <span className="font-medium">250-265°F (121-129°C)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Caramel</span>
                        <span className="font-medium">320-350°F (160-177°C)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">I keep this chart printed and magnetized to my refrigerator for quick reference</p>
              </div>
            </section>
            
            <section id="meal-prep" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Strategic Meal Prepping for Busy Cooks</h2>
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1584473457409-88da59c7c1b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Meal prep containers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p>
                Efficient meal preparation can save time, reduce stress, and help you eat healthier throughout the week.
                Here's how to get started with meal prepping:
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">Meal Prep Strategies</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Plan your menu:</strong> Choose recipes that use similar ingredients to minimize waste and that reheat
                  well. Avoid delicate foods that won't hold up over several days.
                </li>
                <li>
                  <strong>Prep ingredients, not just full meals:</strong> Washing and chopping vegetables, pre-cooking grains,
                  and marinating proteins can save significant time during weeknight cooking.
                </li>
                <li>
                  <strong>Use your freezer strategically:</strong> Many foods freeze well, including soups, stews, casseroles,
                  and cooked grains. Portion before freezing for easier defrosting.
                </li>
                <li>
                  <strong>Consider component-based meal prep:</strong> Instead of pre-making entire meals, prepare versatile
                  components that can be mixed and matched throughout the week.
                </li>
                <li>
                  <strong>Invest in quality storage containers:</strong> Glass containers are more environmentally friendly,
                  don't absorb odors, and can go from freezer to oven or microwave.
                </li>
              </ol>
              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">Sample Prep-Ahead Components</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Roasted vegetables (can be reheated or served at room temperature)</li>
                  <li>Cooked grains like rice, quinoa, or farro</li>
                  <li>Grilled or roasted chicken, beef, or tofu</li>
                  <li>Homemade sauces and dressings</li>
                  <li>Washed and chopped salad greens (store with a paper towel to absorb moisture)</li>
                </ul>
              </div>
            </section>
            
            <section id="creative-leftovers" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Transforming Leftovers: Reduce Waste, Increase Flavor</h2>
              <p>
                Reducing food waste is not only economically and environmentally responsible but can also lead to some of your
                most creative cooking. Here's how to reimagine leftovers:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>
                  <strong>Leftover roast chicken or turkey</strong> becomes filling for enchiladas, add-ins for pasta, or
                  the base for a quick soup or salad.
                </li>
                <li>
                  <strong>Cooked vegetables</strong> can be pureed into soups, added to frittatas or omelets, or blended into
                  sandwich spreads.
                </li>
                <li>
                  <strong>Day-old rice</strong> makes excellent fried rice (in fact, it's preferable to fresh rice) or can
                  be transformed into rice pudding for dessert.
                </li>
                <li>
                  <strong>Stale bread</strong> becomes French toast, bread pudding, croutons, or breadcrumbs for future recipes.
                </li>
                <li>
                  <strong>Extra pasta</strong> can be the start of a pasta frittata or baked pasta dish with new sauces and toppings.
                </li>
                <li>
                  <strong>Wilting herbs</strong> can be blended into compound butter, pesto, or chimichurri sauce, then
                  frozen for future use.
                </li>
              </ul>
              <p className="mt-4">
                The key to successful leftover transformation is thinking about ingredients rather than completed dishes.
                Break down yesterday's meal into its components and reimagine them in new contexts.
              </p>

              {/* Weekly Meal Plan Example */}
              <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-green-800">My Actual Weekly Meal Plan (with Leftovers Strategy)</h4>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-sm">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Monday</h5>
                      <p className="text-gray-700">Roast chicken with vegetables</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Tuesday</h5>
                      <p className="text-gray-700">Chicken tacos with leftover meat</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Wednesday</h5>
                      <p className="text-gray-700">Chicken stock from carcass + soup</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Thursday</h5>
                      <p className="text-gray-700">Pasta with quick tomato sauce</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Friday</h5>
                      <p className="text-gray-700">Pasta frittata with leftover pasta</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Saturday</h5>
                      <p className="text-gray-700">Homemade pizza night</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h5 className="font-medium text-gray-800 border-b pb-1 mb-2">Sunday</h5>
                      <p className="text-gray-700">Pizza croutons in salad with unused dough</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 italic">This simple rotation helps me minimize waste while keeping meals interesting</p>
                </div>
              </div>
            </section>
          </article>
          
          <div className="border-t border-gray-200 pt-10 mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">More Cooking Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <div 
                  key={resource.title}
                  className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Link href={resource.url} className="text-red-500 hover:text-red-600 font-medium">
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Table of Contents */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10 sticky top-20">
            <div className="bg-red-500 text-white p-4">
              <h3 className="font-bold text-xl">In This Article</h3>
            </div>
            <div className="p-5">
              <nav className="toc">
                <ul className="space-y-3">
                  <li>
                    <a href="#knife-skills" className="text-gray-700 hover:text-red-500 font-medium transition">
                      Knife Skills: The Foundation of Cooking
                    </a>
                  </li>
                  <li>
                    <a href="#flavor-building" className="text-gray-700 hover:text-red-500 font-medium transition">
                      Building Flavor: Beyond Salt & Pepper
                    </a>
                  </li>
                  <li>
                    <a href="#temperature-control" className="text-gray-700 hover:text-red-500 font-medium transition">
                      Temperature Control: The Secret to Perfect Cooking
                    </a>
                  </li>
                  <li>
                    <a href="#meal-prep" className="text-gray-700 hover:text-red-500 font-medium transition">
                      Strategic Meal Prepping for Busy Cooks
                    </a>
                  </li>
                  <li>
                    <a href="#creative-leftovers" className="text-gray-700 hover:text-red-500 font-medium transition">
                      Transforming Leftovers: Reduce Waste, Increase Flavor
                    </a>
                  </li>
                </ul>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-lg mb-2">Share This Article</h4>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    aria-label="Share on Pinterest"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Copy Link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Recipes */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <div className="bg-green-500 text-white p-4">
              <h3 className="font-bold text-xl">Practice These Techniques</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {featuredRecipes.map((recipe) => (
                  <div key={recipe.title} className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{recipe.title}</h4>
                      <p className="text-sm text-gray-500">{recipe.description}</p>
                      <Link href={recipe.url} className="text-sm text-red-500 hover:text-red-600">
                        View Recipe &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Section - For Fresh Content */}
      <section className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Cooking Challenge</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-xl">August Challenge: One-Pan Dinners</h3>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">11 days left</span>
          </div>
          <p className="text-gray-700 mb-4">
            This month, we're challenging home cooks to create delicious, complete meals using just a single pan or pot.
            The winning recipe will be featured on our homepage and the creator will receive a premium cookware set!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Challenge Rules</h4>
              <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                <li>Must be cooked in one pot/pan</li>
                <li>Complete protein + sides</li>
                <li>Ready in under 45 minutes</li>
                <li>Maximum 10 ingredients</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Judging Criteria</h4>
              <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                <li>Creativity - 35%</li>
                <li>Simplicity - 25%</li>
                <li>Visual appeal - 20%</li>
                <li>Nutritional balance - 20%</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Last Month's Winner</h4>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Sarah T.</span> - 
                15-Minute Mediterranean Shakshuka
              </p>
              <a href="#" className="text-sm text-red-500 hover:text-red-600 mt-2 inline-block">See Recipe →</a>
            </div>
          </div>
          <div className="text-center">
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition">
              Enter This Month's Challenge
            </button>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ready to Put These Tips into Practice?</h2>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Try our AI-powered Recipe Generator to create custom recipes based on ingredients you have on hand
          or dietary preferences. Apply the techniques you've learned to make these recipes even better!
        </p>
        <div className="text-center">
          <Link href="/index.html" className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition inline-flex items-center">
            Create Your Own Recipe
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
      
      <HorizontalAdBanner />
      
      {/* Return to Blog */}
      <div className="text-center mt-10">
        <Link 
          href="/blog/index.html"
          className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to All Blog Articles
        </Link>
      </div>
    </div>
  );
}

// Data for the page
const resources = [
  {
    title: "Essential Kitchen Tools Guide",
    description: "Our comprehensive guide to the must-have tools for every home kitchen, from knives to pots and specialty items.",
    url: "/blog/essential-kitchen-tools/index.html"
  },
  {
    title: "Flavor Pairing Fundamentals",
    description: "Learn the science behind successful flavor combinations and how to create balanced, delicious dishes.",
    url: "/blog/flavor-pairing/index.html"
  },
  {
    title: "Cooking Methods Explained",
    description: "Master different cooking techniques from braising to sous vide, with tips for getting the best results.",
    url: "/blog/cooking-methods/index.html"
  },
  {
    title: "Kitchen Organization Tips",
    description: "Strategies for organizing your kitchen space, pantry, and workflow for maximum efficiency.",
    url: "/blog/kitchen-organization/index.html"
  }
];

const featuredRecipes = [
  {
    title: "Classic French Omelette",
    description: "Practice temperature control and knife skills",
    image: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    url: "/recipes/classic-french-omelette/index.html"
  },
  {
    title: "Pan-Seared Salmon",
    description: "Master the art of perfect protein cookery",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    url: "/recipes/pan-seared-salmon/index.html"
  },
  {
    title: "Roasted Vegetable Grain Bowl",
    description: "Component cooking for easy meal prep",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    url: "/recipes/roasted-vegetable-bowl/index.html"
  },
  {
    title: "Flavor-Layered Soup",
    description: "Practice building depth of flavor",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    url: "/recipes/layered-vegetable-soup/index.html"
  }
]; 