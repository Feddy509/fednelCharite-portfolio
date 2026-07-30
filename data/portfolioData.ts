// ============================================================================
// portfolioData.ts — single source of truth for all portfolio content.
// Multi-language support (fr / en) with TypeScript safety.
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
// Static Personal / Social Data (Shared across languages)
// ----------------------------------------------------------------------------

export const personalInfo = {
  name: "Fednel Charité",
  initials: "FC",
  email: "contact@fednelcharite.com",
  social: {
    github: "https://github.com/feddy509",
    linkedin: "https://linkedin.com/in/fednelcharite",
    website: "https://fednelcharite.com",
  },
  heroVision:
    "Je conçois des logiciels qui tiennent la route à la fois côté produit et côté sécurité — parce qu'en 2026, un système rapide qui n'est pas défendable n'est déjà plus compétitif.",
};

// ----------------------------------------------------------------------------
// Multi-language Portfolio Data Store
// ----------------------------------------------------------------------------

export const portfolioData = {
  fr: {
    navLinks: [
      { href: "/", label: "Accueil" },
      { href: "/about", label: "À propos" },
      { href: "/projects", label: "Projets" },
      { href: "/contact", label: "Contact" },
    ],
    personalInfo: {
      ...personalInfo,
      roles: [
        "Ingénieur Logiciel",
        "Développeur Full-Stack",
        "Aspirant Ingénieur DevSecOps",
      ],
      founderLines: [
        { label: "Fondateur", org: "Solutions Technologies Hub" },
        { label: "Co-fondateur", org: "Zye Klere" },
      ],
      location: "Basé en Haïti",
      heroVision:
        "Ingénieur Logiciel Full-Stack & aspirant DevSecOps. Je conçois des systèmes web complets - de l'architecture backend robuste à l'interface utilisateur fluide - intégrés dans des environnements cloud hautement sécurisés.",
      heroSubline:
        "Mon écosystème : TypeScript, React/Next.js, Node.js, APIs REST, Docker & pipelines CI/CD sécurisés. Je construis des applications scalables, pensées dès la conception pour résister aux cybermenaces.",
    },
    aboutIdentities: [
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
    ],
    education: {
      degree: "Licence en Sciences Informatiques",
      school: "Université de technologie d'Haiti (Unitech)",
      status: "Diplomation prévue - Novembre 2026",
      note: "Projet de mémoire en cours de finalisation avant soutenance.",
    },
    projects: [
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
    ] as Project[],
    socialProof: [
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
    ],
    resumeProfiles: [
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
    ] as { id: ResumeProfile; label: string; description: string; file: string }[],
  },

  en: {
    navLinks: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
    ],
    personalInfo: {
      ...personalInfo,
      roles: [
        "Software Engineer",
        "Full-Stack Developer",
        "Aspiring DevSecOps Engineer",
      ],
      founderLines: [
        { label: "Founder", org: "Solutions Technologies Hub" },
        { label: "Co-Founder", org: "Zye Klere" },
      ],
      location: "Based in Haiti",
      heroVision:
        "Full-Stack Software Engineer & Aspiring DevSecOps. I design complete web systems - from robust backend architecture to seamless user interfaces - integrated into highly secure cloud environments.",
      heroSubline:
        "My tech stack: TypeScript, React/Next.js, Node.js, REST APIs, Docker, and secure CI/CD pipelines. I build scalable applications engineered from day one to withstand cyber threats.",
    },
    aboutIdentities: [
      {
        key: "engineer",
        title: "The Engineer",
        description:
          "Full-stack developer trained on the TypeScript ecosystem — React, Next.js, NestJS, PostgreSQL. I value clean, documented architecture designed to scale far beyond initial deployment.",
      },
      {
        key: "securiste",
        title: "The Security Practitioner",
        description:
          "Co-founder of Zye Klere, a cybersecurity awareness platform. I operate on the belief that a product isn't complete until you've thought about how it could be compromised.",
      },
      {
        key: "entrepreneur",
        title: "The Entrepreneur",
        description:
          "Founder of Solutions Technologies Hub, a software development agency. Leading my own projects from specs to production taught me to ship — not just to write code.",
      },
    ],
    education: {
      degree: "Bachelor of Science in Computer Science",
      school: "Haiti University of Technology (Unitech)",
      status: "Expected Graduation - November 2026",
      note: "Senior thesis project currently being finalized prior to defense.",
    },
    projects: [
      {
        slug: "solutions-technologies-hub",
        title: "Solutions Technologies Hub",
        tagline: "Software development agency — from zero to a complete digital presence.",
        categories: ["full-stack"],
        problem:
          "Small businesses and creators often lack a reliable technical partner to build a professional, secure digital presence.",
        solution:
          "Founded the agency and delivered a complete multi-page showcase platform (Home, About, Services, Portfolio, Partners, Contact) with built-in cybersecurity offerings.",
        stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
        liveUrl: undefined,
        githubUrl: undefined,
        featured: true,
      },
      {
        slug: "zye-klere",
        title: "Zye Klere",
        tagline: "Cybersecurity awareness platform tailored for the Haitian community.",
        categories: ["security"],
        problem:
          "Digital threats (phishing, mobile financial scams, weak passwords) are rising without accessible, locally relevant awareness resources.",
        solution:
          "Co-created a bilingual platform featuring a social-first content strategy, a live community avatar generator, and a product roadmap covering tutorials and breach checks.",
        stack: ["HTML5", "CSS3", "JavaScript"],
        liveUrl: "https://zyeklere.com",
        githubUrl: undefined,
        featured: true,
      },
      {
        slug: "web-security-checker",
        title: "Web Security Checker",
        tagline: "API scanner designed to audit the security posture of web applications.",
        categories: ["security", "full-stack"],
        problem:
          "Many teams deploy web applications lacking visibility into basic misconfigurations: missing headers, weak TLS, exposed secrets.",
        solution:
          "Built an API-driven scanner that audits a target URL and returns a structured risk assessment report, engineered as a reusable DevSecOps component in CI/CD pipelines.",
        stack: ["TypeScript", "NestJS", "PostgreSQL", "Docker"],
        liveUrl: undefined,
        githubUrl: undefined,
        featured: true,
      },
    ] as Project[],
    socialProof: [
      {
        stat: "6+",
        label: "professional certifications earned (IBM, Cisco)",
      },
      {
        stat: "3",
        label: "end-to-end products built, from specification to deployment",
      },
      {
        stat: "2",
        label: "organizations founded — a software agency and a cybersecurity platform",
      },
    ],
    resumeProfiles: [
      {
        id: "full-stack",
        label: "Full-Stack Developer",
        description: "Focus on React, Next.js, NestJS, and shipping complete digital products.",
        file: "/resumes/fednel-charite-full-stack.pdf",
      },
      {
        id: "backend",
        label: "Backend Developer",
        description: "Focus on API architecture, database optimization, and infrastructure.",
        file: "/resumes/fednel-charite-backend.pdf",
      },
      {
        id: "devsecops",
        label: "DevSecOps Engineer",
        description: "Focus on application security, Docker containerization, and CI/CD pipelines.",
        file: "/resumes/fednel-charite-devsecops.pdf",
      },
    ] as { id: ResumeProfile; label: string; description: string; file: string }[],
  },
};

// ----------------------------------------------------------------------------
// Shared Lists & Global References
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

// Fallback exports for backward compatibility
export const navLinks = portfolioData.fr.navLinks;
export const aboutIdentities = portfolioData.fr.aboutIdentities;
export const education = portfolioData.fr.education;
export const projects = portfolioData.fr.projects;
export const socialProof = portfolioData.fr.socialProof;
export const resumeProfiles = portfolioData.fr.resumeProfiles;