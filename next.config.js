/** @type {import('next').NextConfig} */

/**
 * ==============================================================================
 * FR: Configuration Principale Next.js & Hardening des En-têtes HTTP
 * EN: Next.js Main Configuration & HTTP Security Hardening
 * ==============================================================================
 * 
 * FR: Définit le mode de build standalone pour Docker et applique une politique
 *     de sécurité stricte (CSP, HSTS, Anti-Clickjacking).
 * EN: Sets standalone output mode for Docker containers and enforces strict
 *     security response headers (CSP, HSTS, Anti-Clickjacking).
 */
const nextConfig = {
  reactStrictMode: true,
  
  // FR: Génère un build autonome ultra-léger optimisé pour Docker
  // EN: Generates a lightweight standalone build optimized for Docker
  output: 'standalone',

  /**
   * FR: Configuration des en-têtes de sécurité HTTP globaux
   * EN: Global HTTP security headers configuration
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // ------------------------------------------------------------------
          // 1. CONTENT SECURITY POLICY (CSP)
          // ------------------------------------------------------------------
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com",
              "frame-src 'self' https://challenges.cloudflare.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          // ------------------------------------------------------------------
          // 2. PROTECTION ANTI-CLICKJACKING & MIME SNIFFING
          // ------------------------------------------------------------------
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // ------------------------------------------------------------------
          // 3. REFERRER POLICY & HSTS (HTTPS FORCÉ)
          // ------------------------------------------------------------------
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // ------------------------------------------------------------------
          // 4. RESTRICTIONS DES PERMISSIONS MATÉRIELLES
          // ------------------------------------------------------------------
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;