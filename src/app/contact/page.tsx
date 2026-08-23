import React from "react";
import { Metadata } from "next";
import { Mail, MapPin, Clock, MessageCircle, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { ContactFormClient } from "@/components/contact/ContactFormClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Get in Touch — Website Development for Small Businesses | M Ramzan",
      description:
        "Contact M Ramzan to discuss your website project. Professional web developer for small businesses in Pakistan. Starting from PKR 30,000. Fast reply on WhatsApp.",
      canonical: "/contact",
    },
    settings
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const waUrl =
    settings.whatsappEnabled && settings.whatsappNumber
      ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
          settings.whatsappDefaultMessage || "Hi, I'd like to discuss a website project."
        )}`
      : "#";

  return (
    <div className="pt-36 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Let&apos;s Build Your{" "}
            <span className="text-gradient-gold">Website</span>
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            Tell me about your business and what you need. I&apos;ll get back to you within 24 hours — or just message me on WhatsApp for a faster reply.
          </p>
        </div>

        {/* Contact Grid: Form + Info Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactFormClient />
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* WhatsApp Quick Contact */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/60 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                  Chat on WhatsApp
                </span>
                <span className="text-xs text-platinum-400 font-mono">
                  Fastest way to reach me — I reply quickly!
                </span>
              </div>
            </a>

            {/* Contact Info Card */}
            <div className="glass-panel-elevated p-7 rounded-3xl flex flex-col gap-5">
              <h2 className="text-base font-display font-bold text-white">
                Direct Contact
              </h2>

              <div className="flex flex-col gap-3 text-xs font-mono text-platinum-300">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Mail className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-platinum-500 uppercase">Email</span>
                    <a
                      href={`mailto:${settings.authorEmail}`}
                      className="text-white hover:text-[#dfb15b] transition-colors"
                    >
                      {settings.authorEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Clock className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-platinum-500 uppercase">Response Time</span>
                    <span className="text-white">Within 24 hours (WhatsApp: usually same day)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <MapPin className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-platinum-500 uppercase">Location</span>
                    <span className="text-white">{settings.authorLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability status */}
            <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-emerald-300">
                  Currently {settings.availabilityStatus}
                </span>
                <span className="text-xs text-platinum-400 font-light">
                  Websites starting from PKR 30,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
