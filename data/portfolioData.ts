// ============================================================================
// portfolioData.ts — single source of truth for all portfolio content.
// Edit here; components read from this file so copy changes never touch JSX.
// ============================================================================

export type SkillCategory = "frontend" | "backend" | "security" | "certification";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Certification {
  name: string;
  issuer: string;
  status: "completed" | "in-progress";
}

export type ProjectCategory = "full-stack" | "security" | "mobile-cloud";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  categories: ProjectCategory[];
  problem: string;
  solution: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export type ResumeProfile = "full-stack" | "backend" | "devsecops";

// ----------------------------------------------------------------------------
// Personal / brand
// ----------------------------------------------------------------------------

export const personalInfo = {
  name: "Fednel Charité",
  initials: "FC",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Aspiring DevSecOps Engineer",
  ],
  founderLines: [
    { label: "Fondateur", org: "Solutions Technologies Hub" },
    { label: "Co-fondateur", org: "Zye Klere" },
  ],
  location: "Basé en Haïti",
  heroVision:
    "Je conçois des logiciels qui tiennent la route à la fois côté produit et côté sécurité — parce qu'en 2026, un système rapide qui n'est pas défendable n'est déjà plus compétitif.",
  heroSubline:
    "Full-stack TypeScript/React/Next.js le jour, réflexes DevSecOps en continu : je construis en pensant menaces, pas seulement fonctionnalités.",
  email: "contact@fednelcharite.com",
  social: {
    github: "https://github.com/fednelcharite",
    linkedin: "https://linkedin.com/in/fednelcharite",
    website: "https://fednelcharite.com",
  },
};

export const aboutIdentities = [
  {
    key: "engineer",
    title: "L'Ingénieur",
    description:
      "Développeur full-stack formé sur l'écosystème TypeScript — React, Next.js, NestJS, PostgreSQL. J'aime les architectures propres, documentées, et pensées pour durer au-delà du premier déploiement.",
  },
  {
    key: "securiste",
    title: "Le Sécuriste",
    description:
      "Co-fondateur de Zye Klere, plateforme de sensibilisation à la cybersécurité. Je pars du principe qu'un produit n'est terminé que lorsqu'on a aussi réfléchi à comment on pourrait le compromettre.",
  },
  {
    key: "entrepreneur",
    title: "L'Entrepreneur",
    description:
      "Fondateur de Solutions Technologies Hub, une agence de développement logiciel. Diriger mes propres projets, du cahier des charges à la mise en production, m'a appris à livrer — pas seulement à coder.",
  },
];

export const education = {
  degree: "Licence en Sciences Informatiques",
  school: " Université de technologie d'Haiti (Unitech)",
  status: "Diplomation prévue - Novembre 2026",
  note: "Projet de mémoire en cours de finalisation avant soutenance.",
};

// ----------------------------------------------------------------------------
// Certifications
// ----------------------------------------------------------------------------

export const certifications: Certification[] = [
  { name: "Full Stack Software Developer", issuer: "IBM", status: "completed" },
  { name: "Full Stack JavaScript Developer", issuer: "IBM", status: "completed" },
  { name: "Front-End Developer", issuer: "IBM", status: "completed" },
  { name: "Back-End Developer", issuer: "IBM", status: "completed" },
  { name: "Software Engineering & DevOps", issuer: "IBM", status: "completed" },
  { name: "IT Support", issuer: "IBM", status: "completed" },
  { name: "Junior Cybersecurity Analyst", issuer: "Cisco", status: "completed" },
  { name: "Android & iOS Development", issuer: "Meta / IBM", status: "completed" },
  { name: "Security+", issuer: "CompTIA", status: "in-progress" },
  { name: "Certified Solutions Architect", issuer: "AWS", status: "in-progress" },
  { name: "Azure Fundamentals", issuer: "Microsoft", status: "in-progress" },
];

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Bootstrap", category: "frontend" },
  { name: "Figma", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "NestJS", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "REST & API Design", category: "backend" },
  { name: "Docker", category: "security" },
  { name: "Sécurité applicative web", category: "security" },
  { name: "Bonnes pratiques DevSecOps", category: "security" },
  { name: "Fondamentaux réseau (DNS, IDS/IPS)", category: "security" },
  { name: "IBM Full Stack Software Developer", category: "certification" },
  { name: "IBM Software Engineering & DevOps", category: "certification" },
  { name: "Cisco Junior Cybersecurity Analyst", category: "certification" },
  { name: "CompTIA Security+ (en cours)", category: "certification" },
];

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "solutions-technologies-hub",
    title: "Solutions Technologies Hub",
    tagline: "Agence de développement logiciel — de zéro à une présence digitale complète.",
    categories: ["full-stack"],
    problem:
      "Les petites entreprises et créateurs manquent souvent d'un partenaire technique fiable pour construire une présence digitale professionnelle et sécurisée.",
    solution:
      "Fondation de l'agence et livraison d'un site vitrine multi-pages complet (Accueil, À propos, Services, Portfolio, Partenaires, Contact), avec la cybersécurité intégrée comme service à part entière via le partenariat Zye Klere.",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
  {
    slug: "zye-klere",
    title: "Zye Klere",
    tagline: "Plateforme de sensibilisation à la cybersécurité pour la communauté haïtienne.",
    categories: ["security"],
    problem:
      "Les menaces numériques (hameçonnage, arnaques financières mobiles, mots de passe faibles) augmentent, sans ressources de sensibilisation accessibles et localement pertinentes.",
    solution:
      "Co-création d'une plateforme bilingue avec une stratégie de contenu social-first, un générateur d'avatar communautaire déjà en ligne, et une feuille de route produit incluant articles, tutoriels vidéo et vérification d'exposition de mots de passe.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://zyeklere.com",
    githubUrl: undefined,
    featured: true,
  },
  {
    slug: "web-security-checker",
    title: "Web Security Checker",
    tagline: "Scanner d'API pour auditer la posture de sécurité d'une application web.",
    categories: ["security", "full-stack"],
    problem:
      "Beaucoup d'équipes déploient des applications web sans visibilité sur des failles de configuration basiques : en-têtes manquants, TLS faible, secrets exposés.",
    solution:
      "Construction d'un scanner piloté par API qui audite une URL cible et retourne un rapport de risque structuré, pensé comme brique DevSecOps réutilisable dans une chaîne CI/CD.",
    stack: ["TypeScript", "NestJS", "PostgreSQL", "Docker"],
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
];

// ----------------------------------------------------------------------------
// Social proof — placeholders. Replace with real client quotes before publishing.
// ----------------------------------------------------------------------------

export const socialProof = [
  {
    stat: "6+",
    label: "certifications professionnelles obtenues (IBM, Cisco)",
  },
  {
    stat: "3",
    label: "produits construits de bout en bout, du cahier des charges au déploiement",
  },
  {
    stat: "2",
    label: "structures fondées — une agence logicielle et une plateforme de cybersécurité",
  },
];

// ----------------------------------------------------------------------------
// Gated resume download
// ----------------------------------------------------------------------------

export const resumeProfiles: { id: ResumeProfile; label: string; description: string; file: string }[] = [
  {
    id: "full-stack",
    label: "Full-Stack Developer",
    description: "Accent mis sur React, Next.js, NestJS et la livraison de produits complets.",
    file: "/resumes/fednel-charite-full-stack.pdf",
  },
  {
    id: "backend",
    label: "Backend Developer",
    description: "Accent mis sur l'architecture API, les bases de données et l'infrastructure.",
    file: "/resumes/fednel-charite-backend.pdf",
  },
  {
    id: "devsecops",
    label: "DevSecOps Engineer",
    description: "Accent mis sur la sécurité applicative, Docker et les pratiques DevSecOps.",
    file: "/resumes/fednel-charite-devsecops.pdf",
  },
];

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/projects", label: "Projets" },
  { href: "/contact", label: "Contact" },
];
