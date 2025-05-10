"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import type { Recipe } from '@/types';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  recipe: Recipe;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function FavoriteButton({ recipe, className, size = "icon" }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(recipe.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking button
    if (isFav) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleToggleFavorite}
      className={cn("p-1.5 rounded-full hover:bg-destructive/10 group", className)}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-200 ease-in-out group-hover:scale-110",
          isFav ? "fill-destructive text-destructive" : "text-muted-foreground"
        )}
      />
    </Button>
  );
}
