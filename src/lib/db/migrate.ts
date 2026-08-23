import { getDbPool } from "./mysql";
import {
  initialProjects,
  initialServices,
  initialSkills,
  initialExperience,
  initialPages,
  initialSiteSettings,
} from "@/data/seed";

export async function migrateAndSeedDatabase() {
  const pool = getDbPool();
  const conn = await pool.getConnection();

  try {
    console.log("Creating tables on Wasmer MySQL database...");

    // 1. Projects Table
    await conn.query(`
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

    // 2. Pages Table
    await conn.query(`
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

    // 3. Services Table
    await conn.query(`
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

    // 4. Skills Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        skills JSON
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Experience Table
    await conn.query(`
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

    // 6. Media Table
    await conn.query(`
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

    // 7. Site Settings Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id VARCHAR(100) PRIMARY KEY,
        settings JSON NOT NULL,
        updated_at VARCHAR(100)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("Tables verified / created successfully.");

    // Check if projects table needs seeding
    const [projectRows]: any = await conn.query("SELECT COUNT(*) as count FROM projects");
    if (projectRows[0].count === 0) {
      console.log("Seeding projects into Wasmer MySQL...");
      for (const p of initialProjects) {
        await conn.query(
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
            p.subtitle,
            p.category,
            p.year,
            p.status,
            p.featured ? 1 : 0,
            p.order,
            p.shortDescription,
            p.description,
            p.role,
            p.client,
            JSON.stringify(p.technologies || []),
            JSON.stringify(p.services || []),
            p.heroImage,
            p.thumbnailImage,
            JSON.stringify(p.gallery || []),
            p.liveUrl || "",
            p.githubUrl || "",
            JSON.stringify(p.caseStudy || {}),
            JSON.stringify(p.metrics || []),
            JSON.stringify(p.seo || {}),
            JSON.stringify(p.geo || {}),
            p.createdAt,
            p.updatedAt,
          ]
        );
      }
      console.log("Projects seeded!");
    }

    // Check if site_settings needs seeding
    const [settingsRows]: any = await conn.query("SELECT COUNT(*) as count FROM site_settings");
    if (settingsRows[0].count === 0) {
      console.log("Seeding site settings...");
      await conn.query(
        "INSERT INTO site_settings (id, settings, updated_at) VALUES (?, ?, ?)",
        ["global_settings", JSON.stringify(initialSiteSettings), new Date().toISOString()]
      );
      console.log("Site settings seeded!");
    }

    // Check if services table needs seeding
    const [serviceRows]: any = await conn.query("SELECT COUNT(*) as count FROM services");
    if (serviceRows[0].count === 0) {
      console.log("Seeding services...");
      for (const s of initialServices) {
        await conn.query(
          `INSERT INTO services (
            id, title, slug, short_description, description, icon, deliverables, technologies, featured, display_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.id,
            s.title,
            s.slug,
            s.shortDescription,
            s.description,
            s.icon,
            JSON.stringify(s.deliverables || []),
            JSON.stringify(s.technologies || []),
            s.featured ? 1 : 0,
            s.order,
          ]
        );
      }
      console.log("Services seeded!");
    }

    // Check if skills table needs seeding
    const [skillRows]: any = await conn.query("SELECT COUNT(*) as count FROM skills");
    if (skillRows[0].count === 0) {
      console.log("Seeding skills...");
      for (const sk of initialSkills) {
        await conn.query("INSERT INTO skills (id, name, skills) VALUES (?, ?, ?)", [
          sk.id,
          sk.name,
          JSON.stringify(sk.skills || []),
        ]);
      }
      console.log("Skills seeded!");
    }

    // Check if experience table needs seeding
    const [expRows]: any = await conn.query("SELECT COUNT(*) as count FROM experience");
    if (expRows[0].count === 0) {
      console.log("Seeding experience...");
      for (const exp of initialExperience) {
        await conn.query(
          `INSERT INTO experience (
            id, role, company, location, period, current, description, technologies
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            exp.id,
            exp.role,
            exp.company,
            exp.location,
            exp.period,
            exp.current ? 1 : 0,
            JSON.stringify(exp.description || []),
            JSON.stringify(exp.technologies || []),
          ]
        );
      }
      console.log("Experience seeded!");
    }

    // Check if pages table needs seeding
    const [pageRows]: any = await conn.query("SELECT COUNT(*) as count FROM pages");
    if (pageRows[0].count === 0) {
      console.log("Seeding pages...");
      for (const page of initialPages) {
        await conn.query(
          "INSERT INTO pages (id, slug, title, description, sections, seo, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            page.id,
            page.slug,
            page.title,
            page.description,
            JSON.stringify(page.sections || []),
            JSON.stringify(page.seo || {}),
            page.updatedAt,
          ]
        );
      }
      console.log("Pages seeded!");
    }

    console.log("Migration & seeding completed successfully!");
    return true;
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  } finally {
    conn.release();
  }
}
