import Link from 'next/link';

const popularRecipes = [
  {
    id: 'italian-pasta',
    name: 'Classic Italian Pasta',
    description: 'A simple yet flavorful pasta dish with garlic, olive oil, and fresh herbs.',
    prepTime: '10 minutes',
    cookTime: '15 minutes',
    difficulty: 'Easy',
    category: 'Pasta',
    imageEmoji: '🍝',
    ingredients: [
      '500g spaghetti or linguine',
      '4 tablespoons extra virgin olive oil',
      '4 cloves garlic, thinly sliced',
      '1/4 teaspoon red pepper flakes (optional)',
      '1/4 cup fresh parsley, chopped',
      'Salt and freshly ground black pepper to taste',
      'Grated Parmesan cheese for serving'
    ],
    instructions: [
      'Bring a large pot of salted water to a boil. Cook pasta according to package directions until al dente.',
      'While pasta is cooking, heat olive oil in a large skillet over medium heat.',
      'Add sliced garlic and red pepper flakes (if using) to the oil and cook until garlic is lightly golden, about 2 minutes.',
      'Reserve 1/2 cup of pasta cooking water, then drain the pasta.',
      'Add the drained pasta to the skillet with the garlic oil, tossing to coat. If pasta seems dry, add a splash of the reserved cooking water.',
      'Stir in chopped parsley and season with salt and pepper.',
      'Serve immediately with grated Parmesan cheese on top.'
    ]
  },
  {
    id: 'chicken-stir-fry',
    name: 'Quick Chicken Stir-Fry',
    description: 'A healthy and flavorful stir-fry with chicken and colorful vegetables.',
    prepTime: '15 minutes',
    cookTime: '10 minutes',
    difficulty: 'Medium',
    category: 'Chicken',
    imageEmoji: '🍗',
    ingredients: [
      '2 boneless, skinless chicken breasts, sliced into thin strips',
      '2 tablespoons vegetable oil',
      '1 red bell pepper, sliced',
      '1 yellow bell pepper, sliced',
      '1 cup snow peas',
      '2 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '3 tablespoons soy sauce',
      '1 tablespoon honey',
      '1 teaspoon sesame oil',
      '2 green onions, chopped',
      'Sesame seeds for garnish',
      'Cooked rice for serving'
    ],
    instructions: [
      'In a small bowl, whisk together soy sauce, honey, and sesame oil. Set aside.',
      'Heat vegetable oil in a large wok or skillet over high heat.',
      'Add chicken strips and stir-fry until no longer pink, about 3-4 minutes. Remove and set aside.',
      'In the same pan, add bell peppers, snow peas, garlic, and ginger. Stir-fry for 2-3 minutes until vegetables begin to soften but remain crisp.',
      'Return chicken to the pan and add the sauce. Stir-fry for another 1-2 minutes until everything is coated and heated through.',
      'Sprinkle with chopped green onions and sesame seeds.',
      'Serve hot over cooked rice.'
    ]
  },
  {
    id: 'chocolate-chip-cookies',
    name: 'Classic Chocolate Chip Cookies',
    description: 'Soft and chewy chocolate chip cookies that are perfect for any occasion.',
    prepTime: '15 minutes',
    cookTime: '10 minutes',
    difficulty: 'Easy',
    category: 'Dessert',
    imageEmoji: '🍪',
    ingredients: [
      '1 cup (2 sticks) unsalted butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 teaspoons vanilla extract',
      '2 1/4 cups all-purpose flour',
      '1 teaspoon baking soda',
      '1/2 teaspoon salt',
      '2 cups semi-sweet chocolate chips',
      '1 cup chopped nuts (optional)'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
      'In a large bowl, cream together butter, granulated sugar, and brown sugar until light and fluffy.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'In a separate bowl, combine flour, baking soda, and salt. Gradually add to the butter mixture and mix well.',
      'Fold in chocolate chips and nuts (if using).',
      'Drop by rounded tablespoons onto the prepared baking sheets, spacing cookies about 2 inches apart.',
      'Bake for 9-11 minutes or until golden brown around the edges. Centers will still be soft.',
      'Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely.'
    ]
  },
  {
    id: 'vegetable-soup',
    name: 'Hearty Vegetable Soup',
    description: 'A nutritious and flavorful soup packed with fresh vegetables and herbs.',
    prepTime: '20 minutes',
    cookTime: '35 minutes',
    difficulty: 'Easy',
    category: 'Vegetarian',
    imageEmoji: '🍲',
    ingredients: [
      '2 tablespoons olive oil',
      '1 large onion, diced',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '3 cloves garlic, minced',
      '1 zucchini, diced',
      '1 cup green beans, trimmed and cut into 1-inch pieces',
      '1 can (14.5 oz) diced tomatoes',
      '6 cups vegetable broth',
      '1 teaspoon dried thyme',
      '1 bay leaf',
      '1 cup small pasta (like ditalini or elbow macaroni)',
      'Salt and pepper to taste',
      'Fresh parsley, chopped, for garnish',
      'Grated Parmesan cheese for serving (optional)'
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery and cook until softened, about 5 minutes.',
      'Add garlic and cook for another minute until fragrant.',
      'Stir in zucchini and green beans, cooking for 2-3 minutes.',
      'Add diced tomatoes with their juices, vegetable broth, thyme, and bay leaf. Bring to a boil.',
      'Reduce heat, cover, and simmer for 20 minutes until vegetables are tender.',
      'Add pasta and cook according to package directions until al dente (usually 8-10 minutes).',
      'Season with salt and pepper to taste. Remove bay leaf.',
      'Serve hot, garnished with fresh parsley and Parmesan cheese if desired.'
    ]
  }
];

export default function PopularRecipes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 py-8 md:py-12 mb-8 md:mb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-0">
            <span className="text-4xl mr-3">🍳</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Popular Recipes</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-8">
              <p className="text-gray-600 mb-6 text-center">
                Here are some of our most popular recipes that our users love. Try them out or use our recipe generator to create your own unique recipes!
              </p>
              
              <div className="flex justify-center mb-8">
                <Link href="/" className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Your Own Recipe
                </Link>
              </div>
            </div>
          </div>

          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
                    <p className="text-gray-600 mt-1">{recipe.description}</p>
                  </div>
                  <div className="text-5xl">{recipe.imageEmoji}</div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="recipe-meta">
                    <span className="font-medium">Prep:</span> {recipe.prepTime}
                  </span>
                  <span className="recipe-meta">
                    <span className="font-medium">Cook:</span> {recipe.cookTime}
                  </span>
                  <span className="recipe-meta">
                    <span className="font-medium">Difficulty:</span> {recipe.difficulty}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    {recipe.category}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Ingredients:</h3>
                  <ul className="ingredients-list">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="py-1">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mt-8 mb-4 pb-2 border-b border-red-200 text-red-700">Instructions:</h3>
                  <div className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-grow">{instruction}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
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
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 