import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const validEmail = process.env.ADMIN_EMAIL || 'admin@travelunbounded.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'Password123!';

    if (email === validEmail && password === validPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });

      // Set secure HTTP-only session cookie
      response.cookies.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid admin credentials',
    }, { status: 401 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Login failed',
      error: error.message,
    }, { status: 500 });
  }
}
