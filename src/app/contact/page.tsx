import React from "react";
import { Metadata } from "next";
import { Mail, MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { ContactFormClient } from "@/components/contact/ContactFormClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Contact & Project Inquiries — M RAMZAN",
      description: "Initiate a project consultation with M Ramzan. Inquire regarding bespoke web engineering, headless CMS platforms, or architectural advisory.",
      canonical: "/contact",
    },
    settings
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-36 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Direct Collaboration
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Initiate a Consultation
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            Have a project in mind, an architectural challenge, or a strategic inquiry? Submit your requirements below for a prompt assessment.
          </p>
        </div>

        {/* Contact Grid: Form + Info Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactFormClient />
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel-elevated p-8 rounded-3xl flex flex-col gap-6">
              <h2 className="text-lg font-display font-bold text-white tracking-wide">
                Direct Channels & Availability
              </h2>

              <div className="flex flex-col gap-4 text-xs font-mono text-platinum-300">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Mail className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-platinum-500 uppercase">Primary Email</span>
                    <a href={`mailto:${settings.authorEmail}`} className="text-white hover:text-[#dfb15b] transition-colors">
                      {settings.authorEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Clock className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-platinum-500 uppercase">Response SLA</span>
                    <span className="text-white">Within 24 Business Hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <MapPin className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-platinum-500 uppercase">Geographic Location</span>
                    <span className="text-white">{settings.authorLocation} (UTC-5 to UTC+5 Coordination)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-emerald-300 font-semibold">Current Booking Status</span>
                <span className="text-xs text-platinum-400 font-light">{settings.availabilityStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
