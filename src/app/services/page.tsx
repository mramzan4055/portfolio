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
      title: "Services — Web & Mobile Application Development",
      description: "Practical web and app development services: WordPress customization, React/Next.js development, Flutter mobile apps, and SEO optimization by M Ramzan.",
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
      question: "What technologies do you primarily use for web and app projects?",
      answer: "My primary stack includes WordPress, HTML5, CSS3, JavaScript, React, Next.js, and Flutter for cross-platform iOS and Android mobile apps. I also integrate standard REST APIs, PHP, and MySQL databases."
    },
    {
      question: "Can you build or customize an existing WordPress website?",
      answer: "Yes. I customize WordPress themes, set up plugins, build bespoke layouts, optimize page loading speed, and configure user-friendly admin panels so you can easily manage your site content."
    },
    {
      question: "Do you develop mobile applications with Flutter?",
      answer: "Yes, I develop cross-platform mobile apps for both iOS and Android from a single clean Flutter codebase, integrating backend REST APIs, authentication, and responsive UI components."
    },
    {
      question: "How do we get started on a project?",
      answer: "You can reach out via the Contact page with your project details and requirements. I will review your goals, provide a clear timeline and quote, and guide you through each step of development."
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
            Services & Offerings
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Web & Mobile App Development
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            I build modern, responsive websites and mobile applications using industry-standard tools, frameworks, and reliable development practices.
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
