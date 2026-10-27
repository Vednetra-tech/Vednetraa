import { NextResponse } from 'next/server';

/**
 * Request logger for all routes and CORS preflight handling for the API.
 * (Next.js 16 uses proxy.js in place of middleware.js.)
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
    return new NextResponse(null, { status: 204 });
  }

  console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}${request.nextUrl.search}`);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
