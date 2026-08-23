"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, ExternalLink, Sparkles } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Don't show admin sidebar on login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#070709]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-platinum-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-[#09090e]">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-lg text-platinum-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/[0.08] bg-[#09090d]/80 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg glass-panel text-platinum-300 hover:text-white"
              aria-label="Toggle Admin Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-platinum-400">
              <Shield className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span className="hidden sm:inline">CMS Environment:</span>
              <span className="text-white font-semibold">Production Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-platinum-300 hover:text-white transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3 text-[#dfb15b]" />
            </Link>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dfb15b] to-[#a27429] flex items-center justify-center text-xs font-bold text-black font-mono">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
