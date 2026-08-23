import React from "react";
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

export default async function HomePage() {
  const [projects, services, skills, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getSkills(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
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

      {/* Conversion CTA */}
      <ContactCTA settings={settings} />
    </div>
  );
}
