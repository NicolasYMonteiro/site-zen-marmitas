import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Permitir requisições para o admin do Decap CMS
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Permitir requisições para a API de autenticação
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/:path*',
  ],
};
