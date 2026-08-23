import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowUpRight, MessageCircle } from "lucide-react";
import { getProjects, getServices, getSkills, getSiteSettings } from "@/lib/data/store";
import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { TechTicker } from "@/components/home/TechTicker";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { TechStackMatrix } from "@/components/home/TechStackMatrix";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PackagesSection } from "@/components/home/PackagesSection";
import { SpecialOfferBanner } from "@/components/home/SpecialOfferBanner";
import { JsonLd } from "@/components/seo/JsonLd";

export default async function HomePage() {
  const [projects, services, skills, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getSkills(),
    getSiteSettings(),
  ]);

  const homeFaqs = [
    {
      question: "How much does a business website cost in Pakistan?",
      answer: "Starter business websites start from approximately PKR 30,000 for a 3–5 page mobile-friendly presence with WhatsApp chat. Growth packages with advanced design and blog start from PKR 60,000, while custom portals and Flutter mobile apps receive tailored quotes based on exact specifications."
    },
    {
      question: "Do you build websites for small businesses and local shops in Pakistan?",
      answer: "Yes. My primary focus includes Pakistani SMEs, beauty salons, medical clinics, legal & financial consultants, local retail shops, real estate agents, and emerging startups that need a credible, high-converting online presence."
    },
    {
      question: "Can I manage and update website content myself without coding?",
      answer: "Yes. For all WordPress and CMS-based websites, you receive full administrator access along with clear video walkthroughs showing you how to edit text, replace images, and add new products or blog posts without writing a single line of code."
    },
    {
      question: "Can customers contact me directly through WhatsApp on the website?",
      answer: "Yes. Every website includes a CMS-configurable 1-click floating WhatsApp contact button, direct phone click-to-call links, and interactive inquiry forms connected straight to your contact details."
    },
    {
      question: "How long does it take to design and launch my website?",
      answer: "A standard small business website is typically completed within 7 to 10 business days after receiving your content and requirements. Growth websites take approximately 14 to 21 business days."
    },
    {
      question: "Do you offer website redesign and speed optimization for old websites?",
      answer: "Yes. If your current website is slow, outdated, or hard to use on mobile phones, I perform full redesigns with modernized UI, mobile-first responsiveness, Core Web Vitals speed optimization, and 301 redirect mapping to protect your existing Google rankings."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data: ProfessionalService & FAQPage */}
      <JsonLd type="professionalService" settings={settings} />
      <JsonLd type="faq" data={homeFaqs} settings={settings} />

      {/* Special Offer Banner — just below hero */}
      {settings.specialOffer?.enabled && (
        <SpecialOfferBanner offer={settings.specialOffer} />
      )}

      {/* Hero with 2-column photo layout */}
      <HeroSection settings={settings} />

      {/* Scrolling Tech Stack Marquee */}
      <TechTicker />

      {/* Developer Philosophy Statement */}
      <StatementSection />

      {/* Curated Featured Projects */}
      <FeaturedProjects projects={projects} />

      {/* Website Packages & Pricing */}
      {settings.packages && settings.packages.length > 0 && (
        <PackagesSection
          packages={settings.packages}
          whatsappNumber={settings.whatsappNumber}
          whatsappMessage={settings.whatsappDefaultMessage}
          whatsappEnabled={settings.whatsappEnabled}
        />
      )}

      {/* Animated Impact Metrics */}
      <StatsSection />

      {/* Core Services */}
      <ServicesShowcase services={services} />

      {/* Tech Stack Matrix */}
      <TechStackMatrix categories={skills} />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* About Teaser */}
      <AboutTeaser settings={settings} />

      {/* Answer-Engine FAQ Section */}
      <section className="py-24 border-t border-white/[0.06] bg-[#07070a]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
                Clear Answers · AEO Grounding
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                Frequently Answered Questions
              </h2>
              <p className="text-platinum-400 text-sm sm:text-base font-light">
                Direct, transparent facts about pricing, timelines, technologies, and website development in Pakistan.
              </p>
            </div>

            <Link
              href="/packages"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#dfb15b] hover:underline"
            >
              <span>View Packages & Pricing</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl flex flex-col gap-3 hover:border-[#dfb15b]/30 transition-colors"
              >
                <div className="flex items-start gap-2.5 text-white font-display font-semibold text-base sm:text-lg">
                  <HelpCircle className="w-4 h-4 text-[#dfb15b] flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </div>
                <p className="text-xs sm:text-sm text-platinum-300 font-light leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <ContactCTA settings={settings} />
    </div>
  );
}

