const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "db.us-losa1.bengt.wasmernet.com",
  port: parseInt(process.env.DB_PORT || "16751", 10),
  database: process.env.DB_NAME || "db_5322d8a7",
  user: process.env.DB_USER || "user_76e4995e",
  password: process.env.DB_PASSWORD || "pw_Vo1mIe0AaeFgkelyxiTAVQFkr7B2zYXh",
  ssl: { rejectUnauthorized: false },
};

async function main() {
  console.log("Connecting to Wasmer MySQL Database...");
  const connection = await mysql.createConnection(dbConfig);
  console.log("Connected successfully!");

  console.log("Creating tables...");
  await connection.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(100) PRIMARY KEY,
      slug VARCHAR(191) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      subtitle TEXT,
      category VARCHAR(100) NOT NULL,
      year VARCHAR(50),
      status VARCHAR(50) DEFAULT 'published',
      featured BOOLEAN DEFAULT FALSE,
      display_order INT DEFAULT 0,
      short_description TEXT,
      description TEXT,
      role VARCHAR(255),
      client VARCHAR(255),
      technologies JSON,
      services JSON,
      hero_image TEXT,
      thumbnail_image TEXT,
      gallery JSON,
      live_url TEXT,
      github_url TEXT,
      case_study JSON,
      metrics JSON,
      seo JSON,
      geo JSON,
      created_at VARCHAR(100),
      updated_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS pages (
      id VARCHAR(100) PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      sections JSON,
      seo JSON,
      updated_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS services (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(191) UNIQUE,
      short_description TEXT,
      description TEXT,
      icon VARCHAR(100),
      deliverables JSON,
      technologies JSON,
      featured BOOLEAN DEFAULT FALSE,
      display_order INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      skills JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS experience (
      id VARCHAR(100) PRIMARY KEY,
      role VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(100),
      period VARCHAR(100),
      current BOOLEAN DEFAULT FALSE,
      description JSON,
      technologies JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS media (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      url TEXT NOT NULL,
      size INT,
      type VARCHAR(100),
      dimensions JSON,
      alt_text TEXT,
      caption TEXT,
      created_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id VARCHAR(100) PRIMARY KEY,
      settings JSON NOT NULL,
      updated_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log("Tables created successfully!");

  const fs = require("fs");
  const path = require("path");
  const dbDataPath = path.join(__dirname, "..", "src", "data", "db.json");
  if (fs.existsSync(dbDataPath)) {
    const rawData = fs.readFileSync(dbDataPath, "utf-8");
    const data = JSON.parse(rawData);

    // Seed Projects
    const [existingProjects] = await connection.query("SELECT COUNT(*) as count FROM projects");
    if (existingProjects[0].count === 0 && data.projects) {
      console.log("Seeding projects into Wasmer MySQL...");
      for (const p of data.projects) {
        await connection.query(
          `INSERT INTO projects (
            id, slug, title, subtitle, category, year, status, featured, display_order,
            short_description, description, role, client, technologies, services,
            hero_image, thumbnail_image, gallery, live_url, github_url, case_study,
            metrics, seo, geo, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      console.log(`Seeded ${data.projects.length} projects.`);
    }

    // Seed Settings
    const [existingSettings] = await connection.query("SELECT COUNT(*) as count FROM site_settings");
    if (existingSettings[0].count === 0 && data.settings) {
      console.log("Seeding site settings...");
      await connection.query(
        "INSERT INTO site_settings (id, settings, updated_at) VALUES (?, ?, ?)",
        ["global_settings", JSON.stringify(data.settings), new Date().toISOString()]
      );
      console.log("Site settings seeded.");
    }

    // Seed Services
    const [existingServices] = await connection.query("SELECT COUNT(*) as count FROM services");
    if (existingServices[0].count === 0 && data.services) {
      console.log("Seeding services...");
      for (const s of data.services) {
        await connection.query(
          `INSERT INTO services (
            id, title, slug, short_description, description, icon, deliverables, technologies, featured, display_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      console.log(`Seeded ${data.services.length} services.`);
    }

    // Seed Skills
    const [existingSkills] = await connection.query("SELECT COUNT(*) as count FROM skills");
    if (existingSkills[0].count === 0 && data.skills) {
      console.log("Seeding skills...");
      for (const sk of data.skills) {
        await connection.query("INSERT INTO skills (id, name, skills) VALUES (?, ?, ?)", [
          sk.id,
          sk.name,
          JSON.stringify(sk.skills || []),
        ]);
      }
      console.log(`Seeded ${data.skills.length} skill categories.`);
    }

    // Seed Experience
    const [existingExp] = await connection.query("SELECT COUNT(*) as count FROM experience");
    if (existingExp[0].count === 0 && data.experience) {
      console.log("Seeding experience...");
      for (const exp of data.experience) {
        await connection.query(
          `INSERT INTO experience (
            id, role, company, location, period, current, description, technologies
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
      console.log(`Seeded ${data.experience.length} experience entries.`);
    }

    // Seed Pages
    const [existingPages] = await connection.query("SELECT COUNT(*) as count FROM pages");
    if (existingPages[0].count === 0 && data.pages) {
      console.log("Seeding pages...");
      for (const page of data.pages) {
        await connection.query(
          "INSERT INTO pages (id, slug, title, description, sections, seo, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            page.id,
            page.slug,
            page.title,
            page.description || "",
            JSON.stringify(page.sections || []),
            JSON.stringify(page.seo || {}),
            page.updatedAt || new Date().toISOString(),
          ]
        );
      }
      console.log(`Seeded ${data.pages.length} pages.`);
    }

    // Seed Media
    const [existingMedia] = await connection.query("SELECT COUNT(*) as count FROM media");
    if (existingMedia[0].count === 0 && data.media) {
      console.log("Seeding media items...");
      for (const m of data.media) {
        await connection.query(
          `INSERT INTO media (id, name, url, size, type, dimensions, alt_text, caption, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            m.id,
            m.name,
            m.url,
            m.size || 0,
            m.type || "image/jpeg",
            JSON.stringify(m.dimensions || {}),
            m.altText || "",
            m.caption || "",
            m.createdAt || new Date().toISOString(),
          ]
        );
      }
      console.log(`Seeded ${data.media.length} media items.`);
    }
  }

  const [tableList] = await connection.query("SHOW TABLES");
  console.log("All tables in Wasmer Database:", tableList);

  await connection.end();
  console.log("Migration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
