import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/data/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.siteUrl || "https://mramzan.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/api/*",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
