
"use client";

import type { Recipe } from '@/types';
import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect, useCallback } from 'react';

interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'recipeSageFavorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  // Effect to load favorites from localStorage on initial client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
        // Initialize with empty array if parsing fails or localStorage is inaccessible
        setFavorites([]);
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount (client-side)

  // Effect to save favorites to localStorage whenever the favorites state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites]); // Runs whenever 'favorites' state changes

  const addFavorite = useCallback((recipe: Recipe) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find(fav => fav.id === recipe.id)) {
        return prevFavorites; // Already a favorite, no change
      }
      return [...prevFavorites, recipe];
    });
  }, []);

  const removeFavorite = useCallback((recipeId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== recipeId));
  }, []);

  const isFavorite = useCallback((recipeId: string) => {
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

