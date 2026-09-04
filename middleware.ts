/**
 * ==============================================================================
 * FR: Middleware de Limitation de Débit & Sécurité API (Edge Middleware)
 * EN: Rate Limiting & Edge Security Middleware (Edge Middleware)
 * ==============================================================================
 * 
 * FR: Protège les routes API sensibles (/api/chat, /api/contact) contre le spam,
 *     les attaques par déni de service (DDoS) et l'usurpation d'identités.
 * EN: Protects sensitive API endpoints (/api/chat, /api/contact) against spam,
 *     denial of service (DDoS) attacks, and brute-force abuse.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// FR: Configuration du client Upstash Redis via variables d'environnement
// EN: Upstash Redis client setup using environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// FR: Configuration du Rate Limiter (Fenêtre glissante: 5 requêtes / 1 min par IP)
// EN: Rate Limiter configuration (Sliding window: 5 requests / 1 min per IP)
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  // FR: Extraction de l'adresse IP du client / EN: Extract client IP address
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  // FR: Application du Rate Limiting exclusivement sur les endpoints API sensibles
  // EN: Apply rate limiting strictly on sensitive API endpoints
  if (
    request.nextUrl.pathname.startsWith('/api/chat') ||
    request.nextUrl.pathname.startsWith('/api/contact')
  ) {
    // FR: Fallback de sécurité si Upstash Redis n'est pas configuré en dev
    // EN: Graceful fallback if Upstash Redis credentials are omitted in dev
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.next();
    }

    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    // FR: Bloque la requête avec le code HTTP 429 si la limite est atteinte
    // EN: Reject request with HTTP 429 Too Many Requests if threshold is exceeded
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

/**
 * FR: Ciblage des routes soumises au middleware
 * EN: Route matcher configuration for middleware execution
 */
export const config = {
  matcher: '/api/:path*',
};