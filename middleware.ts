import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('access_token');
  const { pathname } = req.nextUrl;

  const protectedPaths = [
    '/home',
    '/jobs',
    '/profiles',
    '/takeinterview/',
    '/viewassessmentreport',
    '/404'
  ]

// Check if the pathname starts with any of the protected paths
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

    if (isProtected && !isAuthenticated) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  

  return NextResponse.next();
}
