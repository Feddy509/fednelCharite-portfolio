"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ShieldAlert, Cpu, CheckCircle, Wrench } from "lucide-react";
import type { Project } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const { language } = useLanguage();

  if (!project) return null;

  const labels = {
    fr: {
      caseStudy: "Étude de cas & Architecture",
      problem: "Le Problème",
      solution: "La Solution",
      architecture: "Architecture & Conception",
      keyFeatures: "Fonctionnalités Clés",
      challenges: "Défis Techniques & Apprentissages",
      security: "Posture de Sécurité DevSecOps",
      techStack: "Technologies Utilisées",
      visitSite: "Visiter le site",
      viewCode: "Code source",
      close: "Fermer",
    },
    en: {
      caseStudy: "Case Study & Architecture",
      problem: "The Problem",
      solution: "The Solution",
      architecture: "Architecture & Design",
      keyFeatures: "Key Features",
      challenges: "Technical Challenges & Learnings",
      security: "DevSecOps Security Posture",
      techStack: "Tech Stack & Tools",
      visitSite: "Visit Website",
      viewCode: "Source Code",
      close: "Close",
    },
  }[language];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop (Fond flou ak nwa) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window ak max-h pou evite debòde sou mobil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-15 my-auto flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1329] shadow-2xl"
        >
          {/* HEADER FIKS (Pou bouton X la toujou vizib anwo sou mobil) */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0b1329]/95 backdrop-blur-md flex-shrink-0">
            <div>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent-300">
                {labels.caseStudy}
              </span>
              <h2 className="mt-0.5 font-sans text-xl sm:text-2xl font-extrabold text-paper">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper/60 transition hover:bg-white/10 hover:text-paper"
              aria-label={labels.close}
            >
              <X size={18} />
            </button>
          </div>

          {/* KÒ MODAL LA KI KA FÈ SCROLL PWÒP */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-paper/70">
              {project.tagline}
            </p>

            {/* Problème & Solution */}
            <div className="grid gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-red-400">
                  <ShieldAlert size={16} />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">
                    {labels.problem}
                  </h3>
                </div>
                <p className="mt-2 font-sans text-xs leading-relaxed text-paper/70">
                  {project.problem}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-accent-300">
                  <CheckCircle size={16} />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">
                    {labels.solution}
                  </h3>
                </div>
                <p className="mt-2 font-sans text-xs leading-relaxed text-paper/70">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture */}
            {project.architecture && (
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-accent-300">
                  <Cpu size={16} />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">
                    {labels.architecture}
                  </h3>
                </div>
                <p className="mt-2 font-sans text-xs leading-relaxed text-paper/75">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Fonctionnalités Clés */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-accent-300">
                  {labels.keyFeatures}
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 font-sans text-xs text-paper/75">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Défis Techniques (Koulye a entegre ak yon bèl estil pwòp ki pa gen gwo bwat vid ki fe l parèt diferan) */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <Cpu size={16} /> {labels.challenges}
                </div>
                <ul className="space-y-2">
                  {project.challenges.map((chal, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-paper/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      {chal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sécurité DevSecOps */}
            {project.securityFocus && (
              <div className="rounded-xl border border-accent-500/20 bg-accent-500/10 p-4">
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-accent-300">
                  {labels.security}
                </h3>
                <p className="mt-1.5 font-sans text-xs leading-relaxed text-paper/80">
                  {project.securityFocus}
                </p>
              </div>
            )}

            {/* Stack Technique */}
            <div>
              <div className="flex items-center gap-2 text-paper/60">
                <Wrench size={14} />
                <h3 className="font-mono text-xs uppercase tracking-wider font-semibold">
                  {labels.techStack}
                </h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-accent-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER FIKS AK ACTION BUTTONS (Asire bouton Close ak lyen yo toujou vizib) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 bg-[#0b1329]/95 backdrop-blur-md flex-shrink-0">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-cta-gradient px-4 py-2 font-sans text-xs font-semibold text-paper shadow-glow transition hover:scale-105"
                >
                  <ExternalLink size={14} />
                  {labels.visitSite}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-semibold text-paper transition hover:border-white/20 hover:bg-white/10"
                >
                  <Github size={14} />
                  {labels.viewCode}
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-medium text-paper/70 transition hover:bg-white/10 hover:text-paper"
            >
              {labels.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}