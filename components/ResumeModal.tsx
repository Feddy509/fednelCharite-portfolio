"use client";

/**
 * ==============================================================================
 * FR: Fournisseur de Contexte et Modale de Téléchargement de CV (Client Component)
 * EN: Context Provider and Resume Download Modal Component (Client Component)
 * ==============================================================================
 * 
 * FR: Gère l'état global d'ouverture de la modale de CV et permet le téléchargement 
 *     adapté selon le profil (Full-Stack, Backend, DevSecOps) et la langue.
 * EN: Manages global state for the resume modal and enables profile-targeted
 *     downloads (Full-Stack, Backend, DevSecOps) in French or English.
 */

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

/**
 * FR: Interface du contexte de la modale de CV
 * EN: Resume modal context interface
 */
interface ResumeModalContextValue {
  isOpen: boolean;
  openModal: (lang?: 'en' | 'fr') => void;
  closeModal: () => void;
  currentLang: 'en' | 'fr';
}

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

/**
 * FR: Hook personnalisé pour accéder au contexte de la modale de CV
 * EN: Custom hook to access resume modal context
 */
export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error("useResumeModal must be used inside <ResumeModalProvider>");
  }
  return ctx;
}

/**
 * FR: Mappage des icônes par profil technique de CV
 * EN: Icon mapping per technical resume profile
 */
const profileIcons: Record<ResumeProfile, typeof Layers> = {
  "full-stack": Layers,
  backend: Server,
  devsecops: ShieldCheck,
};

/**
 * FR: Fournisseur de Contexte et Composant Modale
 * EN: Context Provider & Modal Component
 */
export function ResumeModalProvider({ 
  children, 
  defaultLang = 'fr' 
}: { 
  children: ReactNode;
  defaultLang?: 'en' | 'fr';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ResumeProfile | null>("full-stack");
  const [currentLang, setCurrentLang] = useState<'en' | 'fr'>(defaultLang);

  // FR: Ouverture de la modale avec définition optionnelle de la langue
  // EN: Open modal with optional language override
  const openModal = (lang?: 'en' | 'fr') => {
    if (lang) {
      setCurrentLang(lang);
    }
    setIsOpen(true);
  };

  // FR: Fermeture de la modale et réinitialisation de la sélection
  // EN: Close modal and reset selection
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 250);
  };

  const safeLang = (currentLang === 'en' || currentLang === 'fr') ? currentLang : 'fr';
  const resumeProfiles = portfolioData[safeLang]?.resumeProfiles || portfolioData.fr.resumeProfiles;

  return (
    <ResumeModalContext.Provider
      value={{ isOpen, openModal, closeModal, currentLang }}
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
            {/* FR: Arrière-plan flouté / EN: Backdrop */}
            <motion.button
              aria-label="Fermer"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* ------------------------------------------------------------------ */}
            {/* PANNEAU PRINCIPAL / MAIN DIALOG PANEL                              */}
            {/* ------------------------------------------------------------------ */}
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
              {/* FR: En-tête de la Modale / EN: Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 p-6">
                <div>
                  <h2
                    id="resume-modal-title"
                    className="font-sans text-lg font-semibold text-white"
                  >
                    {safeLang === 'en' ? 'Download Resume' : 'Télécharger mon CV'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {safeLang === 'en'
                      ? 'Choose a technical profile and download the version of your choice.'
                      : 'Choisissez un profil technique et téléchargez la version de votre choix.'}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Fermer la fenêtre"
                  className="rounded-full p-1.5 text-gray-400 transition hover:bg-white/5 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* FR: Liste des Profils Techniques / EN: Technical Profiles Selection List */}
              <div className="space-y-2 p-6 max-h-[40vh] overflow-y-auto">
                {resumeProfiles.map((profile) => {
                  const Icon = profileIcons[profile.id];
                  const isSelected = selected === profile.id;
                  return (
                    <button
                      key={profile.id}
                      onClick={() => setSelected(profile.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer",
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

              {/* FR: Pied de page / Boutons de Téléchargement PDF / EN: Footer / PDF Download Buttons */}
              <div className="border-t border-white/10 p-6 space-y-3 bg-slate-950/50">
                {selected ? (
                  safeLang === 'en' ? (
                    // FR: Mode Anglais: Anglais en premier / EN: English Mode: English first
                    <>
                      <a
                        href={`/resumes/fednel-charite-${selected}-en.pdf`}
                        download={`Fednel_Charite_CV_${selected}_EN.pdf`}
                        onClick={closeModal}
                        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition"
                      >
                        <Download size={16} />
                        Download English CV (PDF)
                      </a>

                      <a
                        href={`/resumes/fednel-charite-${selected}-fr.pdf`}
                        download={`Fednel_Charite_CV_${selected}_FR.pdf`}
                        onClick={closeModal}
                        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition"
                      >
                        <Download size={16} />
                        Download French CV (PDF)
                      </a>
                    </>
                  ) : (
                    // FR: Mode Français: Français en premier / EN: French Mode: French first
                    <>
                      <a
                        href={`/resumes/fednel-charite-${selected}-fr.pdf`}
                        download={`Fednel_Charite_CV_${selected}_FR.pdf`}
                        onClick={closeModal}
                        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition"
                      >
                        <Download size={16} />
                        Télécharger le CV en Français (PDF)
                      </a>

                      <a
                        href={`/resumes/fednel-charite-${selected}-en.pdf`}
                        download={`Fednel_Charite_CV_${selected}_EN.pdf`}
                        onClick={closeModal}
                        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-sans text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition"
                      >
                        <Download size={16} />
                        Télécharger le CV en Anglais (PDF)
                      </a>
                    </>
                  )
                ) : (
                  <div className="text-center text-sm text-gray-500 py-2">
                    {safeLang === 'en'
                      ? 'Please select a profile above to display options.'
                      : 'Veuillez sélectionner un profil ci-dessus pour afficher les options.'}
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