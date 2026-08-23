import React from "react";
import { Metadata } from "next";
import { getProjects, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { WorkPortfolioClient } from "@/components/projects/WorkPortfolioClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Projects & Portfolio — Web & Mobile Applications",
      description: "Explore the complete portfolio of web applications, WordPress websites, and Flutter mobile apps developed by M Ramzan.",
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
            Selected Works & Projects
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            A showcase of modern websites, WordPress portals, and mobile applications built with clean code and reliable technologies.
          </p>
        </div>

        {/* Filterable Portfolio Grid/List */}
        <WorkPortfolioClient projects={projects} />
      </div>
    </div>
  );
}
