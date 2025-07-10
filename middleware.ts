import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = req.headers.get('cookie');
  let session: { id: string; role: string } | null = null;
  if (cookie) {
    const cookies = parse(cookie);
    if (cookies.session) {
      try {
        session = JSON.parse(cookies.session);
      } catch {}
    }
  }

  // Protect /seller/dashboard
  if (pathname.startsWith('/seller/dashboard')) {
    if (!session || session.role !== 'seller') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Protect /admin/cms
  if (pathname.startsWith('/admin/cms')) {
    if (!session || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seller/dashboard/:path*', '/admin/cms/:path*'],
}; 