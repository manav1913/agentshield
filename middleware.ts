import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/docs(.*)',
  '/privacy',
  '/terms',
  '/contact',
  '/login(.*)',
  '/signup(.*)',
  '/api/health',
  '/api/agent',
  '/api/intercept',
]);

const isAuthRoute = createRouteMatcher([
  '/login(.*)',
  '/signup(.*)',
]);

const isApiKeyRoute = createRouteMatcher([
  '/api/agent',
  '/api/intercept',
]);

const hasApiKey = (request: Request) => Boolean(request.headers.get('x-api-key'));

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (userId && isAuthRoute(request)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow OPTIONS requests for API routes (CORS preflight doesn't include custom headers)
  if (request.method === 'OPTIONS' && isApiKeyRoute(request)) {
    return NextResponse.next();
  }

  // Allow API routes with API key without auth
  if (isApiKeyRoute(request) && hasApiKey(request)) {
    return NextResponse.next();
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
