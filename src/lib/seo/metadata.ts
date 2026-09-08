import { Metadata } from "next";
import { SiteSettings, Project, ServiceItem } from "@/types";
import { initialSiteSettings } from "@/data/seed";

export const PRIMARY_DOMAIN = "https://mramzan.dev";

export function getCanonicalBaseUrl(configuredUrl?: string): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || configuredUrl;
  if (candidate && !candidate.includes("localhost") && !candidate.includes("127.0.0.1")) {
    return candidate.replace(/\/+$/, "");
  }
  return PRIMARY_DOMAIN;
}

export function generateSiteMetadata(
  pageMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
    noIndex?: boolean;
    type?: "website" | "article" | "profile";
  },
  settings: SiteSettings = initialSiteSettings
): Metadata {
  const siteUrl = getCanonicalBaseUrl(settings.siteUrl);
  const title = pageMeta?.title || settings.seo.defaultTitle;
  const description = pageMeta?.description || settings.seo.defaultDescription;
  const ogImage = pageMeta?.ogImage || settings.seo.defaultOgImage;
  
  // Clean canonical path
  const canonicalPath = pageMeta?.canonical
    ? (pageMeta.canonical.startsWith("/") ? pageMeta.canonical : `/${pageMeta.canonical}`)
    : "";
  const canonical = `${siteUrl}${canonicalPath}`;

  const googleVerification = settings.analytics?.googleSearchConsoleId || process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  const bingVerification = settings.analytics?.bingVerificationId || process.env.NEXT_PUBLIC_BING_VERIFICATION;

  const verification: Metadata["verification"] = {};
  if (googleVerification) {
    verification.google = googleVerification;
  }
  if (bingVerification) {
    verification.other = {
      "msvalidate.01": bingVerification,
    };
  }

  const defaultKeywords = [
    "Web Developer Pakistan",
    "M Ramzan Developer",
    "WordPress Developer Pakistan",
    "Next.js Developer Pakistan",
    "React Developer Pakistan",
    "Flutter Mobile App Developer",
    "Small Business Website Pakistan",
    "Affordable Website Development PKR 30000",
    "Freelance Web Developer Pakistan",
    "Professional Website Services Pakistan",
    "Website Redesign Pakistan",
    "Full Stack Developer Pakistan",
  ];

  return {
    title: {
      default: title,
      template: `%s | ${settings.authorName}`,
    },
    description,
    keywords: pageMeta?.keywords && pageMeta.keywords.length > 0 ? pageMeta.keywords : (settings.seo.defaultKeywords || defaultKeywords),
    authors: [{ name: settings.authorName, url: siteUrl }],
    creator: settings.authorName,
    publisher: settings.authorName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
        "x-default": canonical,
      },
    },
    category: "technology",
    openGraph: {
      type: pageMeta?.type || "website",
      locale: "en_US",
      alternateLocale: ["en_GB", "en_PK"],
      url: canonical,
      title,
      description,
      siteName: settings.siteName || "M RAMZAN — Web & Mobile Developer",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${title} — M Ramzan`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: settings.seo.twitterHandle || "@mramzandev",
      creator: settings.seo.twitterHandle || "@mramzandev",
      images: [ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`],
    },
    robots: {
      index: !pageMeta?.noIndex,
      follow: !pageMeta?.noIndex,
      nocache: false,
      googleBot: {
        index: !pageMeta?.noIndex,
        follow: !pageMeta?.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification,
    other: {
      "geo.region": "PK-PB",
      "geo.placename": "Punjab, Pakistan",
      "geo.position": "31.5204;74.3587",
      "ICBM": "31.5204, 74.3587",
      "theme-color": "#08080a",
      "color-scheme": "dark",
      "revisit-after": "7 days",
      "rating": "General",
    },
  };
}

export function generateProjectMetadata(project: Project, settings: SiteSettings = initialSiteSettings): Metadata {
  return generateSiteMetadata(
    {
      title: project.seo?.title || `${project.title} — Case Study | M Ramzan`,
      description: project.seo?.description || project.shortDescription,
      keywords: project.seo?.keywords && project.seo.keywords.length > 0 ? project.seo.keywords : [
        project.title,
        `${project.title} Case Study`,
        project.category,
        ...(project.technologies || []),
        "Web Developer Pakistan Portfolio",
      ],
      ogImage: project.seo?.ogImage || project.heroImage,
      canonical: `/projects/${project.slug}`,
      noIndex: project.status === "draft",
      type: "article",
    },
    settings
  );
}

export function generateServiceMetadata(service: ServiceItem, settings: SiteSettings = initialSiteSettings): Metadata {
  return generateSiteMetadata(
    {
      title: service.seo?.title || `${service.title} — Web Development Services in Pakistan`,
      description: service.seo?.description || service.shortDescription || service.description,
      keywords: service.seo?.keywords && service.seo.keywords.length > 0 ? service.seo.keywords : [
        service.title,
        `${service.title} Pakistan`,
        "Web Developer Pakistan",
        "Small Business Website Pakistan",
        "Website Development PKR",
        "M Ramzan Services",
      ],
      ogImage: service.seo?.ogImage || "/opengraph-image",
      canonical: `/services/${service.slug}`,
    },
    settings
  );
}


