"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
  priority?: boolean;
}

export function ProjectCard({ project, index = 0, priority = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-3xl overflow-hidden glass-panel hover:border-[#dfb15b]/40 transition-all duration-500 hover:shadow-luxury"
    >
      {/* Image Container with Cinematic Zoom */}
      <Link href={`/projects/${project.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-onyx-900 block">
        <Image
          src={project.heroImage || project.thumbnailImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category & Status Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-platinum-200">
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dfb15b]/20 backdrop-blur-md border border-[#dfb15b]/40 text-[10px] font-mono uppercase tracking-wider text-[#dfb15b]">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Year Pill */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-xs font-mono text-platinum-400">
            {project.year} • {project.role}
          </span>
        </div>
      </Link>

      {/* Content Block */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6 bg-[#0c0c11]/80 backdrop-blur-md">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/projects/${project.slug}`} className="group-hover:text-[#dfb15b] transition-colors">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                {project.title}
              </h3>
            </Link>
            <Link
              href={`/projects/${project.slug}`}
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-platinum-300 group-hover:bg-[#dfb15b] group-hover:text-black group-hover:rotate-45 transition-all duration-300 flex-shrink-0"
              aria-label={`View ${project.title} Case Study`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm text-platinum-400 font-light leading-relaxed line-clamp-2">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Technology Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.05]">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-platinum-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[11px] font-mono text-platinum-500">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
