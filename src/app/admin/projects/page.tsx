"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  ArrowUpRight,
  Edit2,
  Trash2,
  Copy,
  Sparkles,
  CheckCircle,
  Clock,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Project, ProjectStatus } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error("Failed to fetch projects:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you wish to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert("Failed to delete project");
    }
  };

  const handleDuplicate = async (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy-${Date.now().toString().slice(-4)}`,
      status: "draft",
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duplicated),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => [data.project, ...prev]);
      }
    } catch {
      alert("Failed to duplicate project");
    }
  };

  const handleToggleStatus = async (project: Project) => {
    const newStatus: ProjectStatus = project.status === "published" ? "draft" : "published";
    const updated = { ...project, status: newStatus };

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.map((p) => (p.id === project.id ? data.project : p)));
      }
    } catch {
      alert("Failed to update project status");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Create, edit, duplicate, publish, and reorder portfolio case studies.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                statusFilter === status
                  ? "bg-[#dfb15b] text-black font-bold"
                  : "bg-white/[0.04] text-platinum-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-platinum-400">
            Loading project records from CMS database...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-platinum-400">
            No projects matched your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/[0.08] bg-white/[0.02] text-platinum-400 uppercase tracking-wider">
                <tr>
                  <th className="p-4 sm:px-6">Project Title & Slug</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:px-6">
                      <div className="flex flex-col gap-0.5">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="font-display font-semibold text-white hover:text-[#dfb15b] transition-colors text-sm"
                        >
                          {project.title}
                        </Link>
                        <span className="text-[10px] text-platinum-500 font-mono">
                          /projects/{project.slug}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-platinum-300">
                      {project.category}
                    </td>

                    <td className="p-4 text-platinum-400">
                      {project.year}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(project)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                          project.status === "published"
                            ? "bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/50"
                            : "bg-amber-950/70 text-amber-400 border border-amber-500/30 hover:bg-amber-900/50"
                        }`}
                        title="Click to toggle status"
                      >
                        {project.status === "published" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{project.status}</span>
                      </button>
                    </td>

                    <td className="p-4">
                      {project.featured ? (
                        <span className="text-[#dfb15b] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-platinum-500">No</span>
                      )}
                    </td>

                    <td className="p-4 text-right sm:px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-platinum-400 hover:text-white hover:bg-white/[0.04]"
                          title="View Live Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(project)}
                          className="p-1.5 rounded-lg text-platinum-400 hover:text-white hover:bg-white/[0.04]"
                          title="Duplicate Project"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-1.5 rounded-lg text-platinum-400 hover:text-[#dfb15b] hover:bg-white/[0.04]"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
