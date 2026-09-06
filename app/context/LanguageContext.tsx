"use client";

/**
 * ==============================================================================
 * FR: Contexte de Gestion de la Langue Global (React Context API)
 * EN: Global Language Management Context (React Context API)
 * ==============================================================================
 * 
 * FR: Permet de basculer la langue globale de l'application entre le français
 *     et l'anglais, tout en persistant le choix dans le stockage local.
 * EN: Allows switching the global application language between French
 *     and English, while persisting the choice in local storage.
 */

import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * FR: Type définissant les langues supportées par l'application.
 * EN: Type defining the languages supported by the application.
 */
export type Language = "fr" | "en";

/**
 * FR: Structure de données du contexte de langue.
 * EN: Interface shape for the language context.
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

// FR: Création du contexte React
// EN: Creation of the React context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * FR: Fournisseur de contexte pour l'internationalisation.
 * EN: Context Provider component for internationalization.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  // FR: Synchronisation initiale avec la préférence enregistrée dans localStorage
  // EN: Initial synchronization with the saved preference in localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  /**
   * FR: Met à jour la langue dans l'état local et la sauvegarde dans localStorage.
   * EN: Updates language state and saves the selection to localStorage.
   * 
   * @param lang - FR: Nouvelle langue sélectionnée / EN: Newly selected language
   */
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  /**
   * FR: Bascule alternativement la langue entre 'fr' et 'en'.
   * EN: Toggles the language back and forth between 'fr' and 'en'.
   */
  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    handleSetLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * FR: Hook personnalisé pour consommer le contexte de langue.
 * EN: Custom hook to consume the language context.
 * 
 * @throws FR: Erreur si le hook est utilisé hors d'un LanguageProvider
 * @throws EN: Error if the hook is used outside of a LanguageProvider
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}