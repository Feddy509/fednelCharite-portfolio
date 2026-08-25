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

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: isEn
        ? "Hello! I'm Feddy, Fednel Charité's virtual assistant. How can I help you learn more about his background, skills, or projects?"
        : "Bonjou! Mwen se Feddy, asistan vityèl Fednel Charité. Kijan m ka ede w dekouvri parcours, konpetans oswa pwojè l yo?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Desann nan dènye mesaj la otomatikman lè gen nouvo mesaj
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
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: isEn
              ? "Sorry, I encountered an error. Please try again later."
              : "Eskize m, gen yon erè ki pwodui. Tanpri eseye ankò pita.",
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
            : "Erè rezo. Tanpri tcheke koneksyon ou.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Bouton Flotan pou louvri Chat la */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 rounded-full bg-accent-600 hover:bg-accent-500 px-4 py-3 text-white shadow-xl transition duration-200 border border-white/15"
            aria-label="Open Feddy Chat"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white font-mono text-xs font-bold">
              <span>FC</span>
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-accent-600" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold tracking-wide flex items-center gap-1">
                Feddy AI <Sparkles size={11} className="text-yellow-300" />
              </span>
              <span className="text-[10px] text-white/80">
                {isEn ? "Ask me anything" : "Poze m kesyon"}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fenèt Chat la */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-[480px] w-[350px] sm:w-[380px] rounded-2xl border border-white/15 bg-[#081226]/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#060b18]/80 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-accent-600/20 border border-accent-500/30 text-cyan-400 font-bold text-sm">
                  <Bot size={18} />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#060b18]" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-paper flex items-center gap-1.5">
                    Feddy <span className="text-[10px] font-mono font-normal text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20">AI Assistant</span>
                  </h3>
                  <p className="text-[11px] text-paper/60">
                    {isEn ? "Online • Ready to assist" : "Anliy • Disponib pou ede w"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-paper/60 hover:bg-white/10 hover:text-paper transition"
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
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-600/20 border border-accent-500/30 text-cyan-400">
                      <Bot size={14} />
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
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-600/20 border border-accent-500/30 text-cyan-400">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-xl rounded-bl-none px-3.5 py-2.5 text-paper/70 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-cyan-400" />
                    <span className="text-xs">{isEn ? "Feddy is thinking..." : "Feddy ap reflechi..."}</span>
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
                    : "Poze kesyon sou konpetans, pwojè..."
                }
                className="flex-1 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-paper placeholder:text-paper/40 focus:border-accent-500 focus:outline-none transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white shadow-md transition hover:bg-accent-500 disabled:opacity-40 disabled:cursor-not-allowed"
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