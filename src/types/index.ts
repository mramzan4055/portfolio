export type ProjectStatus = "draft" | "published" | "archived";

export interface CaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  process: string;
  result: string;
}

export interface ProjectSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProjectGEO {
  entityType: string;
  summary: string;
  keyFacts: string[];
  faq: FAQItem[];
  primaryEntity: string;
  targetAudience: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;

  shortDescription: string;
  description: string;
  role: string;
  client?: string;

  technologies: string[];
  services: string[];

  heroImage: string;
  thumbnailImage: string;
  gallery: string[];
  videoUrl?: string;

  liveUrl?: string;
  githubUrl?: string;

  caseStudy: CaseStudy;
  seo: ProjectSEO;
  geo: ProjectGEO;

  metrics?: {
    label: string;
    value: string;
  }[];

  createdAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  type: 
    | "hero" 
    | "statement" 
    | "featured_projects" 
    | "services" 
    | "skills" 
    | "about" 
    | "gallery" 
    | "cta" 
    | "contact" 
    | "faq"
    | "custom";
  title: string;
  subtitle?: string;
  content?: string;
  enabled: boolean;
  order: number;
  data?: Record<string, any>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "draft" | "published";
  sections: PageSection[];
  seo: ProjectSEO;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  dimensions?: {
    width: number;
    height: number;
  };
  altText: string;
  caption?: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  deliverables: string[];
  technologies: string[];
  featured: boolean;
  order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface SiteSettings {
  siteName: string;
  siteTitle: string;
  tagline: string;
  siteDescription: string;
  siteUrl: string;
  authorName: string;
  authorTitle: string;
  authorBio: string;
  authorLocation: string;
  authorEmail: string;
  authorPhone?: string;
  availabilityStatus: "Available for Q1/Q2 Projects" | "Available for Projects" | "Selectively Available" | "Open to Work" | "Booked";
  
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
  };

  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultKeywords: string[];
    defaultOgImage: string;
    twitterHandle?: string;
  };

  analytics: {
    googleAnalyticsId?: string;
    googleSearchConsoleId?: string;
  };
}

export interface AIAnalysisResult {
  seoScore: number;
  geoScore: number;
  readabilityScore: number;
  checklist: {
    item: string;
    status: "pass" | "warn" | "fail";
    message: string;
  }[];
  suggestions: string[];
}
