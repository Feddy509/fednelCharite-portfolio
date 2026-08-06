"use client";

import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Code2, Rocket } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import HeroIllustration from "@/components/HeroIllustration";
import { portfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

const identityIcons: Record<string, any> = {
  engineer: Code2,
  securiste: ShieldCheck,
  entrepreneur: Rocket,
};

export default function HomePage() {
  const { language } = useLanguage();
  const data = portfolioData?.[language] || portfolioData?.fr || {};

  const featuredProjects = (data?.projects || []).filter((p: any) => p?.featured);

  const labels =
    {
      fr: {
        btnProjects: "Voir les projets",
        btnContact: "Me contacter",
        featuredBadge: "PROJETS EN VEDETTE",
        featuredTitle: "Ce que j'ai conçu",
        allProjects: "Tous les projets",
        perspectiveBadge: "VISION TECHNIQUE",
        perspectiveTitle: "Au-delà de la syntaxe : résoudre des problèmes avec méthode",
        perspectivePara1:
          "En 2026, développer un logiciel va bien au-delà de l'écriture de code. C'est une démarche globale qui allie méthodologies Agiles, réflexion stratégique et livraison progressive pour répondre à de vrais besoins.",
        perspectivePara2:
          "Pour moi, un bon ingénieur se distingue par sa vision : anticiper les défis, intégrer la sécurité dès la conception (DevSecOps) et concevoir des architectures durables et évolutives.",
      },
      en: {
        btnProjects: "View Projects",
        btnContact: "Contact Me",
        featuredBadge: "FEATURED PROJECTS",
        featuredTitle: "What I've Built",
        allProjects: "All Projects",
        perspectiveBadge: "TECHNICAL PERSPECTIVE",
        perspectiveTitle: "Beyond Syntax: Engineering as a Problem-Solving Discipline",
        perspectivePara1:
          "In 2026, software engineering extends far beyond writing syntax. It is a holistic mindset combining Agile practices, strategic problem-solving, and continuous, iterative delivery.",
        perspectivePara2:
          "I believe great engineers are defined by their vision: anticipating edge cases, embedding security by design (DevSecOps), and architecting systems built for long-term scalability.",
      },
    }[language] || {
      btnProjects: "Voir les projets",
      btnContact: "Me contacter",
      featuredBadge: "PROJETS EN VEDETTE",
      featuredTitle: "Ce que j'ai conçu",
      allProjects: "Tous les projets",
      perspectiveBadge: "VISION TECHNIQUE",
      perspectiveTitle: "Au-delà de la syntaxe : résoudre des problèmes avec méthode",
      perspectivePara1: "",
      perspectivePara2: "",
    };

  return (
    
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero Section                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-4 sm:pt-6">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          
          <div className="z-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-300">
              {data?.personalInfo?.roles?.join(" · ") || ""}
            </p>
            
            <h1 className="mt-2 text-balance font-sans text-3xl font-extrabold leading-[1.15] text-paper sm:text-4xl lg:text-5xl">
              {data?.personalInfo?.name || "Fednel Charité"}
            </h1>
            
            <p className="mt-4 max-w-xl text-balance font-sans text-base leading-relaxed text-paper/80">
              {data?.personalInfo?.heroVision || ""}
            </p>
            
            <p className="mt-2 max-w-xl font-sans text-xs leading-relaxed text-paper/50">
              {data?.personalInfo?.heroSubline || ""}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-lg bg-cta-gradient px-5 py-2.5 font-sans text-xs font-semibold text-paper shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {labels.btnProjects}
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-2.5 font-sans text-xs font-semibold text-paper transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mail size={14} />
                {labels.btnContact}
              </Link>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2.5">
              {(data?.aboutIdentities || []).map((identity: any) => {
                const Icon = identityIcons[identity.key as keyof typeof identityIcons] || Code2;
                return (
                  <div
                    key={identity.key}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-3.5 backdrop-blur-md"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-600/20 text-accent-300">
                      <Icon size={12} />
                    </span>
                    <span className="font-sans text-[11px] font-medium text-paper/80">
                      {identity.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            {typeof HeroIllustration === "function" ? <HeroIllustration /> : null}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured Projects                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-300">
              {labels.featuredBadge}
            </p>
            <h2 className="mt-1 font-sans text-2xl font-bold text-paper sm:text-3xl">
              {labels.featuredTitle}
            </h2>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-1.5 font-sans text-xs font-medium text-accent-300 transition hover:text-accent-200"
          >
            {labels.allProjects}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project: any) =>
            typeof ProjectCard === "function" ? (
              <ProjectCard key={project.slug} project={project} />
            ) : null
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Vision Section                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/10 bg-ink-surface/30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-300">
                {labels.perspectiveBadge}
              </p>
              <h2 className="mt-2 font-sans text-2xl font-extrabold leading-tight text-paper sm:text-3xl">
                {labels.perspectiveTitle}
              </h2>
            </div>
            <div className="space-y-4 font-sans text-sm leading-relaxed text-paper/75">
              <p className="rounded-xl border border-white/5 bg-white/[0.02] p-5 shadow-inner">
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
      {/* Social proof                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {(data.socialProof || []).map((item: any) => (
            <div
              key={item.label}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 text-center transition-all duration-300 hover:border-accent-500/30"
            >
              <p className="font-mono text-4xl font-black text-accent-300">
                {item.stat}
              </p>
              <p className="mt-2 font-sans text-xs font-medium leading-relaxed text-paper/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}