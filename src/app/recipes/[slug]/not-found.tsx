import Link from 'next/link';

export default function RecipeNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="flex items-center justify-center bg-red-50 w-full h-full rounded-full">
              <span className="text-5xl">🍳</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            We couldn&apos;t find the recipe you&apos;re looking for. It might have been removed or the link could be incorrect.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/"
              className="btn btn-primary inline-block"
            >
              Return to Home
            </Link>
            
            <div>
              <p className="text-gray-500 mt-8">
                Try searching for another recipe or browse our popular categories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 