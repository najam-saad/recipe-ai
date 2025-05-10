"use client";

import { FavoritesProvider } from '@/contexts/FavoritesContext';
import type { ReactNode } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";


export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </TooltipProvider>
  );
}
