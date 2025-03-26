import { Recipe } from '@/components/RecipeDetail';

// Sample recipe data - in a real app, this would come from a database or API
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    slug: 'classic-spaghetti-carbonara',
    name: 'Classic Spaghetti Carbonara',
    description: 'A creamy Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    preparationTime: '10 minutes',
    cookingTime: '15 minutes',
    servings: '4 servings',
    difficulty: 'Medium',
    ingredients: [
      '350g spaghetti',
      '150g pancetta or guanciale, diced',
      '4 large eggs',
      '50g pecorino romano cheese, grated',
      '50g parmesan cheese, grated',
      'Freshly ground black pepper',
      'Salt, to taste',
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package instructions until al dente.',
      'While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy, about 6-8 minutes.',
      'In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.',
      'Reserve 1/2 cup of pasta water, then drain the pasta.',
      'Working quickly, add hot pasta to the skillet with pancetta, removing from heat.',
      'Pour the egg and cheese mixture over the pasta, tossing continuously until a creamy sauce forms. Add a splash of pasta water if needed to loosen the sauce.',
      'Season with additional black pepper and salt if needed. Serve immediately with extra grated cheese on top.'
    ],
    image: 'https://example.com/images/carbonara.jpg',
    category: 'Pasta',
    keywords: 'pasta, Italian, carbonara, quick dinner',
    publishedDate: '2023-06-15',
    nutrition: {
      calories: '450 kcal',
      fat: '18g',
      carbs: '45g',
      protein: '24g',
    },
  },
  {
    id: '2',
    slug: 'homemade-margherita-pizza',
    name: 'Homemade Margherita Pizza',
    description: 'Classic Italian pizza with tomato sauce, fresh mozzarella, and basil.',
    preparationTime: '30 minutes',
    cookingTime: '15 minutes',
    servings: '2 pizzas',
    difficulty: 'Medium',
    ingredients: [
      '500g pizza dough',
      '200g canned San Marzano tomatoes, crushed',
      '2 cloves garlic, minced',
      '250g fresh mozzarella cheese, sliced',
      'Fresh basil leaves',
      '2 tbsp extra virgin olive oil',
      'Salt and pepper to taste',
    ],
    instructions: [
      'Preheat your oven to the highest temperature (usually 500°F/260°C) with a pizza stone or baking sheet inside.',
      'Divide the dough into two portions and stretch or roll each into a 10-12 inch circle on a floured surface.',
      'In a small bowl, mix crushed tomatoes with minced garlic, 1 tbsp olive oil, salt, and pepper.',
      'Spread the tomato sauce evenly over each pizza base, leaving a small border for the crust.',
      'Top with slices of fresh mozzarella, spaced evenly.',
      'Carefully transfer pizzas to the preheated stone or baking sheet.',
      'Bake for 8-10 minutes until the crust is golden and the cheese is bubbly.',
      'Remove from oven, top with fresh basil leaves and drizzle with remaining olive oil before serving.'
    ],
    image: 'https://example.com/images/margherita.jpg',
    category: 'Pizza',
    keywords: 'pizza, Italian, margherita, homemade',
    publishedDate: '2023-08-20',
    nutrition: {
      calories: '320 kcal',
      fat: '12g',
      carbs: '39g',
      protein: '14g',
    },
  },
  {
    id: '3',
    slug: 'chocolate-chip-cookies',
    name: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies with a soft center and crispy edges.',
    preparationTime: '15 minutes',
    cookingTime: '12 minutes',
    servings: '24 cookies',
    difficulty: 'Easy',
    ingredients: [
      '250g all-purpose flour',
      '1 tsp baking soda',
      '1/2 tsp salt',
      '170g unsalted butter, softened',
      '150g brown sugar',
      '100g granulated sugar',
      '1 tsp vanilla extract',
      '2 large eggs',
      '300g chocolate chips',
    ],
    instructions: [
      'Preheat oven to 350°F (175°C) and line baking sheets with parchment paper.',
      'In a medium bowl, whisk together flour, baking soda, and salt.',
      'In a large bowl, cream together the butter, brown sugar, and granulated sugar until light and fluffy.',
      'Beat in the vanilla and eggs, one at a time, until well incorporated.',
      'Gradually stir in the flour mixture until just combined.',
      'Fold in the chocolate chips.',
      'Drop rounded tablespoons of dough onto the prepared baking sheets, spacing them about 2 inches apart.',
      'Bake for 10-12 minutes, until edges are golden but centers are still soft.',
      'Allow cookies to cool on the baking sheet for 5 minutes before transferring to a wire rack to cool completely.'
    ],
    image: 'https://example.com/images/cookies.jpg',
    category: 'Dessert',
    keywords: 'cookies, dessert, chocolate chip, baking',
    publishedDate: '2023-05-10',
    nutrition: {
      calories: '180 kcal',
      fat: '9g',
      carbs: '23g',
      protein: '2g',
    },
  },
  {
    id: '4',
    slug: 'air-fryer-chicken-wings',
    name: 'Crispy Air Fryer Chicken Wings',
    description: 'Perfectly crispy chicken wings made in the air fryer with less oil and mess than traditional frying.',
    preparationTime: '10 minutes',
    cookingTime: '25 minutes',
    servings: '4 servings',
    difficulty: 'Easy',
    ingredients: [
      '1 kg chicken wings, separated into flats and drumettes',
      '1 tbsp baking powder (aluminum-free)',
      '1/2 tsp garlic powder',
      '1/2 tsp onion powder',
      '1/2 tsp paprika',
      '1/4 tsp cayenne pepper (optional)',
      'Salt and black pepper to taste',
      'Cooking spray',
      'Your favorite wing sauce (optional for serving)'
    ],
    instructions: [
      'Pat the chicken wings dry with paper towels. This is essential for crispy results.',
      'In a large bowl, combine the baking powder, garlic powder, onion powder, paprika, cayenne (if using), salt, and black pepper.',
      'Add the wings to the bowl and toss until evenly coated with the seasoning mixture.',
      'Preheat your air fryer to 380°F (193°C) for 3 minutes.',
      'Lightly spray the air fryer basket with cooking spray.',
      'Place the wings in a single layer in the air fryer basket (you may need to cook in batches).',
      'Cook for 12 minutes, then flip the wings and cook for another 10-12 minutes until golden brown and the internal temperature reaches 165°F (74°C).',
      'For extra crispiness, increase the temperature to 400°F (204°C) and cook for an additional 3-5 minutes.',
      'If desired, toss the hot wings in your favorite sauce before serving.'
    ],
    image: 'https://example.com/images/air-fryer-wings.jpg',
    category: 'Air Fryer',
    keywords: 'chicken wings, air fryer, crispy, healthy cooking, game day food, appetizer',
    publishedDate: '2024-01-20',
    nutrition: {
      calories: '290 kcal',
      fat: '18g',
      carbs: '2g',
      protein: '30g',
    },
  },
  {
    id: '5',
    slug: 'keto-friendly-cauliflower-pizza',
    name: 'Keto-Friendly Cauliflower Pizza Crust',
    description: 'A low-carb, gluten-free pizza crust made with cauliflower - perfect for keto diets and carb-conscious eaters.',
    preparationTime: '25 minutes',
    cookingTime: '25 minutes',
    servings: '1 medium pizza (2-3 servings)',
    difficulty: 'Medium',
    ingredients: [
      '1 medium head cauliflower (about 750g)',
      '100g mozzarella cheese, shredded',
      '30g parmesan cheese, grated',
      '1 large egg',
      '1/2 tsp dried oregano',
      '1/2 tsp dried basil',
      '1/2 tsp garlic powder',
      '1/4 tsp salt',
      'Pizza toppings of your choice'
    ],
    instructions: [
      'Preheat your oven to 425°F (220°C) and line a baking sheet with parchment paper.',
      'Remove the stems from cauliflower and cut into florets. Process in a food processor until it resembles rice grains.',
      'Place the cauliflower rice in a microwave-safe bowl and microwave for 5 minutes until soft. Alternatively, steam it for 5 minutes on the stovetop.',
      'Allow the cauliflower to cool, then transfer to a clean kitchen towel and squeeze out as much moisture as possible. This step is crucial for a crispy crust.',
      'In a mixing bowl, combine the drained cauliflower with mozzarella, parmesan, egg, and seasonings.',
      'Transfer the mixture to the prepared baking sheet and shape into a round pizza crust, about 1/4 inch thick.',
      'Bake for 15-20 minutes until golden brown and firm.',
      'Add your favorite low-carb toppings and return to the oven for another 5-10 minutes until the cheese is melted and bubbly.',
      'Allow to cool slightly before slicing and serving.'
    ],
    image: 'https://example.com/images/cauliflower-pizza.jpg',
    category: 'Low-Carb',
    keywords: 'keto, low carb, gluten-free, cauliflower pizza, healthy alternatives, diet recipe',
    publishedDate: '2024-02-15',
    nutrition: {
      calories: '170 kcal',
      fat: '10g',
      carbs: '8g',
      protein: '14g',
    },
  },
  {
    id: '6',
    slug: 'instant-pot-beef-stew',
    name: 'Hearty Instant Pot Beef Stew',
    description: 'A comforting and flavorful beef stew made in the Instant Pot in a fraction of the traditional cooking time.',
    preparationTime: '20 minutes',
    cookingTime: '35 minutes',
    servings: '6 servings',
    difficulty: 'Easy',
    ingredients: [
      '900g beef chuck, cut into 1-inch cubes',
      '2 tbsp olive oil',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '3 carrots, sliced into coins',
      '2 stalks celery, chopped',
      '400g baby potatoes, halved',
      '100g mushrooms, quartered',
      '2 tbsp tomato paste',
      '2 cups beef broth',
      '1 cup red wine (optional, can substitute with more broth)',
      '1 bay leaf',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '2 tbsp Worcestershire sauce',
      '2 tbsp all-purpose flour (or cornstarch for gluten-free)',
      'Salt and pepper to taste',
      'Fresh parsley for garnish'
    ],
    instructions: [
      'Set your Instant Pot to Sauté mode. Season beef generously with salt and pepper.',
      'Add olive oil to the pot and brown the beef in batches, about 2-3 minutes per batch. Transfer to a plate.',
      'In the same pot, add onions and cook until softened, about 3 minutes. Add garlic and cook for another 30 seconds.',
      'Add tomato paste and stir to coat the onions, cooking for 1 minute.',
      'Pour in wine (or additional broth) to deglaze the pot, scraping up any browned bits from the bottom.',
      'Return beef to the pot along with any accumulated juices. Add carrots, celery, potatoes, mushrooms, beef broth, bay leaf, thyme, rosemary, and Worcestershire sauce.',
      'Secure the lid and set to Pressure Cook/Manual on high pressure for 25 minutes.',
      'Once cooking is complete, allow for a 10-minute natural release, then carefully perform a quick release for any remaining pressure.',
      'Remove the bay leaf. In a small bowl, whisk together 2 tablespoons of cold water with the flour or cornstarch to create a slurry.',
      'Set the Instant Pot to Sauté mode again, stir in the slurry, and simmer until the stew thickens, about 2-3 minutes.',
      'Adjust seasoning with salt and pepper, garnish with fresh parsley, and serve hot.'
    ],
    image: 'https://example.com/images/instant-pot-stew.jpg',
    category: 'Instant Pot',
    keywords: 'instant pot, pressure cooker, beef stew, comfort food, one pot meal, winter recipe',
    publishedDate: '2024-03-05',
    nutrition: {
      calories: '380 kcal',
      fat: '14g',
      carbs: '25g',
      protein: '35g',
    },
  },
  {
    id: '7',
    slug: 'vegan-buddha-bowl',
    name: 'Vibrant Vegan Buddha Bowl',
    description: 'A colorful, nutrient-packed Buddha bowl with a variety of vegetables, grains, and a creamy tahini dressing.',
    preparationTime: '20 minutes',
    cookingTime: '30 minutes',
    servings: '2 servings',
    difficulty: 'Easy',
    ingredients: [
      '1 cup quinoa, rinsed',
      '2 cups vegetable broth',
      '1 sweet potato, diced',
      '1 tbsp olive oil',
      '1/2 tsp cumin',
      '1/2 tsp paprika',
      '1 cup chickpeas, drained and rinsed',
      '1 avocado, sliced',
      '1 cup kale, chopped',
      '1/2 cup red cabbage, shredded',
      '1/2 cup cucumber, sliced',
      '1/4 cup red onion, thinly sliced',
      '2 tbsp pumpkin seeds',
      'For the tahini dressing:',
      '3 tbsp tahini',
      '2 tbsp lemon juice',
      '1 clove garlic, minced',
      '2 tbsp water',
      '1 tsp maple syrup or honey (use maple for vegan)',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.',
      'Cook quinoa in vegetable broth according to package directions, typically bringing to a boil, then reducing to simmer for 15-20 minutes until liquid is absorbed.',
      'Toss sweet potato cubes with 1/2 tbsp olive oil, cumin, paprika, salt, and pepper. Spread on half of the baking sheet.',
      'Toss chickpeas with remaining olive oil and spread on the other half of the baking sheet.',
      'Roast for 20-25 minutes, stirring halfway through, until sweet potatoes are tender and chickpeas are crispy.',
      'While everything is cooking, prepare the tahini dressing by whisking together all dressing ingredients until smooth. Add more water if needed to reach desired consistency.',
      'Massage chopped kale with a tiny bit of olive oil and a pinch of salt for about 1 minute to soften.',
      'Assemble bowls: Start with a base of quinoa, then arrange sweet potatoes, chickpeas, kale, cabbage, cucumber, avocado, and red onion in sections.',
      'Drizzle with tahini dressing and sprinkle with pumpkin seeds before serving.'
    ],
    image: 'https://example.com/images/buddha-bowl.jpg',
    category: 'Vegan',
    keywords: 'buddha bowl, vegan, plant-based, healthy, meal prep, vegetarian, grain bowl',
    publishedDate: '2024-02-28',
    nutrition: {
      calories: '520 kcal',
      fat: '22g',
      carbs: '65g',
      protein: '17g',
    },
  },
  {
    id: '8',
    slug: 'easy-overnight-oats',
    name: 'Easy Overnight Oats with Berries',
    description: 'No-cook overnight oats with fresh berries - the perfect healthy breakfast for busy mornings.',
    preparationTime: '5 minutes',
    cookingTime: '0 minutes (8 hours refrigeration)',
    servings: '1 serving',
    difficulty: 'Easy',
    ingredients: [
      '1/2 cup rolled oats',
      '1/2 cup milk of choice (dairy or plant-based)',
      '1/4 cup Greek yogurt (use plant-based yogurt for vegan option)',
      '1 tbsp chia seeds',
      '1 tbsp maple syrup or honey',
      '1/4 tsp vanilla extract',
      'Pinch of salt',
      '1/4 cup mixed berries (strawberries, blueberries, raspberries)',
      'Optional toppings: nut butter, sliced banana, nuts, granola'
    ],
    instructions: [
      'In a mason jar or container with a lid, combine oats, milk, yogurt, chia seeds, sweetener, vanilla extract, and salt.',
      'Stir well to combine, making sure there are no dry spots of oats or chia seeds.',
      'Seal the container and refrigerate overnight or for at least 6-8 hours.',
      "In the morning, give the oats a good stir. If they're too thick, add a splash more milk.",
      'Top with fresh berries and any additional toppings of your choice.',
      'Enjoy cold straight from the refrigerator, or warm briefly in the microwave if preferred.'
    ],
    image: 'https://example.com/images/overnight-oats.jpg',
    category: 'Breakfast',
    keywords: 'overnight oats, meal prep, healthy breakfast, quick breakfast, no-cook, berries, oatmeal',
    publishedDate: '2024-01-10',
    nutrition: {
      calories: '310 kcal',
      fat: '8g',
      carbs: '45g',
      protein: '15g',
    },
  },
];

/**
 * Fetch all recipes
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  // In a real app, this would fetch from an API or database
  return sampleRecipes;
}

/**
 * Get all recipe slugs for static generation
 */
export async function getAllRecipeSlugs(): Promise<string[]> {
  const recipes = await getAllRecipes();
  return recipes.map(recipe => recipe.slug);
}

/**
 * Get a recipe by its slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipes = await getAllRecipes();
  const recipe = recipes.find(r => r.slug === slug);
  return recipe || null;
}

/**
 * Create a slug from a recipe name
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim();
}

/**
 * Get related recipes based on category or keywords
 */
export async function getRelatedRecipes(recipeId: string, limit = 3): Promise<Recipe[]> {
  const currentRecipe = await getRecipeById(recipeId);
  if (!currentRecipe) return [];
  
  const allRecipes = await getAllRecipes();
  
  // Filter out the current recipe and find related ones
  return allRecipes
    .filter(recipe => recipe.id !== recipeId)
    .filter(recipe => 
      recipe.category === currentRecipe.category || 
      (recipe.keywords && currentRecipe.keywords && 
       recipe.keywords.split(',').some(keyword => 
         currentRecipe.keywords!.includes(keyword.trim())
       ))
    )
    .slice(0, limit);
}

/**
 * Get a recipe by its ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  const recipes = await getAllRecipes();
  const recipe = recipes.find(r => r.id === id);
  return recipe || null;
}

/**
 * Search recipes by query string
 */
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  const searchTerms = query.toLowerCase().split(' ');
  
  return recipes.filter(recipe => {
    const searchText = `${recipe.name} ${recipe.description || ''} ${recipe.category || ''} ${recipe.keywords || ''}`.toLowerCase();
    
    return searchTerms.some(term => searchText.includes(term));
  });
} 