"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const techItems = [
  "WordPress",
  "React.js",
  "Next.js",
  "Flutter",
  "HTML5",
  "CSS3",
  "JavaScript",
  "Tailwind CSS",
  "PHP",
  "MySQL",
  "REST APIs",
  "WooCommerce",
  "Responsive UI",
  "SEO & Schema.org",
  "Git & GitHub",
  "Cross-Platform Apps",
];

export function TechTicker() {
  // Duplicate for seamless loop
  const items = [...techItems, ...techItems];

  return (
    <div className="py-10 border-y border-white/[0.06] bg-[#09090e]/40 overflow-hidden relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#09090e] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#09090e] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 32,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ transform: "translate3d(0, 0, 0)" }}
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
      >
        {items.map((tech, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-sm font-mono text-platinum-400 hover:text-white transition-colors cursor-default tracking-wider">
              {tech}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#dfb15b]/40 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
