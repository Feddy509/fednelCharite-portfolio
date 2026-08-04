"use client";

import React from "react";
import { GraduationCap, Code2, ShieldCheck, Rocket, Clock, Award, CheckCircle2 } from "lucide-react";
import { certifications, portfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

const identityIcons: Record<string, React.ElementType> = {
  engineer: Code2,
  securiste: ShieldCheck,
  cloud: Rocket,
  entrepreneur: Rocket,
};

export default function AboutPage() {
  const { language } = useLanguage();
  const data = portfolioData?.[language] || portfolioData?.fr || {};

  const completed = (certifications || []).filter((c) => c?.status === "completed");
  const inProgress = (certifications || []).filter((c) => c?.status === "in-progress");

  // Diksyonè ti tèks estatik pou paj À propos / About
  const labels =
    {
      fr: {
        badge: "À propos",
        title: "Trois identités, un seul objectif : livrer un logiciel fiable",
        subtitle:
          "Je n'aborde pas le développement logiciel comme une seule discipline. Chaque projet passe par trois filtres : celui de l'ingénieur, celui du sécuriste, et celui de l'entrepreneur qui doit livrer quelque chose de réellement utilisable.",
        academic: "Parcours académique",
        certifications: "Certifications & Spécialisations",
        certSubtitle: "Formation continue, vérifiée et validée",
        inProgress: "En préparation & Certifications à venir",
      },
      en: {
        badge: "About",
        title: "Three identities, one goal: deliver reliable software",
        subtitle:
          "I don't approach software development as a single discipline. Every project goes through three filters: the engineer, the security practitioner, and the entrepreneur who needs to ship something truly usable.",
        academic: "Academic background",
        certifications: "Certifications & Specializations",
        certSubtitle: "Continuous learning, verified & validated",
        inProgress: "In progress & Upcoming certifications",
      },
    }[language] || {
      badge: "À propos",
      title: "Trois identités, un seul objectif : livrer un logiciel fiable",
      subtitle: "",
      academic: "Parcours académique",
      certifications: "Certifications & Spécialisations",
      certSubtitle: "Formation continue, vérifiée et validée",
      inProgress: "En préparation & Certifications à venir",
    };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* ---------------------------------------------------------------- */}
      {/* En-tête de la page (Aérée & Synthétique)                          */}
      {/* ---------------------------------------------------------------- */}
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

      {/* ---------------------------------------------------------------- */}
      {/* Triple identité (Grille Moderne & Aérée)                         */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {(data?.aboutIdentities || []).map((identity: any) => {
          const Icon = identityIcons[identity?.key as keyof typeof identityIcons] || Code2;
          return (
            <div
              key={identity?.key || identity?.title}
              className="group relative rounded-2xl border border-white/10 bg-ink-surface/40 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-glow"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300 transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </span>
              <h3 className="mt-6 font-sans text-lg font-bold text-paper">
                {identity?.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-paper/65">
                {identity?.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Parcours académique (Large Banner Card)                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          {labels.academic}
        </p>

        <div className="mt-6 flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-ink-surface/40 p-8 backdrop-blur-md sm:flex-row sm:items-center">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-600/20 text-accent-300 shadow-inner">
            <GraduationCap size={28} />
          </span>
          <div className="space-y-1">
            <h3 className="font-sans text-xl font-bold text-paper">
              {data?.education?.degree}
            </h3>
            <p className="font-sans text-sm font-medium text-paper/70">
              {data?.education?.school}
            </p>
            <p className="font-mono text-xs font-semibold text-accent-300">
              {data?.education?.status}
            </p>
            <p className="pt-2 font-sans text-sm leading-relaxed text-paper/60">
              {data?.education?.note}
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Certifications & Formations (Aérées)                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              {labels.certifications}
            </p>
            <h2 className="mt-2 font-sans text-2xl font-bold text-paper sm:text-3xl">
              {labels.certSubtitle}
            </h2>
          </div>
          <Award className="text-accent-300/40" size={32} />
        </div>

        {/* Certifications Complétées */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {completed.map((cert) => (
            <div
              key={cert.name}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-500/30 hover:bg-white/[0.06]"
            >
              <div className="space-y-1">
                <p className="font-sans text-sm font-semibold text-paper group-hover:text-accent-300 transition-colors">
                  {cert.name}
                </p>
                <p className="font-mono text-xs text-paper/50">{cert.issuer}</p>
              </div>
              <CheckCircle2 size={18} className="shrink-0 text-accent-400" />
            </div>
          ))}
        </div>

        {/* Certifications En Cours */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-paper/50">
            <Clock size={16} className="text-accent-300" />
            <p className="font-mono text-xs uppercase tracking-wider text-paper/60">
              {labels.inProgress}
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {inProgress.map((cert) => (
              <div
                key={cert.name}
                className="rounded-xl border border-dashed border-white/20 bg-white/[0.01] p-5 transition hover:border-accent-400/40"
              >
                <p className="font-sans text-sm font-medium text-paper/85">
                  {cert.name}
                </p>
                <p className="mt-1 font-mono text-xs text-paper/40">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}