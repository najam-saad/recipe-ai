import Link from 'next/link';
import { Recipe } from '@/lib/recipes';

interface RecipeCardProps {
  recipe: Recipe | Partial<Recipe>;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {recipe.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.name || 'Recipe'} 
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          {recipe.category && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {recipe.category}
            </span>
          )}
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-red-500 transition">
          {recipe.slug ? (
            <Link href={`/recipes/${recipe.slug}/index.html`}>
              {recipe.name}
            </Link>
          ) : (
            recipe.name
          )}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {recipe.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          {recipe.preparationTime && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prep: {recipe.preparationTime}
            </span>
          )}
          
          {recipe.cookingTime && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 15l-5 5m0 0l-5-5m5 5V7" />
              </svg>
              Cook: {recipe.cookingTime}
            </span>
          )}
          
          {recipe.difficulty && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {recipe.difficulty}
            </span>
          )}
        </div>
        
        {recipe.slug && (
          <Link 
            href={`/recipes/${recipe.slug}/index.html`}
            className="inline-block w-full text-center py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            View Recipe
          </Link>
        )}
      </div>
    </div>
  );
} 