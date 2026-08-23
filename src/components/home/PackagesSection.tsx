"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageCircle, Zap, Clock, Users } from "lucide-react";
import { PackageItem } from "@/types";

interface PackagesSectionProps {
  packages: PackageItem[];
  whatsappNumber?: string;
  whatsappMessage?: string;
  whatsappEnabled?: boolean;
}

export function PackagesSection({
  packages,
  whatsappNumber,
  whatsappMessage,
  whatsappEnabled,
}: PackagesSectionProps) {
  const buildWaUrl = (pkgTitle: string) => {
    if (!whatsappEnabled || !whatsappNumber) return "/contact";
    const msg = `Hi! I'm interested in the "${pkgTitle}" package. Can you share more details?`;
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4 mb-16 max-w-2xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Website Packages
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Transparent Pricing for{" "}
            <span className="text-gradient-gold">Small Businesses</span>
          </h2>
          <p className="text-platinum-300 text-base font-light leading-relaxed">
            Honest, upfront pricing with no hidden fees. All packages include a
            professional design, mobile-friendly layout, and dedicated support.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? "bg-gradient-to-b from-[#dfb15b]/10 to-[#dfb15b]/5 border border-[#dfb15b]/40 shadow-luxury scale-[1.02]"
                  : "glass-panel hover:border-white/20"
              }`}
            >
              {/* Most Popular Badge */}
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black text-[11px] font-mono font-bold uppercase tracking-widest shadow-gold whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="flex flex-col gap-3 mb-8 pt-2">
                <h3
                  className={`text-lg font-display font-bold tracking-tight ${
                    pkg.highlighted ? "text-[#dfb15b]" : "text-white"
                  }`}
                >
                  {pkg.title}
                </h3>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-mono text-platinum-500 uppercase tracking-wider">
                    {pkg.priceNote}
                  </span>
                  <span className="text-3xl font-display font-bold text-white">
                    {pkg.price}
                  </span>
                </div>

                <p className="text-sm text-platinum-400 font-light leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Meta Info */}
              {(pkg.turnaround || pkg.bestFor) && (
                <div className="flex flex-col gap-2 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  {pkg.turnaround && (
                    <div className="flex items-center gap-2 text-xs font-mono text-platinum-400">
                      <Clock className="w-3.5 h-3.5 text-[#dfb15b]" />
                      <span>{pkg.turnaround}</span>
                    </div>
                  )}
                  {pkg.bestFor && (
                    <div className="flex items-center gap-2 text-xs font-mono text-platinum-400">
                      <Users className="w-3.5 h-3.5 text-[#dfb15b]" />
                      <span>{pkg.bestFor}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm text-platinum-300">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        pkg.highlighted ? "text-[#dfb15b]" : "text-emerald-400"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={buildWaUrl(pkg.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-sm uppercase tracking-wider transition-all ${
                  pkg.highlighted
                    ? "bg-gradient-to-r from-[#dfb15b] via-[#e5c07b] to-[#c7963b] text-black hover:shadow-gold hover:scale-[1.02]"
                    : "bg-white/[0.05] border border-white/[0.1] text-white hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:text-[#25D366]"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                {pkg.ctaText}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="flex items-center gap-3 text-sm text-platinum-400">
            <Zap className="w-4 h-4 text-[#dfb15b] flex-shrink-0" />
            <span>
              All prices are estimates. Final price depends on your specific requirements.{" "}
              <span className="text-platinum-300">Contact me for a custom quote.</span>
            </span>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-6 py-2.5 rounded-full glass-panel hover:border-[#dfb15b]/40 text-white font-medium text-sm uppercase tracking-wider transition-all"
          >
            Get a Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
