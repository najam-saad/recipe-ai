"use client";

import { useState, useCallback } from 'react';
import type { Recipe, RecipeCategory } from '@/types';
import { generateRecipeByName, type GenerateRecipeByNameInput, type GenerateRecipeByNameOutput } from '@/ai/flows/generate-recipe-by-name';
import { GeneratedRecipeDisplay } from '@/components/recipes/GeneratedRecipeDisplay';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Search, Soup } from 'lucide-react';

const parseAIList = (text: string | undefined): string[] => {
  if (!text) return [];
  return text.split('\n').map(s => s.trim()).filter(Boolean);
};

export default function FindRecipePage() {
  const [dishName, setDishName] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRecipeSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dishName.trim()) {
      toast({
        title: 'Dish Name Required',
        description: 'Please enter the name of the dish you want to find.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedRecipe(null);

    try {
      const input: GenerateRecipeByNameInput = { dishName };
      const aiOutput: GenerateRecipeByNameOutput = await generateRecipeByName(input);

      if (!aiOutput || !aiOutput.title) {
        throw new Error("The chef failed to generate a valid recipe for this dish.");
      }
      
      const newRecipe: Recipe = {
        id: Date.now().toString(), 
        title: aiOutput.title,
        ingredients: parseAIList(aiOutput.ingredients),
        instructions: parseAIList(aiOutput.instructions),
        image: aiOutput.image || undefined,
        category: aiOutput.category || 'Other', 
        cuisine: aiOutput.cuisine,
      };

      setGeneratedRecipe(newRecipe);
      toast({
        title: "Recipe Found!",
        description: `Enjoy your "${newRecipe.title}" recipe.`,
      });
    } catch (error) {
      console.error("Recipe search error:", error);
      toast({
        title: "Error Finding Recipe",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again or try a different dish name.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = (dataUrl: string | null) => {
    if (generatedRecipe) {
      setGeneratedRecipe({ ...generatedRecipe, image: dataUrl || undefined });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-12">
      <section id="recipe-search" className="text-center">
        <Soup className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Find a Recipe</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Enter the name of a dish (e.g., "Spaghetti Carbonara", "Chicken Tikka Masala") and our chef will conjure up the recipe for you!
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">What dish are you looking for?</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecipeSearch} className="space-y-6">
            <div>
              <Label htmlFor="dishName-input" className="text-base">Dish Name</Label>
              <Input
                id="dishName-input"
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g., Butter Chicken, Chocolate Lava Cake"
                className="mt-1 text-base"
                aria-required="true"
              />
            </div>
            <Button type="submit" className="w-full text-lg py-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size={20} className="mr-2" />
                  Searching for Recipe...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Find Recipe
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && !generatedRecipe && (
        <div className="text-center py-8">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-lg text-muted-foreground">Our chef is searching for your recipe...</p>
        </div>
      )}

      {generatedRecipe && (
        <section id="found-recipe-display" className="scroll-mt-20 mt-12">
           <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
            Voilà! Your Recipe:
          </h2>
          <GeneratedRecipeDisplay recipe={generatedRecipe} onImageUpload={handleImageUpdate} />
        </section>
      )}
    </div>
  );
}
