export const recipeCategories = ["Appetizer", "Main Course", "Dessert", "Beverage", "Salad", "Soup", "Breakfast", "Side Dish", "Snack", "Other"] as const;
export type RecipeCategory = typeof recipeCategories[number];

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  image?: string; // data URI for generated or user uploaded image
  category: RecipeCategory;
  cuisine?: string;
  dietaryRestrictions?: string;
}

// For existing analyze-dish feature
export interface AnalyzedDishResult {
  suggestedRecipes: string[];
  suggestedIngredients: string[];
  // These will be populated by the enhanced flow
  dishName?: string;
  calories?: string;
  protein?: string;
  vitamins?: string[];
  servingSize?: string;
}

// More specific type for the page, ensuring all fields from enhanced flow are present
export interface FullAnalyzedDishResult {
  dishName: string;
  suggestedRecipes: string[];
  suggestedIngredients: string[];
  calories: string;
  protein: string;
  vitamins: string[];
  servingSize: string;
}


// For Blog
export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
  image?: string; // URL or path to blog post image
  content: string; // Markdown or HTML content
  author?: string;
  tags?: string[];
}

// For Menu Analyzer Feature
export interface MenuAnalysisInput {
  photoDataUri: string; // Data URI of the menu image
  userQuery: string;   // User's preferences or specific question
}

export interface NutritionalInfo {
  calories?: string; // e.g., "300-400 kcal"
  protein?: string; // e.g., "15g"
  carbohydrates?: string; // e.g., "40g"
  fats?: string; // e.g., "20g"
  isVegan?: 'Yes' | 'No' | 'Likely Yes' | 'Likely No' | 'Unknown';
  isGlutenFree?: 'Yes' | 'No' | 'Likely Yes' | 'Likely No' | 'Unknown';
  isLactoseFree?: 'Yes' | 'No' | 'Likely Yes' | 'Likely No' | 'Unknown';
  commonAllergens?: string[]; // e.g., ["nuts", "soy", "dairy"]
}

export interface AnalyzedMenuItem {
  dishName: string;
  description?: string; // Description from menu if available
  isMatch?: boolean; // If it matches user's filter query
  details?: string; // Other details like ingredients, summary of nutritional estimates if not on menu.
  price?: string; // Price if OCR can extract it
  nutritionalInfo?: NutritionalInfo; // Structured nutritional data, potentially estimated.
}

export interface MenuAnalysisOutput {
  extractedText?: string; // Raw text extracted from menu (optional, for debugging)
  analyzedItems: AnalyzedMenuItem[];
  summary?: string; // A summary if the user asked a general question
}
