"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layers, LayoutDashboard, Sparkles, Wand2 } from "lucide-react";
import { ServiceItem } from "@/types";

interface ServicesShowcaseProps {
  services: ServiceItem[];
}

export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return Layers;
      case "LayoutDashboard":
        return LayoutDashboard;
      case "Sparkles":
        return Sparkles;
      case "Wand2":
        return Wand2;
      default:
        return Layers;
    }
  };

  return (
    <section className="py-28 bg-[#09090e]/70 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Capabilities & Offerings
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Bespoke Engineering Services
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-platinum-300 hover:text-[#dfb15b] transition-colors group"
          >
            <span>Explore All Deliverables</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => {
            const Icon = getIcon(srv.icon);
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col justify-between gap-8 hover:border-[#dfb15b]/40 hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#dfb15b] group-hover:bg-[#dfb15b] group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-platinum-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#dfb15b] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-platinum-300 font-light leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.05]">
                    {srv.deliverables.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-platinum-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.05]">
                  <div className="flex flex-wrap gap-1.5">
                    {srv.technologies.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-platinum-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-platinum-300 group-hover:text-[#dfb15b] transition-colors"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
