"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  Globe,
  User,
  Mail,
  Phone,
  MapPin,
  Share2,
  BarChart,
  Loader2,
  Shield,
} from "lucide-react";
import { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
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
        setFeedback("Site settings and personal entity identity updated successfully.");
      }
    } catch {
      setFeedback("Failed to save settings.");
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
            Site & Personal Entity Settings
          </h1>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Maintain single-source-of-truth for personal brand identity, social channels, and analytics.
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
              <span>Save Settings</span>
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

      {loading || !settings ? (
        <div className="glass-panel p-12 text-center text-xs font-mono text-platinum-400 rounded-3xl">
          Loading site configuration...
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          {/* Section 1: Personal Entity Identity */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#dfb15b]" />
              <span>Personal Entity & Brand Identity</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Full Author Name
                </label>
                <input
                  type="text"
                  value={settings.authorName}
                  onChange={(e) => setSettings({ ...settings, authorName: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Author Professional Title
                </label>
                <input
                  type="text"
                  value={settings.authorTitle}
                  onChange={(e) => setSettings({ ...settings, authorTitle: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-platinum-400">
                Author Biography & Entity Statement
              </label>
              <textarea
                rows={3}
                value={settings.authorBio}
                onChange={(e) => setSettings({ ...settings, authorBio: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  value={settings.authorEmail}
                  onChange={(e) => setSettings({ ...settings, authorEmail: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Geographic Location
                </label>
                <input
                  type="text"
                  value={settings.authorLocation}
                  onChange={(e) => setSettings({ ...settings, authorLocation: e.target.value })}
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Availability Status
                </label>
                <select
                  value={settings.availabilityStatus}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      availabilityStatus: e.target.value as any,
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                >
                  <option value="Available for Q1/Q2 Projects">Available for Q1/Q2 Projects</option>
                  <option value="Selectively Available">Selectively Available</option>
                  <option value="Booked">Booked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Social Channels */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#dfb15b]" />
              <span>Social & Portfolio Channels</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.github || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value },
                    })
                  }
                  placeholder="https://github.com/..."
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.linkedin || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/in/..."
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.twitter || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                    })
                  }
                  placeholder="https://twitter.com/..."
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Dribbble Profile URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.dribbble || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, dribbble: e.target.value },
                    })
                  }
                  placeholder="https://dribbble.com/..."
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Analytics Integration */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl flex flex-col gap-6">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <BarChart className="w-4 h-4 text-[#dfb15b]" />
              <span>Analytics & Webmaster Verification</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Google Analytics Measurement ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.googleAnalyticsId || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      analytics: { ...settings.analytics, googleAnalyticsId: e.target.value },
                    })
                  }
                  placeholder="G-XXXXXXXXXX"
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Google Search Console Verification Token
                </label>
                <input
                  type="text"
                  value={settings.analytics.googleSearchConsoleId || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      analytics: { ...settings.analytics, googleSearchConsoleId: e.target.value },
                    })
                  }
                  placeholder="google-site-verification=..."
                  className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-[#dfb15b]"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
