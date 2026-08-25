"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
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
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 font-sans flex flex-col items-end">
      {/* Bouton Bulle Chat Flotan */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 rounded-2xl bg-[#081226]/95 hover:bg-[#0c1833] px-4 py-3 text-white shadow-2xl transition duration-300 border border-white/15 backdrop-blur-xl cursor-pointer"
            aria-label="Open Feddy Chat"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden border-2 border-accent-500/50 bg-[#060b18]">
              <img 
                src="/images/avatar.png" 
                alt="Feddy Avatar" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Bot size={20} className="absolute text-cyan-300 opacity-0 [.fallback-active_&]:opacity-100" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#081226] animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-wide text-paper flex items-center gap-1.5">
                Feddy AI <Sparkles size={12} className="text-yellow-400" />
              </span>
              <span className="text-[11px] text-paper/70 font-medium">
                {isEn ? "Chat with me ✨" : "Discuter avec moi ✨"}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fenèt Chat la - Ajiste wotè l pou l pa janm monte sou eleman ekran yo sou mobil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-[420px] sm:h-[480px] w-full sm:w-[380px] max-h-[80vh] rounded-2xl border border-white/15 bg-[#081226]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#060b18]/80 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-accent-500/30 bg-[#060b18]">
                  <img 
                    src="/images/avatar.png" 
                    alt="Feddy Avatar" 
                    className="h-full w-full object-cover" 
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#060b18]" />
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
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden border border-accent-500/30 bg-[#060b18]">
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
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden border border-accent-500/30 bg-[#060b18]">
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
              className="border-t border-white/10 bg-[#060b18]/80 p-3 flex items-center gap-2"
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
                className="flex-1 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-paper placeholder:text-paper/40 focus:border-accent-500 focus:outline-none transition"
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