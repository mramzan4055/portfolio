"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "@/types";
import { Sparkles, Code2, Server, Search, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillsMatrixVisualizerProps {
  categories: SkillCategory[];
}

export function SkillsMatrixVisualizer({ categories }: SkillsMatrixVisualizerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const iconsMap: Record<string, any> = {
    "cat-frontend": Code2,
    "cat-backend": Server,
    "cat-seo-ai": Search,
  };

  const displayedCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <div className="flex flex-col gap-10 pt-16 border-t border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Proficiency & Matrix</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Architectural Capabilities
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-1.5 rounded-xl text-xs font-mono transition-all",
              activeCategory === "all"
                ? "bg-[#dfb15b] text-black font-semibold shadow-gold"
                : "text-platinum-400 hover:text-white"
            )}
          >
            All Competencies
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-1.5 rounded-xl text-xs font-mono transition-all",
                activeCategory === cat.id
                  ? "bg-[#dfb15b] text-black font-semibold shadow-gold"
                  : "text-platinum-400 hover:text-white"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCategories.map((category) => {
          const Icon = iconsMap[category.id] || Sparkles;
          return (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-panel-elevated p-6 sm:p-8 rounded-3xl flex flex-col gap-6 relative group border border-white/[0.06] hover:border-[#dfb15b]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#dfb15b] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-platinum-200 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#dfb15b]" />
                        <span>{skill.name}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-platinum-500 text-[11px]">
                          {skill.experience}
                        </span>
                        <span className="text-[#dfb15b] font-bold">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar with Luxury Gold Glow */}
                    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#dfb15b] via-[#e8c77b] to-[#c7963b]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
