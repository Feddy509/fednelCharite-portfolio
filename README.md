# Fednel Charité — Portfolio

A modern, high-performance personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **DevOps & CI/CD:** Docker & GitHub Actions

---

## 🚀 Démarrage

Pour exécuter le projet en local, suivez les étapes ci-dessous :

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Créer le build de production
npm run build

# Lancer le serveur de production
npm run start

📁 Structure du Projet

app/
  layout.tsx          # Fonts, providers, Navbar/Footer
  page.tsx            # Accueil (Hero section)
  about/page.tsx      # À propos (identité, parcours, certifications)
  projects/page.tsx   # Projets filtrables + compétences
  contact/page.tsx    # Formulaire de contact + CV ciblé
components/           # Composants UI réutilisables (Navbar, Footer, ProjectCard, ResumeModal...)
data/
  portfolioData.ts    # Toutes les données du site — modifiez ici, pas dans les composants


📝 License
Projet personnel développé par Fednel Charité.