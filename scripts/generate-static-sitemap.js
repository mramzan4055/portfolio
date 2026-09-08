/**
 * Generates a clean, static public/sitemap.xml for production deployments,
 * Apache cPanel hosting, and direct web server serving.
 *
 * Run manually or during build:
 *   node scripts/generate-static-sitemap.js
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://mramzan.dev";

const STATIC_ROUTES = [
  { path: "", changefreq: "daily", priority: "1.0" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/packages", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/sitemap", changefreq: "weekly", priority: "0.7" },
];

function getProjectAndServiceRoutes() {
  let db = { projects: [], services: [] };
  const dbPath = path.join(__dirname, "..", "src", "data", "db.json");

  try {
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    }
  } catch (err) {
    console.warn("Could not read db.json, falling back to seed defaults:", err.message);
  }

  const serviceRoutes = (db.services || []).map((s) => ({
    path: `/services/${s.slug}`,
    changefreq: "weekly",
    priority: "0.9",
    lastmod: new Date().toISOString().split("T")[0],
  }));

  const projectRoutes = (db.projects || [])
    .filter((p) => p.status === "published")
    .map((p) => ({
      path: `/projects/${p.slug}`,
      changefreq: "monthly",
      priority: p.featured ? "0.9" : "0.8",
      lastmod: (p.updatedAt || p.createdAt || new Date().toISOString()).split("T")[0],
    }));

  return { serviceRoutes, projectRoutes };
}

function buildSitemapXml() {
  const today = new Date().toISOString().split("T")[0];
  const { serviceRoutes, projectRoutes } = getProjectAndServiceRoutes();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Static routes
  for (const r of STATIC_ROUTES) {
    const loc = `${SITE_URL}${r.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />\n`;
    xml += `  </url>\n`;
  }

  // Service routes
  for (const r of serviceRoutes) {
    const loc = `${SITE_URL}${r.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${r.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />\n`;
    xml += `  </url>\n`;
  }

  // Project routes
  for (const r of projectRoutes) {
    const loc = `${SITE_URL}${r.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${r.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function main() {
  const xml = buildSitemapXml();
  const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`Successfully generated static sitemap at: ${outputPath}`);
}

main();
