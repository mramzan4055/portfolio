import { Metadata } from "next";
import { SiteSettings, Project } from "@/types";
import { initialSiteSettings } from "@/data/seed";

export function generateSiteMetadata(
  pageMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
    noIndex?: boolean;
  },
  settings: SiteSettings = initialSiteSettings
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.siteUrl || "https://mramzan.dev";
  const title = pageMeta?.title || settings.seo.defaultTitle;
  const description = pageMeta?.description || settings.seo.defaultDescription;
  const ogImage = pageMeta?.ogImage || settings.seo.defaultOgImage;
  const canonical = pageMeta?.canonical ? `${siteUrl}${pageMeta.canonical}` : siteUrl;

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
      type: "website",
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
  };
}

export function generateProjectMetadata(project: Project, settings: SiteSettings = initialSiteSettings): Metadata {
  return generateSiteMetadata(
    {
      title: project.seo.title || `${project.title} — Case Study`,
      description: project.seo.description || project.shortDescription,
      keywords: project.seo.keywords,
      ogImage: project.seo.ogImage || project.heroImage,
      canonical: `/projects/${project.slug}`,
      noIndex: project.status === "draft",
    },
    settings
  );
}
