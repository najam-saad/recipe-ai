import { NextRequest, NextResponse } from 'next/server';

// This is a simple mock payment API
// In a real production app, you would integrate with Stripe, PayPal, etc.

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.text();
    let parsedBody;
    
    try {
      parsedBody = JSON.parse(body);
    } catch (jsonError) {
      console.error('[Payment API] JSON parsing error:', jsonError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' }, 
        { status: 400 }
      );
    }
    
    const { amount, currency } = parsedBody;
    
    // Validate request parameters
    if (!amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: amount or currency' }, 
        { status: 400 }
      );
    }
    
    // In a real implementation, this would call a payment processor API
    // For demonstration, we'll simulate a successful payment
    
    // Add some artificial delay to simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the payment attempt for demonstration
    console.log(`[Payment API] Processing payment: ${amount / 100} ${currency.toUpperCase()}`);
    
    // Generate a fake transaction ID
    const transactionId = `tr_${Math.random().toString(36).substring(2, 15)}`;
    
    // Return a successful payment response
    return new NextResponse(
      JSON.stringify({
        success: true,
        amount: amount,
        currency: currency,
        transactionId: transactionId,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
  } catch (error) {
    console.error('[Payment API] Error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Payment processing failed. Please try again.' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 