import { NextResponse } from "next/server";
import { getProjects, getServices, getPages, getSiteSettings } from "@/lib/data/store";
import { getCanonicalBaseUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const [projects, services, pages, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getPages(),
    getSiteSettings(),
  ]);

  const siteUrl = getCanonicalBaseUrl(settings.siteUrl);
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    { url: `${siteUrl}`, changefreq: "daily", priority: "1.0", lastmod: today },
    { url: `${siteUrl}/work`, changefreq: "weekly", priority: "0.9", lastmod: today },
    { url: `${siteUrl}/services`, changefreq: "weekly", priority: "0.9", lastmod: today },
    { url: `${siteUrl}/packages`, changefreq: "weekly", priority: "0.9", lastmod: today },
    { url: `${siteUrl}/about`, changefreq: "monthly", priority: "0.8", lastmod: today },
    { url: `${siteUrl}/contact`, changefreq: "monthly", priority: "0.8", lastmod: today },
    { url: `${siteUrl}/sitemap`, changefreq: "weekly", priority: "0.7", lastmod: today },
  ];

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    changefreq: "weekly",
    priority: "0.9",
    lastmod: today,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    changefreq: "monthly",
    priority: p.featured ? "0.9" : "0.8",
    lastmod: (p.updatedAt || p.createdAt || today).split("T")[0],
  }));

  const pageRoutes = (pages || [])
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${siteUrl}/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: (p.updatedAt || today).split("T")[0],
    }));

  const allRoutes = [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...pageRoutes];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const r of allRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${r.url}</loc>\n`;
    xml += `    <lastmod>${r.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${r.url}" />\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
