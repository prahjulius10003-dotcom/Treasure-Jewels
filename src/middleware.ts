import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  let payload = null;
  
  if (session) {
    payload = await decrypt(session);
  }

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (payload.role !== 'admin') {
      // Forbidden or redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect /staff routes
  if (request.nextUrl.pathname.startsWith('/staff')) {
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (payload.role !== 'admin' && payload.role !== 'staff') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow access to other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/staff/:path*'],
};
