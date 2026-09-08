import React from "react";
import { Metadata } from "next";
import { getProjects, getSiteSettings } from "@/lib/data/store";
import { generateSiteMetadata } from "@/lib/seo/metadata";
import { WorkPortfolioClient } from "@/components/projects/WorkPortfolioClient";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return generateSiteMetadata(
    {
      title: "Projects & Portfolio Showcase — Real Web & Mobile Applications | M Ramzan",
      description: "Explore the verified portfolio of web applications, WordPress websites, civic platforms, and Flutter mobile apps developed by M Ramzan.",
      keywords: [
        "Portfolio Web Developer Pakistan",
        "Website Case Studies",
        "WordPress Portfolio Pakistan",
        "React Next.js Portfolio",
        "M Ramzan Projects",
        "Livestock Board LDDB",
        "Samad Brothers Website"
      ],
      canonical: "/work",
    },
    settings
  );
}

export default async function WorkPage() {
  const [projects, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getSiteSettings(),
  ]);

  return (
    <div className="pt-36 pb-28 min-h-screen">
      {/* BreadcrumbList Schema */}
      <JsonLd
        type="breadcrumbs"
        data={[
          { name: "Home", url: "/" },
          { name: "Selected Works & Portfolio", url: "/work" },
        ]}
        settings={settings}
      />
      {/* ItemList Schema for portfolio collection */}
      <JsonLd
        type="itemList"
        data={projects.map((p) => ({
          name: p.title,
          url: `/projects/${p.slug}`,
          description: p.shortDescription,
          image: p.heroImage || p.thumbnailImage,
        }))}
        settings={settings}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight">
            Selected Works & Real Case Studies
          </h1>
          <p className="text-platinum-300 text-base sm:text-lg font-light leading-relaxed">
            A verified showcase of modern websites, WordPress portals, civic platforms, and mobile applications built with clean code and reliable technologies.
          </p>
        </div>

        {/* Filterable Portfolio Grid/List */}
        <WorkPortfolioClient projects={projects} />
      </div>
    </div>
  );
}

