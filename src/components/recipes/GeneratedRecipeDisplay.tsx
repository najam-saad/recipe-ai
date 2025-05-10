"use client";

import Image from 'next/image';
import type { Recipe } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './FavoriteButton';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { Utensils, Leaf, WheatOff } from 'lucide-react';

interface GeneratedRecipeDisplayProps {
  recipe: Recipe;
  onImageUpload: (dataUrl: string | null) => void;
}

const parseListFromString = (text: string | string[]): string[] => {
  if (Array.isArray(text)) return text;
  if (typeof text !== 'string') return [];
  return text.split('\n').map(s => s.trim()).filter(Boolean);
};

export function GeneratedRecipeDisplay({ recipe, onImageUpload }: GeneratedRecipeDisplayProps) {
  const ingredientsList = parseListFromString(recipe.ingredients as unknown as string);
  const instructionsList = parseListFromString(recipe.instructions as unknown as string);

  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] w-full">
           {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              data-ai-hint="delicious food"
              priority // Prioritize loading the main recipe image
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <Utensils className="w-24 h-24 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
          <div>
            <CardTitle className="text-3xl font-bold mb-1">{recipe.title}</CardTitle>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge variant="secondary" className="text-base px-3 py-1">
                <Utensils className="w-4 h-4 mr-1.5" />
                {recipe.category}
              </Badge>
              {recipe.cuisine && (
                <Badge variant="outline" className="text-base px-3 py-1">
                  <Leaf className="w-4 h-4 mr-1.5" />
                  {recipe.cuisine}
                </Badge>
              )}
              {recipe.dietaryRestrictions && (
                 <Badge variant="outline" className="text-base px-3 py-1">
                  <WheatOff className="w-4 h-4 mr-1.5" />
                  {recipe.dietaryRestrictions}
                </Badge>
              )}
            </div>
          </div>
          <FavoriteButton recipe={recipe} size="lg" className="mt-2 md:mt-0 p-2 rounded-lg bg-secondary hover:bg-secondary/80"/>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-primary">Upload Your Dish Photo</h3>
          <ImageUploader onImageUpload={onImageUpload} initialImage={recipe.image} aspectRatio="16/9" />
          <p className="text-xs text-muted-foreground mt-1">Replace the generated image with your own masterpiece!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary border-b pb-1">Ingredients</h3>
            {ingredientsList.length > 0 ? (
              <ul className="list-disc list-inside space-y-1.5 text-foreground/90">
                {ingredientsList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No ingredients listed.</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary border-b pb-1">Instructions</h3>
            {instructionsList.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-foreground/90">
                {instructionsList.map((item, index) => (
                  <li key={index} className="leading-relaxed">{item}</li>
                ))}
              </ol>
            ) : (
              <p className="text-muted-foreground">No instructions provided.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
