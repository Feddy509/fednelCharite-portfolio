"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Clock } from "lucide-react";
import type { Project } from "@/data/portfolioData";

const categoryLabels: Record<string, string> = {
  "full-stack": "Full-Stack",
  security: "DevSecOps / Sécurité",
  "mobile-cloud": "Mobile / Cloud",
};

export default function ProjectCard({ project }: { project: Project }) {
  // Ranje aksè ak pwopriyete yo san okenn erè TypeScript
  const categories = project.categories || [];
  const stackList = project.stack || [];
  const description = project.tagline || "";

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
        {/* Badges de catégories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-accent-300"
            >
              {categoryLabels[cat] ?? cat}
            </span>
          ))}
        </div>

        {/* Titre */}
        <h3 className="mt-4 font-sans text-lg font-bold text-paper group-hover:text-accent-300 transition-colors">
          {project.title}
        </h3>

        {/* Tagline / Description */}
        <p className="mt-2 font-sans text-sm leading-relaxed text-paper/70">
          {description}
        </p>

        {/* Problème & Solution */}
        {(project.problem || project.solution) && (
          <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
            {project.problem && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  Problème
                </p>
                <p className="mt-0.5 font-sans text-xs leading-relaxed text-paper/60 line-clamp-2">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-paper/40">
                  Solution
                </p>
                <p className="mt-0.5 font-sans text-xs leading-relaxed text-paper/60 line-clamp-2">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        {/* Stack Technique Badges */}
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

        {/* Liens externes */}
        <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-sans text-xs font-semibold text-accent-300 transition hover:text-accent-200"
            >
              Voir le site
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-sans text-xs font-semibold text-paper/60 transition hover:text-paper"
            >
              <Github size={14} />
              Code
            </a>
          )}
          {!project.liveUrl && !project.githubUrl && (
            <span className="flex items-center gap-1.5 font-sans text-xs text-paper/35">
              <Clock size={13} />
              Lien à venir
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}