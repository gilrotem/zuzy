import { NextRequest, NextResponse } from 'next/server'
import { BLOCKED_PATHS } from './lib/seo-config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block indexing for admin/api paths
  if (BLOCKED_PATHS.some((blocked) => pathname.startsWith(blocked))) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // Add Content-Language header for SEO
  const response = NextResponse.next()
  response.headers.set('Content-Language', 'he')

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
