"use client";

import Image from 'next/image';
import type { Recipe } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './FavoriteButton';
import { cn } from '@/lib/utils';
import { Utensils } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe?: (recipe: Recipe) => void; // Optional: if cards can be clicked to view details
  className?: string;
}

export function RecipeCard({ recipe, onViewRecipe, className }: RecipeCardProps) {
  const handleCardClick = () => {
    if (onViewRecipe) {
      onViewRecipe(recipe);
    }
  };

  return (
    <Card 
      className={cn("overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group", className)}
      onClick={handleCardClick}
      role={onViewRecipe ? "button" : "article"}
      tabIndex={onViewRecipe ? 0 : undefined}
      onKeyDown={onViewRecipe ? (e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick() : undefined}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] w-full relative">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="food photography"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <Utensils className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2 z-10">
             <FavoriteButton recipe={recipe} className="bg-card/80 hover:bg-card" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-2 leading-tight hover:text-primary transition-colors">
          {recipe.title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{recipe.category}</Badge>
          {recipe.cuisine && <Badge variant="outline">{recipe.cuisine}</Badge>}
        </div>
        {/* Could add a short description or first few ingredients here */}
        {/* <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {recipe.ingredients.slice(0,2).join(', ')}...
        </p> */}
      </CardContent>
      {onViewRecipe && (
        <CardFooter className="p-4 pt-0">
           <button 
             onClick={handleCardClick} 
             className="w-full text-sm text-primary hover:underline"
           >
             View Recipe
           </button>
        </CardFooter>
      )}
    </Card>
  );
}
