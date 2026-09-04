"use client";

/**
 * ==============================================================================
 * FR: Composant Modale de Détails d'Étude de Cas (Client Component)
 * EN: Project Case Study & Architecture Modal Component (Client Component)
 * ==============================================================================
 * 
 * FR: Affiche une fenêtre modale détaillée présentant l'architecture technique,
 *     les choix DevSecOps, les défis et la stack d'un projet sélectionné.
 * EN: Displays a detailed modal window presenting technical architecture,
 *     DevSecOps security posture, challenges, and tech stack for a selected project.
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ShieldAlert, Cpu, CheckCircle, Wrench } from "lucide-react";
import { portfolioData, type Project } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * FR: Propriétés du composant Modale de détails de projet
 * EN: Props interface for ProjectDetailsModal component
 */
interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  // FR: Contexte de langue actuelle
  // EN: Active language context
  const { language } = useLanguage();

  if (!project) return null;

  // FR: Récupération des libellés UI centralisés depuis portfolioData.ts
  // EN: Retrieve centralized UI labels from portfolioData.ts
  const safeLang = language === "en" || language === "fr" ? language : "fr";
  const labels = portfolioData[safeLang].uiLabels.caseStudyModal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* ------------------------------------------------------------------ */}
        {/* 1. FOND DE FLOU ET D'OMBRE / BACKDROP                              */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* ------------------------------------------------------------------ */}
        {/* 2. FENÊTRE PRINCIPALE DE LA MODALE / MAIN MODAL CONTAINER          */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 my-auto flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1329] shadow-2xl"
        >
          {/* FR: EN-TÊTE FIXE (Toujours visible) / EN: FIXED HEADER (Always visible) */}
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper/60 transition hover:bg-white/10 hover:text-paper cursor-pointer"
              aria-label={labels.close}
            >
              <X size={18} />
            </button>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* 3. CORPS DÉROULANT DE LA MODALE / SCROLLABLE MODAL BODY            */}
          {/* ------------------------------------------------------------------ */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-paper/70">
              {project.tagline}
            </p>

            {/* FR: Section Problème & Solution / EN: Problem & Solution Section */}
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

            {/* FR: Section Architecture / EN: Architecture Section */}
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

            {/* FR: Fonctionnalités Clés / EN: Key Features */}
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

            {/* FR: Défis Techniques / EN: Technical Challenges */}
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

            {/* FR: Posture Sécurité DevSecOps / EN: DevSecOps Security Posture */}
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

            {/* FR: Stack Technique / EN: Tech Stack */}
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

          {/* ------------------------------------------------------------------ */}
          {/* 4. PIED DE PAGE FIXE (BOUTONS D'ACTION) / FIXED FOOTER             */}
          {/* ------------------------------------------------------------------ */}
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
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-medium text-paper/70 transition hover:bg-white/10 hover:text-paper cursor-pointer"
            >
              {labels.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}