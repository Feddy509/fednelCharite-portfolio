"use client";

/**
 * ==============================================================================
 * FR: Composant Carte de Projet / ProjectCard (Client Component)
 * EN: Project Card Component / ProjectCard (Client Component)
 * ==============================================================================
 * 
 * FR: Affiche un projet individuel avec sa stack technique, son problème/solution
 *     et offre des déclencheurs pour ouvrir la modale d'étude de cas (Case Study).
 * EN: Displays an individual project with tech stack, problem/solution overview,
 *     and provides triggers to open the case study details modal.
 */

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Clock, BookOpen } from "lucide-react";
import type { Project } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * FR: Définition des propriétés transmises au composant ProjectCard
 * EN: Interface props definition for the ProjectCard component
 */
interface ProjectCardProps {
  project: Project;
  onOpenDetails?: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  // FR: Extraction de la langue actuelle depuis le contexte
  // EN: Extract current active language from context
  const { language } = useLanguage();

  const categories = project.categories || [];
  const stackList = project.stack || [];
  const description = project.tagline || "";

  // FR: Étiquettes bilingues pour les catégories de projets
  // EN: Bilingual category labels mapping
  const categoryLabels: Record<string, { fr: string; en: string }> = {
    "full-stack": { fr: "Full-Stack", en: "Full-Stack" },
    security: { fr: "DevSecOps / Sécurité", en: "DevSecOps / Security" },
    "mobile-cloud": { fr: "Mobile / Cloud", en: "Mobile / Cloud" },
  };

  // FR: Dictionnaire d'interface bilingue pour la carte
  // EN: Bilingual UI string labels
  const labels = {
    fr: {
      problem: "Problème",
      solution: "Solution",
      viewSite: "Voir le site",
      code: "Code",
      details: "Détails & Architecture",
      comingSoon: "Lien à venir",
    },
    en: {
      problem: "Problem",
      solution: "Solution",
      viewSite: "Visit website",
      code: "Code",
      details: "Case Study & Architecture",
      comingSoon: "Link coming soon",
    },
  }[language] || {
    problem: "Problème",
    solution: "Solution",
    viewSite: "Voir le site",
    code: "Code",
    details: "Détails & Architecture",
    comingSoon: "Lien à venir",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-sm transition-all hover:border-accent-500/40 hover:shadow-glow"
    >
      <div>
        {/* ------------------------------------------------------------------ */}
        {/* 1. BADGES DE CATÉGORIES & DÉCLENCHEUR RAPIDE CASE STUDY            */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-accent-300"
              >
                {categoryLabels[cat]?.[language as "fr" | "en"] ?? cat}
              </span>
            ))}
          </div>

          {/* FR: Bouton d'accès rapide à l'étude de cas / EN: Quick Case Study trigger button */}
          {onOpenDetails && (
            <button
              onClick={() => onOpenDetails(project)}
              className="flex items-center gap-1 rounded-lg border border-accent-500/20 bg-accent-500/10 px-2.5 py-1 font-sans text-xs font-medium text-accent-300 transition hover:bg-accent-500/20 cursor-pointer"
            >
              <BookOpen size={13} />
              <span>Case Study</span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. TITRE ET DESCRIPTION DU PROJET / TITLE & DESCRIPTION            */}
        {/* ------------------------------------------------------------------ */}
        <h3
          onClick={() => onOpenDetails && onOpenDetails(project)}
          className="mt-4 cursor-pointer font-card text-lg sm:text-xl font-bold text-paper transition-colors group-hover:text-accent-300"
        >
          {project.title}
        </h3>

        <p className="mt-2 font-sans text-sm sm:text-base leading-relaxed text-paper/75">
          {description}
        </p>

        {/* ------------------------------------------------------------------ */}
        {/* 3. SECTION PROBLÈME & SOLUTION / PROBLEM & SOLUTION OVERVIEW      */}
        {/* ------------------------------------------------------------------ */}
        {(project.problem || project.solution) && (
          <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
            {project.problem && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  {labels.problem}
                </p>
                <p className="mt-0.5 font-sans text-xs sm:text-sm leading-relaxed text-paper/65 line-clamp-2">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  {labels.solution}
                </p>
                <p className="mt-0.5 font-sans text-xs sm:text-sm leading-relaxed text-paper/65 line-clamp-2">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        {/* ------------------------------------------------------------------ */}
        {/* 4. BADGES DE LA STACK TECHNIQUE / TECH STACK BADGES                */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {stackList.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/[0.05] border border-white/5 px-2 py-1 font-mono text-[10px] text-paper/65"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 5. LIENS EXTERNES ET DÉCLENCHEUR PRINCIPAL DE MODALE              */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-sans text-xs sm:text-sm font-semibold text-accent-300 transition hover:text-accent-200"
              >
                {labels.viewSite}
                <ArrowUpRight size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-sans text-xs sm:text-sm font-semibold text-paper/60 transition hover:text-paper"
              >
                <Github size={14} />
                {labels.code}
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span className="flex items-center gap-1.5 font-sans text-xs sm:text-sm text-paper/35">
                <Clock size={13} />
                {labels.comingSoon}
              </span>
            )}
          </div>

          {/* FR: Lien d'ouverture de la modale de détails d'architecture */}
          {/* EN: Trigger link to open detailed architecture modal */}
          {onOpenDetails && (
            <button
              onClick={() => onOpenDetails(project)}
              className="flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-300 transition hover:underline cursor-pointer"
            >
              <BookOpen size={14} />
              <span>{labels.details}</span>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}