import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  FileCheck,
  FileClock,
  Layers,
  Image as ImageIcon,
  Sparkles,
  Search,
  ArrowUpRight,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { getDashboardMetrics } from "@/lib/data/store";

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  const statCards = [
    {
      label: "Total Projects",
      val: metrics.totalProjects,
      desc: "All portfolio entries",
      icon: FolderGit2,
      color: "text-white",
      href: "/admin/projects",
    },
    {
      label: "Published",
      val: metrics.publishedProjects,
      desc: "Live on public site",
      icon: FileCheck,
      color: "text-emerald-400",
      href: "/admin/projects?status=published",
    },
    {
      label: "Drafts",
      val: metrics.draftProjects,
      desc: "Unpublished edits",
      icon: FileClock,
      color: "text-amber-400",
      href: "/admin/projects?status=draft",
    },
    {
      label: "Media Assets",
      val: metrics.totalMedia,
      desc: "Stored graphics & UI",
      icon: ImageIcon,
      color: "text-blue-400",
      href: "/admin/media",
    },
    {
      label: "Pages & Sections",
      val: metrics.totalPages,
      desc: "Editable landing pages",
      icon: Layers,
      color: "text-purple-400",
      href: "/admin/pages",
    },
    {
      label: "SEO / GEO Score",
      val: `${metrics.seoScore}%`,
      desc: "Entity completeness index",
      icon: Sparkles,
      color: "text-[#dfb15b]",
      href: "/admin/seo",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Real-time content management metrics and publishing statistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between gap-4 hover:border-[#dfb15b]/40 hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-platinum-400 uppercase">
                  {stat.label}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-platinum-300 group-hover:text-[#dfb15b] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className={`text-3xl sm:text-4xl font-display font-bold ${stat.color}`}>
                  {stat.val}
                </span>
                <span className="text-[11px] font-mono text-platinum-500">
                  {stat.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Projects & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects Table */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                Recent Projects
              </h2>
              <p className="text-xs text-platinum-400 font-mono">
                Latest portfolio additions and case studies
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-[#dfb15b] hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.06]">
            {metrics.recentProjects.map((project) => (
              <div
                key={project.id}
                className="py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-sm font-semibold text-white hover:text-[#dfb15b] transition-colors font-display"
                    >
                      {project.title}
                    </Link>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        project.status === "published"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-950/60 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <span className="text-xs text-platinum-400 font-mono">
                    {project.category} • {project.year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs font-mono text-platinum-300 hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-platinum-400 hover:text-[#dfb15b]"
                    title="Live Preview"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CMS Quick Actions & SEO Audit Bar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel-elevated p-6 rounded-3xl flex flex-col gap-5">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#dfb15b]" />
              <span>AI Content & GEO Status</span>
            </h3>

            <p className="text-xs text-platinum-300 font-light leading-relaxed">
              All 8 primary projects are indexed with machine-readable GEO entities, JSON-LD schemas, and verified factual summaries.
            </p>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>JSON-LD Person & WebSite Active</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Dynamic Sitemap & Robots Ready</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Dual Repository (Supabase / Local Store)</span>
              </div>
            </div>

            <Link
              href="/admin/ai"
              className="mt-2 w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#dfb15b] hover:text-black text-center text-xs font-mono font-semibold transition-all"
            >
              Open AI Content Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
