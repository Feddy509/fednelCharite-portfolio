"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GraduationCap, Code2, ShieldCheck, Cloud, Clock, Award, CheckCircle2, UserCheck, X, Eye, FileText, Loader2 } from "lucide-react";
import { certifications, portfolioData, Certification } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

const identityIcons: Record<string, React.ElementType> = {
  engineer: Code2,
  securiste: ShieldCheck,
  cloud: Cloud,
};

export default function AboutPage() {
  const { language } = useLanguage();
  const data = portfolioData?.[language] || portfolioData?.fr || {};

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Sètifika konplè ak sa k gen pousantaj ( progress ) yo
  const completedOrActive = (certifications || []).filter(
    (c) => c?.status === "completed" || (c?.status === "in-progress" && c?.progress)
  );

  // Sètifika ki anba nèt yo (CompTIA, AWS, Azure - san pousantaj)
  const upcoming = (certifications || []).filter(
    (c) => c?.status === "in-progress" && !c?.progress
  );

  const isEn = language === "en";

  const labels =
    {
      fr: {
        badge: "À propos",
        pillarsTitle: "Trois piliers techniques, un seul objectif : livrer des logiciels fiables",
        academic: "Parcours académique",
        certifications: "Certifications & Spécialisations",
        certSubtitle: "Formation continue, vérifiée et validée",
        inProgress: "En préparation & Certifications à venir",
        viewCert: "Voir le certificat / statut",
        openPdf: "Ouvrir le document PDF",
        close: "Fermer",
      },
      en: {
        badge: "About",
        pillarsTitle: "Three core engineering pillars, one goal: shipping reliable software",
        academic: "Academic background",
        certifications: "Certifications & Specializations",
        certSubtitle: "Continuous learning, verified & validated",
        inProgress: "In progress & Upcoming certifications",
        viewCert: "View certificate / status",
        openPdf: "Open PDF Document",
        close: "Close",
      },
    }[language] || {
      badge: "À propos",
      pillarsTitle: "Trois piliers techniques, un seul objectif : livrer des logiciels fiables",
      academic: "Parcours académique",
      certifications: "Certifications & Spécialisations",
      certSubtitle: "Formation continue, vérifiée et validée",
      inProgress: "En préparation & Certifications à venir",
      viewCert: "Voir le certificat / statut",
      openPdf: "Ouvrir le document PDF",
      close: "Fermer",
    };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 font-sans text-paper">
      
      {/* ---------------------------------------------------------------- */}
      {/* 1. SEKSYON BIOGRAFIC ANLE NET                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="rounded-3xl border border-white/10 bg-ink-surface/50 p-8 sm:p-12 backdrop-blur-xl shadow-glow">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
              {labels.badge}
            </p>
            <h1 className="mt-2 font-sans text-2xl font-extrabold text-paper sm:text-3xl lg:text-4xl">
              {data?.personalBio?.title}
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600/20 text-accent-300">
            <UserCheck size={26} />
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-paper/80 sm:text-base">
          <p className="font-medium text-paper">
            {data?.personalBio?.paragraph1}
          </p>
          <p>
            {data?.personalBio?.paragraph2}
          </p>
          <p className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs sm:text-sm text-paper/90 font-mono">
            {data?.personalBio?.paragraph3}
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. LES TROIS PILIERS                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-20">
        <h2 className="font-sans text-2xl font-bold text-paper sm:text-3xl">
          {labels.pillarsTitle}
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
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
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. PARCOURS ACADÉMIQUE                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-20">
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
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. CERTIFICATIONS & FORMATIONS (Cliquables pour Popup)           */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-20">
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

        {/* Lis Sètifika prensipal yo (Cliquable pou louvri imaj/pousantaj) */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {completedOrActive.map((cert) => {
            const isDone = cert.status === "completed";
            return (
              <div
                key={cert.name}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-500/50 hover:bg-white/[0.08] hover:scale-[1.02]"
              >
                <div className="space-y-1 pr-2">
                  <p className="font-sans text-sm font-semibold text-paper group-hover:text-accent-300 transition-colors">
                    {cert.name}
                  </p>
                  <p className="font-mono text-xs text-paper/50">{cert.issuer}</p>
                  
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-accent-400/80 pt-1">
                      <Eye size={12} /> {labels.viewCert}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 pt-1 font-mono">
                      <Loader2 size={12} className="animate-spin" /> En cours ({cert.progress}%)
                    </span>
                  )}
                </div>

                {isDone ? (
                  <CheckCircle2 size={20} className="shrink-0 text-accent-400" />
                ) : (
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400">
                    {cert.progress}%
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Certifications En Préparation à Venir (CompTIA, AWS, Azure - Rete jan yo ye a) */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-paper/50">
            <Clock size={16} className="text-accent-300" />
            <p className="font-mono text-xs uppercase tracking-wider text-paper/60">
              {labels.inProgress}
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {upcoming.map((cert) => (
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
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* MODAL POP-UP (Affiche l'image du certificat OU la barre %)       */}
      {/* ---------------------------------------------------------------- */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-3xl w-full rounded-2xl border border-white/10 bg-ink-surface p-6 shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-sans text-lg font-bold text-paper">
                  {selectedCert.name}
                </h3>
                <p className="font-mono text-xs text-accent-300">{selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-lg bg-white/10 p-2 text-paper hover:bg-white/20 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content: Si Complété -> Imaj / Si In-Progress -> Barre % */}
            <div className="relative min-h-[250px] w-full overflow-hidden rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center p-6">
              {selectedCert.status === "completed" ? (
                selectedCert.imageUrl ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={selectedCert.imageUrl}
                      alt={selectedCert.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center p-8 space-y-2">
                    <Award size={48} className="mx-auto text-accent-300" />
                    <p className="text-sm text-paper/70 font-sans">
                      {isEn
                        ? `Verified Certification issued by ${selectedCert.issuer}`
                        : `Certification officielle vérifiée délivrée par ${selectedCert.issuer}`}
                    </p>
                  </div>
                )
              ) : (
                /* Si c'est en progression */
                <div className="w-full max-w-md text-center space-y-5 p-4">
                  <div className="flex justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <Loader2 size={32} className="animate-spin" />
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans text-base font-bold text-paper">
                      {isEn ? "Certification in Progress" : "Formation en cours d'obtention"}
                    </h4>
                    <p className="text-xs text-paper/60 mt-1">
                      {isEn
                        ? "Currently completing final practical modules and projects."
                        : "Modules pratiques et projets d'évaluation finale en cours d'achèvement."}
                    </p>
                  </div>

                  {/* Ba de Pwogresyon % */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-paper/60">{isEn ? "Progression" : "Avancement"}</span>
                      <span className="text-amber-400 font-bold">{selectedCert.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${selectedCert.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer ak Bouton PDF si l ekziste */}
            <div className="flex items-center justify-between pt-2">
              {selectedCert.pdfUrl && selectedCert.status === "completed" ? (
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent-500/40 bg-accent-500/10 px-3.5 py-2 font-sans text-xs font-semibold text-accent-300 transition hover:bg-accent-500/20"
                >
                  <FileText size={14} />
                  {labels.openPdf}
                </a>
              ) : <div />}

              <button
                onClick={() => setSelectedCert(null)}
                className="rounded-lg bg-white/10 px-4 py-2 font-sans text-xs font-semibold text-paper hover:bg-white/20 transition"
              >
                {labels.close}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}