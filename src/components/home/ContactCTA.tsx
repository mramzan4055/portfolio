"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Calendar, Sparkles } from "lucide-react";
import { SiteSettings } from "@/types";

interface ContactCTAProps {
  settings: SiteSettings;
}

export function ContactCTA({ settings }: ContactCTAProps) {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-10 sm:p-16 lg:p-20 overflow-hidden glass-panel-elevated border border-white/10"
        >
          {/* Ambient Inner Lights */}
          <div className="ambient-glow bg-[#dfb15b] w-96 h-96 -top-20 -right-20 opacity-15" />
          <div className="ambient-glow bg-[#363675] w-96 h-96 -bottom-20 -left-20 opacity-15" />

          <div className="relative z-10 max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 text-[#dfb15b] text-xs font-mono w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Work Together</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Have a project in mind? Let&apos;s <span className="text-gradient-gold">build it</span>.
            </h2>

            <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
              Whether you need a modern business website, a customized WordPress site, or a Flutter mobile app, I&apos;m ready to help bring your ideas to life with clean code and reliable tools.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                prefetch={true}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#dfb15b] via-[#e5c07b] to-[#c7963b] text-black font-semibold text-sm uppercase tracking-widest hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={`mailto:${settings.authorEmail}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-panel hover:border-white/20 text-white text-sm font-mono transition-all"
              >
                <Mail className="w-4 h-4 text-[#dfb15b]" />
                <span>{settings.authorEmail}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
