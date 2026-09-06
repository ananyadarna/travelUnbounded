import { NextResponse } from 'next/server';

export async function GET(request) {
  const adminToken = request.cookies.get('admin_token')?.value;

  if (adminToken === 'authenticated') {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
