"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  ArrowRight,
  Briefcase,
  Layers,
  User,
  Mail,
  Shield,
  ExternalLink,
  Sparkles,
  Database,
  X,
} from "lucide-react";
import { initialProjects } from "@/data/seed";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut listener (Cmd+K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const staticNav = [
    { label: "Selected Works & Case Studies", href: "/work", icon: Briefcase, category: "Pages" },
    { label: "Services & Architectural Capabilities", href: "/services", icon: Layers, category: "Pages" },
    { label: "About & Engineering Leadership", href: "/about", icon: User, category: "Pages" },
    { label: "Initiate Consultation / Contact", href: "/contact", icon: Mail, category: "Pages" },
    { label: "Admin CMS Portal", href: "/admin", icon: Shield, category: "Administration" },
  ];

  const projectItems = initialProjects.map((p) => ({
    label: `${p.title} — ${p.subtitle}`,
    href: `/projects/${p.slug}`,
    icon: Sparkles,
    category: "Case Studies",
    tags: p.technologies.join(" "),
  }));

  const allItems = [...staticNav, ...projectItems];

  const filteredItems = query.trim() === ""
    ? allItems
    : allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item as any).tags?.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      {/* Global Floating Quick Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Command Palette"
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel hover:border-[#dfb15b]/40 text-platinum-400 hover:text-white text-xs font-mono transition-all shadow-2xl backdrop-blur-md group"
      >
        <Search className="w-3.5 h-3.5 text-[#dfb15b] group-hover:scale-110 transition-transform" />
        <span className="text-[11px] text-platinum-400">Quick Jump</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] text-platinum-300 border border-white/[0.1]">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-3xl glass-panel-elevated border border-white/[0.12] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[70vh]"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.08]">
                <Search className="w-5 h-5 text-[#dfb15b]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search projects, architecture, pages, tech stack..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-platinum-500 text-sm font-sans focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-platinum-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results List */}
              <div className="overflow-y-auto p-4 flex flex-col gap-1.5 divide-y divide-white/[0.03]">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-platinum-500">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.04] text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-4">
                          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#dfb15b] group-hover:bg-[#dfb15b] group-hover:text-black transition-colors flex-shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs sm:text-sm text-platinum-200 font-medium group-hover:text-white truncate">
                              {item.label}
                            </span>
                            <span className="text-[10px] font-mono text-platinum-500 uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-platinum-500 group-hover:text-[#dfb15b] group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Bar */}
              <div className="px-6 py-3 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-platinum-500">
                <div className="flex items-center gap-3">
                  <span>Navigation Palette</span>
                  <span>•</span>
                  <span>Wasmer Edge Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Press</span>
                  <kbd className="px-1 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
