# LUXURY PERSONAL PORTFOLIO + CMS + SEO + AI + GEO
## MASTER DEVELOPMENT PROMPT

You are the lead architect, senior frontend engineer, backend engineer, CMS engineer, UX designer, motion designer, SEO engineer, and AI/GEO optimization specialist for my personal portfolio.

Build a complete production-ready luxury personal portfolio platform with:

- Premium public portfolio website
- Secure CMS/Admin panel
- Project management
- Media management
- SEO management
- AI-ready content architecture
- GEO / Generative Engine Optimization
- Analytics-ready architecture
- Responsive design
- High-performance animations
- Easy long-term maintenance

The website is not just a portfolio.

It is a **personal digital brand platform with a built-in CMS**.

---

# 1. PRIMARY GOAL

Create a website that presents me as a premium professional and makes potential clients immediately understand:

- who I am
- what I build
- what technologies I use
- what projects I have completed
- what services I provide
- how to contact me

The visual experience should feel like:

- premium architecture portfolio
- luxury automotive website
- Apple-style product presentation
- high-end creative studio
- modern editorial design
- award-quality creative development portfolio

Avoid generic developer portfolio templates.

---

# 2. CORE TECHNOLOGY

Use a modern but maintainable stack.

## Frontend

- Next.js 16.x
- React
- TypeScript
- App Router
- Tailwind CSS
- Motion for React
- Server Components by default
- Client Components only when necessary

## Backend / CMS

Use:

- Next.js server architecture
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage

The CMS must communicate with the same database/content architecture used by the public website.

Do NOT create unnecessary microservices.

Keep the system lightweight.

---

# 3. CMS ARCHITECTURE

The CMS is a CORE requirement.

Do not treat it as an optional future feature.

Create a secure `/admin` system.

The public website reads its content from the CMS/database.

The admin should allow me to update the website without editing source code.

---

# 4. ADMIN DASHBOARD

Create a premium but simple admin dashboard.

Sidebar:

Dashboard

Content
- Projects
- Pages
- Services
- Skills
- About
- Experience
- Testimonials
- Navigation

Media
- Media Library
- Uploads

SEO
- Global SEO
- Page SEO
- Project SEO
- Sitemap
- Robots
- Structured Data

AI
- AI Content Assistant
- AI Metadata Assistant
- AI Content Suggestions

Settings
- Site Settings
- Social Links
- Contact
- Analytics
- Admin Users

---

# 5. PROJECT CMS

This is the most important CMS module.

I must be able to:

- create project
- edit project
- delete project
- duplicate project
- publish project
- unpublish project
- save draft
- reorder projects
- mark featured
- change project category
- upload hero image
- upload gallery images
- add project video
- add project links
- edit description
- edit case study
- edit technologies
- add services
- add year
- add client when verified
- add role
- add project results when verified

Project structure:

```ts
{
  id: string
  slug: string
  title: string
  subtitle: string
  category: string
  year: string
  status: "draft" | "published"
  featured: boolean

  shortDescription: string
  description: string

  role: string

  technologies: string[]
  services: string[]

  heroImage: string
  thumbnailImage: string
  gallery: string[]

  liveUrl?: string
  githubUrl?: string

  caseStudy: {
    overview: string
    challenge: string
    solution: string
    process: string
    result: string
  }

  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage: string
  }

  geo: {
    entityType: string
    summary: string
    keyFacts: string[]
    faq: []
  }

  createdAt: string
  updatedAt: string
}
```

Do not hard-code project content into React components.

---

# 6. INITIAL PROJECTS

Create the initial project records for:

1. Alqadir Quran Academy
2. IDEA TECH CMS
3. PSCDC
4. Ziva
5. Ahtsham Ul Haq
6. IDEA TECH Maps Lead Extractor
7. MICO
8. Tazkira V2

Do not invent project facts.

Use editable placeholders where information is missing.

---

# 7. PAGE CMS

Create a CMS for static and landing pages.

I should be able to edit:

- Homepage
- About
- Services
- Contact
- other future pages

Each page should support:

- title
- slug
- sections
- content
- images
- CTA
- SEO settings
- Open Graph settings
- schema settings
- draft/published state

---

# 8. SECTION BUILDER

Create a lightweight section builder.

Do NOT create an unnecessarily complicated visual page builder.

Use reusable sections.

Possible sections:

- Hero
- Text Statement
- Featured Projects
- Project Grid
- Services
- Skills
- About
- Timeline
- Image + Text
- Gallery
- CTA
- Contact
- FAQ

Each section should have editable fields.

The admin should allow:

- enable/disable section
- reorder section
- edit content
- replace images
- change CTA
- publish/unpublish

---

# 9. MEDIA LIBRARY

Create a proper Media Library.

Features:

- upload image
- upload multiple images
- preview
- delete
- search
- filter
- alt text
- title
- caption
- description
- file size
- dimensions
- usage reference

Use Supabase Storage.

Images must be optimized for the public website.

---

# 10. SEO SYSTEM

SEO must be built into the CMS.

Create:

## Global SEO

- site title
- site description
- default keywords
- default OG image
- Twitter/X image
- favicon
- author
- canonical URL

## Page SEO

For each page:

- meta title
- meta description
- canonical
- robots
- OG title
- OG description
- OG image
- Twitter title
- Twitter description
- Twitter image

## Project SEO

Every project gets independent SEO settings.

The CMS should display a simple SEO preview.

Example:

```text
SEO Title
SEO Description
URL
Social Preview
```

---

# 11. TECHNICAL SEO

Implement:

- semantic HTML
- clean URLs
- canonical URLs
- sitemap.xml
- robots.txt
- proper headings
- image alt text
- Open Graph
- Twitter/X cards
- structured metadata
- proper internal linking
- breadcrumbs where appropriate
- 404 page
- redirects system
- noindex support for drafts
- noindex support for private pages

Published CMS content must automatically become indexable.

Draft content must not be indexed.

---

# 12. STRUCTURED DATA / SCHEMA

Implement JSON-LD where appropriate.

Possible schemas:

- Person
- WebSite
- WebPage
- CreativeWork
- Project / relevant CreativeWork subtype
- BreadcrumbList
- FAQPage where appropriate

Do not add fake schema information.

All structured data must reflect real visible content.

---

# 13. GEO — GENERATIVE ENGINE OPTIMIZATION

Treat GEO as a first-class feature.

Optimize the website so AI search and answer engines can better understand:

- who I am
- what I do
- what technologies I use
- what projects I created
- what services I provide
- what my areas of expertise are

Create content that is:

- clear
- factual
- structured
- entity-oriented
- easy to summarize
- internally linked
- semantically consistent

Use:

- clear headings
- descriptive project summaries
- concise answers
- structured FAQs
- relevant internal links
- consistent terminology
- structured metadata
- JSON-LD
- entity relationships

Do not keyword stuff.

Do not create spammy AI-generated content.

---

# 14. AI-READY CONTENT ARCHITECTURE

The content model must be optimized for AI understanding.

Important content entities:

```text
Person
Project
Technology
Service
Skill
Organization
Experience
Education
Location
```

Projects should be connected to:

- technologies
- services
- categories
- skills

This creates a structured content graph.

For example:

Person
→ created Project
→ uses Technology
→ provides Service
→ has Skill

Design the database so these relationships are explicit.

---

# 15. AI CONTENT ASSISTANT

Add an optional AI Assistant inside the CMS.

The AI assistant can help me:

- generate SEO title
- generate meta description
- improve project description
- create FAQ suggestions
- summarize project
- create Open Graph text
- identify missing metadata
- suggest internal links
- improve readability

IMPORTANT:

AI suggestions must NOT automatically publish.

Use:

```text
Generate
→ Review
→ Accept
→ Save
```

Never silently overwrite content.

---

# 16. AI SEO / GEO ASSISTANT

Create a CMS panel called:

AI Optimization

For each project, show:

SEO Score
Content Quality
GEO Readiness
Metadata Completeness
Structured Data Status

Example checklist:

```text
✓ SEO title
✓ Meta description
✓ Canonical
✓ OG image
✓ Alt text
✓ Project summary
✓ Technologies
✓ Services
✓ FAQ
✓ Structured data
✓ Internal links
```

The exact scoring system can be simple.

Do not pretend that an internal score guarantees Google ranking or AI visibility.

---

# 17. AI SEARCH FRIENDLY CONTENT

Create dedicated content structures for:

- project summary
- key facts
- FAQs
- technologies used
- services provided
- role
- year
- outcomes

These should be stored independently where appropriate rather than hidden only inside long prose.

Example:

```text
Key Facts

Project:
IDEA TECH CMS

Type:
CMS / Web Platform

Role:
Development

Technologies:
Next.js
React
TypeScript
...
```

This improves machine readability.

---

# 18. INTERNAL LINKING

Create automatic internal linking opportunities.

Examples:

Project
→ Technology

Project
→ Service

Project
→ Related Project

Service
→ Related Projects

Technology
→ Related Projects

This should help both users and search engines understand the website structure.

---

# 19. PERSONAL ENTITY / KNOWLEDGE STRUCTURE

Create a strong personal identity structure.

The website should clearly establish one consistent entity for me.

Use the same identity across:

- homepage
- About
- projects
- metadata
- schema
- social links
- author information

Avoid conflicting names, titles, descriptions, and roles.

---

# 20. ADMIN AUTHENTICATION

The admin panel must NOT be publicly accessible.

Use:

Supabase Auth

Requirements:

- secure login
- session handling
- protected routes
- logout
- password reset
- admin role checking

Do NOT store passwords manually in the database.

Do NOT expose Supabase service-role keys to the browser.

---

# 21. DATABASE SECURITY

Implement:

- Row Level Security
- authenticated admin access
- least-privilege permissions
- secure Storage policies

Public users should only be able to read published content.

Admins can create/edit/delete CMS content.

---

# 22. DRAFT / PUBLISH WORKFLOW

Every major CMS content type should support:

```text
Draft
Published
Archived
```

Include:

Save Draft

Publish

Unpublish

Delete

The public site must only show published content.

---

# 23. PREVIEW SYSTEM

Create:

Preview Project

Preview Page

Preview Changes

The admin should be able to view content before publishing.

---

# 24. VERSION / UPDATE INFORMATION

Store:

createdAt
updatedAt

Display:

Last updated

inside the admin.

Where useful, show updated dates on public case-study pages.

---

# 25. WEBSITE DESIGN

Continue the luxury visual direction from the original brief.

Use:

- near-black
- warm white
- sophisticated neutrals
- restrained accent
- premium typography
- large editorial layouts
- cinematic imagery

Animations:

- Motion for React
- text reveals
- image reveals
- stagger
- page transitions
- scroll interactions
- subtle parallax
- project transitions

Keep animations refined.

---

# 26. PERFORMANCE

The CMS must NOT make the public website slow.

Public website should prioritize:

- Server Components
- optimized images
- caching
- lazy loading
- minimal client JS
- static rendering where possible
- dynamic rendering only where required

Use appropriate Next.js caching/revalidation strategies.

---

# 27. CMS PERFORMANCE

Admin can be more interactive.

Use Client Components where required.

Do not load the entire CMS application on every public page.

Separate admin and public functionality.

---

# 28. PUBLIC WEBSITE ROUTES

Create:

```text
/
/work
/projects/[slug]
/about
/services
/contact
```

Admin:

```text
/admin
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/pages
/admin/media
/admin/seo
/admin/ai
/admin/settings
```

Protect all admin routes.

---

# 29. HOMEPAGE CONTENT

Homepage must be editable from CMS.

At minimum:

Hero
Intro statement
Featured projects
Services
Selected skills
About teaser
CTA
Footer

Do not hard-code these values.

---

# 30. PROJECT DETAIL EXPERIENCE

Each project should have a cinematic case-study page.

Structure:

Hero

Project Metadata

Overview

Challenge

Solution

Process

Technology

Gallery

Results

Related Projects

CTA

Only render sections that contain content.

---

# 31. ANALYTICS-READY

Prepare the architecture for analytics.

Allow future integration with:

- Google Analytics
- Google Search Console
- privacy-friendly analytics tools

Keep analytics configuration in settings/environment variables.

Do not hard-code tracking IDs into components.

---

# 32. SITEMAP AUTOMATION

The sitemap must automatically include:

- published pages
- published projects

Exclude:

- drafts
- archived projects
- admin routes
- private content

When a new project is published, it should automatically appear in the sitemap.

---

# 33. ROBOTS

Configure robots correctly.

Allow:

Public pages
Published project pages

Disallow:

Admin routes
Private CMS routes

Do not accidentally block search engines from public content.

---

# 34. EDITABILITY RULE

I should be able to change:

- project title
- images
- description
- technologies
- services
- SEO
- GEO content
- social links
- homepage sections
- About content
- services

without touching React source files.

This is a critical requirement.

---

# 35. NO LOCK-IN

Do not design the frontend so tightly around the CMS implementation that migrating later becomes difficult.

The UI should depend on a clean content/data layer.

Future migration should be possible to:

- Sanity
- Payload
- WordPress
- another headless CMS

without rebuilding the public website.

---

# 36. SECURITY

Do not expose:

- service role keys
- admin credentials
- private environment variables

Use `.env.local`.

Provide:

`.env.example`

Document required variables.

---

# 37. IMAGE SOURCING

For external/public project imagery:

Prioritize legitimate sources.

Do not fabricate project images.

Do not present stock images as actual project work.

Where project imagery is unavailable:

Use a clearly marked placeholder.

---

# 38. MOBILE ADMIN

The CMS should be usable on:

- desktop
- laptop
- tablet

Mobile admin should remain usable, but desktop can be the primary admin experience.

---

# 39. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- proper focus states
- image alt text
- accessible forms
- accessible navigation
- reduced-motion support

Respect:

`prefers-reduced-motion`

---

# 40. PROJECT SEARCH / FILTER

CMS:

Search projects
Filter by category
Filter by status
Filter by featured

Public site:

Optional project filtering by category.

Make this configurable.

---

# 41. DASHBOARD

Admin dashboard should show:

- total projects
- published projects
- draft projects
- pages
- media count
- SEO issues
- GEO issues
- recent updates

Do not create fake statistics.

Use actual database counts.

---

# 42. DESIGN SYSTEM

Centralize:

Colors
Typography
Spacing
Container widths
Border radius
Motion
Easing
Transitions
Breakpoints

Create reusable components.

---

# 43. PERFORMANCE TARGET

Aim for excellent Core Web Vitals.

Pay particular attention to:

- LCP
- CLS
- INP

Avoid giant unoptimized images.

Avoid excessive JavaScript.

Avoid unnecessary animation libraries.

---

# 44. DEPLOYMENT

Architecture should work well with modern Next.js hosting and Supabase.

Keep configuration deployment-friendly.

Provide:

`.env.example`

Document:

- database setup
- Supabase setup
- storage setup
- authentication setup
- deployment setup

---

# 45. DATABASE / MIGRATION

Create a clean database schema.

Suggested entities:

```text
users
profiles
projects
project_images
pages
page_sections
services
skills
technologies
categories
media
seo_metadata
faq_items
site_settings
navigation_items
social_links
```

Use relationships instead of duplicating the same information everywhere.

---

# 46. ADMIN CONTENT RELATIONSHIPS

Example:

Project
→ Category

Project
→ Technologies

Project
→ Services

Project
→ Images

Project
→ SEO metadata

Project
→ FAQ

Project
→ Related projects

This should be represented cleanly in the database.

---

# 47. CMS UX

The admin should feel professional.

Use:

- clean sidebar
- tables
- search
- filters
- forms
- image previews
- drag/drop ordering where useful
- autosave only where safe
- validation
- success/error feedback

Do not make the admin panel visually overcomplicated.

---

# 48. VALIDATION

Every CMS form must validate:

- required fields
- URLs
- image fields
- slug uniqueness
- SEO limits where appropriate

Display useful validation messages.

---

# 49. SLUG MANAGEMENT

Projects should use:

```text
/projects/[slug]
```

When changing a published slug:

Create a redirect from the previous slug to the new slug where possible.

Do not create broken project URLs.

---

# 50. CONTENT QUALITY

CMS should encourage useful content.

Do not create filler.

Do not create meaningless long-form AI text.

Prefer:

Clear
Specific
Useful
Human
Structured

content.

---

# 51. AI ASSISTANT SAFETY / QUALITY

AI generated suggestions must always be reviewable.

Never allow the AI to:

- invent clients
- invent achievements
- invent statistics
- invent certifications
- invent project results
- invent technologies

The AI should use existing CMS information as the primary context.

---

# 52. GEO CONTENT SYSTEM

For projects/pages, optionally create:

```text
Summary
Key Facts
FAQ
Entities
Related Technologies
Related Services
Related Projects
```

This content should support machine-readable understanding while remaining useful to human visitors.

---

# 53. FINAL ARCHITECTURE

Use this conceptual architecture:

```text
                    ┌────────────────────┐
                    │   PUBLIC WEBSITE   │
                    │      Next.js       │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │  CONTENT / SERVER  │
                    │   DATA ACCESS      │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ SUPABASE           │
                    │ PostgreSQL         │
                    │ Auth               │
                    │ Storage            │
                    └─────────┬──────────┘
                              ▲
                              │
                    ┌─────────┴──────────┐
                    │   ADMIN CMS        │
                    │   /admin           │
                    └────────────────────┘
```

AI services should connect through the secure server side, never expose private API keys in the browser.

---

# 54. DEVELOPMENT ORDER

Build in this order:

## Phase 1
Inspect current workspace.

Do not delete existing assets or unrelated projects.

## Phase 2
Create Next.js architecture.

## Phase 3
Create Supabase database architecture.

## Phase 4
Create authentication.

## Phase 5
Build CMS/Admin.

## Phase 6
Build content/data layer.

## Phase 7
Build luxury public website.

## Phase 8
Connect public website to CMS.

## Phase 9
Build project detail routes.

## Phase 10
Implement SEO.

## Phase 11
Implement GEO architecture.

## Phase 12
Implement AI assistant.

## Phase 13
Implement media system.

## Phase 14
Add animations and transitions.

## Phase 15
Responsive optimization.

## Phase 16
Performance optimization.

## Phase 17
Security review.

## Phase 18
Build and test.

---

# 55. FINAL TEST

Before completion run:

```bash
npm run lint
npm run build
```

Also test:

- admin login
- logout
- project creation
- project editing
- project deletion
- draft publishing
- image upload
- image replacement
- SEO editing
- GEO fields
- AI suggestions
- public project pages
- sitemap
- robots
- metadata
- responsive layouts
- animations
- accessibility
- broken links
- 404 page

Fix all errors.

---

# 56. MOST IMPORTANT REQUIREMENT

Do NOT build this as:

“a beautiful portfolio + fake CMS UI”.

Build a REAL application.

The CMS must actually save data.

The public website must actually read the CMS data.

Publishing a project in the CMS must make it available on the public website.

Editing a project must update the public website.

Uploading an image must store the image.

SEO metadata must be generated from CMS data.

Sitemap must reflect published content.

Admin routes must be protected.

AI suggestions must be reviewable.

---

# 57. FINAL CREATIVE DIRECTION

The final product should feel like:

**Luxury personal brand**
+
**creative portfolio**
+
**modern engineering**
+
**real CMS**
+
**SEO infrastructure**
+
**AI-ready content**
+
**GEO-ready knowledge structure**

The website should impress clients visually while the architecture remains clean, fast, secure, editable, scalable, and maintainable.

Start implementation now.

Do not wait for additional confirmation.

Where information is missing, use clearly marked editable placeholders rather than fabricated information.