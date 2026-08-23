import { MetadataRoute } from "next";
import { getProjects, getServices, getPages, getSiteSettings } from "@/lib/data/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, services, pages, settings] = await Promise.all([
    getProjects({ status: "published" }),
    getServices(),
    getPages(),
    getSiteSettings(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || settings.siteUrl || "https://mramzan.dev";

  // Static core route definitions
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
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

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}

