import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Recipe Generator | Create Custom Recipes from Ingredients",
  description: "Generate delicious recipes based on ingredients you have at home. Get personalized cooking instructions, preparation times, and more.",
  keywords: "recipe generator, recipes, cooking, ingredient recipes, meal ideas, food, recipe creation, cooking assistant",
  authors: [{ name: "Recipe Generator" }],
  alternates: {
    canonical: "https://recipe-ai.vercel.app"
  },
  openGraph: {
    title: "Recipe Generator | Transform Ingredients Into Meals",
    description: "Turn your available ingredients into delicious recipes. Get instant cooking ideas and instructions.",
    url: "https://recipe-ai.vercel.app",
    siteName: "Recipe Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Generator | Cook With What You Have",
    description: "Get personalized recipes based on ingredients you already have in your kitchen. Your cooking assistant.",
  },
  icons: {
    icon: [
      { url: '/icons/food-icon.svg' },
    ],
    shortcut: '/icons/food-icon.svg',
    apple: '/icons/food-icon.svg',
  }
};

const Footer = () => (
  <footer className="footer">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recipe Generator</h2>
          <p className="max-w-sm text-gray-600 text-sm">
            Create delicious meals with ingredients you already have. Our recipe generator helps you cook amazing dishes without the need for extra shopping.
          </p>
          <p className="mt-4 text-gray-600 text-sm">
            Perfect for meal planning, reducing food waste, and discovering new recipes tailored to your preferences and available ingredients.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Popular Searches</h3>
          <ul className="text-gray-600 space-y-2">
            <li className="hover:text-red-500 transition-colors">Chicken recipes</li>
            <li className="hover:text-red-500 transition-colors">Vegetarian meals</li>
            <li className="hover:text-red-500 transition-colors">Quick dinner ideas</li>
            <li className="hover:text-red-500 transition-colors">Pasta dishes</li>
            <li className="hover:text-red-500 transition-colors">Healthy breakfast options</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
        © 2025 Recipe Generator. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Add meta viewport for proper mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Add theme color for browser UI */}
        <meta name="theme-color" content="#e53e3e" />
        
        {/* Favicon and Apple Touch Icons */}
        <link rel="icon" href="/icons/food-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/food-icon.svg" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "Recipe Generator",
              "url": "https://recipe-ai.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://recipe-ai.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        
        {/* Google AdSense Code */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9262259592522097"
          crossOrigin="anonymous"
        ></script>
        {/* ☝️ Replace XXXXXXXXXXXXXXXX with your actual publisher ID from AdSense dashboard */}
        
        {/* Google Auto Ads Configuration - Uncomment when ready */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-9262259592522097", // Replace with your actual publisher ID
                enable_page_level_ads: true
              });
            `
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
