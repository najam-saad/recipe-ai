import { Metadata } from 'next';
import { Recipe as SchemaRecipe } from 'schema-dts';
import { notFound } from 'next/navigation';
import RecipeDetail from '@/components/RecipeDetail';
import { getRecipeBySlug, getAllRecipeSlugs } from '@/lib/recipes';
import { HorizontalAdBanner, VideoAdBanner } from '@/components/AdBanner';

// Generate static params for all recipes
export async function generateStaticParams() {
  const slugs = await getAllRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each recipe page dynamically
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const recipe = await getRecipeBySlug(slug);
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.'
    };
  }
  
  return {
    title: `${recipe.name} Recipe | Easy to Make | Recipe Generator`,
    description: `Make delicious ${recipe.name} with our easy recipe. Prep time: ${recipe.preparationTime}, Cook time: ${recipe.cookingTime}. Get the full recipe with step-by-step instructions.`,
    keywords: `${recipe.name}, recipe, homemade, cooking, ingredients, how to make ${recipe.name}`,
    alternates: {
      canonical: `https://recipe-ai.vercel.app/recipes/${slug}`
    },
    openGraph: {
      title: `${recipe.name} Recipe | Easy Homemade Recipe`,
      description: `Learn how to make ${recipe.name} with simple ingredients. Get the full recipe with ingredients and instructions.`,
      url: `https://recipe-ai.vercel.app/recipes/${slug}`,
      type: 'article',
      publishedTime: recipe.publishedDate,
      authors: ['Recipe Generator'],
      images: recipe.image 
        ? [{ url: recipe.image, width: 1200, height: 630, alt: recipe.name }] 
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.name} Recipe | Recipe Generator`,
      description: `Get our easy recipe for ${recipe.name}. Step-by-step instructions and full ingredient list.`,
      images: recipe.image ? [recipe.image] : [],
    }
  };
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const recipe = await getRecipeBySlug(slug);
  
  if (!recipe) {
    notFound();
  }
  
  // Prepare schema.org JSON-LD structured data for Recipe
  const recipeSchema: SchemaRecipe = {
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    author: {
      '@type': 'Organization',
      name: 'Recipe Generator'
    },
    datePublished: recipe.publishedDate,
    image: recipe.image,
    prepTime: `PT${recipe.preparationTime.replace(/\D/g, '')}M`,
    cookTime: `PT${recipe.cookingTime.replace(/\D/g, '')}M`,
    totalTime: `PT${(parseInt(recipe.preparationTime.replace(/\D/g, ''), 10) + 
                parseInt(recipe.cookingTime.replace(/\D/g, ''), 10))}M`,
    recipeYield: recipe.servings || '2 servings',
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step
    })),
    recipeCategory: recipe.category || 'Main Course',
    keywords: recipe.keywords || recipe.name.toLowerCase(),
    nutrition: recipe.nutrition ? {
      '@type': 'NutritionInformation',
      calories: recipe.nutrition.calories || undefined,
      fatContent: recipe.nutrition.fat || undefined,
      carbohydrateContent: recipe.nutrition.carbs || undefined,
      proteinContent: recipe.nutrition.protein || undefined,
    } : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...recipeSchema
          })
        }}
      />
      <HorizontalAdBanner />
      <div className="container mx-auto px-4 py-8">
        <RecipeDetail recipe={recipe} />
        
        {/* Video Ad - strategic placement after recipe details */}
        <div className="my-10">
          <h3 className="text-xl font-semibold mb-4">Watch Related Video</h3>
          <VideoAdBanner />
        </div>
      </div>
      <HorizontalAdBanner />
    </>
  );
} 