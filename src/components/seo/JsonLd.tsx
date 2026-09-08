import React from "react";
import { SiteSettings, Project, ServiceItem } from "@/types";

interface JsonLdProps {
  type: "person" | "website" | "professionalService" | "service" | "project" | "breadcrumbs" | "faq" | "profilePage";
  data?: any;
  settings?: SiteSettings;
}

export function JsonLd({ type, data, settings }: JsonLdProps) {
  const siteUrl = "https://mramzan.dev";
  const authorName = settings?.authorName || "M Ramzan";

  let schema: Record<string, any> = {};

  if (type === "person") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: authorName,
      alternateName: ["Muhammad Ramzan", "M. Ramzan"],
      jobTitle: settings?.authorTitle || "Web & Mobile Application Developer",
      description:
        settings?.authorBio ||
        "Web and mobile application developer in Pakistan specializing in WordPress, React, Next.js, Flutter, and high-performance websites for SMEs and startups.",
      url: siteUrl,
      image: `${siteUrl}/images/profile.jpg`,
      email: settings?.authorEmail || "info@mramzan.dev",
      telephone: settings?.authorPhone || "+92 309 6734231",
      nationality: {
        "@type": "Country",
        name: "Pakistan",
      },
      worksFor: {
        "@type": "Organization",
        name: "M Ramzan Development Solutions",
        url: siteUrl,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK",
        addressRegion: "Pakistan",
      },
      sameAs: [
        settings?.socialLinks?.github || "https://github.com/mramzan4055",
        settings?.socialLinks?.linkedin || "https://linkedin.com/in/mramzan",
        settings?.socialLinks?.twitter || "https://twitter.com/mramzandev",
        settings?.socialLinks?.dribbble || "https://dribbble.com/mramzan",
      ].filter(Boolean),
      knowsAbout: [
        "Website Development Pakistan",
        "Small Business Websites",
        "WordPress Development",
        "Next.js App Router",
        "React.js",
        "Flutter Cross-Platform Mobile Apps",
        "PHP & MySQL Backend Architecture",
        "Search Engine Optimization (SEO)",
        "Answer Engine Optimization (AEO)",
        "Generative Engine Optimization (GEO)",
        "Tailwind CSS & Modern UI/UX",
        "Responsive Web Design",
        "Website Redesign & Speed Optimization",
      ],
    };
  } else if (type === "professionalService") {
    schema = {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${siteUrl}/#business`,
      name: "M Ramzan — Website Development & App Solutions",
      alternateName: "M Ramzan Web Developer",
      description:
        "Professional website development, WordPress CMS, and Flutter mobile application services for small businesses and SMEs in Pakistan. Packages starting from PKR 30,000.",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      logo: `${siteUrl}/icon`,
      telephone: settings?.authorPhone || "+92 309 6734231",
      email: settings?.authorEmail || "info@mramzan.dev",
      priceRange: "PKR 30,000 - PKR 150,000+",
      currenciesAccepted: "PKR, USD, EUR, GBP",
      paymentAccepted: "Bank Transfer, Raast, JazzCash, EasyPaisa, Wire, Payoneer",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.5204,
        longitude: 74.3587,
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Pakistan",
        },
        {
          "@type": "AdministrativeArea",
          name: "Punjab",
        },
        {
          "@type": "AdministrativeArea",
          name: "Islamabad Capital Territory",
        },
        {
          "@type": "AdministrativeArea",
          name: "Sindh",
        },
        {
          "@type": "AdministrativeArea",
          name: "Khyber Pakhtunkhwa",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK",
        addressRegion: "Pakistan",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      founder: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: authorName,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Development Packages",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Starter Business Website",
              description: "3-5 responsive pages, mobile-friendly design, contact form & WhatsApp integration for local businesses in Pakistan.",
            },
            price: "30000",
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Growth Website",
              description: "5-10 custom pages, premium design, blog/news, advanced SEO and CMS integration for growing SMEs.",
            },
            price: "60000",
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Web Application & Flutter Mobile App",
              description: "Bespoke portals, e-commerce stores, custom web apps, and iOS/Android mobile apps with Flutter.",
            },
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
          },
        ],
      },
    };
  } else if (type === "website") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: settings?.siteName || "M RAMZAN — Web & Mobile Developer",
      url: siteUrl,
      description: settings?.siteDescription,
      inLanguage: "en-US",
      publisher: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: authorName,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/work?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  } else if (type === "profilePage") {
    schema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${siteUrl}/about#webpage`,
      url: `${siteUrl}/about`,
      name: `About ${authorName} — Web & Mobile Application Developer`,
      description: `Professional background, verified skills, and development experience of ${authorName}.`,
      mainEntity: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: authorName,
      },
    };
  } else if (type === "service" && data) {
    const srv = data as ServiceItem;
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}/services/${srv.slug}#service`,
      name: srv.title,
      serviceType: srv.title,
      description: srv.description || srv.shortDescription,
      url: `${siteUrl}/services/${srv.slug}`,
      provider: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: authorName,
      },
      areaServed: {
        "@type": "Country",
        name: "Pakistan",
      },
      offers: {
        "@type": "Offer",
        price: srv.pricingStart?.replace(/[^0-9]/g, "") || "30000",
        priceCurrency: "PKR",
        availability: "https://schema.org/InStock",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${srv.title} Deliverables`,
        itemListElement: (srv.deliverables || []).map((d) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: d,
          },
        })),
      },
    };
  } else if (type === "project" && data) {
    const project = data as Project;
    schema = {
      "@context": "https://schema.org",
      "@type":
        project.geo?.entityType === "EducationalPlatform"
          ? "EducationalOccupationalProgram"
          : project.geo?.entityType || "SoftwareApplication",
      name: project.title,
      headline: project.subtitle,
      description: project.description || project.shortDescription,
      url: `${siteUrl}/projects/${project.slug}`,
      image: project.heroImage.startsWith("http") ? project.heroImage : `${siteUrl}${project.heroImage}`,
      dateCreated: project.createdAt,
      dateModified: project.updatedAt,
      creator: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: authorName,
        url: siteUrl,
      },
      applicationCategory: project.category,
      operatingSystem: "Web",
      keywords: (project.technologies || []).join(", "),
    };
  } else if (type === "breadcrumbs" && data) {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.map((item: { name: string; url: string }, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
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

