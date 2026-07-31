"use client";

import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Code2, Rocket } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import HeroIllustration from "@/components/HeroIllustration";
import { portfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

const identityIcons = {
  engineer: Code2,
  securiste: ShieldCheck,
  entrepreneur: Rocket,
};

export default function HomePage() {
  const { language } = useLanguage();
  const data = portfolioData[language];

  const featuredProjects = data.projects.filter((p) => p.featured);

  const labels = {
    fr: {
      btnProjects: "Voir les projets",
      btnContact: "Me contacter",
      featuredBadge: "Featured Projects",
      featuredTitle: "Ce que j'ai construit",
      allProjects: "Tous les projets",
      perspectiveBadge: "Point de vue",
      perspectiveTitle: "Développer en pensant sécurité, pas en la rattrapant",
      perspectivePara1:
        "En 2026, la vitesse d'expédition d'un produit ne suffit plus à le rendre compétitif. Les équipes qui gagnent la confiance de leurs utilisateurs sont celles qui traitent la sécurité comme une exigence de conception dès le premier commit, pas comme une case à cocher avant la mise en production.",
      perspectivePara2:
        "C'est la conviction qui guide mon travail : construire des interfaces soignées avec React et Next.js, tout en gardant les réflexes DevSecOps — gestion des secrets, durcissement des API, conteneurisation propre — au même niveau de priorité que l'expérience utilisateur.",
    },
    en: {
      btnProjects: "View Projects",
      btnContact: "Contact Me",
      featuredBadge: "Featured Projects",
      featuredTitle: "What I've Built",
      allProjects: "All Projects",
      perspectiveBadge: "Perspective",
      perspectiveTitle: "Engineering for security, not retrofitting it",
      perspectivePara1:
        "In 2026, shipping speed alone is no longer enough to make a product competitive. The teams that earn user trust are those that treat security as a core design requirement from the first commit, not as a checkbox right before production release.",
      perspectivePara2:
        "This is the core belief that drives my work: building polished interfaces with React and Next.js, while maintaining strong DevSecOps practices — secret management, API hardening, clean containerization — at the same level of priority as user experience.",
    },
  }[language];

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Section Hero (Accueil) - Aérée & Pro                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Colonne Gauche : Présentation et Textes */}
          <div className="z-10 animate-fade-up opacity-0 [animation-delay:0.05s]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              {data.personalInfo.roles.join(" · ")}
            </p>
            <h1 className="mt-4 text-balance font-sans text-4xl font-extrabold leading-[1.1] text-paper sm:text-5xl lg:text-6xl">
              {data.personalInfo.name}
            </h1>
            <p className="mt-6 max-w-2xl text-balance font-sans text-lg leading-relaxed text-paper/80">
              {data.personalInfo.heroVision}
            </p>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-paper/50">
              {data.personalInfo.heroSubline}
            </p>

            {/* Boutons d'action (CTA) réactifs avec effet Zoom, Glow & Group Hover */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Bouton 1 : Voir les projets */}
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-xl bg-cta-gradient px-6 py-3.5 font-sans text-sm font-semibold text-paper shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(10,107,255,0.6)] active:scale-95"
              >
                {labels.btnProjects}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Bouton 2 : Me contacter */}
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-sans text-sm font-semibold text-paper transition-all duration-300 hover:scale-105 hover:border-accent-400/50 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
              >
                <Mail size={16} />
                {labels.btnContact}
              </Link>
            </div>
            
            {/* Badges d'identité (Ingénieur, Sécuriste, Entrepreneur) */}
            <div className="mt-10 flex flex-wrap gap-3">
              {data.aboutIdentities.map((identity) => {
                const Icon =
                  identityIcons[identity.key as keyof typeof identityIcons];
                return (
                  <div
                    key={identity.key}
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-2 pr-4 backdrop-blur-md transition hover:border-white/20"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-600/20 text-accent-300">
                      <Icon size={14} />
                    </span>
                    <span className="font-sans text-xs font-medium text-paper/80">
                      {identity.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne Droite : Visuel HeroIllustration */}
          <div className="animate-fade-up opacity-0 [animation-delay:0.15s]">
            <HeroIllustration />
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section : Projets en vedette (Featured projects)                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              {labels.featuredBadge}
            </p>
            <h2 className="mt-2 font-sans text-3xl font-bold text-paper sm:text-4xl">
              {labels.featuredTitle}
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-1.5 font-sans text-sm font-medium text-accent-300 transition hover:text-accent-200"
          >
            {labels.allProjects}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section : Vision & Philosophie DevSecOps                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/10 bg-ink-surface/30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
                {labels.perspectiveBadge}
              </p>
              <h2 className="mt-3 font-sans text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
                {labels.perspectiveTitle}
              </h2>
            </div>
            <div className="space-y-6 font-sans text-base leading-relaxed text-paper/75">
              <p className="rounded-xl border border-white/5 bg-white/[0.02] p-6 shadow-inner">
                {labels.perspectivePara1}
              </p>
              <p className="px-2">
                {labels.perspectivePara2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section : Impact et preuves sociales (Social proof)              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          {data.socialProof.map((item) => (
            <div
              key={item.label}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 text-center transition-all duration-300 hover:border-accent-500/30 hover:shadow-glow"
            >
              <p className="font-mono text-5xl font-black text-accent-300 transition-transform duration-300 group-hover:scale-110">
                {item.stat}
              </p>
              <p className="mt-4 font-sans text-sm font-medium leading-relaxed text-paper/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}