import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import { getProjectBySlug, getProjects, getSiteSettings } from "@/lib/data/store";
import { generateProjectMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { KeyFactsCard } from "@/components/projects/KeyFactsCard";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactCTA } from "@/components/home/ContactCTA";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) return { title: "Project Not Found" };
  return generateProjectMetadata(project, settings);
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(slug),
    getProjects({ status: "published" }),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  // Related projects in same category or adjacent
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  const cs = project.caseStudy;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* Structured Data: Project & Breadcrumbs */}
      <JsonLd type="project" data={project} settings={settings} />
      <JsonLd
        type="breadcrumbs"
        data={[
          { name: "Home", url: "/" },
          { name: "Selected Works", url: "/work" },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
        settings={settings}
      />
      {project.geo?.faq && <JsonLd type="faq" data={project.geo.faq} settings={settings} />}

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Back Link & Category */}
        <div className="flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-platinum-400 hover:text-[#dfb15b] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>

          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#dfb15b]">
            {project.category}
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08]">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-platinum-300 font-light leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Cinematic Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-panel-elevated shadow-2xl">
          <Image
            src={project.heroImage || project.thumbnailImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Project Metadata Matrix Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 glass-panel p-6 sm:p-8 rounded-3xl">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-platinum-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Architectural Role</span>
            </span>
            <span className="text-sm font-semibold text-white font-display">
              {project.role}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-platinum-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Timeline / Year</span>
            </span>
            <span className="text-sm font-semibold text-white font-display">
              {project.year}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-platinum-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Category</span>
            </span>
            <span className="text-sm font-semibold text-white font-display">
              {project.category}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-platinum-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Live Deliverables</span>
            </span>
            <div className="flex items-center gap-3 pt-0.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#dfb15b] hover:underline flex items-center gap-1"
                >
                  <span>Live Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-platinum-400 hover:text-white flex items-center gap-1"
                >
                  <span>Source</span>
                  <Github className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Verified Impact Metrics (if present) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold">
                  {m.value}
                </span>
                <span className="text-xs font-mono text-platinum-400">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Main Prose Content */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            {/* Overview */}
            {cs?.overview && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  01 / Executive Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Background & Objectives
                </h2>
                <p className="text-platinum-300 text-base sm:text-lg leading-relaxed font-light">
                  {cs.overview}
                </p>
              </div>
            )}

            {/* The Challenge */}
            {cs?.challenge && (
              <div className="flex flex-col gap-4 p-8 rounded-3xl glass-panel border-l-2 border-l-[#dfb15b]">
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  02 / The Architectural Challenge
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Obstacles & Constraints
                </h3>
                <p className="text-platinum-300 text-sm sm:text-base leading-relaxed font-light">
                  {cs.challenge}
                </p>
              </div>
            )}

            {/* The Solution & Architecture */}
            {cs?.solution && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  03 / The Engineering Solution
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Architecture & Implementation
                </h3>
                <p className="text-platinum-300 text-base sm:text-lg leading-relaxed font-light">
                  {cs.solution}
                </p>
              </div>
            )}

            {/* The Process */}
            {cs?.process && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  04 / Development Methodology
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Execution & Delivery
                </h3>
                <p className="text-platinum-300 text-sm sm:text-base leading-relaxed font-light">
                  {cs.process}
                </p>
              </div>
            )}

            {/* Result & Verified Outcomes */}
            {cs?.result && (
              <div className="flex flex-col gap-4 p-8 rounded-3xl glass-panel-elevated">
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  05 / Measurable Results
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  Business & Technical Impact
                </h3>
                <p className="text-platinum-200 text-sm sm:text-base leading-relaxed font-light">
                  {cs.result}
                </p>
              </div>
            )}

            {/* Media Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery gallery={project.gallery} title={project.title} />
            )}
          </div>

          {/* Sidebar: GEO Entity Card & Technologies */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* GEO Entity Machine-Readable Card */}
            <KeyFactsCard
              geo={project.geo}
              title={project.title}
              category={project.category}
              role={project.role}
              year={project.year}
              technologies={project.technologies}
            />

            {/* Technologies Applied */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-platinum-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Services Provided */}
            {project.services && project.services.length > 0 && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                  Services Provided
                </h4>
                <div className="flex flex-col gap-2">
                  {project.services.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-platinum-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#dfb15b]" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="pt-20 border-t border-white/[0.08] flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Explore More Case Studies
              </h3>
              <Link
                href="/work"
                className="text-xs font-mono uppercase tracking-widest text-platinum-400 hover:text-[#dfb15b] flex items-center gap-1.5"
              >
                <span>Full Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rp, idx) => (
                <ProjectCard key={rp.id} project={rp} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Global Consultation Bridge */}
      <div className="mt-20">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
