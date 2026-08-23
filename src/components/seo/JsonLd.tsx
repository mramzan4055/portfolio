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
      jobTitle: settings?.authorTitle || "Web & Mobile Application Developer",
      description: settings?.authorBio || "Web and mobile application developer specializing in WordPress, HTML, CSS, JavaScript, React, Next.js, and Flutter.",
      url: siteUrl,
      email: settings?.authorEmail,
      sameAs: [
        settings?.socialLinks?.github,
        settings?.socialLinks?.linkedin,
        settings?.socialLinks?.twitter,
        settings?.socialLinks?.dribbble,
      ].filter(Boolean),
      knowsAbout: [
        "Web Development",
        "WordPress Development",
        "React.js",
        "Next.js",
        "Flutter Mobile App Development",
        "HTML5 & CSS3",
        "JavaScript & TypeScript",
        "Tailwind CSS",
        "REST API Integration",
        "Search Engine Optimization (SEO)",
        "Generative Engine Optimization (GEO)",
        "Responsive Web Design"
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
      keywords: (project.technologies || []).join(", "),
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
