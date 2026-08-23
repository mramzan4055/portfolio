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

// ------------------------------------------------------------------
// HIGH-SPEED IN-MEMORY LOCAL-FIRST STORE
// ------------------------------------------------------------------
let memoryCache: DBData | null = null;

function getLocalData(): DBData {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const fileData = fs.readFileSync(DB_FILE_PATH, "utf-8");
      memoryCache = JSON.parse(fileData);
      return memoryCache!;
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

  memoryCache = initialData;
  return initialData;
}

function saveLocalData(data: DBData): void {
  memoryCache = data;
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
// PROJECT OPERATIONS (Instant local resolution + Async remote sync)
// ------------------------------------------------------------------
export async function getProjects(options?: {
  status?: ProjectStatus;
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  const db = getLocalData();
  let result = [...(db.projects || [])];

  if (options?.status) {
    result = result.filter((p) => p.status === options.status);
  }
  if (options?.category && options.category !== "All") {
    result = result.filter((p) => (p.category || "").toLowerCase().includes(options.category!.toLowerCase()));
  }
  if (options?.featured !== undefined) {
    result = result.filter((p) => p.featured === options.featured);
  }

  result.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (options?.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = getLocalData();
  return (db.projects || []).find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = getLocalData();
  return (db.projects || []).find((p) => p.id === id) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  const projectToSave: Project = {
    ...project,
    updatedAt: new Date().toISOString(),
    createdAt: project.createdAt || new Date().toISOString(),
  };

  const db = getLocalData();
  const index = (db.projects || []).findIndex((p) => p.id === projectToSave.id);
  if (index >= 0) {
    db.projects[index] = projectToSave;
  } else {
    db.projects.push(projectToSave);
  }
  saveLocalData(db);

  // Background asynchronous sync to Wasmer MySQL
  mysqlQuery(
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
  ).catch((err) => {
    console.warn("Async Wasmer MySQL saveProject failed (persisted in local DB):", err);
  });

  return projectToSave;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = getLocalData();
  db.projects = (db.projects || []).filter((p) => p.id !== id);
  saveLocalData(db);

  // Background async sync
  mysqlExecute("DELETE FROM projects WHERE id = ?", [id]).catch((err) => {
    console.warn("Async Wasmer MySQL deleteProject failed:", err);
  });

  return true;
}

export async function reorderProjects(orderedIds: string[]): Promise<boolean> {
  const db = getLocalData();
  orderedIds.forEach((id, index) => {
    const project = (db.projects || []).find((p) => p.id === id);
    if (project) {
      project.order = index + 1;
    }
  });
  db.projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  saveLocalData(db);

  // Background async sync
  (async () => {
    for (let index = 0; index < orderedIds.length; index++) {
      await mysqlExecute("UPDATE projects SET display_order = ? WHERE id = ?", [index + 1, orderedIds[index]]);
    }
  })().catch((err) => {
    console.warn("Async Wasmer MySQL reorderProjects failed:", err);
  });

  return true;
}

// ------------------------------------------------------------------
// PAGE OPERATIONS
// ------------------------------------------------------------------
export async function getPages(): Promise<Page[]> {
  const db = getLocalData();
  return db.pages || [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const db = getLocalData();
  return (db.pages || []).find((p) => p.slug === slug) || null;
}

export async function savePage(page: Page): Promise<Page> {
  const pageToSave: Page = {
    ...page,
    updatedAt: new Date().toISOString(),
  };

  const db = getLocalData();
  const index = (db.pages || []).findIndex((p) => p.id === pageToSave.id);
  if (index >= 0) {
    db.pages[index] = pageToSave;
  } else {
    db.pages.push(pageToSave);
  }
  saveLocalData(db);

  // Async MySQL sync
  mysqlQuery(
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
  ).catch((err) => {
    console.warn("Async Wasmer MySQL savePage failed:", err);
  });

  return pageToSave;
}

// ------------------------------------------------------------------
// SERVICES & SKILLS & EXPERIENCE
// ------------------------------------------------------------------
export async function getServices(): Promise<ServiceItem[]> {
  const db = getLocalData();
  return [...(db.services || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const db = getLocalData();
  return (db.services || []).find((s) => s.slug === slug) || null;
}


export async function getSkills(): Promise<SkillCategory[]> {
  const db = getLocalData();
  return db.skills || [];
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const db = getLocalData();
  return db.experience || [];
}

// ------------------------------------------------------------------
// MEDIA LIBRARY OPERATIONS
// ------------------------------------------------------------------
export async function getMediaItems(): Promise<MediaItem[]> {
  const db = getLocalData();
  return [...(db.media || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveMediaItem(item: MediaItem): Promise<MediaItem> {
  const db = getLocalData();
  const index = (db.media || []).findIndex((m) => m.id === item.id);
  if (index >= 0) {
    db.media[index] = item;
  } else {
    db.media.unshift(item);
  }
  saveLocalData(db);

  // Async MySQL sync
  mysqlQuery(
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
  ).catch((err) => {
    console.warn("Async Wasmer MySQL saveMediaItem failed:", err);
  });

  return item;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const db = getLocalData();
  db.media = (db.media || []).filter((m) => m.id !== id);
  saveLocalData(db);

  mysqlExecute("DELETE FROM media WHERE id = ?", [id]).catch((err) => {
    console.warn("Async Wasmer MySQL deleteMediaItem failed:", err);
  });

  return true;
}

// ------------------------------------------------------------------
// SITE SETTINGS
// ------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const db = getLocalData();
  return db.settings || initialSiteSettings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const db = getLocalData();
  db.settings = settings;
  saveLocalData(db);

  // Async MySQL sync
  mysqlQuery(
    `INSERT INTO site_settings (id, settings, updated_at)
     VALUES ('global_settings', ?, ?)
     ON DUPLICATE KEY UPDATE
       settings = VALUES(settings),
       updated_at = VALUES(updated_at)`,
    [JSON.stringify(settings), new Date().toISOString()]
  ).catch((err) => {
    console.warn("Async Wasmer MySQL saveSiteSettings failed:", err);
  });

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
