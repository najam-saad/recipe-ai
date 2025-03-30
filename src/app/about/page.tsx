import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 py-8 md:py-12 mb-8 md:mb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-0">
            <span className="text-4xl mr-3">🍳</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">About Recipe Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Recipe Generator was created to solve a common cooking dilemma: what to make with the ingredients you already have. Our mission is to reduce food waste, inspire creativity in the kitchen, and make cooking more accessible to everyone, regardless of their culinary expertise.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-red-500 text-3xl mb-4">1</div>
                  <h3 className="font-semibold text-lg mb-2">Enter Ingredients or Recipe Name</h3>
                  <p className="text-gray-600">Tell us what ingredients you have on hand or what type of recipe you're looking for.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-red-500 text-3xl mb-4">2</div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Recipe Creation</h3>
                  <p className="text-gray-600">Our advanced AI analyzes your input and generates a customized recipe just for you.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-red-500 text-3xl mb-4">3</div>
                  <h3 className="font-semibold text-lg mb-2">Cook and Enjoy</h3>
                  <p className="text-gray-600">Follow the detailed instructions, adjust as needed, and enjoy your delicious meal!</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Technology</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Recipe Generator uses state-of-the-art artificial intelligence to create unique recipes tailored to your specifications. Our technology combines knowledge from thousands of recipes to suggest ingredient combinations, cooking techniques, and flavor profiles that work well together.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                <strong>Important Note:</strong> All recipes are AI-generated and should be used as creative inspiration. Always use your judgment regarding food safety, allergies, and dietary restrictions. Cooking times and temperatures should be adjusted based on your specific equipment and preferences.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Recipe Generator was founded by a team of food enthusiasts and technology experts who wanted to make cooking more accessible and reduce food waste. We believe that with the right guidance, anyone can create delicious meals from simple ingredients.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                We'd love to hear your feedback or answer any questions you might have. Reach out to us at <a href="mailto:info@recipegenerator.com" className="text-red-500 hover:underline">info@recipegenerator.com</a>.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/privacy/index.html" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition">
                  Privacy Policy
                </Link>
                <Link href="/terms/index.html" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition">
                  Terms of Service
                </Link>
                <Link href="/index.html" className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition">
                  Try Recipe Generator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 