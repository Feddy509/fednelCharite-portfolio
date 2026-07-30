"use client";

import Link from "next/link";
import { Github, Linkedin, Globe, Mail } from "lucide-react";
import { portfolioData, personalInfo } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const data = portfolioData[language];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 bg-ink/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="font-sans text-base font-semibold text-paper"
            >
              {personalInfo.name}
            </Link>
            <p className="mt-2 font-sans text-sm leading-relaxed text-paper/55">
              {data.personalInfo.roles.join(" · ")}
            </p>
          </div>

          <div className="flex items-center gap-4 text-paper/60">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition hover:bg-white/5 hover:text-paper"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 transition hover:bg-white/5 hover:text-paper"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-lg p-2 transition hover:bg-white/5 hover:text-paper"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center font-mono text-xs text-paper/40">
          © {currentYear} {personalInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}