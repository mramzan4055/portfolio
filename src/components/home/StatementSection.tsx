"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Smartphone, Globe, Code2 } from "lucide-react";

export function StatementSection() {
  const principles = [
    {
      icon: Layout,
      title: "Clean UI & Responsive Layouts",
      desc: "Creating polished user interfaces that look great and work seamlessly across mobile phones, tablets, and desktop screens.",
    },
    {
      icon: Code2,
      title: "Modern Web Technologies",
      desc: "Building with React, Next.js, HTML5, CSS3, and JavaScript to deliver fast, reliable, and maintainable web applications.",
    },
    {
      icon: Globe,
      title: "WordPress & CMS Solutions",
      desc: "Customizing and setting up easy-to-use WordPress sites and CMS tools that empower business owners to update content effortlessly.",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Flutter Apps",
      desc: "Developing high-performance Android and iOS mobile applications from a single Flutter codebase with clean API integration.",
    },
  ];

  return (
    <section className="py-24 border-y border-white/[0.06] bg-[#0b0b0f]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Development Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Creating <span className="text-gradient-silver">clean, responsive websites</span> and <span className="text-gradient-gold">functional mobile apps</span> that work.
            </h2>
            <p className="text-platinum-300 text-base sm:text-lg leading-relaxed font-light">
              I focus on practical, real-world development. By leveraging modern frameworks, existing libraries, and reliable CMS tools, I help businesses launch fast, look professional, and deliver great user experiences without unnecessary complexity.
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
