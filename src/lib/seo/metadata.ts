import { Metadata } from "next";
import { SiteSettings, Project, ServiceItem } from "@/types";
import { initialSiteSettings } from "@/data/seed";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.siteUrl || "https://mramzan.dev";
  const title = pageMeta?.title || settings.seo.defaultTitle;
  const description = pageMeta?.description || settings.seo.defaultDescription;
  const ogImage = pageMeta?.ogImage || settings.seo.defaultOgImage;
  const canonical = pageMeta?.canonical ? `${siteUrl}${pageMeta.canonical}` : siteUrl;

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

  return {
    title: {
      default: title,
      template: `%s | ${settings.authorName}`,
    },
    description,
    keywords: pageMeta?.keywords || settings.seo.defaultKeywords,
    authors: [{ name: settings.authorName, url: siteUrl }],
    creator: settings.authorName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      type: pageMeta?.type || "website",
      locale: "en_US",
      url: canonical,
      title,
      description,
      siteName: settings.siteName,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: settings.seo.twitterHandle,
      images: [ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`],
    },
    robots: {
      index: !pageMeta?.noIndex,
      follow: !pageMeta?.noIndex,
      googleBot: {
        index: !pageMeta?.noIndex,
        follow: !pageMeta?.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification,
  };
}

export function generateProjectMetadata(project: Project, settings: SiteSettings = initialSiteSettings): Metadata {
  return generateSiteMetadata(
    {
      title: project.seo?.title || `${project.title} — Case Study`,
      description: project.seo?.description || project.shortDescription,
      keywords: project.seo?.keywords,
      ogImage: project.seo?.ogImage || project.heroImage,
      canonical: `/projects/${project.slug}`,
      noIndex: project.status === "draft",
    },
    settings
  );
}

export function generateServiceMetadata(service: ServiceItem, settings: SiteSettings = initialSiteSettings): Metadata {
  return generateSiteMetadata(
    {
      title: service.seo?.title || `${service.title} — Web Development Services in Pakistan`,
      description: service.seo?.description || service.shortDescription || service.description,
      keywords: service.seo?.keywords || [
        service.title,
        `${service.title} Pakistan`,
        "Web Developer Pakistan",
        "Small Business Website Pakistan",
        "Website Development",
      ],
      ogImage: service.seo?.ogImage || "/opengraph-image",
      canonical: `/services/${service.slug}`,
    },
    settings
  );
}

