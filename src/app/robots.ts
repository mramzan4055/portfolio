import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/data/store";
import { getCanonicalBaseUrl } from "@/lib/seo/metadata";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = getCanonicalBaseUrl(settings.siteUrl);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/_next/data/*",
        ],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "Slurp",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      {
        // Generative Engine & AI Assistants (ChatGPT, Claude, Perplexity)
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: ["/", "/work", "/services", "/packages", "/about", "/contact", "/sitemap", "/llms.txt"],
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

