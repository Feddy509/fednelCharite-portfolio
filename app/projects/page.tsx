"use client";

/**
 * ==============================================================================
 * FR: Page "Projets & Réalisations" du Portfolio (Next.js Client Component)
 * EN: Portfolio "Projects & Work" Page (Next.js Client Component)
 * ==============================================================================
 * 
 * FR: Affiche la galerie de projets filtrable, la boîte à outils des compétences
 *     et gère la modale de détails des projets (case studies).
 * EN: Displays the filterable project gallery, technical toolbox,
 *     and handles the project details modal (case studies).
 */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, ShieldCheck, Award, Sparkles, Cpu } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import { skills, portfolioData, type ProjectCategory, type Skill, type Project } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * FR: Type local pour la clé de filtrage des projets.
 * EN: Local type for project filter key.
 */
type FilterKey = "all" | Exclude<ProjectCategory, "mobile-cloud">;

export default function ProjectsPage() {
  // FR: Contexte de langue et récupération des données du portfolio
  // EN: Language context and portfolio data retrieval
  const { language } = useLanguage();
  const data = portfolioData[language] || portfolioData.fr;
  
  // FR: État pour la catégorie de filtre active
  // EN: State for the active category filter
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  
  // FR: État pour contrôler l'ouverture de la modale et le projet sélectionné
  // EN: State to control modal visibility and selected project
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // FR: Dictionnaire de chaînes de caractères bilingues
  // EN: Bilingual UI strings dictionary
  const labels =
    {
      fr: {
        badge: "PROJETS & RÉALISATIONS",
        title: "Ingénierie logicielle & Architecture applicative",
        subtitle:
          "Chaque projet est conçu comme une solution bout-en-bout - de la modélisation du problème au déploiement sécurisé.",
        empty: "Aucun projet dans cette catégorie pour le moment.",
        skillsBadge: "Compétences & Stack Technique",
        skillsTitle: "La boîte à outils",
        filters: {
          all: "Tout",
          "full-stack": "Full-Stack",
          security: "DevSecOps / Sécurité",
        },
      },
      en: {
        badge: "PROJECTS & ENGINEERING WORK",
        title: "Software Engineering & Application Architecture",
        subtitle:
          "Every project is engineered as an end-to-end solution - from problem scoping to production-ready deployment.",
        empty: "No projects in this category at the moment.",
        skillsBadge: "Skills & Tech Stack",
        skillsTitle: "The Toolbox",
        filters: {
          all: "All",
          "full-stack": "Full-Stack",
          security: "DevSecOps / Security",
        },
      },
    }[language] || {
      badge: "PROJETS & RÉALISATIONS",
      title: "Ingénierie logicielle & Architecture applicative",
      subtitle:
        "Chaque projet est conçu comme une solution bout-en-bout - de la modélisation du problème au déploiement sécurisé.",
      empty: "Aucun projet dans cette catégorie pour le moment.",
      skillsBadge: "Compétences & Stack Technique",
      skillsTitle: "La boîte à outils",
      filters: {
        all: "Tout",
        "full-stack": "Full-Stack",
        security: "DevSecOps / Sécurité",
      },
    };

  // FR: Liste des filtres disponibles pour l'interface
  // EN: Available filters list for the UI
  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: labels.filters.all },
    { key: "full-stack", label: labels.filters["full-stack"] },
    { key: "security", label: labels.filters.security },
  ];

  // FR: Regroupement des compétences techniques par catégorie avec leurs icônes
  // EN: Technical skill grouping by category with icons
  const skillGroups: { key: Skill["category"]; label: string; icon: typeof Code2 }[] = [
    { key: "frontend", label: "Frontend", icon: Code2 },
    { key: "backend", label: "Backend", icon: Server },
    { key: "security", label: "DevSecOps & Security", icon: ShieldCheck },
    { key: "other", label: "Fondations & Autres", icon: Cpu },
    { key: "certification", label: "Certifications", icon: Award },
  ];

  // FR: Projets filtrés avec mémoïsation pour éviter des recalculs à chaque rendu
  // EN: Memoized filtered projects to avoid unnecessary recalculations on re-render
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return data.projects;
    return data.projects.filter((p) => p.categories.includes(activeFilter as any));
  }, [activeFilter, data.projects]);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 pb-16 sm:pt-8 sm:pb-24 font-sans text-paper">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. EN-TÊTE DE LA PAGE / PAGE HEADER                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          {labels.badge}
        </p>
        <h1 className="mt-3 font-sans text-3xl font-extrabold leading-tight text-paper sm:text-4xl lg:text-5xl">
          {labels.title}
        </h1>
        <p className="mt-6 font-sans text-base leading-relaxed text-paper/75 sm:text-lg">
          {labels.subtitle}
        </p>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. BARRE DE FILTRES / FILTER BAR                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-10 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "rounded-xl border px-5 py-2.5 font-sans text-sm font-semibold transition-all duration-300 active:scale-95",
              activeFilter === f.key
                ? "border-accent-400/80 bg-accent-600/20 text-paper shadow-[0_0_20px_rgba(10,107,255,0.4)]"
                : "border-white/10 bg-white/[0.03] text-paper/60 hover:border-white/25 hover:bg-white/[0.07] hover:text-paper"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. GRILLE DES PROJETS ANIMÉE / ANIMATED PROJECTS GRID             */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        layout
        className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpenDetails={(p) => setSelectedProject(p)}
          />
        ))}
      </motion.div>

      {/* FR: Message si aucun projet ne correspond au filtre sélectionné */}
      {/* EN: Message displayed if no project matches the selected filter */}
      {filteredProjects.length === 0 && (
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="font-sans text-sm text-paper/50">
            {labels.empty}
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. SECTION COMPÉTENCES / TOOLBOX & TECH STACK                      */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-24 border-t border-white/10 pt-16">
        <div className="flex items-center gap-2">
          <Sparkles className="text-accent-300" size={18} />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
            {labels.skillsBadge}
          </p>
        </div>
        <h2 className="mt-3 font-sans text-2xl font-bold text-paper sm:text-3xl">
          {labels.skillsTitle}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              className="group rounded-2xl border border-white/10 bg-ink-surface/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300 transition-transform group-hover:scale-110">
                  <group.icon size={18} />
                </span>
                <p className="font-sans text-sm font-bold text-paper">
                  {group.label}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-4">
                {skills
                  .filter((s) => s.category === group.key)
                  .map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-2 font-mono text-xs text-paper/70 transition-colors group-hover:text-paper"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400/60" />
                      {s.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. MODALE DE DÉTAILS DE PROJET / PROJECT DETAILS MODAL             */}
      {/* ------------------------------------------------------------------ */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}