"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "@/types";

interface TechStackMatrixProps {
  categories: SkillCategory[];
}

export function TechStackMatrix({ categories }: TechStackMatrixProps) {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Skills & Stack
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Technologies & Tools
          </h2>
          <p className="text-platinum-400 text-sm sm:text-base leading-relaxed font-light">
            I build practical web and mobile solutions using industry-standard tools, frameworks, and reliable libraries.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="glass-panel p-8 rounded-3xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <h3 className="text-lg font-display font-bold text-white tracking-wide">
                  {cat.name}
                </h3>
                <span className="text-xs font-mono text-[#dfb15b]">
                  0{catIdx + 1}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-platinum-200 font-medium font-mono">
                        {skill.name}
                      </span>
                      <span className="text-platinum-500 font-mono text-[11px]">
                        {skill.experience}
                      </span>
                    </div>

                    {/* Progress Bar with Luxury Gradient */}
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
