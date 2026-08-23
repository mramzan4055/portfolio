"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  Sparkles,
  Layers,
  FileText,
  Image as ImageIcon,
  Search,
  Bot,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Project, ProjectStatus } from "@/types";
import { slugify } from "@/lib/utils";

interface ProjectFormProps {
  initialData?: Partial<Project>;
  isNew?: boolean;
}

export function ProjectForm({ initialData, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "casestudy" | "stack" | "media" | "seo" | "geo">("general");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Project>({
    id: initialData?.id || `proj-${Date.now()}`,
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    category: initialData?.category || "Web Platform",
    year: initialData?.year || new Date().getFullYear().toString(),
    status: (initialData?.status as ProjectStatus) || "draft",
    featured: initialData?.featured || false,
    order: initialData?.order || 1,
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    role: initialData?.role || "Web & Mobile App Developer",
    client: initialData?.client || "",
    technologies: initialData?.technologies || ["WordPress", "React", "Next.js", "Flutter", "HTML5", "CSS3", "JavaScript"],
    services: initialData?.services || ["Web Development", "UI/UX Design", "Responsive Layout"],
    heroImage: initialData?.heroImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: initialData?.thumbnailImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gallery: initialData?.gallery || [],
    videoUrl: initialData?.videoUrl || "",
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    caseStudy: {
      overview: initialData?.caseStudy?.overview || "",
      challenge: initialData?.caseStudy?.challenge || "",
      solution: initialData?.caseStudy?.solution || "",
      process: initialData?.caseStudy?.process || "",
      result: initialData?.caseStudy?.result || "",
    },
    seo: {
      title: initialData?.seo?.title || "",
      description: initialData?.seo?.description || "",
      keywords: initialData?.seo?.keywords || [],
      ogImage: initialData?.seo?.ogImage || "",
    },
    geo: {
      entityType: initialData?.geo?.entityType || "SoftwareApplication",
      primaryEntity: initialData?.geo?.primaryEntity || initialData?.title || "",
      summary: initialData?.geo?.summary || "",
      keyFacts: initialData?.geo?.keyFacts || [],
      targetAudience: initialData?.geo?.targetAudience || ["Enterprise Leaders", "Tech Founders"],
      faq: initialData?.geo?.faq || [],
    },
    metrics: initialData?.metrics || [
      { label: "Performance", value: "99/100" },
      { label: "Throughput", value: "10k req/s" },
    ],
    createdAt: initialData?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // AI Generation Drawer State
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ suggestion: string; rationale: string; targetField: string } | null>(null);

  // Tag inputs
  const [newTech, setNewTech] = useState("");
  const [newService, setNewService] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [newKeyFact, setNewKeyFact] = useState("");

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isNew && (!prev.slug || prev.slug === slugify(prev.title)) ? slugify(val) : prev.slug,
      seo: {
        ...prev.seo,
        title: prev.seo.title ? prev.seo.title : `${val} — Case Study | M Ramzan`,
      },
      geo: {
        ...prev.geo,
        primaryEntity: val,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const endpoint = isNew ? "/api/projects" : `/api/projects/${formData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: "success", message: "Project saved successfully to CMS database." });
        if (isNew) {
          router.push(`/admin/projects/${data.project.id}`);
        }
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to save project." });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  // AI Assistant Action
  const handleAIGenerate = async (
    type: "seo_title" | "meta_description" | "project_summary" | "geo_keyfacts" | "faq_suggestions",
    targetField: string
  ) => {
    setAiGenerating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, projectData: formData }),
      });
      const data = await res.json();
      if (data.success) {
        setAiSuggestion({
          suggestion: data.suggestion,
          rationale: data.rationale,
          targetField,
        });
      }
    } catch {
      alert("AI Assistant generation failed");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAcceptAISuggestion = () => {
    if (!aiSuggestion) return;
    const { targetField, suggestion } = aiSuggestion;

    if (targetField === "seo.title") {
      setFormData((prev) => ({ ...prev, seo: { ...prev.seo, title: suggestion } }));
    } else if (targetField === "seo.description") {
      setFormData((prev) => ({ ...prev, seo: { ...prev.seo, description: suggestion } }));
    } else if (targetField === "geo.summary") {
      setFormData((prev) => ({ ...prev, geo: { ...prev.geo, summary: suggestion } }));
    } else if (targetField === "geo.keyFacts") {
      try {
        const parsed = JSON.parse(suggestion);
        setFormData((prev) => ({ ...prev, geo: { ...prev.geo, keyFacts: parsed } }));
      } catch {
        setFormData((prev) => ({ ...prev, geo: { ...prev.geo, keyFacts: [suggestion] } }));
      }
    } else if (targetField === "geo.faq") {
      try {
        const parsed = JSON.parse(suggestion);
        setFormData((prev) => ({ ...prev, geo: { ...prev.geo, faq: parsed } }));
      } catch {}
    }

    setAiSuggestion(null);
  };

  const tabs = [
    { id: "general", label: "General & Scope", icon: Layers },
    { id: "casestudy", label: "Case Study Narrative", icon: FileText },
    { id: "stack", label: "Stack & Services", icon: Sparkles },
    { id: "media", label: "Media & Visuals", icon: ImageIcon },
    { id: "seo", label: "SEO & Social", icon: Search },
    { id: "geo", label: "GEO & AI Knowledge", icon: Bot },
  ];

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 sm:p-6 rounded-3xl sticky top-20 z-20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white/[0.04] text-platinum-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
              {isNew ? "Create New Project" : `Edit: ${formData.title || "Project"}`}
            </h1>
            <span className="text-[11px] font-mono text-platinum-400">
              {formData.status === "published" ? "Published Live" : "Draft (Hidden from Public)"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              href={`/projects/${formData.slug}`}
              target="_blank"
              className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-platinum-300 hover:text-white flex items-center gap-1.5"
            >
              <span>View Public</span>
              <ExternalLink className="w-3 h-3 text-[#dfb15b]" />
            </Link>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Project</span>
              </>
            )}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-mono flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-950/60 border border-emerald-500/30 text-emerald-300"
              : "bg-red-950/60 border border-red-500/30 text-red-300"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/[0.08]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#dfb15b] text-black font-bold"
                  : "text-platinum-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Suggestion Review Banner (Generate -> Review -> Accept -> Save) */}
      {aiSuggestion && (
        <div className="p-6 rounded-3xl glass-panel-gold flex flex-col gap-4 border border-[#dfb15b]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#dfb15b] font-mono text-xs uppercase font-bold">
              <Sparkles className="w-4 h-4" />
              <span>AI Content Suggestion for: {aiSuggestion.targetField}</span>
            </div>
            <button
              type="button"
              onClick={() => setAiSuggestion(null)}
              className="text-xs text-platinum-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white leading-relaxed whitespace-pre-wrap">
            {aiSuggestion.suggestion}
          </div>

          <p className="text-[11px] text-platinum-400 font-mono italic">
            Rationale: {aiSuggestion.rationale}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAcceptAISuggestion}
              className="px-5 py-2 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider"
            >
              Accept & Apply Suggestion
            </button>
            <button
              type="button"
              onClick={() => setAiSuggestion(null)}
              className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-platinum-300 hover:text-white"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: GENERAL INFO */}
      {activeTab === "general" && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Project Title <span className="text-[#dfb15b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Alqadir Quran Academy"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                URL Slug <span className="text-[#dfb15b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                placeholder="e.g. alqadir-quran-academy"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Project Subtitle / Value Proposition
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Global Online Educational Platform & Student Management Portal"
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Web Platform & EdTech"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Year / Era
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Client / Organization
              </label>
              <input
                type="text"
                value={formData.client || ""}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Alqadir Academy Global"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Architectural Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Lead Full-Stack Architect & UI/UX Designer"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Publishing Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                className="px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              >
                <option value="published">Published (Visible on public site & sitemap)</option>
                <option value="draft">Draft (Hidden from public site & noindex)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Live URL
              </label>
              <input
                type="url"
                value={formData.liveUrl || ""}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl || ""}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="featured-check"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-[#dfb15b] focus:ring-[#dfb15b]"
            />
            <label htmlFor="featured-check" className="text-xs font-mono text-platinum-200 cursor-pointer">
              Mark as Featured Showcase Project on Homepage
            </label>
          </div>
        </div>
      )}

      {/* TAB 2: CASE STUDY */}
      {activeTab === "casestudy" && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Short Description (Card Lead-In)
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief 1-2 sentence lead-in..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-platinum-400">
                01 / Executive Overview
              </label>
            </div>
            <textarea
              rows={4}
              value={formData.caseStudy.overview}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caseStudy: { ...formData.caseStudy, overview: e.target.value },
                })
              }
              placeholder="Project background and objectives..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              02 / The Architectural Challenge
            </label>
            <textarea
              rows={4}
              value={formData.caseStudy.challenge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caseStudy: { ...formData.caseStudy, challenge: e.target.value },
                })
              }
              placeholder="Primary constraints, bottlenecks, or scale hurdles..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              03 / The Engineering Solution
            </label>
            <textarea
              rows={4}
              value={formData.caseStudy.solution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caseStudy: { ...formData.caseStudy, solution: e.target.value },
                })
              }
              placeholder="How the system was designed, structured, and solved..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              04 / Development Methodology & Process
            </label>
            <textarea
              rows={4}
              value={formData.caseStudy.process}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caseStudy: { ...formData.caseStudy, process: e.target.value },
                })
              }
              placeholder="Step-by-step engineering and deployment execution..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              05 / Measurable Results & Outcomes
            </label>
            <textarea
              rows={4}
              value={formData.caseStudy.result}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caseStudy: { ...formData.caseStudy, result: e.target.value },
                })
              }
              placeholder="Verified metrics, performance gains, and business impact..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>
        </div>
      )}

      {/* TAB 3: STACK & SERVICES */}
      {activeTab === "stack" && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-8">
          {/* Technologies Tagging */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Technologies & Frameworks Tagged
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white flex items-center gap-2"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        technologies: formData.technologies.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add technology (e.g. Next.js, Redis)..."
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newTech.trim()) {
                      setFormData({
                        ...formData,
                        technologies: [...formData.technologies, newTech.trim()],
                      });
                      setNewTech("");
                    }
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white w-64 focus:outline-none focus:border-[#dfb15b]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newTech.trim()) {
                    setFormData({
                      ...formData,
                      technologies: [...formData.technologies, newTech.trim()],
                    });
                    setNewTech("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.05] text-xs font-mono text-platinum-300 hover:text-white"
              >
                Add Tech
              </button>
            </div>
          </div>

          {/* Services Tagging */}
          <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Services Delivered
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 text-xs font-mono text-[#dfb15b] flex items-center gap-2"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        services: formData.services.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add service (e.g. Full-Stack Engineering)..."
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newService.trim()) {
                      setFormData({
                        ...formData,
                        services: [...formData.services, newService.trim()],
                      });
                      setNewService("");
                    }
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white w-64 focus:outline-none focus:border-[#dfb15b]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newService.trim()) {
                    setFormData({
                      ...formData,
                      services: [...formData.services, newService.trim()],
                    });
                    setNewService("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.05] text-xs font-mono text-platinum-300 hover:text-white"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MEDIA */}
      {activeTab === "media" && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Hero Image URL (Public Showcase)
            </label>
            <input
              type="text"
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
            {formData.heroImage && (
              <div className="relative aspect-[16/9] w-full max-w-md rounded-2xl overflow-hidden mt-2 border border-white/10">
                <Image src={formData.heroImage} alt="Hero preview" fill className="object-cover" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.08]">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Gallery Image Frames
            </label>
            <div className="flex flex-wrap gap-4">
              {formData.gallery.map((url, idx) => (
                <div key={idx} className="relative aspect-[16/10] w-48 rounded-xl overflow-hidden border border-white/10 group">
                  <Image src={url} alt={`Gallery ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        gallery: formData.gallery.filter((_, i) => i !== idx),
                      })
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-950/80 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Paste image URL to add to gallery..."
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white flex-1 focus:outline-none focus:border-[#dfb15b]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newGalleryUrl.trim()) {
                    setFormData({
                      ...formData,
                      gallery: [...formData.gallery, newGalleryUrl.trim()],
                    });
                    setNewGalleryUrl("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.05] text-xs font-mono text-platinum-300 hover:text-white"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SEO & SOCIAL GRAPH */}
      {activeTab === "seo" && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-platinum-400">
                SEO Title Tag ({formData.seo.title.length}/60 chars)
              </label>
              <button
                type="button"
                onClick={() => handleAIGenerate("seo_title", "seo.title")}
                disabled={aiGenerating}
                className="text-[11px] font-mono text-[#dfb15b] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Suggest Title</span>
              </button>
            </div>
            <input
              type="text"
              value={formData.seo.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, title: e.target.value },
                })
              }
              placeholder="e.g. Alqadir Quran Academy — Case Study | M Ramzan"
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Meta Description ({formData.seo.description.length}/155 chars)
              </label>
              <button
                type="button"
                onClick={() => handleAIGenerate("meta_description", "seo.description")}
                disabled={aiGenerating}
                className="text-[11px] font-mono text-[#dfb15b] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Suggest Description</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={formData.seo.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, description: e.target.value },
                })
              }
              placeholder="Concise 140-160 character snippet..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b] resize-none"
            />
          </div>

          {/* Live Google Search Preview */}
          <div className="p-6 rounded-2xl bg-black/50 border border-white/[0.08] flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-platinum-500 mb-1">
              Live Google Search Preview
            </span>
            <span className="text-xs text-[#8ab4f8] font-mono truncate">
              https://mramzan.dev/projects/{formData.slug || "slug"}
            </span>
            <span className="text-base text-[#99c3ff] font-medium hover:underline cursor-pointer">
              {formData.seo.title || formData.title || "Project Title"}
            </span>
            <span className="text-xs text-platinum-400 leading-relaxed line-clamp-2">
              {formData.seo.description || formData.shortDescription || "Meta description preview..."}
            </span>
          </div>
        </div>
      )}

      {/* TAB 6: GEO & AI KNOWLEDGE */}
      {activeTab === "geo" && (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Schema Entity Type
              </label>
              <select
                value={formData.geo.entityType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    geo: { ...formData.geo, entityType: e.target.value },
                  })
                }
                className="px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              >
                <option value="SoftwareApplication">SoftwareApplication</option>
                <option value="EducationalPlatform">EducationalPlatform</option>
                <option value="ECommercePlatform">ECommercePlatform</option>
                <option value="CivicPlatform">CivicPlatform</option>
                <option value="PersonBrandPlatform">PersonBrandPlatform</option>
                <option value="AutomationSoftware">AutomationSoftware</option>
                <option value="CulturalArchive">CulturalArchive</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Primary Entity Name
              </label>
              <input
                type="text"
                value={formData.geo.primaryEntity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    geo: { ...formData.geo, primaryEntity: e.target.value },
                  })
                }
                placeholder="e.g. Alqadir Quran Academy"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Machine-Readable GEO Summary
              </label>
              <button
                type="button"
                onClick={() => handleAIGenerate("project_summary", "geo.summary")}
                disabled={aiGenerating}
                className="text-[11px] font-mono text-[#dfb15b] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Generate GEO Summary</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={formData.geo.summary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  geo: { ...formData.geo, summary: e.target.value },
                })
              }
              placeholder="Factual summary structured for AI answer engines (ChatGPT, Perplexity)..."
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b] resize-none"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Verified Entity Key Facts
              </label>
              <button
                type="button"
                onClick={() => handleAIGenerate("geo_keyfacts", "geo.keyFacts")}
                disabled={aiGenerating}
                className="text-[11px] font-mono text-[#dfb15b] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Suggest Key Facts</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {formData.geo.keyFacts?.map((fact, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-xs font-mono text-platinum-300 flex-1">{fact}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        geo: {
                          ...formData.geo,
                          keyFacts: formData.geo.keyFacts.filter((_, i) => i !== idx),
                        },
                      })
                    }
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add factual attribute (e.g. Stack: Next.js & MySQL)..."
                value={newKeyFact}
                onChange={(e) => setNewKeyFact(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white flex-1 focus:outline-none focus:border-[#dfb15b]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newKeyFact.trim()) {
                    setFormData({
                      ...formData,
                      geo: {
                        ...formData.geo,
                        keyFacts: [...(formData.geo.keyFacts || []), newKeyFact.trim()],
                      },
                    });
                    setNewKeyFact("");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.05] text-xs font-mono text-platinum-300 hover:text-white"
              >
                Add Fact
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
