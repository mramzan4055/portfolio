import fs from "fs";
import path from "path";
import { Project, Page, MediaItem, SiteSettings, ServiceItem, SkillCategory, ExperienceItem, ProjectStatus } from "@/types";
import { initialProjects, initialServices, initialSkills, initialExperience, initialPages, initialSiteSettings } from "@/data/seed";
import { query as mysqlQuery, execute as mysqlExecute } from "@/lib/db/mysql";

interface DBData {
  projects: Project[];
  services: ServiceItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  pages: Page[];
  settings: SiteSettings;
  media: MediaItem[];
}

const DB_FILE_PATH = path.join(process.cwd(), "src", "data", "db.json");

function parseJson(val: any, fallback: any = null) {
  if (!val) return fallback;
  if (typeof val === "object") return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function mapRowToProject(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || "",
    category: row.category,
    year: row.year || "2024",
    status: row.status || "published",
    featured: Boolean(row.featured),
    order: row.display_order ?? 0,
    shortDescription: row.short_description || "",
    description: row.description || "",
    role: row.role || "",
    client: row.client || "",
    technologies: parseJson(row.technologies, []),
    services: parseJson(row.services, []),
    heroImage: row.hero_image || "",
    thumbnailImage: row.thumbnail_image || "",
    gallery: parseJson(row.gallery, []),
    liveUrl: row.live_url || "",
    githubUrl: row.github_url || "",
    caseStudy: parseJson(row.case_study, {}),
    metrics: parseJson(row.metrics, []),
    seo: parseJson(row.seo, {}),
    geo: parseJson(row.geo, {}),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

// Local fallback DB operations
function getLocalData(): DBData {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const fileData = fs.readFileSync(DB_FILE_PATH, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading local db file, falling back to seed:", error);
  }

  const initialData: DBData = {
    projects: initialProjects,
    services: initialServices,
    skills: initialSkills,
    experience: initialExperience,
    pages: initialPages,
    settings: initialSiteSettings,
    media: [
      {
        id: "media-1",
        name: "Alqadir Academy Showcase",
        url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=2000&q=80",
        size: 420000,
        type: "image/jpeg",
        dimensions: { width: 2000, height: 1200 },
        altText: "Alqadir Quran Academy Web Interface",
        caption: "Hero visualization for distance learning portal",
        createdAt: "2024-03-15T00:00:00.000Z"
      },
      {
        id: "media-2",
        name: "IDEA TECH CMS Dashboard",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
        size: 512000,
        type: "image/jpeg",
        dimensions: { width: 2000, height: 1250 },
        altText: "IDEA TECH CMS Admin Analytics",
        caption: "Real-time analytics and publishing suite",
        createdAt: "2024-05-10T00:00:00.000Z"
      },
      {
        id: "media-3",
        name: "Ziva Luxury E-Commerce Flagship",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80",
        size: 630000,
        type: "image/jpeg",
        dimensions: { width: 2000, height: 1333 },
        altText: "Ziva Luxury Atelier Lookbook",
        caption: "Bespoke digital commerce lookbook",
        createdAt: "2024-01-18T00:00:00.000Z"
      }
    ]
  };

  return initialData;
}

function saveLocalData(data: DBData): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving local db file:", error);
  }
}

// ------------------------------------------------------------------
// PROJECT OPERATIONS
// ------------------------------------------------------------------
export async function getProjects(options?: {
  status?: ProjectStatus;
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  try {
    let sql = "SELECT * FROM projects WHERE 1=1";
    const params: any[] = [];

    if (options?.status) {
      sql += " AND status = ?";
      params.push(options.status);
    }
    if (options?.category && options.category !== "All") {
      sql += " AND category LIKE ?";
      params.push(`%${options.category}%`);
    }
    if (options?.featured !== undefined) {
      sql += " AND featured = ?";
      params.push(options.featured ? 1 : 0);
    }

    sql += " ORDER BY display_order ASC";

    if (options?.limit) {
      sql += ` LIMIT ${Number(options.limit)}`;
    }

    const rows = await mysqlQuery(sql, params);
    if (rows && rows.length > 0) {
      return rows.map(mapRowToProject);
    }
  } catch (err) {
    console.warn("Wasmer MySQL query failed, using fallback:", err);
  }

  const db = getLocalData();
  let result = [...db.projects];

  if (options?.status) {
    result = result.filter((p) => p.status === options.status);
  }
  if (options?.category && options.category !== "All") {
    result = result.filter((p) => p.category.toLowerCase().includes(options.category!.toLowerCase()));
  }
  if (options?.featured !== undefined) {
    result = result.filter((p) => p.featured === options.featured);
  }

  result.sort((a, b) => a.order - b.order);

  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const rows = await mysqlQuery("SELECT * FROM projects WHERE slug = ? LIMIT 1", [slug]);
    if (rows && rows.length > 0) {
      return mapRowToProject(rows[0]);
    }
  } catch (err) {
    console.warn("Wasmer MySQL getProjectBySlug failed, using fallback:", err);
  }

  const db = getLocalData();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const rows = await mysqlQuery("SELECT * FROM projects WHERE id = ? LIMIT 1", [id]);
    if (rows && rows.length > 0) {
      return mapRowToProject(rows[0]);
    }
  } catch (err) {
    console.warn("Wasmer MySQL getProjectById failed, using fallback:", err);
  }

  const db = getLocalData();
  return db.projects.find((p) => p.id === id) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  const projectToSave: Project = {
    ...project,
    updatedAt: new Date().toISOString(),
    createdAt: project.createdAt || new Date().toISOString(),
  };

  try {
    await mysqlQuery(
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
        projectToSave.id,
        projectToSave.slug,
        projectToSave.title,
        projectToSave.subtitle || "",
        projectToSave.category,
        projectToSave.year || "2024",
        projectToSave.status || "published",
        projectToSave.featured ? 1 : 0,
        projectToSave.order || 0,
        projectToSave.shortDescription || "",
        projectToSave.description || "",
        projectToSave.role || "",
        projectToSave.client || "",
        JSON.stringify(projectToSave.technologies || []),
        JSON.stringify(projectToSave.services || []),
        projectToSave.heroImage || "",
        projectToSave.thumbnailImage || "",
        JSON.stringify(projectToSave.gallery || []),
        projectToSave.liveUrl || "",
        projectToSave.githubUrl || "",
        JSON.stringify(projectToSave.caseStudy || {}),
        JSON.stringify(projectToSave.metrics || []),
        JSON.stringify(projectToSave.seo || {}),
        JSON.stringify(projectToSave.geo || {}),
        projectToSave.createdAt,
        projectToSave.updatedAt,
      ]
    );
  } catch (err) {
    console.warn("Wasmer MySQL saveProject failed:", err);
  }

  const db = getLocalData();
  const index = db.projects.findIndex((p) => p.id === projectToSave.id);
  if (index >= 0) {
    db.projects[index] = projectToSave;
  } else {
    db.projects.push(projectToSave);
  }
  saveLocalData(db);

  return projectToSave;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await mysqlExecute("DELETE FROM projects WHERE id = ?", [id]);
  } catch (err) {
    console.warn("Wasmer MySQL deleteProject failed:", err);
  }

  const db = getLocalData();
  db.projects = db.projects.filter((p) => p.id !== id);
  saveLocalData(db);
  return true;
}

export async function reorderProjects(orderedIds: string[]): Promise<boolean> {
  try {
    for (let index = 0; index < orderedIds.length; index++) {
      await mysqlExecute("UPDATE projects SET display_order = ? WHERE id = ?", [index + 1, orderedIds[index]]);
    }
  } catch (err) {
    console.warn("Wasmer MySQL reorderProjects failed:", err);
  }

  const db = getLocalData();
  orderedIds.forEach((id, index) => {
    const project = db.projects.find((p) => p.id === id);
    if (project) {
      project.order = index + 1;
    }
  });
  db.projects.sort((a, b) => a.order - b.order);
  saveLocalData(db);
  return true;
}

// ------------------------------------------------------------------
// PAGE OPERATIONS
// ------------------------------------------------------------------
export async function getPages(): Promise<Page[]> {
  try {
    const rows = await mysqlQuery("SELECT * FROM pages");
    if (rows && rows.length > 0) {
      return rows.map((r: any) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        description: r.description || "",
        status: (r.status as "draft" | "published") || "published",
        sections: parseJson(r.sections, []),
        seo: parseJson(r.seo, {}),
        updatedAt: r.updated_at || new Date().toISOString(),
      }));
    }
  } catch (err) {
    console.warn("Wasmer MySQL getPages failed:", err);
  }

  const db = getLocalData();
  return db.pages;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const rows = await mysqlQuery("SELECT * FROM pages WHERE slug = ? LIMIT 1", [slug]);
    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: r.id,
        slug: r.slug,
        title: r.title,
        description: r.description || "",
        status: (r.status as "draft" | "published") || "published",
        sections: parseJson(r.sections, []),
        seo: parseJson(r.seo, {}),
        updatedAt: r.updated_at || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn("Wasmer MySQL getPageBySlug failed:", err);
  }

  const db = getLocalData();
  return db.pages.find((p) => p.slug === slug) || null;
}

export async function savePage(page: Page): Promise<Page> {
  const pageToSave: Page = {
    ...page,
    updatedAt: new Date().toISOString(),
  };

  try {
    await mysqlQuery(
      `INSERT INTO pages (id, slug, title, description, sections, seo, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         description = VALUES(description),
         sections = VALUES(sections),
         seo = VALUES(seo),
         updated_at = VALUES(updated_at)`,
      [
        pageToSave.id,
        pageToSave.slug,
        pageToSave.title,
        pageToSave.description || "",
        JSON.stringify(pageToSave.sections || []),
        JSON.stringify(pageToSave.seo || {}),
        pageToSave.updatedAt,
      ]
    );
  } catch (err) {
    console.warn("Wasmer MySQL savePage failed:", err);
  }

  const db = getLocalData();
  const index = db.pages.findIndex((p) => p.id === pageToSave.id);
  if (index >= 0) {
    db.pages[index] = pageToSave;
  } else {
    db.pages.push(pageToSave);
  }
  saveLocalData(db);
  return pageToSave;
}

// ------------------------------------------------------------------
// SERVICES & SKILLS & EXPERIENCE
// ------------------------------------------------------------------
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const rows = await mysqlQuery("SELECT * FROM services ORDER BY display_order ASC");
    if (rows && rows.length > 0) {
      return rows.map((s: any) => ({
        id: s.id,
        title: s.title,
        slug: s.slug || s.id,
        shortDescription: s.short_description || "",
        description: s.description || "",
        icon: s.icon || "",
        deliverables: parseJson(s.deliverables, []),
        technologies: parseJson(s.technologies, []),
        featured: Boolean(s.featured),
        order: s.display_order ?? 0,
      }));
    }
  } catch (err) {
    console.warn("Wasmer MySQL getServices failed:", err);
  }

  const db = getLocalData();
  return db.services.sort((a, b) => a.order - b.order);
}

export async function getSkills(): Promise<SkillCategory[]> {
  try {
    const rows = await mysqlQuery("SELECT * FROM skills");
    if (rows && rows.length > 0) {
      return rows.map((sk: any) => ({
        id: sk.id,
        name: sk.name,
        skills: parseJson(sk.skills, []),
      }));
    }
  } catch (err) {
    console.warn("Wasmer MySQL getSkills failed:", err);
  }

  const db = getLocalData();
  return db.skills;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const rows = await mysqlQuery("SELECT * FROM experience");
    if (rows && rows.length > 0) {
      return rows.map((exp: any) => ({
        id: exp.id,
        role: exp.role,
        company: exp.company,
        location: exp.location || "",
        period: exp.period || "",
        current: Boolean(exp.current),
        description: parseJson(exp.description, []),
        technologies: parseJson(exp.technologies, []),
      }));
    }
  } catch (err) {
    console.warn("Wasmer MySQL getExperience failed:", err);
  }

  const db = getLocalData();
  return db.experience;
}

// ------------------------------------------------------------------
// MEDIA LIBRARY OPERATIONS
// ------------------------------------------------------------------
export async function getMediaItems(): Promise<MediaItem[]> {
  try {
    const rows = await mysqlQuery("SELECT * FROM media ORDER BY created_at DESC");
    if (rows && rows.length > 0) {
      return rows.map((m: any) => ({
        id: m.id,
        name: m.name,
        url: m.url,
        size: m.size || 0,
        type: m.type || "image/jpeg",
        dimensions: parseJson(m.dimensions, { width: 1200, height: 800 }),
        altText: m.alt_text || "",
        caption: m.caption || "",
        createdAt: m.created_at || new Date().toISOString(),
      }));
    }
  } catch (err) {
    console.warn("Wasmer MySQL getMediaItems failed:", err);
  }

  const db = getLocalData();
  return db.media.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveMediaItem(item: MediaItem): Promise<MediaItem> {
  try {
    await mysqlQuery(
      `INSERT INTO media (id, name, url, size, type, dimensions, alt_text, caption, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         url = VALUES(url),
         size = VALUES(size),
         type = VALUES(type),
         dimensions = VALUES(dimensions),
         alt_text = VALUES(alt_text),
         caption = VALUES(caption)`,
      [
        item.id,
        item.name,
        item.url,
        item.size || 0,
        item.type || "image/jpeg",
        JSON.stringify(item.dimensions || {}),
        item.altText || "",
        item.caption || "",
        item.createdAt || new Date().toISOString(),
      ]
    );
  } catch (err) {
    console.warn("Wasmer MySQL saveMediaItem failed:", err);
  }

  const db = getLocalData();
  const index = db.media.findIndex((m) => m.id === item.id);
  if (index >= 0) {
    db.media[index] = item;
  } else {
    db.media.unshift(item);
  }
  saveLocalData(db);
  return item;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  try {
    await mysqlExecute("DELETE FROM media WHERE id = ?", [id]);
  } catch (err) {
    console.warn("Wasmer MySQL deleteMediaItem failed:", err);
  }

  const db = getLocalData();
  db.media = db.media.filter((m) => m.id !== id);
  saveLocalData(db);
  return true;
}

// ------------------------------------------------------------------
// SITE SETTINGS
// ------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await mysqlQuery("SELECT settings FROM site_settings WHERE id = 'global_settings' LIMIT 1");
    if (rows && rows.length > 0) {
      return parseJson(rows[0].settings, initialSiteSettings);
    }
  } catch (err) {
    console.warn("Wasmer MySQL getSiteSettings failed:", err);
  }

  const db = getLocalData();
  return db.settings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  try {
    await mysqlQuery(
      `INSERT INTO site_settings (id, settings, updated_at)
       VALUES ('global_settings', ?, ?)
       ON DUPLICATE KEY UPDATE
         settings = VALUES(settings),
         updated_at = VALUES(updated_at)`,
      [JSON.stringify(settings), new Date().toISOString()]
    );
  } catch (err) {
    console.warn("Wasmer MySQL saveSiteSettings failed:", err);
  }

  const db = getLocalData();
  db.settings = settings;
  saveLocalData(db);
  return settings;
}

// ------------------------------------------------------------------
// DASHBOARD STATS
// ------------------------------------------------------------------
export async function getDashboardMetrics() {
  const projects = await getProjects();
  const pages = await getPages();
  const media = await getMediaItems();

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === "published").length;
  const draftProjects = projects.filter((p) => p.status === "draft").length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const totalPages = pages.length;
  const totalMedia = media.length;

  let seoPassingItems = 0;
  let totalSeoCheckItems = 0;

  projects.forEach((proj) => {
    totalSeoCheckItems += 6;
    if (proj.seo?.title) seoPassingItems++;
    if (proj.seo?.description) seoPassingItems++;
    if (proj.seo?.ogImage) seoPassingItems++;
    if (proj.geo?.summary) seoPassingItems++;
    if (proj.geo?.keyFacts?.length) seoPassingItems++;
    if (proj.geo?.faq?.length) seoPassingItems++;
  });

  const seoScore = totalSeoCheckItems > 0 ? Math.round((seoPassingItems / totalSeoCheckItems) * 100) : 95;

  return {
    totalProjects,
    publishedProjects,
    draftProjects,
    featuredProjects,
    totalPages,
    totalMedia,
    seoScore,
    recentProjects: projects.slice(0, 5),
  };
}
