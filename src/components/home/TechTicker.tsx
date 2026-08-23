"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const techItems = [
  "Next.js 15",
  "TypeScript",
  "MySQL 8.0",
  "Wasmer Edge",
  "React 19",
  "Framer Motion",
  "Node.js",
  "Tailwind CSS",
  "App Router",
  "GEO / Schema.org",
  "REST APIs",
  "JWT Auth",
  "Vercel",
  "GitHub CI/CD",
  "AWS S3",
  "Prisma ORM",
  "Redis",
  "WebGL",
  "Three.js",
  "Docker",
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
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex items-center gap-10 whitespace-nowrap"
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
