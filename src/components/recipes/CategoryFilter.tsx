"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { RecipeCategory } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: readonly RecipeCategory[];
  selectedCategory: RecipeCategory | null;
  onSelectCategory: (category: RecipeCategory | null) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  return (
    <ScrollArea className={cn("w-full whitespace-nowrap rounded-md", className)}>
      <div className="flex w-max space-x-2 p-1">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
          className="rounded-full px-4 py-1.5 text-sm shadow-sm"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => onSelectCategory(category)}
            className="rounded-full px-4 py-1.5 text-sm shadow-sm"
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
