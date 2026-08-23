"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Image as ImageIcon,
  Search,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      group: "Core Management",
      links: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Projects CMS", href: "/admin/projects", icon: FolderGit2 },
        { name: "Pages & Sections", href: "/admin/pages", icon: FileText },
        { name: "Media Library", href: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      group: "Intelligence & Growth",
      links: [
        { name: "SEO & Social", href: "/admin/seo", icon: Search },
        { name: "AI Assistant", href: "/admin/ai", icon: Sparkles, badge: "AI Ready" },
      ],
    },
    {
      group: "Configuration",
      links: [
        { name: "Site & Entity Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#09090e] border-r border-white/[0.08] flex flex-col justify-between h-screen fixed left-0 top-0 z-40">
      {/* Brand Header */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dfb15b] to-[#a27429] flex items-center justify-center font-bold text-black text-xs font-mono shadow-gold">
              CMS
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs tracking-widest text-white uppercase">
                PORTFOLIO CMS
              </span>
              <span className="text-[10px] text-[#dfb15b] font-mono">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Groups */}
        <nav className="flex flex-col gap-6">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-platinum-500 px-3">
                {group.group}
              </span>
              <div className="flex flex-col gap-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    link.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={onCloseMobile}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors group",
                        isActive
                          ? "bg-[#dfb15b]/15 text-[#dfb15b] font-bold border border-[#dfb15b]/30"
                          : "text-platinum-400 hover:text-white hover:bg-white/[0.04]"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#dfb15b]/20 text-[#dfb15b]">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Actions: Return to Site & Logout */}
      <div className="p-4 border-t border-white/[0.08] flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-platinum-300 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#dfb15b]" />
            <span>View Public Site</span>
          </div>
          <span className="text-[10px] text-platinum-500 font-mono">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors w-full text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Session</span>
        </button>
      </div>
    </aside>
  );
}
