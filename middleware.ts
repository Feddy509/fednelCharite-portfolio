/**
 * ==============================================================================
 * FR: Middleware de Limitation de Débit & Sécurité API (Edge Middleware)
 * EN: Rate Limiting & Edge Security Middleware (Edge Middleware)
 * ==============================================================================
 * 
 * FR: Protège les routes API sensibles (/api/chat, /api/contact) contre le spam
 *     et les attaques DDoS avec un mécanisme Fail-Open de secours.
 * EN: Protects sensitive API endpoints (/api/chat, /api/contact) against spam
 *     and DDoS attacks featuring a resilient Fail-Open fallback mechanism.
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
    // FR: Fallback immédiat si les identifiants Upstash Redis ne sont pas configurés
    // EN: Immediate graceful fallback if Upstash Redis credentials are missing
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.next();
    }

    try {
      // FR: Tentative d'évaluation de la limite de débit sur Redis
      // EN: Attempt rate limit check against Upstash Redis
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
    } catch (error) {
      // FR: STRATÉGIE FAIL-OPEN : En cas de panne Upstash Redis, on laisse passer la requête
      //     pour éviter d'interrompre l'expérience utilisateur avec une erreur 500.
      // EN: FAIL-OPEN STRATEGY: In case of Upstash Redis service outage, fail open
      //     to avoid breaking legitimate user traffic with 500 Server Errors.
      console.error('[RateLimit Error] Fallback Fail-Open executed:', error);
      return NextResponse.next();
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