"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, MessageSquareCode } from "lucide-react";
import { portfolioData, personalInfo } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsappIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.238-6.163-3.487-8.411" />
  </svg>
);

export default function Footer() {
  const { language } = useLanguage();
  const data = portfolioData?.[language] || portfolioData?.fr;

  const isEn = language === "en";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-b from-[#081226] via-[#060b18] to-[#04070e] font-sans text-paper">
      
      {/* Tras Blan Anlè a */}
      <div className="w-full h-[4px] bg-white/65 shadow-[0_0_10px_rgba(255,255,255,0.15)]" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
        
        {/* Griy 4 Kolòn */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 items-start xl:gap-12">
          
          {/* Kolòn 1: Identity & Description */}
          <div className="space-y-3.5">
            <Link
              href="/"
              className="font-heading text-xl font-extrabold text-paper transition hover:text-cyan-400"
            >
              {personalInfo.name}
            </Link>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              {data?.personalInfo?.roles?.join(" · ") || ""}
            </p>
            <p className="font-sans text-sm sm:text-base text-paper/75 leading-relaxed">
              {isEn
                ? "Building scalable, secure web systems with a focus on code quality and DevSecOps practices."
                : "Conception d'applications web sécurisées et évolutives, axées sur la qualité du code et la sécurité."}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-paper/85 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Github size={16} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-paper/85 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://x.com/fednelcharite"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-paper/85 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <XIcon size={14} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-paper/85 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Kolòn 2: Navigation */}
          <div className="space-y-4 lg:ml-12">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              NAVIGATION
            </h4>
            <ul className="space-y-3 text-sm text-paper/80">
              {[
                { href: "/", label: isEn ? "Home" : "Accueil" },
                { href: "/about", label: isEn ? "About" : "À propos" },
                { href: "/projects", label: isEn ? "Projects" : "Projets" },
                { href: "/contact", label: isEn ? "Contact" : "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group font-sans inline-flex items-center gap-2 transition hover:text-cyan-400 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight size={13} className="text-cyan-400/60 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolòn 3: Featured Systems */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              {isEn ? "FEATURED SYSTEMS" : "PROJETS PHARES"}
            </h4>
            <ul className="space-y-3 text-sm text-paper/80">
              <li>
                <a
                  href="https://zyeklere.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-sans inline-flex items-center gap-2 transition hover:text-cyan-400 hover:translate-x-1 duration-200"
                >
                  <ChevronRight size={13} className="text-cyan-400/60 group-hover:text-cyan-400" />
                  <span>Zye Klere</span>
                  <ExternalLink size={11} className="text-paper/40 group-hover:text-cyan-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://solutionstechhub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group font-sans inline-flex items-center gap-2 transition hover:text-cyan-400 hover:translate-x-1 duration-200"
                >
                  <ChevronRight size={13} className="text-cyan-400/60 group-hover:text-cyan-400" />
                  <span>Solutions Tech Hub</span>
                  <ExternalLink size={11} className="text-paper/40 group-hover:text-cyan-400" />
                </a>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="group font-sans inline-flex items-center gap-2 transition hover:text-cyan-400 hover:translate-x-1 duration-200"
                >
                  <ChevronRight size={13} className="text-cyan-400/60 group-hover:text-cyan-400" />
                  <span>Web Security Checker</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolòn 4: Contact & Direct WhatsApp Sync */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
              {isEn ? "DIRECT CONTACT" : "CONTACT DIRECT"}
            </h4>
            <div className="space-y-3 text-sm text-paper/80">
              <p className="font-sans text-xs sm:text-sm text-paper/75 leading-relaxed">
                {isEn
                  ? "Available for technical collaboration and engineering opportunities."
                  : "Disponible pour des collaborations techniques et opportunités."}
              </p>
              
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
                <MessageSquareCode size={12} className="text-emerald-400" />
                <span>{isEn ? "Quick Technical Sync" : "Échange Technique"}</span>
              </div>

              <div>
                <a
                  href="https://wa.me/50931554716" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 font-sans text-xs sm:text-sm font-bold text-white shadow-md transition duration-200 active:scale-95"
                >
                  <WhatsappIcon size={16} />
                  <span>{isEn ? "Connect via WhatsApp" : "Contacter via WhatsApp"}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-center text-xs text-paper/60 sm:flex-row sm:text-left">
          <p className="font-sans">© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p className="font-mono text-xs">
            {isEn ? "Built with Next.js & React · Engineered with Security" : "Conçu avec Next.js & React · Sécurité intégrée"}
          </p>
        </div>

      </div>
    </footer>
  );
}