"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send, FileText, CheckCircle2 } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import { useResumeModal } from "@/components/ResumeModal";

export default function ContactPage() {
  const { openModal } = useResumeModal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact portfolio — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">
        Contact
      </p>
      <h1 className="mt-2 font-sans text-3xl font-bold text-paper sm:text-4xl">
        Discutons de votre projet
      </h1>
      <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-paper/65">
        Que ce soit pour une opportunité, une collaboration, ou une question
        sur un projet — je réponds à tous les messages.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card"
        >
          <div>
            <label
              htmlFor="name"
              className="font-sans text-xs font-medium text-paper/60"
            >
              Nom
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink px-4 py-2.5 font-sans text-sm text-paper placeholder:text-paper/30 focus:border-accent-500"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="font-sans text-xs font-medium text-paper/60"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-ink px-4 py-2.5 font-sans text-sm text-paper placeholder:text-paper/30 focus:border-accent-500"
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="font-sans text-xs font-medium text-paper/60"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-ink px-4 py-2.5 font-sans text-sm text-paper placeholder:text-paper/30 focus:border-accent-500"
              placeholder="Parlez-moi de votre projet ou de votre opportunité..."
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cta-gradient px-4 py-3 font-sans text-sm font-semibold text-paper shadow-glow transition hover:brightness-110"
          >
            {sent ? (
              <>
                <CheckCircle2 size={16} />
                Client mail ouvert
              </>
            ) : (
              <>
                <Send size={16} />
                Envoyer le message
              </>
            )}
          </button>
        </form>

        {/* Side info + resume CTA */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600/20 text-accent-300">
              <Mail size={16} />
            </span>
            <p className="mt-3 font-sans text-sm font-semibold text-paper">
              Écrire directement
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-1 block break-all font-mono text-xs text-accent-300 hover:text-accent-200"
            >
              {personalInfo.email}
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600/20 text-accent-300">
              <FileText size={16} />
            </span>
            <p className="mt-3 font-sans text-sm font-semibold text-paper">
              Vous recrutez ?
            </p>
            <p className="mt-1 font-sans text-sm leading-relaxed text-paper/55">
              Téléchargez la version du CV adaptée au poste que vous
              cherchez à pourvoir.
            </p>
            <button
              onClick={openModal}
              className="mt-4 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-sans text-sm font-medium text-paper transition hover:border-accent-500/50 hover:bg-accent-600/10"
            >
              <FileText size={14} />
              Télécharger le CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
