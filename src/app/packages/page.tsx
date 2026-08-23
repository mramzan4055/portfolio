import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, CheckCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { PackagesSection } from "@/components/home/PackagesSection";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Website Packages & Pricing Pakistan — Starting PKR 30,000 | M Ramzan",
      description:
        "Transparent website development packages for Pakistani small businesses and SMEs. Starter Business Website from PKR 30,000. Business Growth from PKR 60,000. Free WhatsApp consultation.",
      keywords: [
        "Website Development Cost Pakistan",
        "Website Packages Pakistan",
        "Small Business Website Pricing",
        "Affordable Web Developer Pakistan",
        "Business Website PKR 30000",
        "Ecommerce Website Cost Pakistan",
        "M Ramzan Pricing"
      ],
      canonical: "/packages",
    },
    settings
  );
}

export default async function PackagesPage() {
  const settings = await getSiteSettings();

  const packageFaqs = [
    {
      question: "Are there any hidden monthly charges after the website is launched?",
      answer: "No. You only pay for your standard domain and hosting renewals directly to your chosen hosting provider. There are no mandatory monthly retainers or hidden lock-in fees."
    },
    {
      question: "What is required to start a website project?",
      answer: "A brief conversation about your business goals, your company logo (or business name), desired text/photos, and a 50% advance payment to book your development slot."
    },
    {
      question: "How do I make the payment in Pakistan?",
      answer: "Payments are accepted via online Pakistani bank transfer (IBFT), Raast, JazzCash, EasyPaisa, or international wire for global clients."
    },
    {
      question: "What happens if I need changes after the website is completed?",
      answer: "Each package includes dedicated revision rounds during development and launch support. For future updates, you can edit content easily yourself or hire me for hourly updates."
    }
  ];

  const waUrl =
    settings.whatsappEnabled && settings.whatsappNumber
      ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
          "Hi M Ramzan, I am reviewing your website packages and would like to discuss a project."
        )}`
      : "/contact";

  return (
    <div className="pt-28 min-h-screen">
      {/* Structured Data: FAQPage & BreadcrumbList */}
      <JsonLd type="faq" data={packageFaqs} settings={settings} />
      <JsonLd
        type="breadcrumbs"
        data={[
          { name: "Home", url: "/" },
          { name: "Website Packages & Pricing", url: "/packages" },
        ]}
        settings={settings}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex flex-col gap-3 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Pricing & Packages
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Simple, Honest{" "}
            <span className="text-gradient-gold">Website Pricing</span>
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            No surprise fees. No confusing jargon. Just clear packages designed for
            Pakistani small businesses, startups, and local professionals.
          </p>
        </div>
      </div>

      {/* Packages Section */}
      {settings.packages && settings.packages.length > 0 && (
        <PackagesSection
          packages={settings.packages}
          whatsappNumber={settings.whatsappNumber}
          whatsappMessage={settings.whatsappDefaultMessage}
          whatsappEnabled={settings.whatsappEnabled}
        />
      )}

      {/* FAQ / Reassurance Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What's Included */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col gap-5">
            <h2 className="text-xl font-display font-bold text-white">
              What's Included in Every Package?
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                "Professional, modern design tailored to your business",
                "Fully responsive layout — works on phones & tablets",
                "Cross-browser tested (Chrome, Firefox, Safari)",
                "Fast-loading pages optimized for performance",
                "Contact form or WhatsApp integration",
                "Launch support and handover walkthrough",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-platinum-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How It Works */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col gap-5">
            <h2 className="text-xl font-display font-bold text-white">
              How Does the Process Work?
            </h2>
            <ol className="flex flex-col gap-4">
              {[
                { step: "01", text: "Message me on WhatsApp or fill the contact form with your requirements." },
                { step: "02", text: "We discuss your business goals, design preferences, and timeline." },
                { step: "03", text: "I share a detailed quote and start work after a 50% advance payment." },
                { step: "04", text: "You review the design and request changes. Final delivery after balance payment." },
              ].map((s) => (
                <li key={s.step} className="flex items-start gap-4 text-sm text-platinum-300">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#dfb15b]/15 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] text-xs font-mono font-bold">
                    {s.step}
                  </span>
                  <span className="mt-1.5">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider text-black transition-all hover:shadow-gold hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white" }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass-panel hover:border-[#dfb15b]/40 text-white font-medium text-sm uppercase tracking-wider transition-all"
          >
            Send a Project Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
