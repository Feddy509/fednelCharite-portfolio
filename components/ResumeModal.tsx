"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, Layers, Server, ShieldCheck, Check } from "lucide-react";
import { resumeProfiles, type ResumeProfile } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// Context — lets any component (Navbar, Contact page, ...) open the same modal
// ----------------------------------------------------------------------------

interface ResumeModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used inside <ResumeModalProvider>");
  }
  return ctx;
}

const profileIcons: Record<ResumeProfile, typeof Layers> = {
  "full-stack": Layers,
  backend: Server,
  devsecops: ShieldCheck,
};

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ResumeProfile | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    // Reset selection after the exit animation has time to play.
    setTimeout(() => setSelected(null), 250);
  };

  return (
    <ResumeModalContext.Provider
      value={{ isOpen, openModal: () => setIsOpen(true), closeModal }}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.button
              aria-label="Fermer"
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-modal-title"
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-ink-surface/90 shadow-glow backdrop-blur-xl"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-start justify-between border-b border-white/10 p-6">
                <div>
                  <h2
                    id="resume-modal-title"
                    className="font-sans text-lg font-semibold text-paper"
                  >
                    Télécharger mon CV
                  </h2>
                  <p className="mt-1 text-sm text-paper/60">
                    Choisissez le profil qui correspond au poste que vous
                    recrutez - le CV met en avant l&apos;expérience pertinente.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Fermer la fenêtre"
                  className="rounded-full p-1.5 text-paper/50 transition hover:bg-white/5 hover:text-paper"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 p-6">
                {resumeProfiles.map((profile) => {
                  const Icon = profileIcons[profile.id];
                  const isSelected = selected === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelected(profile.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition",
                        isSelected
                          ? "border-accent-500 bg-accent-600/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          isSelected
                            ? "bg-accent-600 text-paper"
                            : "bg-white/5 text-paper/70"
                        )}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-sans text-sm font-medium text-paper">
                          {profile.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-paper/55">
                          {profile.description}
                        </span>
                      </span>
                      {isSelected && (
                        <Check size={18} className="mt-1 shrink-0 text-accent-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-white/10 p-6">
                <a
                  href={
                    selected
                      ? resumeProfiles.find((p) => p.id === selected)?.file
                      : undefined
                  }
                  download
                  aria-disabled={!selected}
                  onClick={(e) => {
                    if (!selected) e.preventDefault();
                    else closeModal();
                  }}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold transition",
                    selected
                      ? "bg-cta-gradient text-paper shadow-glow hover:brightness-110"
                      : "cursor-not-allowed bg-white/5 text-paper/40"
                  )}
                >
                  <Download size={16} />
                  {selected ? "Télécharger le CV" : "Sélectionnez un profil"}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeModalContext.Provider>
  );
}
