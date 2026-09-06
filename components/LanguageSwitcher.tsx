"use client";

/**
 * ==============================================================================
 * FR: Composant Commutateur de Langue / Language Switcher (Client Component)
 * EN: Language Switcher Component (Client Component)
 * ==============================================================================
 * 
 * FR: Permet à l'utilisateur de basculer l'interface entre le Français et l'Anglais.
 * EN: Allows the user to toggle the UI language between French and English.
 */

import { useLanguage } from "@/app/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  // FR: Extraction de l'état de la langue et de la fonction de bascule depuis le contexte
  // EN: Extract current language state and toggle function from language context
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full border border-gray-700 bg-gray-900/50 hover:bg-gray-800 transition-all text-gray-300 hover:text-white cursor-pointer"
      title={language === "fr" ? "Switch to English" : "Passer en Français"}
      aria-label="Toggle Language"
    >
      <Globe className="w-3.5 h-3.5 text-accent-400" />
      
      {/* FR: Indicateur pour le Français / EN: Indicator for French */}
      <span className={language === "fr" ? "font-bold text-blue-400" : "text-gray-500"}>
        FR
      </span>
      
      <span className="text-gray-600">|</span>
      
      {/* FR: Indicateur pour l'Anglais / EN: Indicator for English */}
      <span className={language === "en" ? "font-bold text-blue-400" : "text-gray-500"}>
        EN
      </span>
    </button>
  );
}