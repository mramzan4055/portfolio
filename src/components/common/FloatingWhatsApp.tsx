"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface FloatingWhatsAppProps {
  number: string;
  message: string;
  enabled: boolean;
}

export function FloatingWhatsApp({ number, message, enabled }: FloatingWhatsAppProps) {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show tooltip after 4 seconds
    const timer = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss tooltip after 8 seconds
  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, [showTooltip]);

  // Hide on admin pages
  const isAdmin = pathname.startsWith("/admin");

  if (!enabled || !number || isAdmin || !mounted) return null;

  const cleanNumber = number.replace(/[^0-9]/g, "");
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip / Chat Bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#0f0f15]/95 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 max-w-[220px] shadow-xl"
          >
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#0f0f15]/95 border-b border-r border-white/10 rotate-45" />

            <button
              onClick={() => { setShowTooltip(false); setDismissed(true); }}
              className="absolute top-2 right-2 text-platinum-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <p className="text-xs font-semibold text-white pr-5">Need a website?</p>
            <p className="text-[11px] text-platinum-400 mt-0.5 leading-relaxed">
              Chat with me on WhatsApp — fast reply!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => setShowTooltip(false)}
        className="group relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping group-hover:animate-none" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white relative z-10"
        >
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.76.72 5.35 1.98 7.6L.5 31.5l8.1-2.12A15.45 15.45 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5Zm0 28.28a13.7 13.7 0 0 1-7-1.92l-.5-.3-5.18 1.36 1.38-5.04-.33-.52A13.73 13.73 0 0 1 16 2.22c7.58 0 13.78 6.2 13.78 13.78 0 7.59-6.2 13.78-13.78 13.78Zm7.53-10.3c-.41-.21-2.43-1.2-2.81-1.34-.37-.13-.64-.2-.91.21-.27.41-1.05 1.34-1.28 1.61-.24.27-.47.3-.88.1-.41-.21-1.73-.64-3.3-2.04-1.22-1.08-2.04-2.42-2.28-2.83-.24-.41-.03-.63.18-.84.18-.18.41-.47.62-.71.2-.24.27-.41.41-.68.13-.27.07-.51-.03-.71-.1-.21-.9-2.17-1.24-2.97-.32-.77-.66-.67-.91-.68h-.77c-.27 0-.71.1-1.08.51-.37.41-1.41 1.38-1.41 3.37s1.44 3.9 1.64 4.17c.2.27 2.84 4.33 6.88 6.07.96.41 1.71.66 2.3.85.96.3 1.84.26 2.54.16.77-.12 2.43-.99 2.77-1.95.34-.96.34-1.78.24-1.95-.1-.17-.37-.27-.78-.48Z" />
        </svg>
      </a>
    </div>
  );
}
