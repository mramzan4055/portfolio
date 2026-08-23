-- ==========================================================
-- LUXURY PORTFOLIO & CMS — SUPABASE POSTGRESQL SCHEMA
-- Production Schema with Row Level Security (RLS) & Indexes
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  site_name TEXT NOT NULL,
  site_title TEXT NOT NULL,
  tagline TEXT,
  site_description TEXT,
  site_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_title TEXT NOT NULL,
  author_bio TEXT,
  author_location TEXT,
  author_email TEXT,
  author_phone TEXT,
  availability_status TEXT DEFAULT 'Available for Q1/Q2 Projects',
  social_links JSONB DEFAULT '{}'::jsonb,
  seo_config JSONB DEFAULT '{}'::jsonb,
  analytics_config JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  
  short_description TEXT,
  description TEXT,
  role TEXT,
  client TEXT,
  
  technologies TEXT[] DEFAULT '{}',
  services TEXT[] DEFAULT '{}',
  
  hero_image TEXT,
  thumbnail_image TEXT,
  gallery TEXT[] DEFAULT '{}',
  video_url TEXT,
  
  live_url TEXT,
  github_url TEXT,
  
  case_study JSONB DEFAULT '{}'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  geo JSONB DEFAULT '{}'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for project slug & status queries
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order ASC);

-- 3. PAGES TABLE
CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  sections JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  icon TEXT,
  deliverables TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  category_name TEXT NOT NULL,
  skills_data JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0
);

-- 6. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size BIGINT DEFAULT 0,
  type TEXT,
  dimensions JSONB,
  alt_text TEXT,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- Public READ policies (anyone can read published content and site metadata)
CREATE POLICY "Allow public read access on published projects"
  ON projects FOR SELECT
  USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on site_settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on pages"
  ON pages FOR SELECT
  USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on services"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on media_assets"
  ON media_assets FOR SELECT
  USING (true);

-- Authenticated Admin WRITE policies (only authenticated admin can insert/update/delete)
CREATE POLICY "Allow admin full access on site_settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on pages"
  ON pages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on skills"
  ON skills FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on media_assets"
  ON media_assets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. STORAGE BUCKET CONFIGURATION
-- Ensure storage bucket 'portfolio-media' exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for storage objects in 'portfolio-media'
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Authenticated upload access for 'portfolio-media'
CREATE POLICY "Authenticated users can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Authenticated users can delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-media');
