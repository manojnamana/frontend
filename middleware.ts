import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('auth-token');
  const { pathname } = req.nextUrl;

  // Protect only specific routes
  if (pathname.startsWith('/home') 
    ||pathname.startsWith('/jobs') 
    ||pathname.startsWith('/jobs/matchprofile/[id]')
    ||pathname.startsWith('/jobs/create/') 
    || pathname.startsWith('/profiles')
    || pathname.startsWith('/profiles/[id]')
    || pathname.startsWith('/profiles/upload')
    || pathname.startsWith('/takeinterview/')
    || pathname.startsWith('/takeinterview/[id]')
    || pathname.startsWith('/takeinterview/upload')
    || pathname.startsWith('/viewassementreport')
    || pathname.startsWith('/viewassementreport/[id]')
    ) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}
