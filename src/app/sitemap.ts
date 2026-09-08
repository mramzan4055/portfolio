import { MetadataRoute } from "next";
import { getProjects, getServices, getPages, getSiteSettings } from "@/lib/data/store";
import { getCanonicalBaseUrl } from "@/lib/seo/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, pages, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getPages(),
    getSiteSettings(),
  ]);

  const siteUrl = getCanonicalBaseUrl(settings.siteUrl);

  // Static core route definitions
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic dedicated service landing pages
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic published project case study routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.createdAt),
    changeFrequency: "monthly",
    priority: project.featured ? 0.9 : 0.8,
  }));

  // Dynamic published custom pages
  const pageRoutes: MetadataRoute.Sitemap = (pages || [])
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${siteUrl}/${p.slug}`,
      lastModified: new Date(p.updatedAt || new Date()),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...pageRoutes];
}


