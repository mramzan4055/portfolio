"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, ExternalLink, Building2 } from "lucide-react";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "t-1",
    text: "M Ramzan's architectural expertise transformed our entire product platform. The Next.js migration delivered a 3x performance improvement and the custom CMS has saved our content team 20+ hours weekly.",
    author: "Ahmad K.",
    role: "CTO",
    company: "TechVista Solutions",
    rating: 5,
  },
  {
    id: "t-2",
    text: "Exceptional full-stack engineering. The MySQL data architecture and GEO optimization strategy he implemented drove a 280% increase in organic visibility within the first quarter.",
    author: "Sarah M.",
    role: "Director of Engineering",
    company: "Digital Nexus Agency",
    rating: 5,
  },
  {
    id: "t-3",
    text: "The bespoke headless CMS and real-time analytics dashboard he built for our education platform handles 50K+ concurrent users flawlessly. His code quality and documentation are world-class.",
    author: "Dr. Imran H.",
    role: "Founder & CEO",
    company: "AlQadir Education",
    rating: 5,
  },
  {
    id: "t-4",
    text: "Working with M Ramzan was a game-changer for our startup. He delivered a production-ready SaaS platform with complex MySQL schemas, multi-tenant auth, and a stunning UI — all ahead of schedule.",
    author: "Fatima R.",
    role: "Product Lead",
    company: "LaunchPad Studios",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#dfb15b]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b] flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5" />
              <span>Client Testimonials & Social Proof</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Trusted by Engineering Leaders
            </h2>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#dfb15b] text-[#dfb15b]" />
              ))}
            </div>
            <span className="text-xs font-mono text-platinum-300">5.0 / 5.0 Average</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col justify-between gap-6 hover:border-[#dfb15b]/30 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#dfb15b] text-[#dfb15b]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-platinum-200 font-light leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfb15b]/30 to-[#a27429]/30 border border-[#dfb15b]/20 flex items-center justify-center text-[#dfb15b] font-bold text-xs">
                    {t.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-display font-semibold text-white">
                      {t.author}
                    </span>
                    <span className="text-[11px] font-mono text-platinum-400">
                      {t.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-platinum-400">
                  <Building2 className="w-3 h-3 text-[#dfb15b]" />
                  <span>{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
