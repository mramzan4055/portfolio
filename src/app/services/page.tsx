import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, HelpCircle, Layers, LayoutDashboard, Sparkles, Wand2, Clock, ChevronRight } from "lucide-react";
import { getServices, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactCTA } from "@/components/home/ContactCTA";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Website Development & App Services Pakistan — WordPress, Next.js & Flutter",
      description: "Professional web development, WordPress CMS solutions, small business websites, and Flutter mobile apps in Pakistan by M Ramzan. Starting from PKR 30,000.",
      keywords: [
        "Website Development Pakistan",
        "Web Developer Pakistan",
        "Small Business Website Pakistan",
        "WordPress Developer Pakistan",
        "Flutter Mobile App Developer",
        "SEO Services Pakistan",
        "Website Redesign Pakistan",
        "M Ramzan Services"
      ],
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
      question: "How much does it cost to build a business website in Pakistan?",
      answer: "Starter business websites begin from PKR 30,000 (ideal for salons, clinics, consultants, and shops). Business Growth packages with blog and advanced features start from PKR 60,000, and bespoke portals or Flutter mobile apps receive tailored quotes."
    },
    {
      question: "What technologies do you primarily use for web and app projects?",
      answer: "My primary stack includes WordPress, HTML5, CSS3, JavaScript, React, Next.js, and Google Flutter for cross-platform iOS and Android mobile apps. I also integrate PHP, MySQL databases, and REST APIs."
    },
    {
      question: "Can I manage and update website content myself without coding?",
      answer: "Yes. For WordPress and CMS-based builds, you receive full admin access and a simple recorded video tutorial showing you how to edit text, upload images, and manage products without touching code."
    },
    {
      question: "Can customers contact me directly on WhatsApp from the website?",
      answer: "Yes. Every website includes 1-click WhatsApp floating chat buttons, direct phone dial buttons, and interactive inquiry forms connected directly to your number."
    },
    {
      question: "Do you redesign existing, outdated websites?",
      answer: "Yes. I modernize slow, outdated websites with fresh UI design, mobile-first responsiveness, speed acceleration, and SEO redirect preservation so you keep your search rankings."
    }
  ];

  return (
    <div className="pt-36 pb-28 min-h-screen">
      {/* Structured Data: FAQPage & BreadcrumbList */}
      <JsonLd type="faq" data={serviceFaqs} settings={settings} />
      <JsonLd
        type="breadcrumbs"
        data={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Services & Capabilities
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Web & Mobile Development Services in Pakistan
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            I build modern, responsive websites and mobile applications tailored for Pakistani small businesses, startups, and expanding brands. Clean code, clear pricing, and reliable long-term support.
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="flex flex-col gap-12">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="glass-panel p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-[#dfb15b]/40 transition-colors"
            >
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#dfb15b]">0{idx + 1} / SERVICE</span>
                  {srv.pricingStart && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#dfb15b]/10 border border-[#dfb15b]/30 text-[11px] font-mono text-[#dfb15b]">
                      {srv.pricingStart}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  <Link href={`/services/${srv.slug}`} className="hover:text-[#dfb15b] transition-colors">
                    {srv.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-platinum-300 font-light leading-relaxed">
                  {srv.shortDescription || srv.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {(srv.technologies || []).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-platinum-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-5 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/[0.05]">
                <h3 className="text-xs font-mono uppercase tracking-widest text-platinum-400">
                  Included In This Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {srv.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-platinum-300">
                      <CheckCircle2 className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.05]">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#dfb15b] hover:underline"
                  >
                    <span>View Dedicated Service Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-platinum-400 hover:text-white"
                  >
                    <span>Request Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
              Website Development & Process FAQs
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

