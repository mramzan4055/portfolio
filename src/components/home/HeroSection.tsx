"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle, MessageCircle, ChevronDown } from "lucide-react";
import { SiteSettings } from "@/types";

interface HeroSectionProps {
  settings: SiteSettings;
}

const floatingBadges = [
  { label: "WordPress & React", top: "8%", left: "-18%", delay: 0 },
  { label: "Responsive & Fast", top: "55%", left: "-22%", delay: 0.3 },
  { label: "From PKR 30,000", top: "80%", right: "-14%", delay: 0.6 },
];

export function HeroSection({ settings }: HeroSectionProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const whatsappUrl = settings.whatsappEnabled && settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(settings.whatsappDefaultMessage || "Hi, I would like to discuss a website project.")}`
    : "/contact";

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN — Content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#dfb15b]/30 text-xs font-mono text-[#dfb15b]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-widest uppercase font-semibold">
                  Web Developer · Available for Projects
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              Websites That Help{" "}
              <span className="text-gradient-gold">Small Businesses</span> Look Professional & Grow Online
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-platinum-300 font-light leading-relaxed max-w-xl mb-10"
            >
              I build modern, responsive, and easy-to-manage websites for Pakistani small businesses, startups, and local shops — tailored to your budget and goals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#dfb15b] via-[#e5c07b] to-[#c7963b] text-black font-semibold text-sm uppercase tracking-wider hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel hover:border-[#dfb15b]/40 text-white font-medium text-sm uppercase tracking-wider transition-all"
              >
                <span>Get a Website</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/60 font-medium text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Me</span>
              </a>
            </motion.div>

            {/* Trust Pillars */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-5 text-xs font-mono text-platinum-400 pt-6 border-t border-white/[0.06]"
            >
              {[
                "WordPress & React",
                "Flutter Mobile Apps",
                "Responsive Design",
                "Starting PKR 30,000",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#dfb15b]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — Profile Photo Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-[#dfb15b]/12 blur-3xl" />
            </div>

            {/* Card */}
            <div className="relative w-[300px] sm:w-[340px]">
              {/* Floating Badges */}
              {[
                { label: "WordPress & React", style: { top: "4%", left: "-20%" }, delay: 0.5 },
                { label: "✓ Responsive & Fast", style: { top: "52%", left: "-28%" }, delay: 0.7 },
                { label: "From PKR 30,000", style: { bottom: "8%", right: "-20%" }, delay: 0.9 },
              ].map((badge) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: badge.delay }}
                  style={badge.style as React.CSSProperties}
                  className="absolute z-20 px-3 py-1.5 rounded-full bg-[#0f0f15]/90 backdrop-blur-md border border-[#dfb15b]/40 text-[11px] font-mono text-[#dfb15b] whitespace-nowrap shadow-luxury"
                >
                  {badge.label}
                </motion.div>
              ))}

              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-[#dfb15b]/20 shadow-[0_0_60px_rgba(223,177,91,0.12)] bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
                {/* Shimmer top line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dfb15b]/50 to-transparent z-10" />

                <Image
                  src="/images/profile.jpg"
                  alt="M Ramzan — Website and Mobile Application Developer in Pakistan"
                  width={340}
                  height={420}
                  priority
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "4/5" }}
                />

                {/* Bottom overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#08080a]/90 via-[#08080a]/50 to-transparent">
                  <p className="text-white font-display font-bold text-lg tracking-tight">M Ramzan</p>
                  <p className="text-[#dfb15b] text-xs font-mono tracking-widest uppercase mt-0.5">
                    Web & Mobile Developer
                  </p>
                </div>
              </div>

              {/* Availability dot */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0f0f15]/90 border border-emerald-500/30 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-300">Available for new projects</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll prompt */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-16 flex items-center justify-between text-xs text-platinum-500 font-mono">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-[#dfb15b] animate-bounce" />
          <span>Scroll to explore portfolio</span>
        </div>
        <span className="hidden sm:inline-block">2024 — 2026 EDITION</span>
      </div>
    </section>
  );
}
