// ============================================================================
// portfolioData.ts - Single source of truth for all portfolio content.
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
    "Je conçois des logiciels qui tiennent la route à la fois côté produit et côté sécurité - parce qu'en 2026, un système rapide qui n'est pas défendable n'est déjà plus compétitif.",
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
        "INGÉNIEUR LOGICIEL FULL-STACK",
        "ASPIRING DEVSECOPS",
      ],
      founderLines: [
        { label: "Fondateur", org: "Solutions Technologies Hub" },
        { label: "Co-fondateur", org: "Zye Klere" },
      ],
      location: "Basé en Haïti",
      heroVision:
        "Je développe des applications web modernes et évolutives, en adoptant une approche axée sur la sécurité et l'automatisation CI/CD dès les premières étapes du code.",
      heroSubline:
        "Mon écosystème : TypeScript, React/Next.js, Node.js, API REST, Docker, CI/CD (GitHub Actions), Git, Linux | Pratiques DevSecOps : Analyse de code (SonarQube/Snyk), OWASP, Cloud Fundamentals.",
    },
    aboutIdentities: [
      {
        key: "engineer",
        title: "Full-Stack Dev",
        description:
          "Développeur full-stack spécialisé sur l'écosystème TypeScript - React, Next.js, NestJS, PostgreSQL. J'aime les architectures propres, documentées, et pensées pour durer.",
      },
      {
        key: "securiste",
        title: "Sensibilité DevSecOps",
        description:
          "Co-fondateur de Zye Klere. Je pars du principe qu'un produit n'est pas terminé si l'on n'a pas audité ses vulnérabilités et automatisé ses garde-fous de sécurité.",
      },
      {
        key: "cloud",
        title: "CI/CD & Automation",
        description:
          "Passionné par l'intégration continue et le déploiement. Je conçois des pipelines automatisés et des environnements conteneurisés avec Docker pour des livraisons fiables.",
      },
    ],
    education: {
      degree: "Licence en Sciences Informatiques",
      school: "Université de technologie d'Haiti (UNITECH)",
      status: "Diplomation prévue - Fin 2026",
      note: "Projet de mémoire en cours de finalisation.",
    },
    projects: [
      {
        slug: "zye-klere",
        title: "Zye Klere",
        tagline: "Plateforme web interactive et SaaS de sensibilisation à la cybersécurité.",
        categories: ["full-stack", "security"],
        problem:
          "Les menaces numériques (hameçonnage, arnaques financières mobiles) ciblent fortement la communauté sans ressources de prévention interactives et localement adaptées.",
        solution:
          "Développement d'une application Full-Stack bilingue incluant : espace membre avec tableau de bord, tutoriels vidéo interactifs (ex: configuration MFA), testeur de solidité de mots de passe, vérificateur d'exposition de données et quiz d'évaluation.",
        stack: ["TypeScript", "React/Next.js", "Node.js", "Auth/MFA", "Tailwind CSS"],
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
          "Beaucoup d'équipes déploient des applications web sans visibilité sur des failles de configuration basiques : en-têtes HTTP manquants, TLS faible, secrets exposés.",
        solution:
          "Construction d'un scanner piloté par API qui audite une URL cible et retourne un rapport de risque structuré, pensé comme une brique DevSecOps réutilisable dans une chaîne CI/CD.",
        stack: ["TypeScript", "NestJS", "PostgreSQL", "Docker"],
        liveUrl: undefined,
        githubUrl: undefined,
        featured: true,
      },
      {
        slug: "solutions-technologies-hub",
        title: "Solutions Technologies Hub",
        tagline: "Agence d'ingénierie logicielle et conception de plateformes web sur-mesure.",
        categories: ["full-stack"],
        problem:
          "Les entreprises et créateurs manquent d'un partenaire technique fiable pour concevoir des produits logiciels modernes, sécurisés et performants.",
        solution:
          "Fondation de l'agence et développement de la plateforme vitrine officielle. Conduite des projets clients du cahier des charges à la mise en production, incluant l'intégration des normes de sécurité.",
        stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
        liveUrl: "https://solutionstechhub.com",
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
        label: "produits logiciels complets conçus du cahier des charges au déploiement",
      },
      {
        stat: "2",
        label: "initiatives technologiques lancées — une agence logicielle et une plateforme de cybersécurité",
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
        "FULL-STACK SOFTWARE ENGINEER",
        "ASPIRING DEVSECOPS",
      ],
      founderLines: [
        { label: "Founder", org: "Solutions Technologies Hub" },
        { label: "Co-Founder", org: "Zye Klere" },
      ],
      location: "Based in Haiti",
      heroVision:
        "I build modern, scalable web applications with a focus on code quality, automated CI/CD pipelines, and security-first development practices.",
      heroSubline:
        "Core Stack: TypeScript, React/Next.js, Node.js, REST APIs, Docker, CI/CD (GitHub Actions), Git, Linux | DevSecOps Focus: Code Scanning (SonarQube/Snyk), OWASP practices, Cloud Fundamentals.",
    },
    aboutIdentities: [
      {
        key: "engineer",
        title: "Full-Stack Dev",
        description:
          "Full-stack developer focused on the TypeScript ecosystem - React, Next.js, NestJS, PostgreSQL. I emphasize clean architecture engineered for long-term reliability.",
      },
      {
        key: "securiste",
        title: "DevSecOps Mindset",
        description:
          "Co-founder of Zye Klere. I operate on the belief that software isn't ready for production until its vulnerability posture is audited and automated security checks are in place.",
      },
      {
        key: "cloud",
        title: "CI/CD & Automation",
        description:
          "Passionate about automated integration and deployment workflows. Experienced with Docker containerization and automated CI/CD pipelines for smooth delivery.",
      },
    ],
    education: {
      degree: "Bachelor of Science in Computer Science",
      school: "Haiti University of Technology (UNITECH)",
      status: "Expected Graduation - Late 2026",
      note: "Senior thesis project currently being finalized.",
    },
    projects: [
      {
        slug: "zye-klere",
        title: "Zye Klere",
        tagline: "Interactive cybersecurity awareness and educational SaaS platform.",
        categories: ["full-stack", "security"],
        problem:
          "Digital threats (phishing, mobile financial fraud) heavily target users lacking accessible, interactive, and locally relevant security awareness tools.",
        solution:
          "Engineered a bilingual Full-Stack platform featuring: user authentication & dashboard, interactive video guides (e.g., MFA configuration), password strength analyzers, data breach lookups, and knowledge assessment quizzes.",
        stack: ["TypeScript", "React/Next.js", "Node.js", "Auth/MFA", "Tailwind CSS"],
        liveUrl: "https://zyeklere.com",
        githubUrl: undefined,
        featured: true,
      },
      {
        slug: "web-security-checker",
        title: "Web Security Checker",
        tagline: "API-driven security scanner designed to audit web application posture.",
        categories: ["security", "full-stack"],
        problem:
          "Engineering teams often deploy web applications lacking automated visibility into basic configuration flaws: missing security headers, weak TLS, or exposed secrets.",
        solution:
          "Built an API scanner that executes targeted audits on target URLs and outputs structured risk assessment reports, designed as a reusable DevSecOps component in CI/CD pipelines.",
        stack: ["TypeScript", "NestJS", "PostgreSQL", "Docker"],
        liveUrl: undefined,
        githubUrl: undefined,
        featured: true,
      },
      {
        slug: "solutions-technologies-hub",
        title: "Solutions Technologies Hub",
        tagline: "Software engineering agency delivering high-performance, custom web products.",
        categories: ["full-stack"],
        problem:
          "Businesses and creators need a reliable technical partner to design modern, secure, and production-ready digital software.",
        solution:
          "Founded the agency and developed its primary agency showcase. Leading client engagements from technical scoping to deployment, ensuring security-first design patterns.",
        stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
        liveUrl: "https://solutionstechhub.com",
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
        label: "end-to-end software products engineered from specification to deployment",
      },
      {
        stat: "2",
        label: "tech initiatives launched — a software agency and a cybersecurity platform",
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