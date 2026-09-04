# ==============================================================================
# FR: Dockerfile Multi-Stage de Production pour Next.js (DevSecOps Hardened)
# EN: Production Multi-Stage Dockerfile for Next.js (DevSecOps Hardened)
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. ÉTAPE DE BASE / BASE STAGE: Node.js 20 Alpine + pnpm v9
# ------------------------------------------------------------------------------
FROM node:20-alpine AS base

# FR: Activation de pnpm via Corepack
# EN: Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# ------------------------------------------------------------------------------
# 2. ÉTAPE DES DÉPENDANCES / DEPENDENCIES STAGE
# ------------------------------------------------------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# FR: Copie des manifestes de dépendances
# EN: Copy dependency manifests
COPY package.json pnpm-lock.yaml* ./

# FR: Installation des dépendances du projet
# EN: Install project dependencies
RUN pnpm install --no-frozen-lockfile --ignore-workspace

# ------------------------------------------------------------------------------
# 3. ÉTAPE DE CONSTRUCTION / BUILD STAGE
# ------------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# FR: Désactivation des télémétries et définition de l'environnement de build
# EN: Disable telemetry and set production environment
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm run build

# ------------------------------------------------------------------------------
# 4. ÉTAPE D'EXÉCUTION FINALE / RUNNER STAGE (Ultra-lightweight & Non-Root)
# ------------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# FR: Création d'un utilisateur système non-root pour des raisons de sécurité
# EN: Create a non-root system user for security hardening
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# FR: Copie des ressources publiques
# EN: Copy public assets
COPY --from=builder /app/public ./public

# FR: Copie du build autonome (standalone) avec attribution des permissions
# EN: Copy standalone build with proper user ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# FR: Bascule vers l'utilisateur sécurisé non-root
# EN: Switch to unprivileged non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# FR: Démarrage du serveur Node.js autonome
# EN: Launch standalone Node.js server
CMD ["node", "server.js"]