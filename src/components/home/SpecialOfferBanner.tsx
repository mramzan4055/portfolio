"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { SpecialOffer } from "@/types";

interface SpecialOfferBannerProps {
  offer: SpecialOffer;
}

export function SpecialOfferBanner({ offer }: SpecialOfferBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!offer.enabled || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#dfb15b]/15 via-[#c7963b]/10 to-[#dfb15b]/15 border-y border-[#dfb15b]/30"
      >
        {/* Animated shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#dfb15b]/5 to-transparent animate-shimmer pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Badge */}
            <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#dfb15b]/20 border border-[#dfb15b]/50 text-[10px] font-mono text-[#dfb15b] uppercase tracking-wider whitespace-nowrap">
              {offer.badge}
            </span>

            {/* Text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
              <span className="text-sm font-semibold text-white truncate">
                {offer.title}
              </span>
              <span className="hidden sm:block text-platinum-500 text-xs">—</span>
              <span className="text-xs text-platinum-400 font-light leading-relaxed">
                {offer.description}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {offer.ctaText && offer.ctaLink && (
              <Link
                href={offer.ctaLink}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#dfb15b] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#e5c07b] transition-colors"
              >
                {offer.ctaText}
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}

            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss offer"
              className="text-platinum-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
