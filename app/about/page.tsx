"use client";

import { GraduationCap, Code2, ShieldCheck, Rocket, Clock } from "lucide-react";
import { certifications, portfolioData } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

const identityIcons = {
  engineer: Code2,
  securiste: ShieldCheck,
  entrepreneur: Rocket,
};

export default function AboutPage() {
  const { language } = useLanguage();
  const data = portfolioData[language];

  const completed = certifications.filter((c) => c.status === "completed");
  const inProgress = certifications.filter((c) => c.status === "in-progress");

  // Diksyonè ti tèks estatik pou paj À propos / About
  const labels = {
    fr: {
      badge: "À propos",
      title: "Trois identités, un seul objectif : livrer un logiciel fiable",
      subtitle:
        "Je n'aborde pas le développement logiciel comme une seule discipline. Chaque projet passe par trois filtres : celui de l'ingénieur, celui du sécuriste, et celui de l'entrepreneur qui doit livrer quelque chose de réellement utilisable.",
      academic: "Parcours académique",
      certifications: "Certifications",
      certSubtitle: "Formation continue, validée",
      inProgress: "En préparation",
    },
    en: {
      badge: "About",
      title: "Three identities, one goal: deliver reliable software",
      subtitle:
        "I don't approach software development as a single discipline. Every project goes through three filters: the engineer, the security practitioner, and the entrepreneur who needs to ship something truly usable.",
      academic: "Academic background",
      certifications: "Certifications",
      certSubtitle: "Continuous learning, verified",
      inProgress: "In progress",
    },
  }[language];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
        {labels.badge}
      </p>
      <h1 className="mt-2 font-sans text-3xl font-bold text-paper sm:text-4xl">
        {labels.title}
      </h1>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-paper/65">
        {labels.subtitle}
      </p>

      {/* Triple identity */}
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {data.aboutIdentities.map((identity) => {
          const Icon = identityIcons[identity.key as keyof typeof identityIcons];
          return (
            <div
              key={identity.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300">
                <Icon size={18} />
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold text-paper">
                {identity.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-paper/60">
                {identity.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Academic path */}
      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          {labels.academic}
        </p>
        <div className="mt-4 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300">
            <GraduationCap size={18} />
          </span>
          <div>
            <h3 className="font-sans text-base font-semibold text-paper">
              {data.education.degree}
            </h3>
            <p className="mt-0.5 font-sans text-sm text-paper/60">
              {data.education.school}
            </p>
            <p className="mt-2 font-mono text-xs text-accent-300">
              {data.education.status}
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-paper/55">
              {data.education.note}
            </p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          {labels.certifications}
        </p>
        <h2 className="mt-2 font-sans text-xl font-bold text-paper">
          {labels.certSubtitle}
        </h2>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {completed.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="font-sans text-sm font-medium text-paper">
                  {cert.name}
                </p>
                <p className="font-mono text-[11px] text-paper/45">{cert.issuer}</p>
              </div>
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent-400" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2">
          <Clock size={14} className="text-paper/40" />
          <p className="font-mono text-xs uppercase tracking-wider text-paper/40">
            {labels.inProgress}
          </p>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {inProgress.map((cert) => (
            <div
              key={cert.name}
              className="rounded-xl border border-dashed border-white/15 bg-transparent px-4 py-3"
            >
              <p className="font-sans text-sm font-medium text-paper/80">
                {cert.name}
              </p>
              <p className="font-mono text-[11px] text-paper/40">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}