"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, personalInfo } from "@/data/portfolioData";
import { useResumeModal } from "@/components/ResumeModal";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useResumeModal();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-sans text-sm font-semibold tracking-wide text-paper"
          onClick={() => setMobileOpen(false)}
        >
          <span className="rounded-md bg-accent-600 px-2 py-1 font-mono text-xs text-paper">
            {personalInfo.initials}
          </span>
          <span className="ml-2 hidden sm:inline">{personalInfo.name}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 font-sans text-sm transition",
                  isActive
                    ? "text-paper"
                    : "text-paper/60 hover:text-paper"
                )}
              >
                {link.label}
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

        <div className="flex items-center gap-2">
          <button
            onClick={openModal}
            className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-sans text-sm font-medium text-paper transition hover:border-accent-500/50 hover:bg-accent-600/10 sm:flex"
          >
            <FileText size={15} />
            CV
          </button>
          <button
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-paper/70 hover:bg-white/5 md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 font-sans text-sm",
                    pathname === link.href
                      ? "bg-white/5 text-paper"
                      : "text-paper/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openModal();
                }}
                className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent-600 px-3 py-2.5 font-sans text-sm font-medium text-paper"
              >
                <FileText size={15} />
                Télécharger le CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
