"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, Layers, Server, ShieldCheck, Check } from "lucide-react";
import { portfolioData, type ResumeProfile } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// Context
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
  const [selected, setSelected] = useState<ResumeProfile | null>("full-stack");

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 250);
  };

  // Nou itilize done franse yo pou lis profil yo nan modal la (oswa ou ka chwazi nenpòt lang)
  const resumeProfiles = portfolioData.fr.resumeProfiles;

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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-modal-title"
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 p-6">
                <div>
                  <h2
                    id="resume-modal-title"
                    className="font-sans text-lg font-semibold text-white"
                  >
                    Télécharger mon CV / Download Resume
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    Choisissez un profil technique et téléchargez la version de votre choix.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Fermer la fenêtre"
                  className="rounded-full p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Profiles Selection List */}
              <div className="space-y-2 p-6 max-h-[40vh] overflow-y-auto">
                {resumeProfiles.map((profile) => {
                  const Icon = profileIcons[profile.id];
                  const isSelected = selected === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelected(profile.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition",
                        isSelected
                          ? "border-blue-500 bg-blue-600/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-white/5 text-gray-400"
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-sans text-sm font-medium text-white">
                          {profile.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-400">
                          {profile.description}
                        </span>
                      </span>
                      {isSelected && (
                        <Check size={18} className="mt-1 shrink-0 text-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer / Download Buttons (English Top, French Bottom) */}
              <div className="border-t border-white/10 p-6 space-y-3 bg-slate-950/50">
                {selected ? (
                  <>
                    {/* 1. English Download Button (Anlè) */}
                    <a
                      href={`/resumes/fednel-charite-${selected}-en.pdf`}
                      download={`Fednel_Charite_CV_${selected}_EN.pdf`}
                      onClick={closeModal}
                      className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition"
                    >
                      <Download size={16} />
                      Download English CV (PDF)
                    </a>

                    {/* 2. French Download Button (Anba) */}
                    <a
                      href={`/resumes/fednel-charite-${selected}-fr.pdf`}
                      download={`Fednel_Charite_CV_${selected}_FR.pdf`}
                      onClick={closeModal}
                      className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition"
                    >
                      <Download size5={16} />
                      Télécharger le CV en Français (PDF)
                    </a>
                  </>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-2">
                    Veuillez sélectionner un profil ci-dessus pour afficher les options.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeModalContext.Provider>
  );
}