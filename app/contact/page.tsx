"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send, FileText, CheckCircle2, ArrowRight, MessageSquare, Linkedin, Github } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { useResumeModal } from "@/components/ResumeModal";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactPage() {
  const { openModal } = useResumeModal();
  const { language } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const labels = {
    fr: {
      badge: "CONTACT & COLLABORATION",
      status: "Disponible pour de nouvelles opportunités",
      title: "Parlons de votre projet ou opportunité",
      subtitle:
        "Que ce soit pour un recrutement (Full-Stack / DevSecOps), une collaboration ou une question technique - je vous réponds généralement sous 24 heures.",
      nameLabel: "Nom complet",
      namePlaceholder: "Ex: Jean Lucien",
      emailLabel: "Adresse email",
      emailPlaceholder: "vous@exemple.com",
      messageLabel: "Message",
      messagePlaceholder: "Décrivez votre projet, le poste à pourvoir ou votre question...",
      btnSend: "Envoyer le message",
      btnSent: "Client mail ouvert",
      directEmailTitle: "Écrire directement",
      hiringTitle: "Vous recrutez ?",
      hiringDesc:
        "Téléchargez la version du CV adaptée au profil que vous cherchez à pourvoir.",
      btnResume: "Télécharger le CV",
      socialTitle: "Réseaux professionnels",
      socialDesc: "Rejoignez-moi sur LinkedIn ou consultez mes dépôts GitHub.",
    },
    en: {
      badge: "CONTACT & COLLABORATION",
      status: "Available for new opportunities",
      title: "Let's discuss your project or opportunity",
      subtitle:
        "Whether it's for a hiring opportunity (Full-Stack / DevSecOps), a collaboration, or a technical inquiry - I typically respond within 24 hours.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g., Jean Lucien",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project, the job opening, or your inquiry...",
      btnSend: "Send Message",
      btnSent: "Mail client opened",
      directEmailTitle: "Write directly",
      hiringTitle: "Are you hiring?",
      hiringDesc:
        "Download the version of the resume tailored to the position you are looking to fill.",
      btnResume: "Download Resume",
      socialTitle: "Professional Networks",
      socialDesc: "Connect with me on LinkedIn or check my GitHub repositories.",
    },
  }[language] || {
    badge: "CONTACT & COLLABORATION",
    status: "Disponible pour de nouvelles opportunités",
    title: "Parlons de votre projet ou opportunité",
    subtitle:
      "Que ce soit pour un recrutement (Full-Stack / DevSecOps), une collaboration ou une question technique - je vous réponds généralement sous 24 heures.",
    nameLabel: "Nom complet",
    namePlaceholder: "Ex: Jean Lucien",
    emailLabel: "Adresse email",
    emailPlaceholder: "vous@exemple.com",
    messageLabel: "Message",
    messagePlaceholder: "Décrivez votre projet, le poste à pourvoir ou votre question...",
    btnSend: "Envoyer le message",
    btnSent: "Client mail ouvert",
    directEmailTitle: "Écrire directement",
    hiringTitle: "Vous recrutez ?",
    hiringDesc:
      "Téléchargez la version du CV adaptée au profil que vous cherchez à pourvoir.",
    btnResume: "Télécharger le CV",
    socialTitle: "Réseaux professionnels",
    socialDesc: "Rejoignez-moi sur LinkedIn ou consultez mes dépôts GitHub.",
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact portfolio - ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-6 pb-16 sm:pt-8 sm:pb-24 font-sans text-paper">
      {/* ---------------------------------------------------------------- */}
      {/* En-tête de la page                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400 mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {labels.status}
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
          {labels.badge}
        </p>
        <h1 className="mt-2 font-sans text-3xl font-extrabold leading-tight text-paper sm:text-4xl lg:text-5xl">
          {labels.title}
        </h1>
        <p className="mt-4 font-sans text-base leading-relaxed text-paper/75 sm:text-lg">
          {labels.subtitle}
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Section Formulaire & Sidebar                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        {/* Formulaire de contact */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-ink-surface/40 p-8 backdrop-blur-md shadow-card transition-all"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="font-sans text-xs font-semibold uppercase tracking-wider text-paper/70"
              >
                {labels.nameLabel}
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-sans text-sm text-paper placeholder:text-paper/30 transition focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                placeholder={labels.namePlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-sans text-xs font-semibold uppercase tracking-wider text-paper/70"
              >
                {labels.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-sans text-sm text-paper placeholder:text-paper/30 transition focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                placeholder={labels.emailPlaceholder}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="font-sans text-xs font-semibold uppercase tracking-wider text-paper/70"
            >
              {labels.messageLabel}
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-sans text-sm text-paper placeholder:text-paper/30 transition focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              placeholder={labels.messagePlaceholder}
            />
          </div>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-cta-gradient px-6 py-4 font-sans text-sm font-semibold text-paper shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(10,107,255,0.6)] active:scale-95"
          >
            {sent ? (
              <>
                <CheckCircle2 size={18} className="text-accent-300" />
                {labels.btnSent}
              </>
            ) : (
              <>
                <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                {labels.btnSend}
              </>
            )}
          </button>
        </form>

        {/* Sidebar Info + Resume CTA + Socials */}
        <div className="space-y-6">
          {/* Email Direct */}
          <div className="group rounded-2xl border border-white/10 bg-ink-surface/40 p-8 backdrop-blur-md shadow-card transition hover:border-accent-500/30">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300 transition-transform duration-300 group-hover:scale-110">
              <Mail size={20} />
            </span>
            <p className="mt-5 font-sans text-base font-bold text-paper">
              {labels.directEmailTitle}
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-2 block break-all font-mono text-sm font-medium text-accent-300 hover:text-accent-200 hover:underline"
            >
              {personalInfo.email}
            </a>
          </div>

          {/* Hiring / Resume Modal Card */}
          <div className="group rounded-2xl border border-white/10 bg-ink-surface/40 p-8 backdrop-blur-md shadow-card transition hover:border-accent-500/30">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300 transition-transform duration-300 group-hover:scale-110">
              <FileText size={20} />
            </span>
            <p className="mt-5 font-sans text-base font-bold text-paper">
              {labels.hiringTitle}
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-paper/65">
              {labels.hiringDesc}
            </p>
            <button
              onClick={openModal}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-sans text-sm font-semibold text-paper transition-all duration-300 hover:scale-105 hover:border-accent-400/50 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <FileText size={16} />
              {labels.btnResume}
              <ArrowRight size={14} className="opacity-60" />
            </button>
          </div>

          {/* Social Networks Card */}
          <div className="group rounded-2xl border border-white/10 bg-ink-surface/40 p-8 backdrop-blur-md shadow-card transition hover:border-accent-500/30">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-600/20 text-accent-300 transition-transform duration-300 group-hover:scale-110">
              <MessageSquare size={20} />
            </span>
            <p className="mt-5 font-sans text-base font-bold text-paper">
              {labels.socialTitle}
            </p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-paper/65">
              {labels.socialDesc}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-paper/80 hover:text-paper hover:border-accent-400/50 transition"
              >
                <Linkedin size={14} className="text-accent-300" /> LinkedIn
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-paper/80 hover:text-paper hover:border-accent-400/50 transition"
              >
                <Github size={14} className="text-accent-300" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}