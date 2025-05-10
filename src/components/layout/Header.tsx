
"use client";

import Link from 'next/link';
import { ChefHat, Heart, Home, ScanEye, Menu, Search, BookOpen, NotebookText, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/find-recipe', label: 'Find Recipe', icon: Search },
  { href: '/analyze-dish', label: 'Analyze Dish', icon: ScanEye },
  { href: '/menu-analyzer', label: 'Menu Analyzer', icon: UtensilsCrossed },
  { href: '/blog', label: 'Blog', icon: NotebookText },
  { href: '/favorites', label: 'Favorites', icon: Heart },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/90 transition-colors">
          <ChefHat className="h-7 w-7" />
          <span>RecipeSage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild size="sm" className="text-xs lg:text-sm px-2 lg:px-3">
              <Link href={item.href} className="flex items-center gap-1.5 lg:gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-4">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="justify-start text-lg"
                    asChild
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

