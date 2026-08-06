"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send, FileText, CheckCircle2, ArrowRight } from "lucide-react";
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
      badge: "Contact",
      title: "Discutons de votre projet",
      subtitle:
        "Que ce soit pour une opportunité, une collaboration, ou une question sur un projet - je réponds à tous les messages.",
      nameLabel: "Nom",
      namePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "vous@exemple.com",
      messageLabel: "Message",
      messagePlaceholder: "Parlez-moi de votre projet ou de votre opportunité...",
      btnSend: "Envoyer le message",
      btnSent: "Client mail ouvert",
      directEmailTitle: "Écrire directement",
      hiringTitle: "Vous recrutez ?",
      hiringDesc:
        "Téléchargez la version du CV adaptée au poste que vous cherchez à pourvoir.",
      btnResume: "Télécharger le CV",
    },
    en: {
      badge: "Contact",
      title: "Let's discuss your project",
      subtitle:
        "Whether it's for an opportunity, a collaboration, or a question about a project - I respond to all messages.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project or opportunity...",
      btnSend: "Send Message",
      btnSent: "Mail client opened",
      directEmailTitle: "Write directly",
      hiringTitle: "Are you hiring?",
      hiringDesc:
        "Download the version of the resume tailored to the position you are looking to fill.",
      btnResume: "Download Resume",
    },
  }[language];

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
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* ---------------------------------------------------------------- */}
      {/* En-tête de la page (Aérée)                                       */}
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
      {/* Section Formulaire & Sidebar (Grille Large)                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
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

        {/* Sidebar Info + Resume CTA */}
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
        </div>
      </div>
    </div>
  );
}