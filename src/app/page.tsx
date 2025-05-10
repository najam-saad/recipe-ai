"use client";

import { useState, useMemo, useCallback } from 'react';
import type { Recipe, RecipeCategory } from '@/types';
import { recipeCategories } from '@/types';
import { generateRecipeFromIngredients, type GenerateRecipeInput, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { RecipeGenerationForm } from '@/components/recipes/RecipeGenerationForm';
import { GeneratedRecipeDisplay } from '@/components/recipes/GeneratedRecipeDisplay';
import { RecipeList } from '@/components/recipes/RecipeList';
import { CategoryFilter } from '@/components/recipes/CategoryFilter';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Helper to parse AI output strings into arrays
const parseAIList = (text: string | undefined): string[] => {
  if (!text) return [];
  return text.split('\n').map(s => s.trim()).filter(Boolean);
};

export default function HomePage() {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [sessionRecipes, setSessionRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);

  const handleCategoryFilterChange = useCallback((category: RecipeCategory | null) => {
    setSelectedCategory(category);
  }, []); 

  const handleRecipeGeneration = async (values: Omit<GenerateRecipeInput, 'ingredients'> & { ingredients: string; category: RecipeCategory }) => {
    setIsLoading(true);
    setCurrentRecipe(null); 

    try {
      const aiInput: GenerateRecipeInput = {
        ingredients: values.ingredients,
        cuisine: values.cuisine,
        dietaryRestrictions: values.dietaryRestrictions,
      };
      const aiOutput: GenerateRecipeOutput = await generateRecipeFromIngredients(aiInput);

      if (!aiOutput || !aiOutput.title) {
        throw new Error("The chef failed to generate a valid recipe.");
      }
      
      const newRecipe: Recipe = {
        id: Date.now().toString(), 
        title: aiOutput.title,
        ingredients: parseAIList(aiOutput.ingredients),
        instructions: parseAIList(aiOutput.instructions),
        image: aiOutput.image || undefined, 
        category: values.category,
        cuisine: values.cuisine,
        dietaryRestrictions: values.dietaryRestrictions,
      };

      setCurrentRecipe(newRecipe);
      setSessionRecipes(prev => [newRecipe, ...prev]); 
      toast({
        title: "Recipe Generated!",
        description: `Enjoy your new "${newRecipe.title}" recipe.`,
      });
    } catch (error) {
      console.error("Recipe generation error:", error);
      toast({
        title: "Error Generating Recipe",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdateForCurrentRecipe = (dataUrl: string | null) => {
    if (currentRecipe) {
      const updatedRecipe = { ...currentRecipe, image: dataUrl || undefined };
      setCurrentRecipe(updatedRecipe);
      setSessionRecipes(prev => prev.map(r => r.id === currentRecipe.id ? updatedRecipe : r));
    }
  };

  const handleImageUpdateForModalRecipe = (dataUrl: string | null) => {
    if (modalRecipe) {
      const updatedRecipe = { ...modalRecipe, image: dataUrl || undefined };
      setModalRecipe(updatedRecipe); 
      setSessionRecipes(prev => prev.map(r => r.id === modalRecipe.id ? updatedRecipe : r));
      if (currentRecipe && currentRecipe.id === modalRecipe.id) {
        setCurrentRecipe(updatedRecipe);
      }
    }
  };


  const filteredSessionRecipes = useMemo(() => {
    if (!selectedCategory) return sessionRecipes;
    return sessionRecipes.filter(recipe => recipe.category === selectedCategory);
  }, [sessionRecipes, selectedCategory]);

  const openRecipeModal = useCallback((recipe: Recipe) => {
    setModalRecipe(recipe);
    setIsRecipeModalOpen(true);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-12">
      <section id="recipe-generation" className="bg-card p-6 sm:p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
          Craft Your Culinary Masterpiece
        </h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Tell us what ingredients you have, your preferred cuisine, and any dietary needs. Our chef will whip up a unique recipe just for you!
        </p>
        <RecipeGenerationForm onSubmit={handleRecipeGeneration} isLoading={isLoading} />
      </section>

      {currentRecipe && (
        <section id="generated-recipe-display" className="scroll-mt-20">
           <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
            Fresh from the Kitchen!
          </h2>
          <GeneratedRecipeDisplay recipe={currentRecipe} onImageUpload={handleImageUpdateForCurrentRecipe} />
        </section>
      )}

      {sessionRecipes.length > 0 && (
        <section id="session-recipes">
          <Separator className="my-12" />
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Your Recent Creations
            </h2>
            <CategoryFilter
              categories={recipeCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryFilterChange}
              className="max-w-full sm:max-w-md"
            />
          </div>
          <RecipeList recipes={filteredSessionRecipes} onViewRecipe={openRecipeModal} />
        </section>
      )}

      {modalRecipe && (
        <Dialog open={isRecipeModalOpen} onOpenChange={setIsRecipeModalOpen}>
          <DialogContent className="max-w-3xl w-[95vw] h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl">{modalRecipe.title}</DialogTitle>
              <DialogDescription>Category: {modalRecipe.category}{modalRecipe.cuisine ? ` | Cuisine: ${modalRecipe.cuisine}` : ''}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-grow px-6 pb-6">
              <GeneratedRecipeDisplay recipe={modalRecipe} onImageUpload={handleImageUpdateForModalRecipe} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
