import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Premium Plan - Recipe Generator',
  description: 'Upgrade to Premium for unlimited recipe generations, exclusive features, and more',
};

export default function PremiumPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Elevate Your Cooking Experience
              </h1>
              <p className="text-xl mb-8">
                Upgrade to Premium and unlock unlimited recipe generations, exclusive features, and more.
              </p>
              <Link href="/#recipe-generator" className="inline-block px-8 py-4 bg-white text-red-600 rounded-lg font-medium text-lg hover:bg-gray-100 transition shadow-lg">
                Upgrade Now
              </Link>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="text-red-600 text-center">
                  <h2 className="text-3xl font-bold mb-2">Premium Plan</h2>
                  <p className="text-4xl font-bold mb-2">$4.99<span className="text-xl">/month</span></p>
                  <p className="text-gray-600 mb-6">Billed monthly, cancel anytime</p>
                  <ul className="text-gray-700 text-left space-y-4 mb-8">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited AI recipe generations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Higher quality recipe outputs</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save favorite recipes to your collection</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Export recipes to PDF</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Ad-free experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Premium Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Unlimited Recipes</h3>
            <p className="text-gray-600">
              Generate as many recipes as you want without any daily limits. Perfect for meal planning and exploring new dishes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Premium Quality</h3>
            <p className="text-gray-600">
              Access our advanced AI models for more detailed, creative, and refined recipe suggestions with chef's tips and nutritional info.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Meal Planning</h3>
            <p className="text-gray-600">
              Create weekly meal plans with one click. Automatically generate shopping lists and organize your cooking schedule.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Premium Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Sarah L.</h3>
                  <p className="text-gray-500">Premium user for 3 months</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The premium recipe generator has completely changed my cooking routine. I used to waste so much food, but now I can input whatever ingredients I have left and get amazing recipe ideas!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Michael T.</h3>
                  <p className="text-gray-500">Premium user for 6 months</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As someone who loves to experiment in the kitchen, the unlimited recipe generation has been a game-changer. The quality of recipes is exceptional, with detailed instructions that are easy to follow."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Upgrade Your Cooking Experience?</h2>
        <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
          Join thousands of home chefs who have transformed their cooking with our premium recipe generator.
        </p>
        <Link href="/#recipe-generator" className="inline-block px-8 py-4 bg-red-500 text-white rounded-lg font-medium text-lg hover:bg-red-600 transition shadow-lg">
          Upgrade to Premium Now
        </Link>
        <p className="mt-4 text-gray-500">Satisfaction guaranteed. Cancel anytime.</p>
      </div>
    </div>
  );
} 