import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Konfigirasyon Upstash Redis (sèvi ak env variables pou pa kache sekrè)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Limit: 5 rekèt pa minit pou chak IP sou API yo
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  // Aplike Rate Limiting sèlman sou API Routes yo
  if (request.nextUrl.pathname.startsWith('/api/chat') || request.nextUrl.pathname.startsWith('/api/contact')) {
    // Si pa gen env vars Upstash nan dev, kite rekèt la pase san l pa kase
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.next();
    }

    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};