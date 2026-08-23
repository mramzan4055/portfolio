"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List, ArrowUpRight, Sparkles } from "lucide-react";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

interface WorkPortfolioClientProps {
  projects: Project[];
}

export function WorkPortfolioClient({ projects }: WorkPortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-12">
      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 glass-panel p-4 sm:p-6 rounded-3xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-200",
                selectedCategory === cat
                  ? "bg-[#dfb15b] text-black font-bold shadow-gold"
                  : "bg-white/[0.04] text-platinum-300 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder-platinum-500 focus:outline-none focus:border-[#dfb15b]/50"
            />
          </div>

          <div className="hidden sm:flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === "grid" ? "bg-[#dfb15b] text-black" : "text-platinum-400 hover:text-white"
              )}
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === "list" ? "bg-[#dfb15b] text-black" : "text-platinum-400 hover:text-white"
              )}
              aria-label="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 flex flex-col items-center justify-center text-center glass-panel rounded-3xl p-12">
          <p className="text-lg font-display text-white mb-2">No matching projects found</p>
          <p className="text-sm text-platinum-400 font-light mb-6">
            Try adjusting your search criteria or category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-full bg-[#dfb15b] text-black text-xs font-mono font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      ) : (
        /* Minimal Editorial Archive List */
        <div className="flex flex-col divide-y divide-white/[0.06] glass-panel rounded-3xl overflow-hidden">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex flex-col gap-1.5 max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-platinum-500">{project.year}</span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#dfb15b]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <Sparkles className="w-3 h-3 text-[#dfb15b]" />
                  )}
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-[#dfb15b] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-platinum-400 font-light line-clamp-1">
                  {project.shortDescription}
                </p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="hidden md:flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-platinum-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-platinum-300 group-hover:bg-[#dfb15b] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
