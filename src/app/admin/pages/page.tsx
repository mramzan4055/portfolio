"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Save,
  CheckCircle,
  Eye,
  ArrowUpRight,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import { Page, PageSection } from "@/types";

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string>("page-home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pages");
      const data = await res.json();
      if (data.success) {
        setPages(data.pages);
      }
    } catch (e) {
      console.error("Failed to fetch pages:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const activePage = pages.find((p) => p.id === selectedPageId) || pages[0];

  const handleToggleSection = (sectionId: string) => {
    if (!activePage) return;
    const updatedSections = activePage.sections.map((sec) =>
      sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec
    );
    const updatedPage = { ...activePage, sections: updatedSections };
    setPages((prev) => prev.map((p) => (p.id === activePage.id ? updatedPage : p)));
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    if (!activePage) return;
    const newSections = [...activePage.sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // re-assign order
    newSections.forEach((sec, idx) => {
      sec.order = idx + 1;
    });

    const updatedPage = { ...activePage, sections: newSections };
    setPages((prev) => prev.map((p) => (p.id === activePage.id ? updatedPage : p)));
  };

  const handleSavePage = async () => {
    if (!activePage) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activePage),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback("Page layout and sections saved successfully.");
      }
    } catch {
      setFeedback("Failed to save page layout.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Page CMS & Section Builder
          </h1>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Enable, disable, reorder, and configure page layout sections without editing code.
          </p>
        </div>

        <button
          onClick={handleSavePage}
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Page Layout</span>
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Page Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/[0.08]">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPageId(p.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
              activePage?.id === p.id
                ? "bg-[#dfb15b] text-black font-bold"
                : "text-platinum-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {p.title.split("—")[0].trim()} Page (/{p.slug === "home" ? "" : p.slug})
          </button>
        ))}
      </div>

      {/* Sections Manager */}
      {loading ? (
        <div className="glass-panel p-12 text-center text-xs font-mono text-platinum-400 rounded-3xl">
          Loading page layout schemas...
        </div>
      ) : activePage ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Section Stack */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h2 className="text-lg font-display font-bold text-white">
                  Modular Section Architecture
                </h2>
                <p className="text-xs text-platinum-400 font-mono">
                  Drag/reorder or toggle visibility of components on this route.
                </p>
              </div>
              <span className="text-xs font-mono text-[#dfb15b]">
                {activePage.sections.filter((s) => s.enabled).length} Active Sections
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {activePage.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    sec.enabled
                      ? "bg-white/[0.02] border-white/[0.08] hover:border-[#dfb15b]/30"
                      : "bg-black/40 border-white/[0.04] opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-platinum-500 w-5">
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white font-display">
                        {sec.title}
                      </span>
                      <span className="text-[10px] font-mono text-platinum-400 uppercase">
                        Type: {sec.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Reorder Buttons */}
                    <button
                      onClick={() => handleMoveSection(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg bg-white/[0.03] text-platinum-400 hover:text-white disabled:opacity-30"
                      title="Move Section Up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveSection(idx, "down")}
                      disabled={idx === activePage.sections.length - 1}
                      className="p-1.5 rounded-lg bg-white/[0.03] text-platinum-400 hover:text-white disabled:opacity-30"
                      title="Move Section Down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Enable/Disable Toggle */}
                    <button
                      onClick={() => handleToggleSection(sec.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold transition-colors ${
                        sec.enabled
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                          : "bg-white/[0.05] text-platinum-500 border border-white/10"
                      }`}
                    >
                      {sec.enabled ? "Active" : "Disabled"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Metadata Sidebar */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
            <h3 className="text-base font-display font-bold text-white">
              Page Metadata & SEO
            </h3>

            <div className="flex flex-col gap-4 text-xs font-mono">
              <div className="flex flex-col gap-1.5">
                <label className="text-platinum-400 uppercase text-[10px]">
                  Page Meta Title
                </label>
                <input
                  type="text"
                  value={activePage.title}
                  onChange={(e) => {
                    const updated = { ...activePage, title: e.target.value };
                    setPages((prev) => prev.map((p) => (p.id === activePage.id ? updated : p)));
                  }}
                  className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-platinum-400 uppercase text-[10px]">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={activePage.description}
                  onChange={(e) => {
                    const updated = { ...activePage, description: e.target.value };
                    setPages((prev) => prev.map((p) => (p.id === activePage.id ? updated : p)));
                  }}
                  className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white focus:outline-none focus:border-[#dfb15b] resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex justify-between items-center text-xs font-mono text-platinum-400">
              <span>Status:</span>
              <span className="text-emerald-400 font-bold uppercase">{activePage.status}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
