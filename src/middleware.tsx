import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const url = new URL(request.url);

  // Allow static assets to load (CSS, JS, etc.)
  if (
    url.pathname.startsWith('/_next/') || // Next.js internal assets
    url.pathname.startsWith('/static/') || // Static folder (if used)
    url.pathname.startsWith('/favicon.ico') || // Favicon
    url.pathname.endsWith('.css')  // Allow Tailwind CSS and other CSS files
  ) {
    return NextResponse.next(); // Allow static assets to pass through
  }

  // If the access token exists, proceed with the request
  if (accessToken) {
    return NextResponse.next();
  }

  // If access token is missing, redirect to the login page
  if (url.pathname !== '/Login') {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/','/users','/employee','/employee/:path'], // Match only the necessary routes
};
