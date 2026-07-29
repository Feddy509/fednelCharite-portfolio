import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Code2, Rocket } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import HeroIllustration from "@/components/HeroIllustration";
import {
  personalInfo,
  projects,
  socialProof,
  aboutIdentities,
} from "@/data/portfolioData";

const identityIcons = {
  engineer: Code2,
  securiste: ShieldCheck,
  entrepreneur: Rocket,
};

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Section Hero (Accueil)                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-12 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Colonne Gauche : Présentation et Textes */}
          <div className="z-10 animate-fade-up opacity-0 [animation-delay:0.05s]">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              {personalInfo.roles.join(" · ")}
            </p>
            <h1 className="mt-4 text-balance font-sans text-4xl font-bold leading-[1.1] text-paper sm:text-5xl">
              {personalInfo.name}
            </h1>
            <p className="mt-6 max-w-xl text-balance font-sans text-lg leading-relaxed text-paper/70">
              {personalInfo.heroVision}
            </p>
            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-paper/50">
              {personalInfo.heroSubline}
            </p>

            {/* Boutons d'action (CTA) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-xl bg-cta-gradient px-5 py-3 font-sans text-sm font-semibold text-paper shadow-glow transition hover:brightness-110"
              >
                Voir les projets
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-sans text-sm font-semibold text-paper transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <Mail size={16} />
                Me contacter
              </Link>
            </div>

            {/* Badges d'identité (Ingénieur, Sécuriste, Entrepreneur) */}
            <div className="mt-10 flex flex-wrap gap-4">
              {aboutIdentities.map((identity) => {
                const Icon =
                  identityIcons[identity.key as keyof typeof identityIcons];
                return (
                  <div
                    key={identity.key}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-600/20 text-accent-300">
                      <Icon size={14} />
                    </span>
                    <span className="font-sans text-xs font-medium text-paper/75">
                      {identity.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne Droite : Composant Visuel Custom (HeroIllustration) */}
          <div className="animate-fade-up opacity-0 [animation-delay:0.15s]">
            <HeroIllustration />
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section : Projets en vedette (Featured projects)                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              Featured Projects
            </p>
            <h2 className="mt-2 font-sans text-2xl font-bold text-paper sm:text-3xl">
              Ce que j&apos;ai construit
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1 font-sans text-sm font-medium text-accent-300 hover:text-accent-200"
          >
            Tous les projets
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section : Vision & Philosophie DevSecOps                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/5 bg-ink-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
                Point de vue
              </p>
              <h2 className="mt-2 font-sans text-2xl font-bold text-paper sm:text-3xl">
                Développer en pensant sécurité, pas en la rattrapant
              </h2>
            </div>
            <div className="space-y-4 font-sans text-base leading-relaxed text-paper/65">
              <p>
                En 2026, la vitesse d&apos;expédition d&apos;un produit ne suffit plus à
                le rendre compétitif. Les équipes qui gagnent la confiance de
                leurs utilisateurs sont celles qui traitent la sécurité comme
                une exigence de conception dès le premier commit, pas comme
                une case à cocher avant la mise en production.
              </p>
              <p>
                C&apos;est la conviction qui guide mon travail : construire des
                interfaces soignées avec React et Next.js, tout en gardant les
                réflexes DevSecOps — gestion des secrets, durcissement des
                API, conteneurisation propre — au même niveau de priorité que
                l&apos;expérience utilisateur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section : Impact et preuves sociales (Social proof)              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {socialProof.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center shadow-card"
            >
              <p className="font-mono text-3xl font-bold text-accent-300">
                {item.stat}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-paper/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}