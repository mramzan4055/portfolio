import React from "react";
import { Metadata } from "next";
import { getProjects, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { WorkPortfolioClient } from "@/components/projects/WorkPortfolioClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Selected Works & Case Studies",
      description: "Explore the complete portfolio of digital platforms, enterprise CMS architectures, and full-stack web applications by M Ramzan.",
      canonical: "/work",
    },
    settings
  );
}

export default async function WorkPage() {
  const projects = await getProjects({ status: "published" });

  return (
    <div className="pt-36 pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Selected Works & Systems
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            A curated index of bespoke web applications, enterprise headless CMS platforms, and AI-enabled software architectures built for international clients.
          </p>
        </div>

        {/* Filterable Portfolio Grid/List */}
        <WorkPortfolioClient projects={projects} />
      </div>
    </div>
  );
}
