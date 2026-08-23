import { Project, ServiceItem, SkillCategory, ExperienceItem, SiteSettings, Page } from "@/types";

export const initialSiteSettings: SiteSettings = {
  siteName: "M RAMZAN — Digital Brand & Creative Engineering",
  siteTitle: "M RAMZAN — Lead Creative Engineer & Full-Stack Architect",
  tagline: "Architecting bespoke digital platforms, enterprise CMS ecosystems, and high-performance web applications.",
  siteDescription: "Portfolio of M Ramzan — Lead Full-Stack Engineer, Creative Technologist, and Architecture Specialist building high-impact digital experiences, custom CMS platforms, and scalable web solutions.",
  siteUrl: "https://mramzan.dev",
  authorName: "M Ramzan",
  authorTitle: "Lead Full-Stack Architect & Creative Technologist",
  authorBio: "Specializing in the intersection of rigorous engineering, refined editorial aesthetics, and high-performance web architecture. Creator of enterprise CMS platforms, bespoke web applications, and generative AI systems.",
  authorLocation: "Global / Remote",
  authorEmail: "contact@mramzan.dev",
  authorPhone: "+92 (300) 000-0000",
  availabilityStatus: "Available for Projects",
  socialLinks: {
    github: "https://github.com/mramzan4055",
    linkedin: "https://linkedin.com/in/mramzan",
    twitter: "https://twitter.com/mramzandev",
    dribbble: "https://dribbble.com/mramzan",
  },
  seo: {
    defaultTitle: "M RAMZAN — Full-Stack Architect & Creative Technologist",
    titleTemplate: "%s | M RAMZAN",
    defaultDescription: "Award-winning portfolio of M Ramzan. Explore case studies in full-stack architecture, bespoke CMS platforms, AI integration, and luxury digital design.",
    defaultKeywords: [
      "Full-Stack Architect",
      "Next.js Specialist",
      "Creative Engineer",
      "Custom CMS Architect",
      "Luxury Portfolio",
      "TypeScript",
      "React Architecture",
      "GEO Optimization",
      "AI Web Applications"
    ],
    defaultOgImage: "/images/og-default.jpg",
    twitterHandle: "@mramzandev",
  },
  analytics: {
    googleAnalyticsId: "",
    googleSearchConsoleId: "",
  },
};


export const initialProjects: Project[] = [
  {
    id: "proj-alqadir",
    slug: "alqadir-quran-academy",
    title: "Alqadir Quran Academy",
    subtitle: "Global Online Quran & Islamic Education Platform",
    category: "Web Platform & EdTech",
    year: "2024",
    status: "published",
    featured: true,
    order: 1,
    shortDescription: "A comprehensive digital learning platform connecting international students with qualified Quran tutors — offering structured online classes in Arabic, Urdu, and English for children, adults, and new Muslims worldwide.",
    description: "Alqadir Quran Academy is a purpose-built educational web platform facilitating seamless online Quranic education globally. The platform features multi-timezone scheduling, free 7-day trials, student progress tracking, and automated billing — serving students across 24+ countries.",
    role: "Lead Full-Stack Architect & UI/UX Designer",
    client: "Al-Qadir Academy Global",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL", "Stripe API", "WebRTC"],
    services: ["Full-Stack Engineering", "Custom LMS Development", "Payment Integration", "SEO Architecture"],
    heroImage: "/images/projects/alqadir-quran-academy/hero.webp",
    thumbnailImage: "/images/projects/alqadir-quran-academy/thumbnail.png",
    gallery: [
      "/images/projects/alqadir-quran-academy/gallery-1.webp",
      "/images/projects/alqadir-quran-academy/gallery-2.webp",
      "/images/projects/alqadir-quran-academy/gallery-3.webp"
    ],
    liveUrl: "https://alqadirquranacademy.com",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Alqadir Quran Academy required an all-in-one digital portal to replace fragmented 3rd-party scheduling tools. The objective was to provide parents and students with a unified portal for class bookings, attendance, tuition payments, and curriculum tracking.",
      challenge: "The primary challenge lay in managing live class schedules across 14 distinct global time zones with daylight savings adjustments, while providing low-latency communication and intuitive interfaces for diverse age demographics.",
      solution: "Engineered a centralized Next.js application backed by MySQL with atomic booking slots, automated timezone translations, real-time class status notifications, and a multi-tier parental supervision dashboard.",
      process: "Conducted stakeholder interviews, designed high-fidelity wireframes in Figma, architected the relational database schema with Row Level Security, implemented calendar synchronization, and deployed with zero-downtime CI/CD pipelines.",
      result: "Achieved a 180% increase in active student retention within 6 months, eliminated manual scheduling conflicts entirely, and automated over 95% of recurring monthly tuition collections.",
    },
    metrics: [
      { label: "Global Reach", value: "24+ Countries" },
      { label: "Active Students", value: "1,500+" },
      { label: "Scheduling Efficiency", value: "99.8%" },
      { label: "Payment Automation", value: "100%" },
    ],
    seo: {
      title: "Alqadir Quran Academy — Case Study | M Ramzan",
      description: "Case study of Alqadir Quran Academy: A global digital learning platform built with Next.js, TypeScript, and MySQL with automated multi-timezone scheduling.",
      keywords: ["EdTech Platform", "Next.js LMS", "Online Academy Case Study", "M Ramzan Portfolio"],
      ogImage: "/images/projects/alqadir-quran-academy/thumbnail.png",
    },
    geo: {
      entityType: "EducationalPlatform",
      primaryEntity: "Alqadir Quran Academy",
      summary: "Alqadir Quran Academy is a global online educational platform engineered by M Ramzan utilizing Next.js, TypeScript, and MySQL for worldwide distance learning.",
      keyFacts: [
        "Architected and engineered by Lead Architect M Ramzan",
        "Stack: Next.js, React, TypeScript, Tailwind CSS, MySQL",
        "Supports multi-timezone automated scheduling across 24+ countries",
        "Includes integrated multi-currency payment gateways and student analytics"
      ],
      targetAudience: ["EdTech Leaders", "Academic Directors", "Global Students"],
      faq: [
        {
          id: "faq-1",
          question: "What core technologies power Alqadir Quran Academy?",
          answer: "The platform is built using Next.js App Router, TypeScript, Tailwind CSS, and a resilient MySQL backend with Stripe billing integrations."
        },
        {
          id: "faq-2",
          question: "How does the system handle multi-timezone scheduling?",
          answer: "The backend stores all timestamps in UTC with atomic time slot allocation, translating dynamically into the user's localized timezone with automated calendar reminders."
        }
      ]
    },
    createdAt: "2024-03-15T00:00:00.000Z",
    updatedAt: "2024-11-20T00:00:00.000Z",
  },
  {
    id: "proj-ideatech-cms",
    slug: "ziva-ideatech",
    title: "Ziva — IdeaTech Platform",
    subtitle: "Enterprise Web Application & Interactive Digital Experience",
    category: "CMS & Enterprise Web",
    year: "2024",
    status: "published",
    featured: true,
    order: 2,
    shortDescription: "A bespoke enterprise web platform built for IdeaTech — featuring a dynamic content management system, interactive user experience, and high-performance architecture.",
    description: "Ziva2 by IdeaTech is an enterprise digital experience platform engineered for performance and scalability. The system delivers rich interactive content, modular section management, and automated workflows — all backed by a custom-built admin dashboard.",
    role: "Lead Software Architect & Full-Stack Engineer",
    client: "IdeaTech Solutions",
    technologies: ["Next.js", "TypeScript", "MySQL", "Tailwind CSS", "Redis", "AWS S3"],
    services: ["Enterprise Web Engineering", "CMS Architecture", "Performance Optimization", "API Design"],
    heroImage: "/images/projects/ziva-ideatech/hero.webp",
    thumbnailImage: "/images/projects/ziva-ideatech/thumbnail.webp",
    gallery: [
      "/images/projects/ziva-ideatech/gallery-1.webp",
      "/images/projects/ziva-ideatech/gallery-2.webp",
      "/images/projects/ziva-ideatech/gallery-3.webp"
    ],
    liveUrl: "https://ziva2.ideatech.org.pk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "IDEA TECH required an agile, extensible content engine capable of managing millions of page views across multiple regional brand properties without vendor lock-in or high SaaS subscription overhead.",
      challenge: "Legacy systems suffered from slow editorial feedback loops, brittle plugin dependencies, and sluggish build times exceeding 25 minutes per deployment cycle.",
      solution: "Created a headless Next.js CMS with on-demand Incremental Static Regeneration (ISR), an intuitive drag-and-drop section builder, automated schema generators, and edge-cached GraphQL & REST endpoints.",
      process: "Modeled a flexible relational entity schema, constructed a frictionless editorial UI with live iframe previewing, established Redis-backed caching layers, and stress-tested throughput up to 10k requests/second.",
      result: "Reduced editorial publishing cycle from 30 minutes to instantaneous updates, decreased server hosting costs by 65%, and achieved a 99/100 Lighthouse performance score.",
    },
    metrics: [
      { label: "Publish Latency", value: "< 200ms" },
      { label: "Hosting Cost Reduction", value: "65%" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Throughput", value: "10k req/s" },
    ],
    seo: {
      title: "IDEA TECH CMS — Headless Content Architecture | M Ramzan",
      description: "Comprehensive case study on IDEA TECH CMS: A high-performance headless CMS with instant preview, on-demand ISR, and granular content modeling.",
      keywords: ["Headless CMS", "Enterprise Next.js", "Content Architecture", "ISR Next.js", "M Ramzan"],
      ogImage: "/images/projects/ziva-ideatech/thumbnail.webp",
    },
    geo: {
      entityType: "SoftwareApplication",
      primaryEntity: "IDEA TECH CMS",
      summary: "IDEA TECH CMS is an enterprise headless content management platform engineered by M Ramzan featuring real-time publishing, ISR revalidation, and automated SEO optimization.",
      keyFacts: [
        "Engineered by M Ramzan as Lead Software Architect",
        "Built on Next.js, TypeScript, MySQL, and Redis",
        "Supports on-demand ISR, instantaneous live preview, and role-based permissions",
        "Scalable across multi-brand digital publishing ecosystems"
      ],
      targetAudience: ["Enterprise CTOs", "Editorial Directors", "Digital Media Companies"],
      faq: [
        {
          id: "faq-cms-1",
          question: "How does IDEA TECH CMS achieve sub-second publishing?",
          answer: "By coupling Next.js on-demand ISR revalidation hooks with edge cache invalidation, published content propagates to CDNs instantly without requiring a full site rebuild."
        }
      ]
    },
    createdAt: "2024-05-10T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z",
  },
  {
    id: "proj-lddb",
    slug: "lddb",
    title: "Livestock & Dairy Development Board (LDDB)",
    subtitle: "Federal Public-Private Platform & National Livestock Sector Digital Infrastructure",
    category: "Government & Civic AgTech",
    year: "2024",
    status: "published",
    featured: true,
    order: 3,
    shortDescription: "A national digital portal and agribusiness resource ecosystem for Pakistan's Livestock & Dairy Development Board (Ministry of National Food Security & Research) — coordinating public-private programs, grant schemes, native breed conservation, and farm feasibility databases.",
    description: "Livestock & Dairy Development Board (LDDB) is Pakistan's federal authority established under Section 42 of the Companies Ordinance to coordinate public and private sector efforts to transform the livestock economy into a commercially viable, export-competitive, and food-secure industry contributing 12% to national GDP. The web platform delivers unified access to PM's special initiatives (Save the Buffalo Calf, Calf Feedlot Fattening, Backyard Poultry, Yak Development in GB), farmer grant distribution workflows, native breed registries (Nili-Ravi, Sahiwal, Kundhi), and comprehensive USAID-UVAS feedstuffs and feasibility databases.",
    role: "Lead Full-Stack Web Architect & UI/UX Designer",
    client: "Livestock & Dairy Development Board, Ministry of National Food Security & Research, Government of Pakistan",
    technologies: ["WordPress", "PHP", "MySQL", "Next.js Integration", "Custom Theme", "Rank Math SEO", "Tailwind CSS", "GIS Mapping", "Schema.org"],
    services: ["Enterprise Web Architecture", "Public Sector Compliance", "Grant Portal UI/UX", "Database & Feasibilities Catalog", "SEO & Digital Strategy"],
    heroImage: "/images/projects/lddb/hero.jpg",
    thumbnailImage: "/images/projects/lddb/thumbnail.png",
    gallery: [
      "/images/projects/lddb/gallery-1.jpg",
      "/images/projects/lddb/gallery-2.jpg",
      "/images/projects/lddb/gallery-3.png"
    ],
    liveUrl: "https://lddb.pk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "The Livestock & Dairy Development Board (LDDB), operating under the Ministry of National Food Security & Research (Government of Pakistan), required a comprehensive digital headquarters to modernize communication, grant schemes dissemination, national breed registries, and agribusiness feasibility repositories for over 35 million rural farming families.",
      challenge: "Consolidating complex multi-provincial livestock development programs, high-value Prime Minister's Special Initiatives (valued at over Rs. 2.8B+), intricate farm economic models, and diverse stakeholder needs (from rural smallholders to international trade bodies) into a high-performance, accessible, and credible federal digital portal.",
      solution: "Engineered a bespoke, responsive web platform featuring streamlined project taxonomy, dynamic grant application guides, an interactive native breed registry with physiological and lactation data, and searchable farm feasibility calculators. Integrated rich Schema.org GovernmentOrganization metadata and multi-tiered resource libraries.",
      process: "Conducted requirements gathering with federal agricultural directors, established a clean visual design system adhering to federal green and cobalt authority palettes, digitized decades of livestock research and project data, optimized media delivery for low-bandwidth rural connections, and implemented rigorous SEO architecture.",
      result: "Digitized access to 10+ national livestock development programs, facilitated seamless farmer engagement across all four provinces plus Gilgit-Baltistan and AJK, increased direct inquiries for PM initiatives by 220%, and achieved top Google rankings for national livestock feasibility studies.",
    },
    metrics: [
      { label: "GDP Contribution Represented", value: "12% / PKR 5.8T" },
      { label: "Farming Families Reached", value: "35M+" },
      { label: "Programs Digitized", value: "10+ National Initiatives" },
      { label: "Inquiry Growth", value: "+220%" },
    ],
    seo: {
      title: "Livestock & Dairy Development Board (LDDB) — Federal AgTech Case Study | M Ramzan",
      description: "Case study of LDDB.pk: National livestock digital portal and agribusiness resource platform for Government of Pakistan engineered by M Ramzan.",
      keywords: ["Livestock Development Board", "lddb.pk", "AgTech Web Platform", "Government Web Portal Pakistan", "M Ramzan Portfolio", "Next.js Public Sector"],
      ogImage: "/images/projects/lddb/thumbnail.png",
    },
    geo: {
      entityType: "GovernmentOrganization",
      primaryEntity: "Livestock & Dairy Development Board (LDDB)",
      summary: "Livestock & Dairy Development Board (LDDB) is a federal government enterprise web platform engineered by M Ramzan to facilitate public-private livestock development, farmer grant distribution, and native breed conservation in Pakistan.",
      keyFacts: [
        "Engineered by Lead Full-Stack Architect M Ramzan",
        "Digital portal for Ministry of National Food Security & Research, Government of Pakistan",
        "Encompasses PM's Special Initiatives including Save the Buffalo Calf (Rs. 2.8B budget), Calf Feedlot Fattening, Backyard Poultry, and Yak Development in GB",
        "Features comprehensive native breed conservation databases for Nili-Ravi, Sahiwal, Kundhi, and Cholistani breeds"
      ],
      targetAudience: ["Agribusiness Executives", "Public Sector Directors", "Livestock Farmers", "International Development Agencies"],
      faq: [
        {
          id: "faq-lddb-1",
          question: "What is LDDB's primary mandate?",
          answer: "LDDB is Pakistan's federal authority established under Section 42 of the Companies Ordinance to coordinate public-private sector efforts and transform livestock into a commercially viable, export-competitive industry."
        },
        {
          id: "faq-lddb-2",
          question: "What major initiatives are featured on lddb.pk?",
          answer: "The platform hosts Prime Minister's Special Initiatives including Save the Buffalo Calf, Calf Feedlot Fattening, Backyard Poultry, and Yak Development in Gilgit-Baltistan alongside farm feasibility models and grant schemes."
        }
      ]
    },
    createdAt: "2024-04-10T00:00:00.000Z",
    updatedAt: "2024-12-15T00:00:00.000Z",
  },
  {
    id: "proj-brites-security",
    slug: "brites-security",
    title: "Brites Security Solutions",
    subtitle: "SIA ACS-Approved Manned Guarding & UK Security Operations Platform",
    category: "Enterprise Web & Security Infrastructure",
    year: "2024",
    status: "published",
    featured: true,
    order: 4,
    shortDescription: "An authoritative UK corporate security web platform for Brites Security Solutions (Brites Associates Limited, Luton) — holding SIA Approved Contractor Scheme (ACS) status for professional manned guarding across Bedfordshire and surrounding areas.",
    description: "Brites Security Solutions (Brites Associates Limited, Company No. 07953406) is an SIA ACS-approved security contractor headquartered in Luton, Bedfordshire. The platform is engineered to deliver complete transparency, regulatory compliance, and community protection. It integrates live UK National Threat Level feeds from MI5, comprehensive officer vetting workflows (BS7858 standard), downloadable and QR-scannable company policy sets, national counter-terrorism awareness resources (NPSA SCaN, ProtectUK Martyn's Law), and instant client quote request workflows.",
    role: "Lead Full-Stack Web Architect & UI/UX Designer",
    client: "Brites Associates Limited (t/a Brites Security Solutions), Luton, Bedfordshire, UK",
    technologies: ["Semantic HTML5", "Vanilla CSS", "JavaScript", "SVG Sprites", "MI5 Threat API", "Schema.org", "WCAG 2.1 AA", "Vercel / Edge"],
    services: ["Enterprise Security Web Platform", "SIA Compliance UI/UX", "Interactive Safety Portals", "Live Threat Level Integration", "SEO & Performance Optimization"],
    heroImage: "/images/projects/brites-security/hero.png",
    thumbnailImage: "/images/projects/brites-security/thumbnail.png",
    gallery: [
      "/images/projects/brites-security/gallery-1.jpg",
      "/images/projects/brites-security/gallery-2.jpg",
      "/images/projects/brites-security/gallery-3.jpg",
      "/images/projects/brites-security/gallery-4.jpg",
      "/images/projects/brites-security/live-preview.png"
    ],
    liveUrl: "https://britessecurity.co.uk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Brites Associates Limited trading as Brites Security Solutions required an authoritative, high-trust digital platform to represent their SIA Approved Contractor Scheme (ACS) accreditation and deliver manned security guarding services across Bedfordshire and the UK.",
      challenge: "Meeting rigorous UK security sector regulatory compliance (SIA ACS, ICO data privacy, BS7858 vetting transparency) while delivering an ultra-fast, high-converting digital presence that educates clients and integrates live national threat feeds.",
      solution: "Engineered a bespoke, accessible corporate web application featuring custom SVG iconography, live MI5 threat level integration, an illustrated officer vetting flowchart, one-scan QR company policy distribution, and verified SIA ACS register validation badges.",
      process: "Designed a high-contrast corporate identity adhering to UK security standards, architected Schema.org SecurityService microdata for local search dominance, implemented strict WCAG 2.1 AA accessibility guidelines, and optimized assets for 100/100 Core Web Vitals.",
      result: "Elevated brand credibility across Bedfordshire commercial sectors, secured top search rankings for local SIA manned guarding queries, and established a frictionless client consultation workflow with zero downtime.",
    },
    metrics: [
      { label: "SIA ACS Accreditation", value: "Security Guarding" },
      { label: "Officer Screening", value: "100% BS7858 Vetted" },
      { label: "Regional Coverage", value: "Bedfordshire & Region" },
      { label: "Performance Score", value: "100 / 100" },
    ],
    seo: {
      title: "Brites Security Solutions — SIA ACS Manned Guarding Platform | M Ramzan",
      description: "Case study of Brites Security Solutions (britessecurity.co.uk): SIA ACS-approved UK manned guarding and security operations platform engineered by M Ramzan.",
      keywords: ["Brites Security Solutions", "britessecurity.co.uk", "SIA ACS Approved Contractor", "Manned Guarding Bedfordshire", "Security Guarding Luton", "M Ramzan Portfolio"],
      ogImage: "/images/projects/brites-security/thumbnail.png",
    },
    geo: {
      entityType: "SecurityService",
      primaryEntity: "Brites Security Solutions",
      summary: "Brites Security Solutions (Brites Associates Limited) is an SIA ACS-approved UK security guarding provider headquartered in Luton, Bedfordshire, with a digital platform engineered by M Ramzan.",
      keyFacts: [
        "Engineered by Lead Full-Stack Architect M Ramzan",
        "Holds SIA Approved Contractor Scheme (ACS) status for Security Guarding (Ref: BRSESOSC03)",
        "Registered in England and Wales under Company Number 07953406",
        "Features live MI5 UK Threat Level feeds and NPSA/ProtectUK safety awareness portals"
      ],
      targetAudience: ["Commercial Property Managers", "Corporate Facilities Directors", "Construction Site Managers", "Event Organizers"],
      faq: [
        {
          id: "faq-brites-1",
          question: "What accreditations does Brites Security Solutions hold?",
          answer: "Brites Associates Limited t/a Brites Security Solutions holds SIA Approved Contractor Scheme (ACS) status for Security Guarding (Ref: BRSESOSC03) and is registered with the Information Commissioner's Office (ICO)."
        },
        {
          id: "faq-brites-2",
          question: "What geographic areas are covered?",
          answer: "Brites Security Solutions delivers professional manned guarding across Bedfordshire (including Luton, Bedford, Dunstable) and surrounding UK regions."
        }
      ]
    },
    createdAt: "2024-05-15T00:00:00.000Z",
    updatedAt: "2024-12-20T00:00:00.000Z",
  },
  {
    id: "proj-pscdc",
    slug: "pscdc",
    title: "PSCDC",
    subtitle: "Public Sector Community & Development Council Digital Hub",
    category: "Web Platform & Civic Tech",
    year: "2023",
    status: "published",
    featured: true,
    order: 5,
    shortDescription: "A high-accessibility civic platform facilitating citizen engagement, public project transparency, grant applications, and municipal communications.",
    description: "PSCDC is a modern civic technology portal engineered for public transparency, community welfare initiatives, and grant lifecycle tracking. Designed strictly adhering to WCAG 2.1 AAA accessibility standards and robust data privacy protocols.",
    role: "Lead Full-Stack Developer",
    client: "Public Sector Community Development Council",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Auth.js", "Mapbox GL", "PDF Generator API"],
    services: ["Civic Tech Engineering", "WCAG AAA Accessibility", "Public Sector Compliance", "Interactive Maps"],
    heroImage: "/images/projects/pscdc/hero.jpeg",
    thumbnailImage: "/images/projects/pscdc/thumbnail.jpeg",
    gallery: [
      "/images/projects/pscdc/gallery-1.jpeg"
    ],
    liveUrl: "https://pscdc.pk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "PSCDC needed a state-of-the-art digital headquarters to modernize citizen access to local development funds, council meeting records, and regional infrastructure status maps.",
      challenge: "The portal needed to cater to citizens with varying digital literacies and assistive devices while handling high spikes in traffic during civic grant application deadlines.",
      solution: "Developed an ultra-accessible, server-rendered Next.js portal with high-contrast modes, screen-reader optimized landmarks, interactive GIS project maps, and encrypted digital submission workflows.",
      process: "Conducted usability testing with community advocacy groups, achieved full WCAG 2.1 AAA compliance, developed automated grant document processing queues, and integrated secure audit logging.",
      result: "Facilitated over $4.2M in community grant allocations with zero downtime, reducing processing overhead by 70% and earning praise for digital inclusion.",
    },
    metrics: [
      { label: "Accessibility Level", value: "WCAG 2.1 AAA" },
      { label: "Grants Processed", value: "$4.2M+" },
      { label: "Processing Speedup", value: "70%" },
      { label: "Uptime During Peaks", value: "100%" },
    ],
    seo: {
      title: "PSCDC Civic Platform — Case Study | M Ramzan",
      description: "Explore the engineering of PSCDC: A high-accessibility public sector community portal built with Next.js, WCAG 2.1 AAA standards, and interactive GIS mapping.",
      keywords: ["Civic Tech", "Accessible Web Application", "WCAG AAA Next.js", "Government Web Portal", "M Ramzan"],
      ogImage: "/images/projects/pscdc/thumbnail.jpeg",
    },
    geo: {
      entityType: "CivicPlatform",
      primaryEntity: "PSCDC",
      summary: "PSCDC is a public sector civic technology portal engineered by M Ramzan providing accessible community services, grant tracking, and geospatial municipal infrastructure mapping.",
      keyFacts: [
        "Engineered by M Ramzan for public sector community development",
        "Fully compliant with WCAG 2.1 AAA accessibility specifications",
        "Includes real-time GIS mapping, grant processing engines, and secure audit trails"
      ],
      targetAudience: ["Municipal Councils", "Civic Tech Leaders", "Public Citizens"],
      faq: [
        {
          id: "faq-pscdc-1",
          question: "How was accessibility implemented in PSCDC?",
          answer: "Through semantic HTML5 landmark architecture, full keyboard navigation, screen-reader aria attributes, dynamic high-contrast toggles, and compliance testing against WCAG 2.1 AAA guidelines."
        }
      ]
    },
    createdAt: "2023-08-20T00:00:00.000Z",
    updatedAt: "2024-09-14T00:00:00.000Z",
  },
  {
    id: "proj-samad",
    slug: "samad-brothers",
    title: "Samad Brothers",
    subtitle: "Signage, Trophies & Branding Business — Digital Presence & E-Commerce",
    category: "Business Web & E-Commerce",
    year: "2024",
    status: "published",
    featured: true,
    order: 6,
    shortDescription: "A professional business website for Samad Brothers — offering custom signage, shields, trophies, glass work, and branding services across Islamabad & Rawalpindi.",
    description: "Samad Brothers is a fully featured business web platform for a leading signage and branding company in Islamabad. The site features product showcases, custom order workflows, location-based SEO, and a modern WooCommerce-backed shopping experience.",
    role: "Lead Web Developer & SEO Architect",
    client: "Samad Brothers Islamabad",
    technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "Rank Math SEO", "Custom CSS"],
    services: ["Business Web Development", "E-Commerce Setup", "Local SEO", "Brand Identity"],
    heroImage: "/images/projects/samad-brothers/hero.png",
    thumbnailImage: "/images/projects/samad-brothers/thumbnail.png",
    gallery: [
      "/images/projects/samad-brothers/gallery-1.png",
      "/images/projects/samad-brothers/gallery-2.png",
      "/images/projects/samad-brothers/gallery-3.png"
    ],
    liveUrl: "https://samadbrothers.pk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Samad Brothers required a modern digital storefront and commercial catalog to showcase their premium craftsmanship in custom signage, shields, medals, and corporate branding products across the Islamabad-Rawalpindi metropolis.",
      challenge: "Cataloging diverse custom fabricated products, providing high-resolution visual previews, and establishing dominant local search rankings for competitive commercial branding queries.",
      solution: "Engineered a high-performance web platform with structured WooCommerce product showcases, dynamic quotation inquiry forms, WhatsApp business integration, and Schema.org LocalBusiness structured data.",
      process: "Streamlined product taxonomy into intuitive categories, optimized visual assets for mobile browsing speed, implemented on-page SEO best practices with Rank Math, and configured analytics tracking.",
      result: "Increased direct online inbound quotation inquiries by 160% and achieved top-3 Google local rankings for custom shields and corporate signage.",
    },
    metrics: [
      { label: "Quotation Inquiries", value: "+160%" },
      { label: "Catalog Products", value: "500+" },
      { label: "Local SEO Rank", value: "Top 3" },
      { label: "Customer Satisfaction", value: "99%" },
    ],
    seo: {
      title: "Samad Brothers — Signage & Branding Case Study | M Ramzan",
      description: "Case study of Samad Brothers: Professional signage, shields, trophies, and branding e-commerce platform engineered by M Ramzan.",
      keywords: ["Signage Web Platform", "WooCommerce Catalog", "Local SEO Islamabad", "M Ramzan Portfolio"],
      ogImage: "/images/projects/samad-brothers/thumbnail.png",
    },
    geo: {
      entityType: "ECommercePlatform",
      primaryEntity: "Samad Brothers",
      summary: "Samad Brothers is a custom signage, corporate shields, and branding e-commerce platform engineered by M Ramzan with structured catalog workflows and local SEO optimization.",
      keyFacts: [
        "Designed and engineered by Web Architect M Ramzan",
        "Stack: WordPress, WooCommerce, PHP, MySQL, Rank Math SEO",
        "Features custom quotation inquiries, WhatsApp integration, and LocalBusiness schema"
      ],
      targetAudience: ["Corporate Clients", "Institutions", "Event Organizers"],
      faq: [
        {
          id: "faq-samad-1",
          question: "What products are available on Samad Brothers?",
          answer: "Custom corporate shields, signage, medals, trophies, CNC laser cutting, and promotional branding products."
        }
      ]
    },
    createdAt: "2024-01-18T00:00:00.000Z",
    updatedAt: "2024-10-05T00:00:00.000Z",
  },
  {
    id: "proj-ahtsham",
    slug: "ahtsham-ul-haq",
    title: "Ahtsham ul Haq Malkani",
    subtitle: "Architect of the Hybrid Education Model™ — Personal Brand Platform",
    category: "Personal Brand & Portfolio",
    year: "2024",
    status: "published",
    featured: false,
    order: 7,
    shortDescription: "An authoritative personal brand platform for educator, humanitarian, and Hybrid Education Model architect Ahtsham ul Haq Malkani — bridging Deen and Duniya across three institutions and a global online academy.",
    description: "Ahtsham ul Haq Malkani's personal platform showcases his life mission: the Hybrid Education Model™ that integrates Hifz, full academic legitimacy, digital skills, and Sunnah-based life training. Engineered as an editorial-first Next.js website with institution showcases, impact metrics, and speaking/donation capabilities.",
    role: "Lead Designer & Full-Stack Engineer",
    client: "Ahtsham ul Haq Malkani",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Analytics"],
    services: ["Personal Brand Identity", "Editorial Web Design", "Institution Showcase", "SEO Strategy"],
    heroImage: "/images/projects/ahtsham-ul-haq/hero.jpg",
    thumbnailImage: "/images/projects/ahtsham-ul-haq/thumbnail.jpeg",
    gallery: [
      "/images/projects/ahtsham-ul-haq/gallery-1.webp",
      "/images/projects/ahtsham-ul-haq/gallery-2.jpeg",
      "/images/projects/ahtsham-ul-haq/gallery-3.jpg"
    ],
    liveUrl: "https://ahtshamulhaq.co",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Ahtsham ul Haq Malkani required an authoritative, editorial digital brand platform to articulate the mission of the Hybrid Education Model™ and showcase the network of educational institutions under Unity Aid Foundation.",
      challenge: "Unifying a 36-year family institutional legacy across multiple campuses, an online academy, and charitable foundations into an inspiring and elegant narrative.",
      solution: "Constructed a typography-first Next.js web presence featuring interactive institutional spotlights, impact timelines, essay publication archives, and a streamlined donation portal.",
      process: "Curated archival media and photography, structured the institution taxonomy, designed custom reading layouts, and optimized Core Web Vitals to deliver instant sub-second page loads globally.",
      result: "Expanded global awareness for the Hybrid Model, driving over 40% growth in institutional partnerships and online student inquiries.",
    },
    metrics: [
      { label: "Institutions Represented", value: "5+ Entities" },
      { label: "Global Diaspora Reach", value: "30+ Nations" },
      { label: "Legacy Documented", value: "36 Years" },
      { label: "Core Web Vitals", value: "100%" },
    ],
    seo: {
      title: "Ahtsham ul Haq Malkani — Personal Brand Platform | M Ramzan",
      description: "Case study on Ahtsham ul Haq Malkani's personal platform: Hybrid Education Model architecture, institutional legacy, and editorial design by M Ramzan.",
      keywords: ["Personal Brand Platform", "Hybrid Education Model", "Editorial Next.js", "M Ramzan Portfolio"],
      ogImage: "/images/projects/ahtsham-ul-haq/thumbnail.jpeg",
    },
    geo: {
      entityType: "PersonBrandPlatform",
      primaryEntity: "Ahtsham Ul Haq Malkani",
      summary: "Ahtsham Ul Haq Malkani personal brand platform is an authoritative educational and thought-leadership web portal designed and built by M Ramzan.",
      keyFacts: [
        "Designed and engineered by M Ramzan",
        "Stack: Next.js, MDX, Tailwind CSS, TypeScript",
        "Includes institution showcases, publications archive, and donation capabilities"
      ],
      targetAudience: ["Board Directors", "Academic Leaders", "Philanthropists"],
      faq: [
        {
          id: "faq-ahtsham-1",
          question: "What architecture powers this platform?",
          answer: "The platform is built with Next.js App Router, Tailwind CSS, and Framer Motion for high-fidelity responsive presentation."
        }
      ]
    },
    createdAt: "2024-02-10T00:00:00.000Z",
    updatedAt: "2024-08-22T00:00:00.000Z",
  },
  {
    id: "proj-abm",
    slug: "abm-foundation",
    title: "ABM Foundation",
    subtitle: "Non-Profit Foundation Digital Platform & Donor Engagement Portal",
    category: "Non-Profit & Foundation Web",
    year: "2024",
    status: "published",
    featured: true,
    order: 8,
    shortDescription: "A professional digital presence for ABM Foundation — designed to communicate mission, engage donors, showcase impact, and facilitate charitable operations online.",
    description: "ABM Foundation's web platform is engineered to amplify the foundation's charitable mission with a credible, conversion-optimized digital presence. Features donor engagement flows, impact showcases, program highlights, and an accessible content management system.",
    role: "Lead Full-Stack Developer & Designer",
    client: "ABM Foundation",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Framer Motion"],
    services: ["Foundation Web Development", "Donor Journey Design", "Content Management", "SEO Strategy"],
    heroImage: "/images/projects/abm-foundation/hero.jpg",
    thumbnailImage: "/images/projects/abm-foundation/thumbnail.jpg",
    gallery: [
      "/images/projects/abm-foundation/gallery-1.jpg",
      "/images/projects/abm-foundation/gallery-2.jpg",
      "/images/projects/abm-foundation/gallery-3.jpg"
    ],
    liveUrl: "https://abm.foundation",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "ABM Foundation needed an inspiring, transparent digital headquarters to showcase their humanitarian relief initiatives, food distribution drives, and community welfare programs across Pakistan.",
      challenge: "Building trust with international and local donors through transparent financial and impact reporting while ensuring easy mobile navigation on low-bandwidth networks.",
      solution: "Engineered a high-speed, lightweight web portal with dynamic photo galleries, verified program milestones, donor impact calculators, and secure donation gateway integrations.",
      process: "Structured visual media archives, designed accessible multi-language layouts, integrated automated donor receipting, and optimized all media assets with progressive WebP delivery.",
      result: "Enabled ABM Foundation to expand monthly food aid distribution by over 200%, reaching thousands of deserving families with full digital transparency.",
    },
    metrics: [
      { label: "Food Packages Delivered", value: "10,000+" },
      { label: "Families Supported", value: "2,500+" },
      { label: "Donor Trust Rating", value: "100%" },
      { label: "Page Load Speed", value: "< 1.0s" },
    ],
    seo: {
      title: "ABM Foundation — Humanitarian Digital Platform | M Ramzan",
      description: "Case study on ABM Foundation: Non-profit humanitarian portal with donor journey architecture and transparent impact showcases by M Ramzan.",
      keywords: ["Non-Profit Web Design", "Charity Platform", "Donor Engagement", "M Ramzan Portfolio"],
      ogImage: "/images/projects/abm-foundation/thumbnail.jpg",
    },
    geo: {
      entityType: "NonProfitOrganization",
      primaryEntity: "ABM Foundation",
      summary: "ABM Foundation is a humanitarian welfare web portal engineered by M Ramzan with transparent donor reporting and relief tracking.",
      keyFacts: [
        "Architected and built by M Ramzan",
        "Stack: Next.js, TypeScript, Tailwind CSS, MySQL, Framer Motion",
        "Supports online donor engagements, verified impact tracking, and multi-language delivery"
      ],
      targetAudience: ["Global Donors", "Welfare Organizations", "Philanthropists"],
      faq: [
        {
          id: "faq-abm-1",
          question: "What core features are integrated into ABM Foundation platform?",
          answer: "Dynamic photo galleries, verified relief milestones, impact calculators, and secure donor contribution channels."
        }
      ]
    },
    createdAt: "2024-04-05T00:00:00.000Z",
    updatedAt: "2024-11-15T00:00:00.000Z",
  },
  {
    id: "proj-mico",
    slug: "mico",
    title: "MICO.pk",
    subtitle: "Business Platform & Digital Services Portal",
    category: "Full Stack & Business Web",
    year: "2023",
    status: "published",
    featured: false,
    order: 9,
    shortDescription: "A professional business web platform for MICO.pk — delivering digital services, business operations management, and an optimized client-facing web presence in Pakistan.",
    description: "MICO.pk is a comprehensive business digital platform engineered for streamlined operations and online customer engagement. Featuring service showcases, contact flows, and performance-optimized architecture.",
    role: "Full-Stack Engineer & Web Architect",
    client: "MICO Pakistan",
    technologies: ["WordPress", "PHP", "MySQL", "Custom Theme", "WooCommerce", "SEO Plugins"],
    services: ["Business Web Development", "CMS Setup", "SEO Optimization", "Performance Tuning"],
    heroImage: "/images/projects/mico/hero.webp",
    thumbnailImage: "/images/projects/mico/thumbnail.webp",
    gallery: [
      "/images/projects/mico/gallery-1.webp",
      "/images/projects/mico/gallery-2.webp",
      "/images/projects/mico/gallery-3.webp"
    ],
    liveUrl: "https://mico.pk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "MICO.pk required a comprehensive digital services and corporate consulting portal to streamline corporate advisory inquiries, financial compliance services, and client communications across Pakistan.",
      challenge: "Presenting a broad spectrum of corporate, tax, and management consulting services with clarity while providing intuitive scheduling and document sharing workflows.",
      solution: "Architected a responsive business web platform featuring organized service matrices, client portal integrations, real-time consultation booking, and fast interactive forms.",
      process: "Designed corporate branding layouts, structured service information architecture, optimized database queries for rapid page rendering, and integrated security compliance protocols.",
      result: "Facilitated over 5,000 corporate client engagements in the first year with an outstanding client retention and satisfaction rate.",
    },
    metrics: [
      { label: "Corporate Clients", value: "500+" },
      { label: "Advisory Engagements", value: "5,000+" },
      { label: "Client Satisfaction", value: "99.2%" },
      { label: "Platform Uptime", value: "99.9%" },
    ],
    seo: {
      title: "MICO.pk — Corporate & Digital Platform | M Ramzan",
      description: "Case study on MICO.pk: Corporate advisory, business services, and digital platform architecture engineered by M Ramzan.",
      keywords: ["Business Platform", "Corporate Services Web", "MICO Pakistan", "Full-Stack Case Study", "M Ramzan"],
      ogImage: "/images/projects/mico/thumbnail.webp",
    },
    geo: {
      entityType: "Corporation",
      primaryEntity: "MICO Pakistan",
      summary: "MICO.pk is a corporate advisory and business digital platform engineered by M Ramzan.",
      keyFacts: [
        "Engineered by Full-Stack Architect M Ramzan",
        "Stack: WordPress, PHP, MySQL, Custom Theme, WooCommerce",
        "Features client consulting matrix, service portfolios, and rapid inquiry handling"
      ],
      targetAudience: ["Corporate Clients", "Enterprises", "Business Founders"],
      faq: [
        {
          id: "faq-mico-1",
          question: "What services does MICO.pk provide?",
          answer: "Corporate advisory, digital services, financial compliance management, and corporate business consulting."
        }
      ]
    },
    createdAt: "2023-11-12T00:00:00.000Z",
    updatedAt: "2024-07-19T00:00:00.000Z",
  },
  {
    id: "proj-anwarul-quran",
    slug: "anwarul-quran",
    title: "انوارُ القرآن فاؤنڈیشن (Anwarul Quran Foundation)",
    subtitle: "Guided by the Quran, Serving Humanity — Islamic Education & Welfare Digital Ecosystem",
    category: "Web Platform & Islamic EdTech",
    year: "2024",
    status: "published",
    featured: true,
    order: 10,
    shortDescription: "An authoritative bilingual digital platform for Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن) — established in 2002 under the spiritual patronage of Hazrat Maulana Haji Mahmood Ahmad Darkhwasti (رحمت اللہ علیہ) to deliver Quranic education, character building, and community welfare.",
    description: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن) is a venerable Islamic educational and humanitarian welfare institution founded in 2002. Operating dual campuses for male and female students (شعبہ طلبہ و طالبات) with 10+ dedicated scholarly faculty members, the foundation integrates classical Quranic memorization (حفظِ قرآن), precision phonetics (تجوید و ناظرہ), Islamic etiquette (تربیتِ اسلامی), and contemporary academic education (عصری تعلیم). The bespoke web platform delivers online admissions, course curricula, digital donation channels (Zakat & Sadaqah), photo archives, and community welfare transparency.",
    role: "Lead Full-Stack Web Architect & UI/UX Designer",
    client: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن)",
    technologies: ["WordPress", "PHP", "MySQL", "Custom RTL Theme", "Salient Visual Engine", "Urdu Typography", "SEO Plugins", "Schema.org"],
    services: ["Bilingual RTL Web Architecture", "Islamic EdTech Design", "Admissions & Course Portal", "Zakat & Donation Integration", "SEO Strategy"],
    heroImage: "/images/projects/anwarul-quran/hero.jpeg",
    thumbnailImage: "/images/projects/anwarul-quran/thumbnail.jpeg",
    gallery: [
      "/images/projects/anwarul-quran/gallery-1.jpeg",
      "/images/projects/anwarul-quran/gallery-2.jpeg",
      "/images/projects/anwarul-quran/gallery-3.jpeg",
      "/images/projects/anwarul-quran/gallery-4.jpeg",
      "/images/projects/anwarul-quran/live-preview.png"
    ],
    liveUrl: "https://anwarulquran.org.pk",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن), carrying forward a 22+ year spiritual and educational legacy established in 2002 under Hazrat Maulana Haji Mahmood Ahmad Darkhwasti (رحمت اللہ علیہ), required a world-class, culturally respectful digital portal to connect students, families, and international donors.",
      challenge: "Crafting a sophisticated RTL (Right-to-Left) Urdu typographic web experience that honors classical Islamic aesthetics while providing frictionless online admissions, course catalog navigation, and transparent charitable contribution channels across low-bandwidth mobile networks.",
      solution: "Engineered an elegant, bilingual Islamic education web portal featuring bespoke Nastaliq and Meher font integration, structured course matrices for both boys' and girls' departments, responsive donation flows for Zakat/Sadaqah, and high-resolution photo galleries of institutional life.",
      process: "Collaborated with foundation leadership and scholars, established deep emerald and royal gold visual tokens (#1B4F43 / #D4AF37), digitized student enrollment applications, and implemented comprehensive Schema.org EducationalOrganization structured data.",
      result: "Digitized operations across both student departments, accelerated enrollment processing by 90%, and expanded donor trust globally with transparent welfare reporting and 100% platform availability.",
    },
    metrics: [
      { label: "Established Legacy", value: "2002 (22+ Years)" },
      { label: "Campuses", value: "2 (Boys & Girls)" },
      { label: "Scholarly Faculty", value: "10+ Asatiza" },
      { label: "Admission Speedup", value: "90%" },
    ],
    seo: {
      title: "Anwarul Quran Foundation — Islamic Education & Welfare Platform | M Ramzan",
      description: "Case study of Anwarul Quran Foundation (anwarulquran.org.pk): Venerable Islamic educational and welfare platform engineered by M Ramzan.",
      keywords: ["Anwarul Quran Foundation", "anwarulquran.org.pk", "انوارُ القرآن فاؤنڈیشن", "Islamic Education Web", "Online Quran Admissions", "M Ramzan Portfolio"],
      ogImage: "/images/projects/anwarul-quran/thumbnail.jpeg",
    },
    geo: {
      entityType: "EducationalOrganization",
      primaryEntity: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن)",
      summary: "Anwarul Quran Foundation is an Islamic educational and community welfare institution established in 2002 in Pakistan, with a digital platform engineered by M Ramzan.",
      keyFacts: [
        "Engineered by Full-Stack Web Architect M Ramzan",
        "Founded in 2002 under the spiritual patronage of Hazrat Maulana Haji Mahmood Ahmad Darkhwasti (رحمت اللہ علیہ)",
        "Operates distinct departments for male and female students with 10+ scholarly teachers",
        "Offers Hifz, Nazra with Tajweed, character building, and subsidized community education"
      ],
      targetAudience: ["Students", "Parents", "Islamic Scholars", "Philanthropists & Donors"],
      faq: [
        {
          id: "faq-anwar-1",
          question: "When was Anwarul Quran Foundation established?",
          answer: "Anwarul Quran Foundation was founded in 2002 under the spiritual guidance and prayers of Hazrat Maulana Haji Mahmood Ahmad Darkhwasti (رحمت اللہ علیہ)."
        },
        {
          id: "faq-anwar-2",
          question: "What programs and departments are offered?",
          answer: "The foundation operates dual campuses for male and female students, offering Hifz-ul-Quran, Nazra with Tajweed, Islamic character building (Tarbiyah), and contemporary educational linkages."
        }
      ]
    },
    createdAt: "2024-06-01T00:00:00.000Z",
    updatedAt: "2024-12-22T00:00:00.000Z",
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "srv-fullstack",
    title: "Full-Stack Web Architecture",
    slug: "full-stack-web-architecture",
    shortDescription: "End-to-end engineering of resilient, high-speed web applications tailored for enterprise scale and luxury presentation.",
    description: "Architecting bespoke digital platforms using Next.js App Router, TypeScript, and modern relational databases. Every system is built for extreme performance, clean code maintainability, and effortless scalability.",
    icon: "Layers",
    deliverables: [
      "Next.js 15+ App Router Architecture",
      "TypeScript Strict Type Safety",
      "Tailwind CSS Luxury Design System",
      "Relational Database Modeling & Migration",
      "Server-Side Rendering & ISR Caching",
      "Zero-Downtime Deployment & CI/CD Pipelines"
    ],
    technologies: ["Next.js", "React", "TypeScript", "MySQL", "Tailwind CSS", "Redis"],
    featured: true,
    order: 1,
  },
  {
    id: "srv-cms",
    title: "Custom CMS & Editorial Engines",
    slug: "custom-cms-editorial-engines",
    shortDescription: "Tailored content management solutions empowering marketing and editorial teams with effortless publishing workflows.",
    description: "Designing bespoke CMS platforms that liberate businesses from cumbersome monolithic software. Featuring modular section builders, real-time draft previews, granular permissions, and automated media pipelines.",
    icon: "LayoutDashboard",
    deliverables: [
      "Custom Admin Dashboard & Visual Editors",
      "Draft, Publish & Version History Workflows",
      "Modular Section Builders",
      "Granular Role-Based Access Control (RBAC)",
      "Wasmer MySQL & Cloud Asset Management",
      "Instant Edge Revalidation & Webhooks"
    ],
    technologies: ["Next.js", "MySQL", "Tailwind CSS", "Framer Motion"],
    featured: true,
    order: 2,
  },
  {
    id: "srv-ai-geo",
    title: "AI Integration & GEO Optimization",
    slug: "ai-integration-geo-optimization",
    shortDescription: "Supercharging platforms with generative AI assistants, structured entity graphs, and Generative Engine Optimization.",
    description: "Integrating intelligent LLM workflows directly into business applications while structuring content for modern AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews) through structured schemas and entity graphs.",
    icon: "Sparkles",
    deliverables: [
      "CMS AI Assistant & Review Workflows",
      "Generative Engine Optimization (GEO) Architecture",
      "JSON-LD Schema (Person, WebSite, CreativeWork)",
      "Automated FAQ & Key Facts Structuring",
      "Automated Sitemap & Technical Robots Management",
      "OpenAI & Anthropic LLM Integration"
    ],
    technologies: ["OpenAI API", "JSON-LD", "Schema.org", "Next.js Metadata API", "Entity Graph Modeling"],
    featured: true,
    order: 3,
  },
  {
    id: "srv-creative-ui",
    title: "Creative Development & UI/UX Design",
    slug: "creative-development-ui-ux",
    shortDescription: "Crafting award-quality digital experiences with cinematic typography, smooth motion, and editorial elegance.",
    description: "Bridging the gap between fine art direction and precision frontend engineering. Creating bespoke interfaces that feel like luxury products — fluid, tactile, and unforgettable.",
    icon: "Wand2",
    deliverables: [
      "Editorial Luxury Design Systems",
      "Physics-Based Motion for React (Framer Motion)",
      "Micro-Animations & Smooth Text Reveals",
      "Interactive WebGL & 3D Explorations",
      "Mobile-First Responsive Layouts",
      "WCAG 2.1 AAA Accessibility Standards"
    ],
    technologies: ["Framer Motion", "Tailwind CSS", "Three.js", "CSS Modules", "Radix UI", "Lucide Icons"],
    featured: true,
    order: 4,
  }
];

export const initialSkills: SkillCategory[] = [
  {
    id: "cat-frontend",
    name: "Frontend Mastery",
    skills: [
      { name: "Next.js / React 19", level: 98, experience: "6+ Years" },
      { name: "TypeScript", level: 96, experience: "6+ Years" },
      { name: "Tailwind CSS & Design Systems", level: 98, experience: "5+ Years" },
      { name: "Framer Motion & Animation", level: 94, experience: "5+ Years" },
      { name: "Three.js / WebGL", level: 85, experience: "3+ Years" },
      { name: "Performance & Core Web Vitals", level: 96, experience: "6+ Years" },
    ]
  },
  {
    id: "cat-backend",
    name: "Backend & Systems",
    skills: [
      { name: "MySQL & Relational Architecture", level: 96, experience: "6+ Years" },
      { name: "Node.js & Express", level: 92, experience: "6+ Years" },
      { name: "REST & GraphQL API Design", level: 95, experience: "6+ Years" },
      { name: "Redis & Distributed Queues", level: 88, experience: "4+ Years" },
      { name: "Database Schema Modeling & Indexing", level: 95, experience: "6+ Years" },
      { name: "Docker & Cloud Architecture", level: 86, experience: "4+ Years" },
    ]
  },
  {
    id: "cat-seo-ai",
    name: "SEO, GEO & AI",
    skills: [
      { name: "Generative Engine Optimization (GEO)", level: 95, experience: "3+ Years" },
      { name: "JSON-LD & Semantic Web (Schema.org)", level: 98, experience: "5+ Years" },
      { name: "Technical SEO & Crawl Budget", level: 96, experience: "6+ Years" },
      { name: "LLM Orchestration & Prompt Engineering", level: 92, experience: "3+ Years" },
      { name: "Data Extraction & Web Automation", level: 94, experience: "5+ Years" },
    ]
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Full-Stack Architect & Consultant",
    company: "Independent Practice / Digital Brand Studio",
    location: "Global / Remote",
    period: "2022 — Present",
    current: true,
    description: [
      "Architecting bespoke web applications, enterprise headless CMS platforms, and high-performance digital brand hubs for international clients.",
      "Spearheading GEO (Generative Engine Optimization) methodologies to ensure client platforms rank dominantly across AI answer engines and classical search.",
      "Delivering award-quality creative development, micro-animations, and full-stack MySQL/Next.js systems."
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Framer Motion", "OpenAI"]
  },
  {
    id: "exp-2",
    role: "Senior Full-Stack Engineer",
    company: "IDEA TECH Solutions",
    location: "Remote",
    period: "2020 — 2022",
    current: false,
    description: [
      "Engineered the flagship IDEA TECH CMS and distributed Maps Lead Extractor engines handling millions of monthly data points.",
      "Led frontend and backend development teams, enforcing strict TypeScript standards and automated CI/CD testing pipelines.",
      "Optimized Core Web Vitals across 20+ client portals, lifting average page speed from 62 to 98 on Google PageSpeed Insights."
    ],
    technologies: ["React", "Next.js", "Node.js", "MySQL", "Redis", "BullMQ", "Docker"]
  },
  {
    id: "exp-3",
    role: "Frontend Engineer & Creative Developer",
    company: "Artisanal Digital Labs",
    location: "Hybrid",
    period: "2018 — 2020",
    current: false,
    description: [
      "Designed and coded bespoke e-commerce and luxury portfolio websites with rich animations and interactive storytelling.",
      "Collaborated closely with creative directors and UI designers to translate high-fidelity Figma prototypes into pixel-perfect code."
    ],
    technologies: ["JavaScript", "React", "CSS3", "WebGL", "GSAP", "Shopify API"]
  }
];

export const initialPages: Page[] = [
  {
    id: "page-home",
    slug: "home",
    title: "M RAMZAN — Lead Creative Engineer & Full-Stack Architect",
    description: "Welcome to the official portfolio of M Ramzan. Architecting bespoke digital platforms, enterprise CMS ecosystems, and high-performance web applications.",
    status: "published",
    sections: [
      { id: "sec-hero", type: "hero", title: "Hero Section", enabled: true, order: 1 },
      { id: "sec-statement", type: "statement", title: "Personal Statement", enabled: true, order: 2 },
      { id: "sec-featured", type: "featured_projects", title: "Selected Works", enabled: true, order: 3 },
      { id: "sec-services", type: "services", title: "Services & Capabilities", enabled: true, order: 4 },
      { id: "sec-skills", type: "skills", title: "Technical Stack & Mastery", enabled: true, order: 5 },
      { id: "sec-about", type: "about", title: "About Teaser", enabled: true, order: 6 },
      { id: "sec-cta", type: "cta", title: "Call to Action", enabled: true, order: 7 },
    ],
    seo: {
      title: "M RAMZAN — Lead Full-Stack Architect & Creative Technologist",
      description: "Portfolio of M Ramzan. Explore award-winning case studies in Next.js architecture, bespoke CMS platforms, AI systems, and luxury digital design.",
      keywords: ["Full-Stack Architect", "Next.js Specialist", "Creative Technologist", "M Ramzan"],
      ogImage: "/images/og-default.jpg"
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "page-about",
    slug: "about",
    title: "About — M RAMZAN",
    description: "Learn about M Ramzan's background, engineering principles, experience, and design philosophy.",
    status: "published",
    sections: [
      { id: "sec-about-hero", type: "hero", title: "About Hero", enabled: true, order: 1 },
      { id: "sec-about-bio", type: "about", title: "Biography & Journey", enabled: true, order: 2 },
      { id: "sec-about-skills", type: "skills", title: "Skills Radar", enabled: true, order: 3 },
      { id: "sec-about-cta", type: "cta", title: "Contact Bridge", enabled: true, order: 4 },
    ],
    seo: {
      title: "About M Ramzan — Full-Stack Architect & Technologist",
      description: "Biography, career milestones, technical philosophy, and entity knowledge graph of M Ramzan.",
      keywords: ["About M Ramzan", "Software Architect Bio", "Lead Engineer Background"],
      ogImage: "/images/og-default.jpg"
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "page-services",
    slug: "services",
    title: "Services & Capabilities — M RAMZAN",
    description: "Bespoke engineering and creative services including Full-Stack Architecture, Custom CMS Development, and AI/GEO Optimization.",
    status: "published",
    sections: [
      { id: "sec-srv-hero", type: "hero", title: "Services Hero", enabled: true, order: 1 },
      { id: "sec-srv-list", type: "services", title: "Offerings Grid", enabled: true, order: 2 },
      { id: "sec-srv-faq", type: "faq", title: "Frequently Asked Questions", enabled: true, order: 3 },
      { id: "sec-srv-cta", type: "cta", title: "Booking CTA", enabled: true, order: 4 },
    ],
    seo: {
      title: "Services & Consulting — M RAMZAN",
      description: "High-impact web engineering services: Next.js architecture, headless CMS platforms, GEO optimization, and creative development.",
      keywords: ["Web Development Services", "Next.js Consultant", "CMS Development", "GEO Consulting"],
      ogImage: "/images/og-default.jpg"
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "page-contact",
    slug: "contact",
    title: "Contact & Collaboration — M RAMZAN",
    description: "Initiate a project conversation with M Ramzan. Inquire regarding full-stack architecture, bespoke CMS builds, or technical consulting.",
    status: "published",
    sections: [
      { id: "sec-contact-hero", type: "hero", title: "Contact Hero", enabled: true, order: 1 },
      { id: "sec-contact-form", type: "contact", title: "Inquiry Form", enabled: true, order: 2 },
    ],
    seo: {
      title: "Contact M Ramzan — Direct Inquiry & Consultation",
      description: "Get in touch with M Ramzan for bespoke software engineering, creative direction, and technical architecture.",
      keywords: ["Contact M Ramzan", "Hire Next.js Architect", "Web Engineering Inquiry"],
      ogImage: "/images/og-default.jpg"
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  }
];
