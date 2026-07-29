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
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur-sm transition-colors hover:border-accent-500/40"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {project.categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-accent-300"
          >
            {categoryLabels[cat] ?? cat}
          </span>
        ))}
      </div>

      <h3 className="mt-4 font-sans text-lg font-semibold text-paper">
        {project.title}
      </h3>
      <p className="mt-1.5 font-sans text-sm leading-relaxed text-paper/60">
        {project.tagline}
      </p>

      <div className="mt-5 space-y-3 border-t border-white/5 pt-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-paper/35">
            Problème
          </p>
          <p className="mt-1 font-sans text-sm leading-relaxed text-paper/70">
            {project.problem}
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-paper/35">
            Solution
          </p>
          <p className="mt-1 font-sans text-sm leading-relaxed text-paper/70">
            {project.solution}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-ink-surface px-2 py-1 font-mono text-[11px] text-paper/65"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-sans text-sm font-medium text-accent-300 transition hover:text-accent-200"
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
            className="flex items-center gap-1 font-sans text-sm font-medium text-paper/60 transition hover:text-paper"
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
    </motion.article>
  );
}
