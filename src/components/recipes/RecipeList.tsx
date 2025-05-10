"use client";

import type { Recipe } from '@/types';
import { RecipeCard } from './RecipeCard';
import { AnimatePresence, motion } from 'framer-motion';

interface RecipeListProps {
  recipes: Recipe[];
  onViewRecipe?: (recipe: Recipe) => void;
}

export function RecipeList({ recipes, onViewRecipe }: RecipeListProps) {
  if (recipes.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No recipes found. Try generating some or adjusting your filters!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <RecipeCard recipe={recipe} onViewRecipe={onViewRecipe} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
