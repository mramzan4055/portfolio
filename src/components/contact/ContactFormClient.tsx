"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Send } from "lucide-react";

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    service: "Full-Stack Architecture",
    budget: "$10k — $25k",
    timeline: "1 — 2 Months",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "error") {
    return (
      <div className="glass-panel-elevated p-10 sm:p-12 rounded-3xl flex flex-col items-center justify-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400">
          <span className="text-2xl">!</span>
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          <h3 className="text-2xl font-display font-bold text-white">
            Transmission Failed
          </h3>
          <p className="text-sm text-platinum-300 font-light leading-relaxed">
            Something went wrong sending your message. Please try again or reach out directly via email.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-platinum-300 hover:text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="glass-panel-elevated p-10 sm:p-12 rounded-3xl flex flex-col items-center justify-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#dfb15b]/20 border border-[#dfb15b] flex items-center justify-center text-[#dfb15b]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          <h3 className="text-2xl font-display font-bold text-white">
            Inquiry Successfully Transmitted
          </h3>
          <p className="text-sm text-platinum-300 font-light leading-relaxed">
            Thank you for reaching out. I will review your project requirements and respond within 24 business hours.
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              organization: "",
              service: "Full-Stack Architecture",
              budget: "$10k — $25k",
              timeline: "1 — 2 Months",
              message: "",
            });
          }}
          className="px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-platinum-300 hover:text-white"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel-elevated p-8 sm:p-12 rounded-3xl flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Your Name <span className="text-[#dfb15b]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Work Email <span className="text-[#dfb15b]">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="e.g. eleanor@brand.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Company / Organization
          </label>
          <input
            type="text"
            placeholder="e.g. Vance Atelier Ltd."
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Target Service
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          >
            <option value="Full-Stack Architecture">Full-Stack Architecture</option>
            <option value="Custom Headless CMS">Custom Headless CMS</option>
            <option value="AI Integration & GEO">AI Integration & GEO</option>
            <option value="Creative UI/UX & WebGL">Creative UI/UX & WebGL</option>
            <option value="Technical Consulting / Audit">Technical Consulting / Audit</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Estimated Budget Range
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          >
            <option value="< $10k">&lt; $10k (Advisory / Audit)</option>
            <option value="$10k — $25k">$10k — $25k</option>
            <option value="$25k — $50k">$25k — $50k</option>
            <option value="$50k+">$50k+ (Enterprise Architecture)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Target Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          >
            <option value="Immediate (1-2 Weeks)">Immediate (1-2 Weeks)</option>
            <option value="1 — 2 Months">1 — 2 Months</option>
            <option value="Q3/Q4 Planning">Q3/Q4 Planning</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase text-platinum-400">
          Project Vision & Requirements <span className="text-[#dfb15b]">*</span>
        </label>
        <textarea
          required
          rows={5}
          placeholder="Briefly describe your objectives, key challenges, and desired launch targets..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-full bg-gradient-to-r from-[#dfb15b] via-[#e5c07b] to-[#c7963b] text-black font-bold text-xs uppercase tracking-widest hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Encrypting & Sending...</span>
          </>
        ) : (
          <>
            <span>Transmit Project Proposal</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
