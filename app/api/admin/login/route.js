import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
    }

    const body = await request.json();
    const submitted = String(body?.password || '').trim();

    if (submitted !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid admin password.' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('africsis_admin', 'authenticated', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login request failed.' }, { status: 500 });
  }
}
