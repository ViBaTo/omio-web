import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Behind Railway's reverse proxy, the container receives the Host header
  // with the internal listening port appended (e.g. "host:8080"), so any
  // absolute redirect built by next-intl from request.nextUrl ends up pointing
  // to that internal port and the browser cannot reach it (timeout). Rewrite
  // the Location header to use the public host/proto from X-Forwarded-* and
  // strip any port.
  const location = response.headers.get('location');
  if (location) {
    const forwardedHost = request.headers.get('x-forwarded-host');
    const forwardedProto = request.headers.get('x-forwarded-proto');
    try {
      const target = new URL(location, request.nextUrl);
      let mutated = false;
      if (forwardedHost && target.host !== forwardedHost) {
        target.host = forwardedHost;
        mutated = true;
      }
      if (forwardedProto && target.protocol !== `${forwardedProto}:`) {
        target.protocol = `${forwardedProto}:`;
        mutated = true;
      }
      if (target.port) {
        target.port = '';
        mutated = true;
      }
      if (mutated) {
        const next = NextResponse.redirect(target, response.status);
        response.headers.forEach((value, key) => {
          if (key.toLowerCase() === 'location') return;
          next.headers.set(key, value);
        });
        return next;
      }
    } catch {
      // Ignore malformed Location headers and fall through.
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
