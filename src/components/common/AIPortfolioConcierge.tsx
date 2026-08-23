"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  Loader2,
  Minimize2,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

export function AIPortfolioConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: "Hi! 👋 I'm M Ramzan's AI assistant. I know all about his projects, skills, pricing, and services. Ask me anything — like 'What websites has he built?', 'How much does a website cost?', or 'How do I contact him?'",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      links: [
        { label: "View Portfolio", url: "/work" },
        { label: "Packages & Pricing", url: "/packages" },
        { label: "Contact M Ramzan", url: "/contact" },
      ],
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Suppress on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSend = async (e?: React.FormEvent, directPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = directPrompt || input;
    if (!promptToSend.trim() || loading) return;

    const userText = promptToSend.trim();
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          context: "portfolio_visitor_assistant",
          history,
        }),
      });

      const data = await res.json();
      const aiReply =
        data?.result ||
        "I'm here to assist with any questions regarding M Ramzan's projects (like LDDB, Brites Security, Anwarul Quran), website packages starting at PKR 30,000, or getting in touch.";

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: data?.links || [
          { label: "Website Packages", url: "/packages" },
          { label: "View Portfolio", url: "/work" },
          { label: "Contact Ramzan", url: "/contact" },
        ],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: "assistant",
        text: "M Ramzan is available for website development, WordPress customization, and Flutter mobile apps starting at PKR 30,000. You can reach out directly on WhatsApp or the Contact page.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: [
          { label: "WhatsApp Direct", url: "https://wa.me/923096734231" },
          { label: "Contact Form", url: "/contact" },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "How much does a website cost?",
    "What projects has he built?",
    "Tell me about LDDB or Brites Security",
    "How do I contact M Ramzan?",
  ];

  return (
    <>
      {/* Floating AI Button — positioned to the left of WhatsApp button with clean spacing */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-24 z-40 flex items-center gap-2 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black font-semibold text-xs tracking-wider uppercase shadow-gold hover:scale-105 active:scale-95 transition-all group"
      >
        <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Ask AI</span>
      </button>

      {/* Concierge Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-96 h-[540px] max-h-[82vh] rounded-3xl glass-panel-elevated border border-white/[0.12] shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dfb15b] to-[#a27429] flex items-center justify-center text-black font-bold text-xs shadow-gold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white tracking-wide">
                    M Ramzan — AI Assistant
                  </h4>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online • Ask me anything</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-platinum-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col gap-1.5 ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                    <div
                      className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                        m.sender === "user"
                          ? "bg-[#dfb15b] text-black font-medium rounded-tr-sm"
                          : "bg-white/[0.05] border border-white/[0.08] text-platinum-200 rounded-tl-sm whitespace-pre-wrap"
                      }`}
                    >
                      {m.text}
                    </div>

                  {m.links && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.url}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-[#dfb15b] text-[11px] font-mono text-[#dfb15b] transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] font-mono text-platinum-500 px-1">
                    {m.timestamp}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-platinum-400 text-xs font-mono p-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#dfb15b]" />
                  <span>Synthesizing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && !loading && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleSend(undefined, p);
                    }}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-[#dfb15b]/40 text-platinum-400 hover:text-white transition-colors text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-white/[0.08] bg-white/[0.02] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about projects, stack, availability..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white placeholder-platinum-500 focus:outline-none focus:border-[#dfb15b]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-[#dfb15b] text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c7963b] transition-colors flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
