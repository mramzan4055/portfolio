"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Cpu, Sparkles } from "lucide-react";

export function StatementSection() {
  const principles = [
    {
      icon: Award,
      title: "Luxury Art Direction",
      desc: "Editorial design language, bespoke typography, and cinema-grade micro-animations that elevate brands above generic templates.",
    },
    {
      icon: Zap,
      title: "Sub-Second Performance",
      desc: "Architected around Server Components, edge caching, and incremental static regeneration for instantaneous page loads.",
    },
    {
      icon: Cpu,
      title: "Enterprise Headless CMS",
      desc: "Empowering non-technical teams with modular visual section builders, draft previews, and zero vendor lock-in.",
    },
    {
      icon: Sparkles,
      title: "GEO & AI-Ready Entities",
      desc: "Structured JSON-LD knowledge graphs engineered so modern generative answer engines index key facts with flawless clarity.",
    },
  ];

  return (
    <section className="py-24 border-y border-white/[0.06] bg-[#0b0b0f]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Engineering Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Bridging the boundary between <span className="text-gradient-silver">fine aesthetics</span> and <span className="text-gradient-gold">rigorous systems engineering</span>.
            </h2>
            <p className="text-platinum-300 text-base sm:text-lg leading-relaxed font-light">
              True digital luxury is not merely visual polish; it is how an application responds, handles data under load, scales across global nodes, and presents its knowledge to both humans and artificial intelligence.
            </p>
          </div>

          {/* Core Principles Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-2xl flex flex-col gap-3 hover:border-[#dfb15b]/40 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#dfb15b] group-hover:bg-[#dfb15b]/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-display font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-platinum-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
