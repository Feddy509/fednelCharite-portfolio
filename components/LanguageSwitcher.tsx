"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full border border-gray-700 bg-gray-900/50 hover:bg-gray-800 transition-all text-gray-300 hover:text-white"
      title={language === "fr" ? "Switch to English" : "Passer en Français"}
      aria-label="Toggle Language"
    >
      <Globe className="w-3.5 h-3.5 text-accent-400" />
      <span className={language === "fr" ? "font-bold text-blue-400" : "text-gray-500"}>
        FR
      </span>
      <span className="text-gray-600">|</span>
      <span className={language === "en" ? "font-bold text-blue-400" : "text-gray-500"}>
        EN
      </span>
    </button>
  );
}