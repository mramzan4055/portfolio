const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "db.us-losa1.bengt.wasmernet.com",
  port: parseInt(process.env.DB_PORT || "16751", 10),
  database: process.env.DB_NAME || "db_5322d8a7",
  user: process.env.DB_USER || "user_76e4995e",
  password: process.env.DB_PASSWORD || "pw_Vo1mIe0AaeFgkelyxiTAVQFkr7B2zYXh",
  ssl: { rejectUnauthorized: false },
};

// Transpile / evaluate seed.ts cleanly
const seedTsPath = path.join(__dirname, "..", "src", "data", "seed.ts");
const seedCode = fs.readFileSync(seedTsPath, "utf-8");

// Convert TS type imports and exports to JS for node evaluation
const jsCode = seedCode
  .replace(/import\s+.*?from\s+.*?;/g, "")
  .replace(/:\s*Project\[\]/g, "")
  .replace(/:\s*ServiceItem\[\]/g, "")
  .replace(/:\s*SkillCategory\[\]/g, "")
  .replace(/:\s*ExperienceItem\[\]/g, "")
  .replace(/:\s*SiteSettings/g, "")
  .replace(/:\s*Page\[\]/g, "")
  .replace(/export\s+const\s+/g, "const ");

const sandbox = {};
const fn = new Function(
  jsCode +
    "\nreturn { initialProjects, initialServices, initialSkills, initialExperience, initialPages, initialSiteSettings };"
);
const seedData = fn();

const dbJsonPath = path.join(__dirname, "..", "src", "data", "db.json");
let existingDb = {};
try {
  existingDb = JSON.parse(fs.readFileSync(dbJsonPath, "utf-8"));
} catch (e) {}

const updatedDb = {
  projects: seedData.initialProjects,
  services: seedData.initialServices,
  skills: seedData.initialSkills,
  experience: seedData.initialExperience,
  pages: seedData.initialPages,
  settings: seedData.initialSiteSettings,
  media: existingDb.media || [
    {
      id: "media-lddb",
      name: "LDDB National AgTech Portal",
      url: "/images/projects/lddb/thumbnail.png",
      size: 1121576,
      type: "image/png",
      dimensions: { width: 1440, height: 900 },
      altText: "LDDB Web Portal Interface",
      caption: "Federal livestock development platform",
      createdAt: "2024-04-10T00:00:00.000Z"
    }
  ]
};

// Save updated db.json
fs.writeFileSync(dbJsonPath, JSON.stringify(updatedDb, null, 2), "utf-8");
console.log(`Successfully updated db.json with ${updatedDb.projects.length} projects!`);

// Sync with Wasmer MySQL
async function syncMySQL() {
  try {
    console.log("Connecting to Wasmer MySQL to sync projects...");
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL!");

    for (const p of updatedDb.projects) {
      await connection.query(
        `INSERT INTO projects (
          id, slug, title, subtitle, category, year, status, featured, display_order,
          short_description, description, role, client, technologies, services,
          hero_image, thumbnail_image, gallery, live_url, github_url, case_study,
          metrics, seo, geo, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          slug = VALUES(slug),
          title = VALUES(title),
          subtitle = VALUES(subtitle),
          category = VALUES(category),
          year = VALUES(year),
          status = VALUES(status),
          featured = VALUES(featured),
          display_order = VALUES(display_order),
          short_description = VALUES(short_description),
          description = VALUES(description),
          role = VALUES(role),
          client = VALUES(client),
          technologies = VALUES(technologies),
          services = VALUES(services),
          hero_image = VALUES(hero_image),
          thumbnail_image = VALUES(thumbnail_image),
          gallery = VALUES(gallery),
          live_url = VALUES(live_url),
          github_url = VALUES(github_url),
          case_study = VALUES(case_study),
          metrics = VALUES(metrics),
          seo = VALUES(seo),
          geo = VALUES(geo),
          updated_at = VALUES(updated_at);`,
        [
          p.id,
          p.slug,
          p.title,
          p.subtitle || "",
          p.category,
          p.year || "2024",
          p.status || "published",
          p.featured ? 1 : 0,
          p.order || 0,
          p.shortDescription || "",
          p.description || "",
          p.role || "",
          p.client || "",
          JSON.stringify(p.technologies || []),
          JSON.stringify(p.services || []),
          p.heroImage || "",
          p.thumbnailImage || "",
          JSON.stringify(p.gallery || []),
          p.liveUrl || "",
          p.githubUrl || "",
          JSON.stringify(p.caseStudy || {}),
          JSON.stringify(p.metrics || []),
          JSON.stringify(p.seo || {}),
          JSON.stringify(p.geo || {}),
          p.createdAt || new Date().toISOString(),
          p.updatedAt || new Date().toISOString(),
        ]
      );
    }
    console.log("All projects upserted into MySQL!");
    await connection.end();
  } catch (err) {
    console.warn("MySQL sync skipped or failed (local db.json is ready):", err.message);
  }
}

syncMySQL();
