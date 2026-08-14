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
  currentLang: 'en' | 'fr';
  setLang: (lang: 'en' | 'fr') => void;
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

export function ResumeModalProvider({ 
  children, 
  defaultLang = 'fr' 
}: { 
  children: ReactNode;
  defaultLang?: 'en' | 'fr';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ResumeProfile | null>("full-stack");
  const [currentLang, setLang] = useState<'en' | 'fr'>(defaultLang);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 250);
  };

  const secondaryLang = currentLang === 'en' ? 'fr' : 'en';

  // Jwenn lis profils yo baze sou lang aktyèl la nan portfolioData
  const currentResumeProfiles = portfolioData[currentLang].resumeProfiles;
  const selectedProfileData = currentResumeProfiles.find((p) => p.id === selected);

  return (
    <ResumeModalContext.Provider
      value={{ isOpen, openModal: () => setIsOpen(true), closeModal, currentLang, setLang }}
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
                    {currentLang === 'en' ? 'Download My Resume' : 'Télécharger mon CV'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {currentLang === 'en'
                      ? 'Choose the profile that matches the role you are hiring for.'
                      : 'Choisissez le profil qui correspond au poste que vous recrutez.'}
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
              <div className="space-y-2 p-6 max-h-[50vh] overflow-y-auto">
                {currentResumeProfiles.map((profile) => {
                  const Icon = profileIcons[profile.id];
                  const isSelected = selected === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelected(profile.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition",
                        isSelected
                          ? "border-blue-500 bg-blue-600/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-white/5 text-gray-400"
                        )}
                      >
                        <Icon size={18} />
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

              {/* Footer / Actions & Language Switch Option */}
              <div className="border-t border-white/10 p-6 space-y-4 bg-slate-950/50">
                {/* Primary Download Button */}
                <a
                  href={selectedProfileData ? selectedProfileData.file : undefined}
                  download={`Fednel_Charite_CV_${selected}_${currentLang.toUpperCase()}.pdf`}
                  aria-disabled={!selected}
                  onClick={(e) => {
                    if (!selected) e.preventDefault();
                    else closeModal();
                  }}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold transition shadow-lg",
                    selected
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                      : "cursor-not-allowed bg-white/5 text-gray-500"
                  )}
                >
                  <Download size={16} />
                  {selected 
                    ? (currentLang === 'en' ? `Download ${selected.toUpperCase()} CV (PDF)` : `Télécharger le CV ${selected.toUpperCase()} (PDF)`) 
                    : (currentLang === 'en' ? 'Select a profile' : 'Sélectionnez un profil')}
                </a>

                {/* Secondary Option: Switch Language for the CV */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <span>
                    {currentLang === 'en' ? 'Current language:' : 'Langue actuelle :'} <strong className="text-white uppercase">{currentLang}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setLang(secondaryLang)}
                    className="text-blue-400 hover:underline font-medium transition"
                  >
                    {currentLang === 'en' 
                      ? 'Switch to French (Français)' 
                      : 'Basculer en Anglais (English)'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ResumeModalContext.Provider>
  );
}