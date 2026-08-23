const mysql = require("mysql2/promise");
const {
  initialProjects,
  initialServices,
  initialSkills,
  initialExperience,
  initialPages,
  initialSiteSettings,
} = require("../src/data/seed.ts");

const dbConfig = {
  host: process.env.DB_HOST || "db.us-losa1.bengt.wasmernet.com",
  port: parseInt(process.env.DB_PORT || "16751", 10),
  database: process.env.DB_NAME || "db_5322d8a7",
  user: process.env.DB_USER || "user_76e4995e",
  password: process.env.DB_PASSWORD || "pw_Vo1mIe0AaeFgkelyxiTAVQFkr7B2zYXh",
  ssl: { rejectUnauthorized: false },
};

async function syncAll() {
  console.log("Connecting to Wasmer MySQL Database to sync fresh data...");
  const connection = await mysql.createConnection(dbConfig);
  console.log("Connected successfully!");

  // Reseed / update projects
  for (const p of initialProjects) {
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
        updated_at = VALUES(updated_at)`,
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
  console.log(`Updated ${initialProjects.length} projects in Wasmer MySQL.`);

  // Update Services
  for (const s of initialServices) {
    await connection.query(
      `INSERT INTO services (
        id, title, slug, short_description, description, icon, deliverables, technologies, featured, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        slug = VALUES(slug),
        short_description = VALUES(short_description),
        description = VALUES(description),
        icon = VALUES(icon),
        deliverables = VALUES(deliverables),
        technologies = VALUES(technologies),
        featured = VALUES(featured),
        display_order = VALUES(display_order)`,
      [
        s.id,
        s.title,
        s.slug || s.id,
        s.shortDescription || "",
        s.description || "",
        s.icon || "",
        JSON.stringify(s.deliverables || []),
        JSON.stringify(s.technologies || []),
        s.featured ? 1 : 0,
        s.order || 0,
      ]
    );
  }
  console.log(`Updated ${initialServices.length} services in Wasmer MySQL.`);

  // Update Skills
  for (const sk of initialSkills) {
    await connection.query(
      `INSERT INTO skills (id, name, skills) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), skills = VALUES(skills)`,
      [sk.id, sk.name, JSON.stringify(sk.skills || [])]
    );
  }
  console.log(`Updated ${initialSkills.length} skill categories in Wasmer MySQL.`);

  // Update Experience
  for (const exp of initialExperience) {
    await connection.query(
      `INSERT INTO experience (
        id, role, company, location, period, current, description, technologies
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        role = VALUES(role),
        company = VALUES(company),
        location = VALUES(location),
        period = VALUES(period),
        current = VALUES(current),
        description = VALUES(description),
        technologies = VALUES(technologies)`,
      [
        exp.id,
        exp.role,
        exp.company,
        exp.location || "",
        exp.period || "",
        exp.current ? 1 : 0,
        JSON.stringify(exp.description || []),
        JSON.stringify(exp.technologies || []),
      ]
    );
  }
  console.log(`Updated ${initialExperience.length} experience entries in Wasmer MySQL.`);

  await connection.end();
  console.log("All data successfully synced to Wasmer MySQL!");
}

syncAll().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
