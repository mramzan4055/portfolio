import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, HelpCircle, Layers, LayoutDashboard, Sparkles, Wand2 } from "lucide-react";
import { getServices, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactCTA } from "@/components/home/ContactCTA";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Services & Capabilities — Full-Stack & CMS Consulting",
      description: "High-impact web engineering services: Next.js architecture, headless CMS platforms, GEO optimization, and creative development by M Ramzan.",
      canonical: "/services",
    },
    settings
  );
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const serviceFaqs = [
    {
      question: "How do you approach bespoke CMS engineering without vendor lock-in?",
      answer: "I architect custom headless CMS systems using Next.js App Router, MySQL / Relational Databases, and clean repository layers. Non-technical teams get visual drag-and-drop section builders and instant live previews, while your codebase remains 100% portable to any hosting or database infrastructure without proprietary license dependencies."
    },
    {
      question: "What is Generative Engine Optimization (GEO) and why does it matter?",
      answer: "Generative Engine Optimization (GEO) structures your application's entities, facts, and schemas (JSON-LD) so that AI-driven answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews) accurately cite your brand, leadership, and products when users ask conversational queries."
    },
    {
      question: "What is the typical timeline and engagement model for a custom project?",
      answer: "Engagement models range from focused architectural sprints (2-3 weeks) to full-scale platform builds (6-10 weeks). Every delivery includes strict TypeScript type safety, automated tests, full documentation, and post-launch support."
    },
    {
      question: "Do you offer full-stack maintenance and team training post-handover?",
      answer: "Yes. Every custom build includes comprehensive CMS editorial walkthroughs, technical handoff documentation, and optional quarterly retainer agreements for continuous feature expansions."
    }
  ];

  return (
    <div className="pt-36 pb-28 min-h-screen">
      {/* FAQPage Structured Data */}
      <JsonLd type="faq" data={serviceFaqs} settings={settings} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Capabilities & Deliverables
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Architectural Services & Advisory
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            Delivering end-to-end software solutions that combine enterprise backend engineering with high-end creative direction.
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="flex flex-col gap-16">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="glass-panel p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-xs font-mono text-[#dfb15b]">0{idx + 1} / SERVICE OFFERING</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {srv.title}
                </h2>
                <p className="text-sm sm:text-base text-platinum-300 font-light leading-relaxed">
                  {srv.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {srv.technologies.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-platinum-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/[0.05]">
                <h3 className="text-xs font-mono uppercase tracking-widest text-platinum-400">
                  Included Architectural Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {srv.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-platinum-300">
                      <CheckCircle2 className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#dfb15b] hover:underline"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Structured FAQ Section */}
        <div className="flex flex-col gap-10 pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
              Frequently Answered Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Architectural Inquiries & FAQ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel p-8 rounded-2xl flex flex-col gap-3 hover:border-[#dfb15b]/30 transition-colors"
              >
                <div className="flex items-start gap-2.5 text-white font-display font-semibold text-base">
                  <HelpCircle className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </div>
                <p className="text-xs sm:text-sm text-platinum-400 font-light leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <ContactCTA settings={settings} />
      </div>
    </div>
  );
}
