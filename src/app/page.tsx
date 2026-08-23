import React from "react";
import { getProjects, getServices, getSkills, getSiteSettings } from "@/lib/data/store";
import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { TechStackMatrix } from "@/components/home/TechStackMatrix";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";

export default async function HomePage() {
  const [projects, services, skills, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getSkills(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero with Interactive Typography & Magnetic CTA */}
      <HeroSection settings={settings} />

      {/* Engineering Philosophy Statement */}
      <StatementSection />

      {/* Curated Featured Projects */}
      <FeaturedProjects projects={projects} />

      {/* Core Engineering Offerings */}
      <ServicesShowcase services={services} />

      {/* Architecture & Tech Matrix */}
      <TechStackMatrix categories={skills} />

      {/* Personal Identity & Background */}
      <AboutTeaser settings={settings} />

      {/* Luxury Conversion CTA */}
      <ContactCTA settings={settings} />
    </div>
  );
}
