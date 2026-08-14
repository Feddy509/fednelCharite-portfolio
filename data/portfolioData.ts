// ============================================================================
// portfolioData.ts - Single source of truth for all portfolio content.
// ============================================================================

export type SkillCategory = "frontend" | "backend" | "security" | "other" | "certification";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Certification {
  name: string;
  issuer: string;
  status: "completed" | "in-progress";
  imageUrl?: string;
  pdfUrl?: string;
  progress?: number;
}

export type ProjectCategory = "full-stack" | "security";

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

export interface ResumeItem {
  id: ResumeProfile;
  label: string;
  description: string;
  file: string;
}

export const personalInfo = {
  name: "Fednel Charité",
  initials: "FC",
  email: "fednelcharite@gmail.com",
  roles: [
    "INGÉNIEUR LOGICIEL FULL-STACK",
    "ASPIRING DEVSECOPS",
  ],
  social: {
    github: "https://github.com/feddy509",
    linkedin: "https://www.linkedin.com/in/fednel-charit%C3%A9-05271823b/",
    website: "https://fednelcharite.com",
  },
  heroVision:
    "Je développe des applications web modernes et évolutives, en adoptant une approche axée sur la sécurité et l'automatisation CI/CD dès les premières étapes du code.",
  heroSubline:
    "Mon écosystème : TypeScript, React/Next.js, Node.js, API REST, Docker, CI/CD (GitHub Actions), Git, Linux | Pratiques DevSecOps : Analyse de code (SonarQube/Snyk), OWASP, Cloud Fundamentals.",
};

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
      founderLines: [
        { label: "Fondateur", org: "Solutions Technologies Hub" },
        { label: "Co-fondateur", org: "Zye Klere" },
      ],
    },
    contactQuote: {
      text: "Développer un logiciel va bien au-delà de la syntaxe : c'est concevoir des architectures robustes, sécurisées par conception et taillées pour l'avenir.",
      author: "Fednel Charité · Software Engineer & Aspiring DevSecOps",
    },
    projectsPage: {
      badge: "PROJETS & RÉALISATIONS",
      title: "Ingénierie logicielle & Architecture applicative",
      subtitle:
        "Chaque projet est conçu comme une solution bout-en-bout - de la modélisation du problème au déploiement sécurisé.",
      filterAll: "Tout",
      filterFullStack: "Full-Stack",
      filterSecurity: "DevSecOps / Sécurité",
      viewSite: "Voir le site",
      linkComingSoon: "Lien à venir",
      problemLabel: "PROBLÈME",
      solutionLabel: "SOLUTION",
    },
    personalBio: {
      title: "Mon Parcours & Vision de Développeur",
      paragraph1:
        "En tant qu'Ingénieur Logiciel, je conçois le développement informatique comme un levier stratégique pour résoudre des défis complexes et bâtir des infrastructures numériques résilientes. Fort d'une solide formation académique en Sciences Informatiques à l'Université de Technologie d'Haiti (UNITECH), j'ambitionne de mettre mes compétences au service de projets à fort impact et d'envergure internationale.", 
      paragraph2:
        "Mon parcours technique s'articule autour de trois réalisations majeures : la création de Solutions Technologies Hub pour offrir aux entreprises un partenaire fiable en ingénierie logicielle ; le lancement de Zye Klere, une plateforme dédiée à la sensibilisation à la cybersécurité et la protection des données ; et le développement d'outils Micro-SaaS (comme mon scanner d'API de sécurité) pour auditer automatiquement la vulnérabilité des applications.",
      paragraph3:
        "Mon objectif est d'allier la flexibilité du développement Full-Stack à la rigueur des pratiques DevSecOps pour livrer des produits numériques performants, évolutifs et sécurisés dès la conception.",
    },
    aboutIdentities: [
      {
        key: "engineer",
        title: "Full-Stack Dev",
        description:
          "Développeur full-stack spécialisé sur l'écosystème TypeScript (React, Next.js, NestJS, PostgreSQL). Je privilégie les architectures propres, documentées et conçues pour évoluer sereinement.",
      },
      {
        key: "securiste",
        title: "Sensibilité DevSecOps",
        description:
          "Co-fondateur de Zye Klere. Je conçois chaque application en intégrant l'analyse des vulnérabilités, la validation des accès et le respect des normes OWASP dès la première ligne de code.",
      },
      {
        key: "cloud",
        title: "CI/CD & Automation",
        description:
          "Automatisation du cycle de vie logiciel. Je conçois des pipelines CI/CD fiables et des environnements conteneurisés avec Docker pour garantir des déploiements fluides et sécurisés.",
      },
    ],
    education: {
      degree: "Licence en Sciences Informatiques",
      school: "Université de technologie d'Haiti (UNITECH)",
      status: "Diplomation prévue - Fin 2026",
      note: "Projet de licence en cours de finalisation.",
    },
    projects: [
      {
        slug: "zye-klere",
        title: "Zye Klere",
        tagline:"Plateforme SaaS interactive dédiée à l'éducation, la sensibilisation à la cybersécurité et la protection des données.",
        categories: ["full-stack", "security"],
        problem:
          "Les menaces numériques (hameçonnage, arnaques financières mobiles) ciblent fortement la communauté sans ressources de prévention interactives et localement adaptées.",
        solution:
          "Développement d'une application Full-Stack bilingue incluant : espace membre avec tableau de bord, tutoriels vidéo interactifs (ex: configuration MFA), testeur de solidité de mots de passe, vérificateur d'exposition de données et quiz d'évaluation.",
        stack: ["TypeScript", "React/Next.js", "Node.js", "PostgreSQL", "Docker", "CI/CD (GitHub Actions)", "Auth/MFA", "Tailwind CSS"],
        liveUrl: "https://zyeklere.com",
        githubUrl: "https://github.com/Feddy509/zyeklere_app",
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
        stack: ["TypeScript", "NestJS", "PostgreSQL", "Docker", "CI/CD (GitHub Actions)", "OWASP Top 10"],
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
        stack: ["JavaScript (ES6+)", "Bootstrap 5", "Responsive Design", "SEO & Performance"],
        liveUrl: "https://solutionstechhub.com",
        githubUrl: "https://github.com/Feddy509/solutionstechhub-app",
        featured: true,
      },
    ] as Project[],
    socialProof: [
      { stat: "4+", label: "Certifications professionnelles obtenues (IBM, Cisco)" },
      { stat: "3", label: "Applications web complètes conçues et déployées" },
      { stat: "3", label: "Plateformes & initiatives technologiques lancées" },
    ],
    resumeProfiles: [
      {
        id: "full-stack",
        label: "Développeur Full-Stack",
        description: "Accent mis sur React, Next.js, NestJS et la livraison de produits complets.",
        file: "/resumes/fednel-charite-full-stack-fr.pdf",
      },
      {
        id: "backend",
        label: "Développeur Backend",
        description: "Accent mis sur l'architecture API, les bases de données et l'infrastructure.",
        file: "/resumes/fednel-charite-backend-fr.pdf",
      },
      {
        id: "devsecops",
        label: "Ingénieur DevSecOps",
        description: "Accent mis sur la sécurité applicative, Docker et les pipelines CI/CD.",
        file: "/resumes/fednel-charite-devsecops-fr.pdf",
      },
    ] as ResumeItem[],
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
      heroVision:
        "I build modern, scalable web applications with a focus on code quality, automated CI/CD pipelines, and security-first development practices.",
      heroSubline:
        "Core Stack: TypeScript, React/Next.js, Node.js, REST APIs, Docker, CI/CD (GitHub Actions), Git, Linux | DevSecOps Focus: Code Scanning (SonarQube/Snyk), OWASP practices, Cloud Fundamentals.",
    },
    contactQuote: {
      text: "Software engineering goes far beyond syntax: it is about building robust, security-first architectures designed for long-term impact.",
      author: "Fednel Charité · Software Engineer & Aspiring DevSecOps",
    },
    projectsPage: {
      badge: "PROJECTS & ENGINEERING WORK",
      title: "Software Engineering & Application Architecture",
      subtitle:
        "Every project is engineered as an end-to-end solution - from problem scoping to production-ready deployment.",
      filterAll: "All",
      filterFullStack: "Full-Stack",
      filterSecurity: "DevSecOps / Security",
      viewSite: "Visit website",
      linkComingSoon: "Link coming soon",
      problemLabel: "PROBLEM",
      solutionLabel: "SOLUTION",
    },
    personalBio: {
      title: "My Background & Engineering Journey",
      paragraph1:
        "As a Software Engineer, I view software development as a strategic lever to solve complex challenges and build resilient digital infrastructure. Backed by rigorous academic training in Computer Science at the Haiti University of Technology (UNITECH), I aim to leverage my engineering skill set to contribute meaningfully to high-impact global technology initiatives.",  
      paragraph2:
        "My technical journey is built on three core milestones: founding Solutions Technologies Hub to provide businesses with a reliable software engineering partner; launching Zye Klere, a platform dedicated to cybersecurity awareness and data privacy education; and engineering Micro-SaaS tools (such as my security API scanner) to automatically audit application vulnerability postures.",
      paragraph3:
        "My goal is to combine agile Full-Stack engineering with rigorous DevSecOps practices to ship high-performance, scalable, and secure software by design.",
    },
    aboutIdentities: [
      {
        key: "engineer",
        title: "Full-Stack Dev",
        description:
          "Full-stack developer specialized in the TypeScript ecosystem (React, Next.js, NestJS, PostgreSQL). I prioritize clean, well-documented architecture engineered for long-term scalability.",
      },
      {
        key: "securiste",
        title: "DevSecOps Mindset",
        description:
          "Co-founder of Zye Klere. I design every application by integrating vulnerability assessments, secure authentication, and OWASP standards right from the initial code commit.",
      },
      {
        key: "cloud",
        title: "CI/CD & Automation",
        description:
          "Software lifecycle automation. I design robust CI/CD pipelines and containerized Docker environments to ensure smooth, repeatable, and secure production deployments.",
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
        tagline: "Interactive SaaS platform engineered for cybersecurity education, threat awareness, and data privacy protection.",
        categories: ["full-stack", "security"],
        problem:
          "Digital threats (phishing, mobile financial fraud) heavily target users lacking accessible, interactive, and locally relevant security awareness tools.",
        solution:
          "Engineered a bilingual Full-Stack platform featuring: user authentication & dashboard, interactive video guides (e.g., MFA configuration), password strength analyzers, data breach lookups, and knowledge assessment quizzes.",
        stack: ["TypeScript", "React/Next.js", "Node.js", "PostgreSQL", "Docker", "CI/CD (GitHub Actions)", "Auth/MFA", "Tailwind CSS"],
        liveUrl: "https://zyeklere.com",
        githubUrl: "https://github.com/Feddy509/zyeklere_app",
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
        stack: ["TypeScript", "NestJS", "PostgreSQL", "Docker", "CI/CD (GitHub Actions)", "OWASP Top 10"],
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
        stack: ["JavaScript (ES6+)", "Bootstrap 5", "Responsive Design", "SEO & Performance"],
        liveUrl: "https://solutionstechhub.com",
        githubUrl: "https://github.com/Feddy509/solutionstechhub-app",
        featured: true,
      },
    ] as Project[],
    socialProof: [
      { stat: "4+", label: "Validated professional certifications earned (IBM, Cisco)" },
      { stat: "3", label: "End-to-end web applications engineered & deployed" },
      { stat: "3", label: "Tech initiatives & digital platforms launched" },
    ],
    resumeProfiles: [
      {
        id: "full-stack",
        label: "Full-Stack Developer",
        description: "Focus on React, Next.js, NestJS, and shipping complete digital products.",
        file: "/resumes/fednel-charite-full-stack-en.pdf",
      },
      {
        id: "backend",
        label: "Backend Developer",
        description: "Focus on API architecture, database optimization, and infrastructure.",
        file: "/resumes/fednel-charite-backend-en.pdf",
      },
      {
        id: "devsecops",
        label: "DevSecOps Engineer",
        description: "Focus on application security, Docker containerization, and CI/CD pipelines.",
        file: "/resumes/fednel-charite-devsecops-en.pdf",
      },
    ] as ResumeItem[],
  },
};

// ----------------------------------------------------------------------------
// Lis Konpetans ak Zouti Yo
// ----------------------------------------------------------------------------

export const skills: Skill[] = [
  { name: "React / Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS & Bootstrap 5", category: "frontend" },
  { name: "SEO & Web Performance", category: "frontend" },
  { name: "Figma (UI/UX)", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },

  { name: "Node.js / NestJS / Express.js", category: "backend" },
  { name: "Python (Django, Flask)", category: "backend" },
  { name: "PostgreSQL & MongoDB", category: "backend" },
  { name: "REST API & Microservices", category: "backend" },
  { name: "Pandas (Data Processing)", category: "backend" },

  { name: "Docker & Kubernetes (Orchestration)", category: "security" },
  { name: "CI/CD (GitHub Actions)", category: "security" },
  { name: "Sécurité Code (SonarQube / Snyk)", category: "security" },
  { name: "Terraform (IaC Fundamentals)", category: "security" },
  { name: "Normes OWASP Top 10", category: "security" },
  { name: "Linux, Bash & Réseau (DNS/TLS)", category: "security" },

  { name: "C / C++", category: "other" },
  { name: "C# / ASP.NET", category: "other" },
  { name: "PHP", category: "other" },
  { name: "Java Fundamentals", category: "other" },
  { name: "Git & GitHub Workflow", category: "other" },

  { name: "IBM Full Stack Developer", category: "certification" },
  { name: "IBM DevOps & Software Eng.", category: "certification" },
  { name: "Cisco Cybersecurity Analyst", category: "certification" },
  { name: "CompTIA Security+ (en cours)", category: "certification" },
  { name: "AWS Certified Developer - Associate (en cours)", category: "certification" },
];

export const certifications: Certification[] = [
  {
    name: "Full Stack Software Developer",
    issuer: "IBM",
    status: "completed",
    imageUrl: "/images/certificates/ibm-fullstack.png",
    pdfUrl: "/certificate/ibm-fullstack.pdf",
  },
  {
    name: "Full Stack JavaScript Developer",
    issuer: "IBM",
    status: "completed",
    imageUrl: "/images/certificates/ibm-javascript.png",
    pdfUrl: "/certificate/ibm-javascript.pdf",
  },
  {
    name: "Front-End Developer",
    issuer: "IBM",
    status: "completed",
    imageUrl: "/images/certificates/ibm-frontend.png",
    pdfUrl: "/certificate/ibm-frontend.pdf",
  },
  {
    name: "Back-End Developer",
    issuer: "IBM",
    status: "in-progress",
    progress: 95,
    imageUrl: "/images/certificates/ibm-backend-badge.png",
  },
  {
    name: "Software Engineering & DevOps",
    issuer: "IBM",
    status: "in-progress",
    progress: 90,
    imageUrl: "/images/certificates/ibm-devops-badge.png",
  },
  {
    name: "Junior Cybersecurity Analyst",
    issuer: "Cisco",
    status: "in-progress",
    progress: 90,
    imageUrl: "/images/certificates/cisco-cybersecurity-badge.png",
  },
  {
    name: "Android & iOS Development",
    issuer: "Meta / IBM",
    status: "in-progress",
    progress: 70,
    imageUrl: "/images/certificates/meta-mobile-badge.png",
  },
  {
    name: "IBM Cybersecurity Analyst",
    issuer: "IBM",
    status: "in-progress",
    progress: 60,
    imageUrl: "/images/certificates/ibm-cybersecurity-badge.png",
  },
  {
    name: "IBM Java Developer",
    issuer: "IBM",
    status: "in-progress",
    progress: 50,
    imageUrl: "/images/certificates/ibm-java-badge.png",
  },
  {
    name: "Security+",
    issuer: "CompTIA",
    status: "in-progress",
  },
  {
    name: "AWS Certified Developer - Associate",
    issuer: "AWS",
    status: "in-progress",
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    status: "in-progress",
  },
];

export const navLinks = portfolioData.fr.navLinks;
export const aboutIdentities = portfolioData.fr.aboutIdentities;
export const education = portfolioData.fr.education;
export const projects = portfolioData.fr.projects;
export const socialProof = portfolioData.fr.socialProof;
export const resumeProfiles = portfolioData.fr.resumeProfiles;