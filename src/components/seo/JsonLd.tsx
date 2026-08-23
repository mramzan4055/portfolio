import React from "react";
import { SiteSettings, Project } from "@/types";

interface JsonLdProps {
  type: "person" | "website" | "project" | "breadcrumbs" | "faq";
  data?: any;
  settings?: SiteSettings;
}

export function JsonLd({ type, data, settings }: JsonLdProps) {
  const siteUrl = settings?.siteUrl || "https://mramzan.dev";
  const authorName = settings?.authorName || "M Ramzan";

  let schema: Record<string, any> = {};

  if (type === "person") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: authorName,
      jobTitle: settings?.authorTitle || "Lead Full-Stack Architect & Creative Technologist",
      description: settings?.authorBio || "Lead Full-Stack Engineer and Creative Technologist specializing in luxury web platforms and enterprise CMS architecture.",
      url: siteUrl,
      email: settings?.authorEmail,
      sameAs: [
        settings?.socialLinks.github,
        settings?.socialLinks.linkedin,
        settings?.socialLinks.twitter,
        settings?.socialLinks.dribbble,
      ].filter(Boolean),
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js Architecture",
        "TypeScript",
        "MySQL",
        "Relational Database Architecture",
        "Generative Engine Optimization (GEO)",
        "Headless CMS Architecture",
        "UI/UX Creative Direction"
      ],
    };
  } else if (type === "website") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings?.siteName || "M Ramzan Portfolio",
      url: siteUrl,
      description: settings?.siteDescription,
      author: {
        "@type": "Person",
        name: authorName,
      },
    };
  } else if (type === "project" && data) {
    const project = data as Project;
    schema = {
      "@context": "https://schema.org",
      "@type": project.geo?.entityType || "SoftwareApplication",
      name: project.title,
      headline: project.subtitle,
      description: project.description || project.shortDescription,
      url: `${siteUrl}/projects/${project.slug}`,
      image: project.heroImage,
      dateCreated: project.createdAt,
      dateModified: project.updatedAt,
      creator: {
        "@type": "Person",
        name: authorName,
        url: siteUrl,
      },
      applicationCategory: project.category,
      operatingSystem: "Web",
      keywords: project.technologies.join(", "),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    };
  } else if (type === "breadcrumbs" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.map((item: { name: string; url: string }, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.url}`,
      })),
    };
  } else if (type === "faq" && data && data.length > 0) {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.map((item: { question: string; answer: string }) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
