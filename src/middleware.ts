import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get hostname (e.g. vercel.app, example.com) of request
  const hostname = request.headers.get('host') || '';

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = request.nextUrl.pathname;

  // If it's a preview deployment or production, allow the request
  if (hostname.includes('.pages.dev')) {
    return NextResponse.next();
  }

  // Otherwise, redirect to the production domain
  const url = new URL(path, 'https://recipe-ai4.pages.dev');
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 