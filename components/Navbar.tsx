"use client";

/**
 * ==============================================================================
 * FR: Composant Barre de Navigation Principale / Navbar (Client Component)
 * EN: Main Navigation Bar Component / Navbar (Client Component)
 * ==============================================================================
 * 
 * FR: Gère l'en-tête fixe, la navigation bilingue réactive, le menu mobile
 *     et les actions de consultation de CV avec suivi Analytics.
 * EN: Handles fixed header, responsive bilingual navigation, mobile menu,
 *     and resume viewing actions with Analytics tracking.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { portfolioData, personalInfo } from "@/data/portfolioData";
import { useLanguage } from "@/app/context/LanguageContext";
import { useResumeModal } from "@/components/ResumeModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

export default function Navbar() {
  // FR: Extraction du chemin d'accès actuel et gestion de l'état du menu mobile
  // EN: Current pathname extraction and mobile menu state management
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useResumeModal();
  const { language } = useLanguage();

  // FR: Récupération des liens de navigation selon la langue sélectionnée (FR/EN)
  // EN: Retrieve navigation links based on active language (FR/EN)
  const currentNavLinks =
    portfolioData?.[language]?.navLinks || portfolioData?.fr?.navLinks || [];

  const isEn = language === "en";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        {/* FR: Logo / Initiales de marque / EN: Brand Logo / Initials */}
        <Link
          href="/"
          className="font-heading text-sm sm:text-base font-semibold tracking-wide text-paper flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <span className="rounded-md bg-accent-600 px-2 py-1 font-mono text-xs text-paper">
            {personalInfo.initials}
          </span>
          <span className="ml-2.5 hidden sm:inline">{personalInfo.name}</span>
        </Link>

        {/* ------------------------------------------------------------------ */}
        {/* FR: LIENS DE NAVIGATION DESKTOP / EN: DESKTOP NAVIGATION LINKS     */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden items-center gap-1 md:flex">
          {currentNavLinks.map((link: { href: string; label: string }) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 font-sans text-sm transition",
                  isActive
                    ? "text-paper font-medium"
                    : "text-paper/60 hover:text-paper"
                )}
              >
                {link.label}
                {/* FR: Ligne d'accentuation pour l'onglet actif */}
                {/* EN: Active tab underline animation */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[1px] h-px bg-accent-400"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FR: ACTIONS D'EN-TÊTE / EN: HEADER ACTION BUTTONS                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex items-center gap-2">
          {/* FR: Commutateur de langue / EN: Language switcher dropdown */}
          <LanguageSwitcher />

          {/* FR: Bouton CV Desktop avec tracking Analytics */}
          {/* EN: Desktop Resume button with Analytics tracking */}
          <button
            onClick={() => {
              track("Open Resume", { language: language, device: "Desktop" });
              openModal(language);
            }}
            className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-sans text-sm font-medium text-paper transition hover:border-accent-500/50 hover:bg-accent-600/10 sm:flex cursor-pointer"
          >
            <FileText size={15} />
            {isEn ? "Resume / CV" : "CV"}
          </button>

          {/* FR: Bouton bascule du menu mobile / EN: Mobile menu toggle button */}
          <button
            aria-label={isEn ? "Open menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-paper/70 hover:bg-white/5 md:hidden cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* FR: MENU TIROIR MOBILE / EN: MOBILE DRAWER MENU                     */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {currentNavLinks.map((link: { href: string; label: string }) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 font-sans text-sm",
                    pathname === link.href
                      ? "bg-white/5 text-paper font-medium"
                      : "text-paper/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-3">
                {/* FR: Bouton CV Mobile avec tracking Analytics */}
                {/* EN: Mobile Resume button with Analytics tracking */}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    track("Open Resume", { language: language, device: "Mobile" });
                    openModal(language);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-accent-600 px-3 py-2 font-sans text-sm font-medium text-paper cursor-pointer"
                >
                  <FileText size={15} />
                  {isEn ? "Download CV" : "Télécharger le CV"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}