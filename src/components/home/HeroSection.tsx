"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Code, Sparkles, Layers, ShieldCheck, ChevronDown } from "lucide-react";
import { SiteSettings } from "@/types";

interface HeroSectionProps {
  settings: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col max-w-4xl"
        >
          {/* Status Badge */}
          <motion.div variants={item} className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#dfb15b]/30 text-xs font-mono text-[#dfb15b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-widest uppercase font-semibold">
                Web & Mobile App Developer
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08] mb-8"
          >
            Building <span className="text-gradient-gold">modern websites & apps</span> with clean code and reliable tools.
          </motion.h1>

          {/* Subtitle / Personal Statement */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-platinum-300 font-light leading-relaxed max-w-2xl mb-12"
          >
            {settings.tagline ||
              "I build modern websites and mobile applications using industry-standard technologies, frameworks, and reliable development tools."}
          </motion.p>

          {/* Actions & CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#dfb15b] via-[#e5c07b] to-[#c7963b] text-black font-semibold text-sm uppercase tracking-widest hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-panel hover:glass-panel-gold text-white font-medium text-sm uppercase tracking-widest transition-all"
            >
              <span>Get In Touch</span>
            </Link>
          </motion.div>

          {/* Architecture Pillars Matrix */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/[0.08]"
          >
            {[
              { label: "Frontend & Web", val: "React & Next.js", icon: Code },
              { label: "CMS & Content", val: "WordPress & MySQL", icon: Layers },
              { label: "Mobile Apps", val: "Flutter (iOS & Android)", icon: Sparkles },
              { label: "Design & UX", val: "Clean & Responsive UI", icon: ShieldCheck },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-platinum-400 text-xs font-mono">
                    <Icon className="w-3.5 h-3.5 text-[#dfb15b]" />
                    <span>{pillar.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white font-display">
                    {pillar.val}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-12 flex items-center justify-between text-xs text-platinum-500 font-mono">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-[#dfb15b] animate-bounce" />
          <span>Scroll to explore portfolio</span>
        </div>
        <span className="hidden sm:inline-block">2024 — 2026 EDITION</span>
      </div>
    </section>
  );
}
