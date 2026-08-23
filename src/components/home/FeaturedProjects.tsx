"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.featured && p.status === "published").slice(0, 6);
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 6);

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-platinum-300 hover:text-[#dfb15b] transition-colors group"
          >
            <span>View All ({projects.filter((p) => p.status === "published").length}) Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              priority={idx < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
