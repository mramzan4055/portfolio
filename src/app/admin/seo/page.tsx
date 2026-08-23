"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Globe,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Save,
  Loader2,
} from "lucide-react";
import { SiteSettings } from "@/types";

export default function AdminSeoPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.settings);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback("Global SEO configuration saved successfully.");
      }
    } catch {
      setFeedback("Failed to save SEO settings.");
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
            SEO & Technical Optimization Hub
          </h1>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Manage global meta tags, OpenGraph social cards, structured JSON-LD schemas, sitemap, and robots.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !settings}
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
              <span>Save Global SEO</span>
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* SEO Technical Audit Status Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-platinum-400">Dynamic Sitemap</span>
            <Link href="/sitemap.xml" target="_blank" className="text-[#dfb15b] hover:underline flex items-center gap-1 text-[11px] font-mono">
              <span>Inspect</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold font-display">
            <CheckCircle2 className="w-4 h-4" />
            <span>Auto-Generated XML</span>
          </div>
          <p className="text-[11px] text-platinum-500 font-mono">
            Automatically includes all published projects and static pages. Drafts excluded.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-platinum-400">Robots.txt Policy</span>
            <Link href="/robots.txt" target="_blank" className="text-[#dfb15b] hover:underline flex items-center gap-1 text-[11px] font-mono">
              <span>Inspect</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold font-display">
            <CheckCircle2 className="w-4 h-4" />
            <span>Configured Securely</span>
          </div>
          <p className="text-[11px] text-platinum-500 font-mono">
            Public pages enabled for search bots. Admin console routes disallowed.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-platinum-400">Structured Data</span>
            <span className="text-emerald-400 text-xs font-mono">Schema.org</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold font-display">
            <CheckCircle2 className="w-4 h-4" />
            <span>JSON-LD Person & Projects</span>
          </div>
          <p className="text-[11px] text-platinum-500 font-mono">
            Full Person, WebSite, CreativeWork, Breadcrumbs, and FAQPage schemas active.
          </p>
        </div>
      </div>

      {/* Global Meta Configuration Form */}
      {loading || !settings ? (
        <div className="glass-panel p-12 text-center text-xs font-mono text-platinum-400 rounded-3xl">
          Loading SEO configuration...
        </div>
      ) : (
        <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
          <h2 className="text-lg font-display font-bold text-white">
            Default Global Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Default Site Title
              </label>
              <input
                type="text"
                value={settings.seo.defaultTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, defaultTitle: e.target.value },
                  })
                }
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Title Template Pattern
              </label>
              <input
                type="text"
                value={settings.seo.titleTemplate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, titleTemplate: e.target.value },
                  })
                }
                placeholder="%s | Author Name"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={settings.seo.defaultDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultDescription: e.target.value },
                })
              }
              className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Default OpenGraph Social Image URL
              </label>
              <input
                type="text"
                value={settings.seo.defaultOgImage}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, defaultOgImage: e.target.value },
                  })
                }
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Twitter / X Creator Handle
              </label>
              <input
                type="text"
                value={settings.seo.twitterHandle || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    seo: { ...settings.seo, twitterHandle: e.target.value },
                  })
                }
                placeholder="@username"
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
