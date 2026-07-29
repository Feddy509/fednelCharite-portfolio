# 1. Étape de base : Image Node.js 20
FROM node:20-alpine AS base

# Activation de pnpm v9 via corepack / Activer pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# 2. Étape des dépendances : Installation des paquets avec pnpm
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# 3. Étape de construction : Build de l'application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Désactivation de la télémétrie Next.js
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# 4. Étape d'exécution : Environnement final léger pour lancer le site
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copie des fichiers d'exécution autonome (standalone)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]