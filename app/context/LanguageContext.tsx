"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  // Charger la langue sauvegardée dans localStorage lors du chargement
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as Language;
    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}