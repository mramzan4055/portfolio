"use client";

import React from "react";
import { Sparkles, CheckCircle2, HelpCircle } from "lucide-react";
import { ProjectGEO } from "@/types";

interface KeyFactsCardProps {
  geo?: ProjectGEO;
  title: string;
  category: string;
  role: string;
  year: string;
  technologies: string[];
}

export function KeyFactsCard({
  geo,
  title,
  category,
  role,
  year,
  technologies,
}: KeyFactsCardProps) {
  return (
    <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl flex flex-col gap-8 border border-[#dfb15b]/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-2.5 text-[#dfb15b]">
          <Sparkles className="w-4 h-4" />
          <h3 className="font-mono text-xs uppercase tracking-widest font-bold">
            GEO Entity & Machine-Readable Key Facts
          </h3>
        </div>
        <span className="text-[11px] font-mono text-platinum-400">
          Entity: {geo?.entityType || "SoftwareApplication"}
        </span>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono uppercase text-platinum-500">
          Executive Summary
        </span>
        <p className="text-sm text-platinum-200 leading-relaxed font-light">
          {geo?.summary ||
            `${title} is a bespoke ${category.toLowerCase()} engineered by ${role} M Ramzan in ${year}, leveraging modern full-stack web technologies.`}
        </p>
      </div>

      {/* Key Facts List */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-mono uppercase text-platinum-500">
          Verified Entity Attributes
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {geo?.keyFacts && geo.keyFacts.length > 0 ? (
            geo.keyFacts.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-platinum-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-platinum-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                <span>Lead Architect: M Ramzan</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-platinum-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                <span>Core Stack: {(technologies || []).slice(0, 3).join(", ")}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* FAQs (if present) */}
      {geo?.faq && geo.faq.length > 0 && (
        <div className="flex flex-col gap-4 pt-4 border-t border-white/[0.08]">
          <span className="text-xs font-mono uppercase text-platinum-500">
            Structured Architectural Questions & Answers
          </span>
          <div className="flex flex-col gap-3">
            {geo.faq.map((faqItem) => (
              <div
                key={faqItem.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white">
                  <HelpCircle className="w-3.5 h-3.5 text-[#dfb15b] flex-shrink-0" />
                  <span>{faqItem.question}</span>
                </div>
                <p className="text-xs text-platinum-400 font-light leading-relaxed pl-5">
                  {faqItem.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
