import Link from 'next/link';
import { Metadata } from 'next';
import { HorizontalAdBanner } from '@/components/AdBanner';

export const metadata: Metadata = {
  title: 'Recipe Blog - Cooking Tips & Techniques | Recipe Generator',
  description: 'Explore our recipe blog for cooking tips, techniques, meal prep ideas, and food inspiration to take your home cooking to the next level.',
  keywords: 'recipe blog, cooking blog, food blog, cooking tips, culinary techniques, meal planning, recipe ideas',
  alternates: {
    canonical: 'https://recipe-ai.vercel.app/blog/index.html'
  },
};

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HorizontalAdBanner />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Recipe Blog</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover cooking tips, techniques, meal inspiration, and expert advice
          to help you become a more confident and creative home cook.
        </p>
      </div>
      
      {/* Featured Post */}
      <div className="relative rounded-xl overflow-hidden mb-16 bg-white shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Chef chopping vegetables" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <span className="text-red-500 text-sm font-medium uppercase tracking-wider mb-2">Featured Article</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              <Link href="/blog/cooking-tips/index.html" className="hover:text-red-500 transition">
                Essential Cooking Tips & Techniques
              </Link>
            </h2>
            <p className="text-gray-600 mb-6">
              Level up your culinary skills with these practical cooking tips, kitchen hacks, and essential techniques
              that will make you a more confident and efficient home cook.
            </p>
            <Link 
              href="/blog/cooking-tips/index.html" 
              className="inline-flex items-center text-red-500 hover:text-red-600 font-medium self-start"
            >
              Read Full Article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Blog Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Blog Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogCategories.map((category) => (
            <div 
              key={category.title} 
              className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{category.description}</p>
                <Link 
                  href={category.url} 
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Explore {category.title} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <HorizontalAdBanner />
      
      {/* Latest Articles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <article key={article.title} className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-medium text-red-500 uppercase tracking-wider mb-2">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  <Link href={article.url} className="hover:text-red-500 transition">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{article.date}</span>
                  <Link 
                    href={article.url} 
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium transition">
            Load More Articles
          </button>
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-gray-600 mb-6">
            Get our latest recipes, cooking tips, and exclusive content delivered straight to your inbox.
            We promise not to spam you and you can unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent flex-grow max-w-md"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      <HorizontalAdBanner />
      
      {/* Back to Home */}
      <div className="text-center mt-10">
        <Link 
          href="/index.html"
          className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// Data for the page
const blogCategories = [
  {
    title: "Cooking Tips",
    description: "Essential techniques and helpful advice to improve your cooking skills and efficiency in the kitchen.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/blog/cooking-tips/index.html"
  },
  {
    title: "Meal Planning",
    description: "Strategies for efficient meal preparation, batch cooking, and organizing your weekly food calendar.",
    image: "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/blog/meal-planning/index.html"
  },
  {
    title: "Ingredient Guides",
    description: "Deep dives into specific ingredients, how to select them, store them, and use them to their fullest potential.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/blog/ingredient-guides/index.html"
  },
  {
    title: "Kitchen Science",
    description: "Understanding the chemistry and physics behind cooking for better results and more creative approaches.",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    url: "/blog/kitchen-science/index.html"
  }
];

const latestArticles = [
  {
    title: "Essential Cooking Tips & Techniques",
    excerpt: "Level up your culinary skills with these practical cooking tips, kitchen hacks, and essential techniques that will make you a more confident and efficient home cook.",
    image: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Cooking Tips",
    date: "March 28, 2024",
    url: "/blog/cooking-tips/index.html"
  },
  {
    title: "The Ultimate Guide to Knife Skills",
    excerpt: "Learn proper knife techniques that will speed up your prep work, improve your precision, and keep your fingers safe in the kitchen.",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Cooking Tips",
    date: "March 25, 2024",
    url: "/blog/knife-skills/index.html"
  },
  {
    title: "Meal Prep Fundamentals for Busy Weeks",
    excerpt: "Transform your Sunday into a strategic cooking session that will set you up for healthy, stress-free meals all week long.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Meal Planning",
    date: "March 22, 2024",
    url: "/blog/meal-prep-fundamentals/index.html"
  },
  {
    title: "Understanding Salt: The Essential Guide",
    excerpt: "Dive deep into the world of salt varieties, learn when to use each type, and discover the science of proper seasoning.",
    image: "https://images.unsplash.com/photo-1513037582405-5956f8995e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Ingredient Guides",
    date: "March 18, 2024",
    url: "/blog/understanding-salt/index.html"
  },
  {
    title: "The Science of Perfect Caramelization",
    excerpt: "Uncover the chemistry behind browning foods, from maillard reactions to caramelization, and how to master these processes for maximum flavor.",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen Science",
    date: "March 15, 2024",
    url: "/blog/science-of-caramelization/index.html"
  },
  {
    title: "Seasonal Eating: Why and How to Embrace It",
    excerpt: "Discover the environmental, nutritional, and flavor benefits of cooking with seasonal ingredients, plus guides for each season.",
    image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Ingredient Guides",
    date: "March 10, 2024",
    url: "/blog/seasonal-eating/index.html"
  }
]; 