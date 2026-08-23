"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  authorName?: string;
  availabilityStatus?: string;
}

export function Header({
  authorName = "M RAMZAN",
  availabilityStatus = "Available for Q1/Q2 Projects",
}: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Don't render public header on admin subpages if desired, but show a clean link to admin
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#09090d]/80 backdrop-blur-md border-b border-white/[0.06] py-3.5"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dfb15b] to-[#a27429] flex items-center justify-center font-bold text-black text-sm tracking-wider shadow-gold group-hover:scale-105 transition-transform">
            MR
          </span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-widest text-white uppercase group-hover:text-[#dfb15b] transition-colors">
              {authorName}
            </span>
            <span className="text-[10px] text-platinum-400 tracking-wider font-mono">
              CREATIVE ARCHITECT
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-1.5 text-xs tracking-wider uppercase font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "text-white font-semibold"
                    : "text-platinum-300 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Availability & CMS Bridge */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{availabilityStatus}</span>
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black text-xs font-semibold tracking-wider uppercase hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Initiate</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admin"
            title="Secure CMS Access"
            className="p-2 rounded-full glass-panel hover:border-[#dfb15b]/40 text-platinum-400 hover:text-white transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/admin"
            title="CMS"
            className="p-2 rounded-lg glass-panel text-platinum-300 hover:text-white"
          >
            <Shield className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl glass-panel text-white hover:text-[#dfb15b] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-panel-elevated border-t border-white/[0.08] px-6 py-8 mt-3 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-mono w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{availabilityStatus}</span>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-lg font-display tracking-wider py-2 border-b border-white/[0.05] transition-colors",
                    pathname === link.href
                      ? "text-[#dfb15b] font-semibold"
                      : "text-platinum-200 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black font-semibold text-sm tracking-wider uppercase shadow-gold"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl glass-panel text-platinum-300 text-xs font-mono"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>CMS Portal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
