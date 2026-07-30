# Fednel Charité - Portfolio

A modern, high-performance personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

[![CI/CD Pipeline](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Feddy509/fednelCharite-portfolio/actions/workflows/ci.yml)

---

## 🛠️ Stack Technique

- **Framework :** Next.js 14 (App Router)
- **Langage :** TypeScript
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **Icônes :** Lucide React
- **DevOps & Infrastructure :** Docker, Docker Compose & GitHub Actions (CI/CD)

---

## 🚀 Démarrage Rapide (En local)

Suivez ces instructions pour installer et lancer le projet dans votre environnement de développement local :

```bash
# 1. Installation des dépendances avec pnpm
pnpm install

# 2. Lancement du serveur de développement
pnpm run dev

# Générer le build de production
pnpm run build

# Démarrer le serveur de production
pnpm run start


## 🐳 Conteneurisation avec Docker

Le projet dispose d'une configuration Docker multi-stage hautement optimisée (basée sur Node.js 20 & pnpm v9) afin d'assurer un environnement de déploiement léger et isolé.

docker compose up -d

## Builder l'image Docker manuellement

# Construction de l'image Docker
docker build -t fednel-portfolio .

# Exécution du conteneur
docker run -p 3000:3000 fednel-portfolio

# Construction de l'image Docker
docker build -t fednel-portfolio .

# Exécution du conteneur
docker run -p 3000:3000 fednel-portfolio

## 📁 Structure du Projet

.github/
  workflows/
    ci.yml            # Automation CI/CD GitHub Actions
app/
  layout.tsx          # Configuration globale, polices, Navbar et Footer
  page.tsx            # Page d'accueil (Hero section)
  about/page.tsx      # Présentation, parcours et certifications
  projects/page.tsx   # Projets filtrables et compétences
  contact/page.tsx    # Formulaire de contact et accès au CV
components/           # Composants UI réutilisables
data/
  portfolioData.ts    # Source unique de données du site
Dockerfile            # Configuration Docker multi-stage optimisée
docker-compose.yml    # Orchestration locale



Projet personnel développé par Fednel Charité.