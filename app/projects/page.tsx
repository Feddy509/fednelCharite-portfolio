"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, ShieldCheck, Award } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projects, skills, type ProjectCategory, type Skill } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

type FilterKey = "all" | ProjectCategory;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "full-stack", label: "Full-Stack" },
  { key: "security", label: "DevSecOps / Security" },
  { key: "mobile-cloud", label: "Mobile / Cloud" },
];

const skillGroups: { key: Skill["category"]; label: string; icon: typeof Code2 }[] = [
  { key: "frontend", label: "Frontend", icon: Code2 },
  { key: "backend", label: "Backend", icon: Server },
  { key: "security", label: "Security / DevOps", icon: ShieldCheck },
  { key: "certification", label: "Certifications", icon: Award },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
        Projets &amp; Compétences
      </p>
      <h1 className="mt-2 font-sans text-3xl font-bold text-paper sm:text-4xl">
        Études de cas, pas juste une liste de liens
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-paper/65">
        Chaque projet est présenté sous forme de problème résolu — parce
        qu&apos;un lien GitHub seul ne raconte jamais toute l&apos;histoire.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "rounded-full border px-4 py-2 font-sans text-sm font-medium transition",
              activeFilter === f.key
                ? "border-accent-500 bg-accent-600/15 text-paper"
                : "border-white/10 bg-white/[0.02] text-paper/55 hover:border-white/20 hover:text-paper"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div
        layout
        className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <p className="mt-10 font-sans text-sm text-paper/50">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}

      {/* Skills */}
      <div className="mt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          Compétences
        </p>
        <h2 className="mt-2 font-sans text-2xl font-bold text-paper">
          La boîte à outils
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-card"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600/20 text-accent-300">
                  <group.icon size={15} />
                </span>
                <p className="font-sans text-sm font-semibold text-paper">
                  {group.label}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {skills
                  .filter((s) => s.category === group.key)
                  .map((s) => (
                    <li
                      key={s.name}
                      className="font-mono text-xs text-paper/60"
                    >
                      {s.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
