import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Clear session cookie
  const cookie = serialize('session', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 0,
  });
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  });
} 