"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Github, Linkedin, Twitter, Dribbble, Globe, Shield, Sparkles } from "lucide-react";
import { SiteSettings } from "@/types";
import { initialSiteSettings } from "@/data/seed";
import { Avatar } from "@/components/common/Avatar";

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings = initialSiteSettings }: FooterProps) {
  const [timeString, setTimeString] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Suppress public footer on admin subroutes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#070709] pt-20 pb-12 overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#dfb15b]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Col 1: Brand & Entity Statement */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar size={40} className="w-9 h-9 rounded-lg" />
              <div>
                <h3 className="font-display font-bold text-base tracking-widest text-white uppercase">
                  {settings.authorName}
                </h3>
                <p className="text-xs text-platinum-400 font-mono tracking-wider">
                  {settings.authorTitle}
                </p>
              </div>
            </div>

            <p className="text-platinum-400 text-sm leading-relaxed max-w-md">
              {settings.siteDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-platinum-300 text-xs font-mono">
                <Globe className="w-3.5 h-3.5 text-[#dfb15b]" />
                <span>{settings.authorLocation}</span>
              </div>
              {timeString && (
                <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-platinum-400 text-xs font-mono">
                  {timeString}
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 pt-1">
              {[
                { name: "My Work & Projects", href: "/work" },
                { name: "Services & What I Offer", href: "/services" },
                { name: "About Me", href: "/about" },
                { name: "Contact & Inquiries", href: "/contact" },
                { name: "CMS Admin", href: "/admin" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className="text-sm text-platinum-400 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between group"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#dfb15b] transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Social Channels & Direct Inquiries */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Get in Touch
            </h4>
            <p className="text-sm text-platinum-400">
              For website development, WordPress customization, or Flutter mobile applications:
            </p>
            <a
              href={`mailto:${settings.authorEmail}`}
              className="text-white font-mono text-sm underline hover:text-[#dfb15b] transition-colors"
            >
              {settings.authorEmail}
            </a>

            <div className="flex items-center gap-3 pt-3">
              {[
                { name: "GitHub", href: settings?.socialLinks?.github || "https://github.com", icon: Github },
                { name: "LinkedIn", href: settings?.socialLinks?.linkedin || "https://linkedin.com", icon: Linkedin },
                { name: "Twitter", href: settings?.socialLinks?.twitter || "https://twitter.com", icon: Twitter },
                { name: "Dribbble", href: settings?.socialLinks?.dribbble || "https://dribbble.com", icon: Dribbble },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-platinum-400 hover:text-white hover:border-[#dfb15b]/40 hover:scale-105 transition-all"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-platinum-500 font-mono">
          <p>© {new Date().getFullYear()} {settings.authorName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-platinum-400">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Next.js 15 App Router • GEO Optimized</span>
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-platinum-500 hover:text-platinum-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
