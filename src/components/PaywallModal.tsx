'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Import this type definition so it matches RecipeGenerator
type PaymentData = {
  paid: boolean;
  timestamp: string;
};

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  price?: string;
}

const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  price = '$1.00'
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  if (!isOpen) return null;
  
  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError('');
      
      // This would be replaced with a real payment integration
      // For demonstration, we're simulating a successful payment
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // $1.00 in cents
          currency: 'usd'
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }
      
      // Store payment status in localStorage with proper typing
      const paymentData: PaymentData = {
        paid: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('recipeGeneratorPayment', JSON.stringify(paymentData));
      
      onPaymentSuccess();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-xl font-bold">Continue with Recipe Generation</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="text-5xl mb-2">🍳</div>
          </div>
          
          <p className="text-gray-700 mb-4">
            To generate a recipe based on your input, a one-time payment of {price} is required.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <p className="font-medium text-gray-900 mb-2">What you'll get:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Personalized recipe generated from your input</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Complete ingredients list and step-by-step instructions</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Option to save and share your recipes</span>
              </li>
            </ul>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-md font-medium hover:bg-red-600 transition disabled:opacity-70"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                `Pay ${price} & Generate Recipe`
              )}
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Secure payment processing. By continuing, you agree to our <Link href="/terms" className="text-red-500 hover:underline">Terms</Link> and <Link href="/privacy" className="text-red-500 hover:underline">Privacy Policy</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal; 