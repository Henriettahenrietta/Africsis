import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  response.cookies.set('africsis_admin', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
