import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | M Ramzan",
  description: "The requested page could not be found on mramzan.dev.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="glass-panel-elevated p-10 sm:p-16 rounded-3xl max-w-lg w-full flex flex-col items-center text-center gap-6">
        <span className="text-6xl sm:text-8xl font-display font-bold text-gradient-gold">
          404
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-display font-bold text-white">
            Page Not Located
          </h1>
          <p className="text-sm text-platinum-400 font-light leading-relaxed">
            The requested digital artifact or case study could not be located in the current namespace.
          </p>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#dfb15b] text-black font-semibold text-xs font-mono uppercase tracking-wider"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Origin</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel text-white text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
