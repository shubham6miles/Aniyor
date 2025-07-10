import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth-service';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }
  try {
    const user = await AuthService.registerWithPassword({ email, password, role: 'seller' });
    // Set session cookie
    const cookie = serialize('session', JSON.stringify({ id: user.id, role: user.role }), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return new NextResponse(JSON.stringify({ success: true, user: { id: user.id, email: user.email, role: user.role } }), {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
} 