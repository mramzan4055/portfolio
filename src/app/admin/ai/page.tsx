"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Project, AIAnalysisResult } from "@/types";
import { analyzeProjectSEOandGEO } from "@/lib/ai/assistant";

export default function AdminAiAssistantPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [auditResult, setAuditResult] = useState<AIAnalysisResult | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.projects.length > 0) {
          setProjects(data.projects);
          setSelectedProjectId(data.projects[0].id);
          setAuditResult(analyzeProjectSEOandGEO(data.projects[0]));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const p = projects.find((proj) => proj.id === projectId);
    if (p) {
      setAuditResult(analyzeProjectSEOandGEO(p));
    }
  };

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-6 h-6 rounded-lg bg-[#dfb15b]/20 border border-[#dfb15b]/40 flex items-center justify-center text-[#dfb15b]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              AI Content & GEO Optimization Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Audit projects for SEO completeness, Generative Engine Optimization readiness, and structured entity quality.
          </p>
        </div>

        {currentProject && (
          <Link
            href={`/admin/projects/${currentProject.id}`}
            className="px-5 py-2.5 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold transition-all self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>Open in Project Editor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Project Selector Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase text-platinum-400">Select Project to Audit:</span>
          <select
            value={selectedProjectId}
            onChange={(e) => handleSelectProject(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-[#dfb15b]"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.category})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-platinum-400">
          <span>Status:</span>
          <span className="text-emerald-400 uppercase font-bold">{currentProject?.status}</span>
        </div>
      </div>

      {/* Audit Scores & Checklist */}
      {loading ? (
        <div className="glass-panel p-12 text-center text-xs font-mono text-platinum-400 rounded-3xl">
          Running automated AI content & SEO audit...
        </div>
      ) : auditResult && currentProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Score Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel-elevated p-8 rounded-3xl flex flex-col gap-6">
              <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dfb15b]" />
                <span>Readiness Index</span>
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-platinum-400">SEO Quality Score</span>
                  <span className="text-xl font-display font-bold text-gradient-gold">
                    {auditResult.seoScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] rounded-full"
                    style={{ width: `${auditResult.seoScore}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-platinum-400">GEO Entity Readiness</span>
                  <span className="text-xl font-display font-bold text-emerald-400">
                    {auditResult.geoScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${auditResult.geoScore}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-platinum-400">Prose Readability</span>
                  <span className="text-xl font-display font-bold text-white">
                    {auditResult.readabilityScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${auditResult.readabilityScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* AI Suggestion Box */}
            {auditResult.suggestions.length > 0 && (
              <div className="glass-panel p-6 rounded-3xl flex flex-col gap-4 border border-[#dfb15b]/20">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfb15b] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Actionable AI Recommendations</span>
                </h3>
                <div className="flex flex-col gap-2.5">
                  {auditResult.suggestions.map((sug, i) => (
                    <div key={i} className="text-xs text-platinum-300 font-mono leading-relaxed p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      • {sug}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Audit Verification Checklist */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-display font-bold text-white">
                  Technical Checklist: {currentProject.title}
                </h2>
                <p className="text-xs text-platinum-400 font-mono">
                  Real-time validation against search and generative engine indexing requirements.
                </p>
              </div>
              <span className="text-xs font-mono text-platinum-400">
                {auditResult.checklist.filter((c) => c.status === "pass").length} / {auditResult.checklist.length} Passed
              </span>
            </div>

            <div className="flex flex-col divide-y divide-white/[0.06]">
              {auditResult.checklist.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {item.status === "pass" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : item.status === "warn" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white font-display">
                        {item.item}
                      </span>
                      <span className="text-xs text-platinum-400 font-mono">
                        {item.message}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                      item.status === "pass"
                        ? "bg-emerald-950/70 text-emerald-400 border border-emerald-500/20"
                        : item.status === "warn"
                        ? "bg-amber-950/70 text-amber-400 border border-amber-500/20"
                        : "bg-red-950/70 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
