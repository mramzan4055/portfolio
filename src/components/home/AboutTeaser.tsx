"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { SiteSettings } from "@/types";

interface AboutTeaserProps {
  settings: SiteSettings;
}

export function AboutTeaser({ settings }: AboutTeaserProps) {
  const highlights = [
    "Over 6+ years designing and implementing mission-critical web applications.",
    "Specialized in Next.js 15+ App Router, full-stack TypeScript, and relational MySQL.",
    "Pioneer in Generative Engine Optimization (GEO) and structured schema engineering.",
    "Zero-dependency architectural approach ensuring longevity and zero vendor lock-in.",
  ];

  return (
    <section className="py-28 bg-[#0a0a0f] border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual / Stat Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl relative z-10 flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-[#dfb15b] to-[#a27429] shadow-gold flex-shrink-0">
                  <img
                    src="/images/profile.jpg"
                    alt="M Ramzan — Full-Stack Architect"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span
                    className="w-full h-full hidden items-center justify-center font-bold text-black text-lg"
                    aria-hidden="true"
                  >
                    MR
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {settings.authorName}
                  </h3>
                  <p className="text-xs text-[#dfb15b] font-mono">
                    {settings.authorTitle}
                  </p>
                </div>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold">
                    6+
                  </span>
                  <span className="text-xs text-platinum-400 font-mono">
                    Years Architectural Exp.
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-gradient-silver">
                    100%
                  </span>
                  <span className="text-xs text-platinum-400 font-mono">
                    Verified Deliveries
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white">
                    99+
                  </span>
                  <span className="text-xs text-platinum-400 font-mono">
                    Core Web Vitals Target
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#dfb15b]">
                    24/7
                  </span>
                  <span className="text-xs text-platinum-400 font-mono">
                    Resilient Architecture
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-platinum-300 font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#dfb15b] flex-shrink-0" />
                <span>Operating globally across North America, Europe & APAC.</span>
              </div>
            </div>

            {/* Ambient Background Blur */}
            <div className="ambient-glow bg-[#dfb15b] w-64 h-64 -top-10 -left-10 opacity-10" />
          </motion.div>

          {/* Right Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Personal Brand & Background
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight">
              Crafting scalable digital brand experiences that combine technical mastery with editorial sophistication.
            </h2>

            <p className="text-platinum-300 text-sm sm:text-base leading-relaxed font-light">
              {settings.authorBio}
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-platinum-300">
                  <div className="w-5 h-5 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#dfb15b] transition-colors"
              >
                <span>Read Full Biography & Journey</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
