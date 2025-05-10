"use client";

import { useFavorites } from '@/hooks/useFavorites';
import { RecipeList } from '@/components/recipes/RecipeList';
import { Heart } from 'lucide-react';
import type { Recipe } from '@/types';
import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GeneratedRecipeDisplay } from '@/components/recipes/GeneratedRecipeDisplay'; 


export default function FavoritesPage() {
  const { favorites, removeFavorite, addFavorite } = useFavorites(); 
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);

  const openRecipeModal = useCallback((recipe: Recipe) => {
    setModalRecipe(recipe);
    setIsRecipeModalOpen(true);
  }, []);

  const handleImageUpdateForFavoriteRecipe = (dataUrl: string | null) => {
    if (modalRecipe) {
      const updatedRecipe = { ...modalRecipe, image: dataUrl || undefined };
      removeFavorite(modalRecipe.id);
      addFavorite(updatedRecipe);
      setModalRecipe(updatedRecipe); 
    }
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-destructive" />
        <h1 className="text-3xl sm:text-4xl font-bold">My Favorite Recipes</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">You haven't favorited any recipes yet.</p>
          <p className="text-muted-foreground">Start exploring and save your culinary gems!</p>
        </div>
      ) : (
        <RecipeList recipes={favorites} onViewRecipe={openRecipeModal} />
      )}

      {modalRecipe && (
        <Dialog open={isRecipeModalOpen} onOpenChange={setIsRecipeModalOpen}>
          <DialogContent className="max-w-3xl w-[95vw] h-[90vh] flex flex-col p-0">
             <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl">{modalRecipe.title}</DialogTitle>
              <DialogDescription>Category: {modalRecipe.category}{modalRecipe.cuisine ? ` | Cuisine: ${modalRecipe.cuisine}` : ''}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-grow px-6 pb-6">
              <GeneratedRecipeDisplay recipe={modalRecipe} onImageUpload={handleImageUpdateForFavoriteRecipe} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
