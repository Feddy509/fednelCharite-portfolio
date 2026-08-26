"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles, MessageSquare } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isEn = language === "en";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: isEn
          ? "Hello! I'm Feddy, Fednel Charité's virtual assistant. How can I help you learn more about his background, skills, or projects?"
          : "Bonjour ! Je suis Feddy, l'assistant virtuel de Fednel Charité. Comment puis-je vous aider à découvrir son parcours, ses compétences ou ses projets ?",
      },
    ]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          language: language,
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        const errorMsg = data.error || (isEn ? "Unknown server error" : "Erreur serveur inconnue");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: isEn
              ? `⚠️ Error: ${errorMsg}`
              : `⚠️ Erreur : ${errorMsg}`,
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isEn
            ? "Network error. Please check your connection."
            : "Erreur réseau. Veuillez vérifier votre connexion.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 font-sans flex flex-col items-end">
      {/* Bouton Flotan Style Bulle de Discussion (Inspire de vos ikon AI Chat) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3.5 rounded-3xl bg-gradient-to-r from-[#081226] via-[#0d1b3e] to-[#081226] hover:from-[#0d1b3e] hover:to-[#122452] px-4.5 py-3 text-white shadow-2xl transition duration-300 border border-cyan-500/30 backdrop-blur-xl cursor-pointer shadow-cyan-500/10"
            aria-label="Open Feddy Chat"
          >
            {/* Avatè anndan yon ti ankadreman AI Chat Bubble */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl overflow-hidden border-2 border-cyan-400/60 bg-[#060b18] shadow-md">
              <img 
                src="/images/avatar.png" 
                alt="Feddy Avatar" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Bot size={22} className="absolute text-cyan-300 opacity-0 [.fallback-active_&]:opacity-100" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#060b18] animate-pulse" />
            </div>

            {/* Tèks ak ikòn etwal chat */}
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs font-bold tracking-wide text-paper flex items-center gap-1.5 font-heading">
                Feddy AI <Sparkles size={13} className="text-cyan-400 animate-pulse" />
              </span>
              <span className="text-[11px] text-cyan-200/80 font-medium flex items-center gap-1">
                <MessageSquare size={10} /> {isEn ? "Ask me anything" : "Discutez avec moi"}
              </span>
            </div>

            {/* Ti pwent bulle chat la (dekoratif) */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0d1b3e] border-r border-b border-cyan-500/30 transform rotate-45 hidden sm:block"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fenèt Chat la - Ajiste ak yon max-h ekselan sou mobil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-[420px] sm:h-[480px] w-full sm:w-[380px] max-h-[78vh] rounded-2xl border border-cyan-500/30 bg-[#081226]/98 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#060b18]/90 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-cyan-400/40 bg-[#060b18]">
                  <img 
                    src="/images/avatar.png" 
                    alt="Feddy Avatar" 
                    className="h-full w-full object-cover" 
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-[#060b18]" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-paper flex items-center gap-1.5">
                    Feddy <span className="text-[10px] font-mono font-normal text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20">AI Assistant</span>
                  </h3>
                  <p className="text-[11px] text-paper/60">
                    {isEn ? "Online • Ready to assist" : "En ligne • Prêt à vous aider"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-paper/60 hover:bg-white/10 hover:text-paper transition cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Kò Konvèsasyon an */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-cyan-400/30 bg-[#060b18]">
                      <img src="/images/avatar.png" alt="Feddy Avatar" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent-600 text-white rounded-br-none shadow-md"
                        : "bg-white/[0.06] border border-white/10 text-paper/90 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-paper/80">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-cyan-400/30 bg-[#060b18]">
                    <img src="/images/avatar.png" alt="Feddy Avatar" className="h-full w-full object-cover" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-xl rounded-bl-none px-3.5 py-2.5 text-paper/70 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-cyan-400" />
                    <span className="text-xs">{isEn ? "Feddy is thinking..." : "Feddy réfléchit..."}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Fòm pou voye mesaj */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-[#060b18]/90 p-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isEn
                    ? "Ask about Fednel's skills, projects..."
                    : "Posez vos questions sur les compétences, projets..."
                }
                className="flex-1 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-paper placeholder:text-paper/40 focus:border-cyan-500 focus:outline-none transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white shadow-md transition hover:bg-accent-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}