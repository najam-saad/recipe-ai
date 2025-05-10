"use client";

import { FavoritesContext } from '@/contexts/FavoritesContext';
import { useContext } from 'react';

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
