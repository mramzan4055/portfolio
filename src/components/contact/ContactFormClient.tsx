"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Send, MessageCircle } from "lucide-react";

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "Business Website",
    budget: "PKR 30,000 – 50,000",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // 1. Try Next.js API route first
      let res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Fallback to /contact.php on cPanel / static Apache environments
      if (!res.ok) {
        res = await fetch("/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      try {
        const phpRes = await fetch("/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (phpRes.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
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
            Something Went Wrong
          </h3>
          <p className="text-sm text-platinum-300 font-light leading-relaxed">
            Your message couldn&apos;t be sent. Please try again, or reach out directly via WhatsApp or email.
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
            Message Received!
          </h3>
          <p className="text-sm text-platinum-300 font-light leading-relaxed">
            Thank you for reaching out. I&apos;ll review your project details and get back to you within 24 hours — usually much sooner on WhatsApp.
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              phone: "",
              businessName: "",
              service: "Business Website",
              budget: "PKR 30,000 – 50,000",
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
    <form onSubmit={handleSubmit} className="glass-panel-elevated p-8 sm:p-10 rounded-3xl flex flex-col gap-5">
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Your Name <span className="text-[#dfb15b]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ali Hassan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            WhatsApp / Phone <span className="text-[#dfb15b]">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +92 300 1234567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Row 2: Email + Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Email Address <span className="text-[#dfb15b]">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="e.g. ali@mybusiness.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Business / Shop Name
          </label>
          <input
            type="text"
            placeholder="e.g. Ali's Salon, Hassan Clinic..."
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Row 3: Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            I Need a...
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          >
            <option value="Business Website">Business Website</option>
            <option value="WordPress / CMS Website">WordPress / CMS Website</option>
            <option value="Portfolio Website">Portfolio Website</option>
            <option value="Landing Page">Landing Page</option>
            <option value="Website Redesign">Website Redesign</option>
            <option value="E-commerce / Online Store">E-commerce / Online Store</option>
            <option value="Mobile App (Flutter)">Mobile App (Flutter)</option>
            <option value="Website Maintenance">Website Maintenance</option>
            <option value="Other / Not Sure">Other / Not Sure</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase text-platinum-400">
            Estimated Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0e0e14] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono"
          >
            <option value="PKR 30,000 – 50,000">PKR 30,000 – 50,000</option>
            <option value="PKR 50,000 – 100,000">PKR 50,000 – 100,000</option>
            <option value="PKR 100,000+">PKR 100,000+</option>
            <option value="Not Sure / Need Consultation">Not Sure / Need Consultation</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase text-platinum-400">
          Tell me about your project <span className="text-[#dfb15b]">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="What does your business do? What pages do you need? Any design preferences or specific features?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50 transition-colors font-mono resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        id="contact-submit-btn"
        className="w-full py-4 rounded-full bg-gradient-to-r from-[#dfb15b] via-[#e5c07b] to-[#c7963b] text-black font-bold text-xs uppercase tracking-widest hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send My Project Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      {/* WhatsApp quick alternative */}
      <p className="text-center text-xs text-platinum-500 font-mono">
        Prefer to chat?{" "}
        <a
          href="https://wa.me/923096734231?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20website%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] hover:underline inline-flex items-center gap-1"
        >
          <MessageCircle className="w-3 h-3" />
          Message on WhatsApp
        </a>
        {" "}— I reply fast!
      </p>
    </form>
  );
}
