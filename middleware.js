import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtectedPath = pathname === '/upload' || pathname.startsWith('/admin');
  const isAdminLoggedIn = request.cookies.get('africsis_admin')?.value === 'authenticated';

  if (isProtectedPath && pathname !== '/admin/login' && !isAdminLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/upload', '/admin/:path*'],
};
