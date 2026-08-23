import fs from "fs";
import path from "path";
import { Project, Page, MediaItem, SiteSettings, ServiceItem, SkillCategory, ExperienceItem, ProjectStatus } from "@/types";
import { initialProjects, initialServices, initialSkills, initialExperience, initialPages, initialSiteSettings } from "@/data/seed";
import { getSupabaseAdminClient, isSupabaseServerConfigured } from "@/lib/supabase/server";

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

// Ensure local db.json exists with initial seed
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

  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  } catch (error) {
    console.error("Could not write initial db.json:", error);
  }

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
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      let query = supabase.from("projects").select("*").order("display_order", { ascending: true });
      if (options?.status) query = query.eq("status", options.status);
      if (options?.category && options.category !== "All") query = query.eq("category", options.category);
      if (options?.featured !== undefined) query = query.eq("featured", options.featured);
      if (options?.limit) query = query.limit(options.limit);
      
      const { data, error } = await query;
      if (!error && data) {
        return data as unknown as Project[];
      }
    } catch (e) {
      console.warn("Supabase query failed, using local database fallback:", e);
    }
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
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) return data as unknown as Project;
    } catch (e) {
      console.warn("Supabase getProjectBySlug failed, falling back:", e);
    }
  }

  const db = getLocalData();
  return db.projects.find((p) => p.slug === slug) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) return data as unknown as Project;
    } catch (e) {
      console.warn("Supabase getProjectById failed, falling back:", e);
    }
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

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      await supabase.from("projects").upsert(projectToSave);
    } catch (e) {
      console.warn("Supabase saveProject failed, saving locally:", e);
    }
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
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      await supabase.from("projects").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase deleteProject failed, deleting locally:", e);
    }
  }

  const db = getLocalData();
  db.projects = db.projects.filter((p) => p.id !== id);
  saveLocalData(db);
  return true;
}

export async function reorderProjects(orderedIds: string[]): Promise<boolean> {
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
// PAGE & SECTIONS OPERATIONS
// ------------------------------------------------------------------
export async function getPages(): Promise<Page[]> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("pages").select("*");
      if (!error && data) return data as unknown as Page[];
    } catch (e) {
      console.warn("Supabase getPages failed:", e);
    }
  }

  const db = getLocalData();
  return db.pages;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const db = getLocalData();
  return db.pages.find((p) => p.slug === slug) || null;
}

export async function savePage(page: Page): Promise<Page> {
  const pageToSave: Page = {
    ...page,
    updatedAt: new Date().toISOString(),
  };

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      await supabase.from("pages").upsert(pageToSave);
    } catch (e) {
      console.warn("Supabase savePage failed:", e);
    }
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
  const db = getLocalData();
  return db.services.sort((a, b) => a.order - b.order);
}

export async function getSkills(): Promise<SkillCategory[]> {
  const db = getLocalData();
  return db.skills;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const db = getLocalData();
  return db.experience;
}

// ------------------------------------------------------------------
// MEDIA LIBRARY OPERATIONS
// ------------------------------------------------------------------
export async function getMediaItems(): Promise<MediaItem[]> {
  const db = getLocalData();
  return db.media.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveMediaItem(item: MediaItem): Promise<MediaItem> {
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
  const db = getLocalData();
  db.media = db.media.filter((m) => m.id !== id);
  saveLocalData(db);
  return true;
}

// ------------------------------------------------------------------
// SITE SETTINGS
// ------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", "global_settings").single();
      if (!error && data) return data as unknown as SiteSettings;
    } catch (e) {
      console.warn("Supabase getSiteSettings failed:", e);
    }
  }

  const db = getLocalData();
  return db.settings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      await supabase.from("site_settings").upsert({ id: "global_settings", ...settings });
    } catch (e) {
      console.warn("Supabase saveSiteSettings failed:", e);
    }
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
  const db = getLocalData();
  const totalProjects = db.projects.length;
  const publishedProjects = db.projects.filter((p) => p.status === "published").length;
  const draftProjects = db.projects.filter((p) => p.status === "draft").length;
  const featuredProjects = db.projects.filter((p) => p.featured).length;
  const totalPages = db.pages.length;
  const totalMedia = db.media.length;
  
  // Calculate SEO/GEO Readiness score
  let seoPassingItems = 0;
  let totalSeoCheckItems = 0;
  
  db.projects.forEach((proj) => {
    totalSeoCheckItems += 6;
    if (proj.seo.title) seoPassingItems++;
    if (proj.seo.description) seoPassingItems++;
    if (proj.seo.ogImage) seoPassingItems++;
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
    recentProjects: db.projects.slice(0, 5),
  };
}
