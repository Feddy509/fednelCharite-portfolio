# Fednel Charité — Portfolio

Portfolio Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Pour un build de production :

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx        # fonts, providers, Navbar/Footer
  page.tsx           # Accueil
  about/page.tsx      # À propos (identité, parcours, certifications)
  projects/page.tsx   # Projets filtrables + compétences
  contact/page.tsx    # Formulaire de contact + CV ciblé
components/
  Navbar.tsx, Footer.tsx, ProjectCard.tsx, ResumeModal.tsx
data/
  portfolioData.ts    # toutes les données du site — modifiez ici, pas dans les composants
```

## À personnaliser avant mise en ligne

Tout est centralisé dans `data/portfolioData.ts`. Éléments à remplacer :

1. **Liens réels** — `personalInfo.social` (GitHub, LinkedIn), et `liveUrl` / `githubUrl`
   de chaque projet dans `projects` (plusieurs sont vides tant que l'URL n'est pas confirmée).
2. **CV en PDF** — déposez trois fichiers dans `public/resumes/` :
   - `fednel-charite-full-stack.pdf`
   - `fednel-charite-backend.pdf`
   - `fednel-charite-devsecops.pdf`
   Le modal CV (bouton "CV" du header) les sert directement en téléchargement — aucun
   backend requis.
3. **Photo** — le hero utilise un badge avec vos initiales à la place d'une photo.
   Ajoutez une image dans `public/` et remplacez le bloc avatar dans `app/page.tsx`
   par un composant `next/image`.
4. **Preuves sociales** (`socialProof` dans `portfolioData.ts`) — actuellement des
   statistiques génériques. Remplacez par de vrais résultats clients ou témoignages
   dès que vous en avez.
5. **Formulaire de contact** — fonctionne sans backend via un lien `mailto:` généré
   automatiquement. Pour capter les messages sans dépendre du client mail du visiteur,
   branchez le `onSubmit` de `app/contact/page.tsx` sur un service comme Resend,
   Formspree, ou une route API Next.js.

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · lucide-react
