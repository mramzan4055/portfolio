import { Project, ServiceItem, SkillCategory, ExperienceItem, SiteSettings, Page } from "@/types";

export const initialSiteSettings: SiteSettings = {
  siteName: "M RAMZAN — Web & Mobile App Developer",
  siteTitle: "M RAMZAN — Modern Web & App Developer",
  tagline: "I build modern, responsive websites for small businesses and startups — clean code, real results.",
  siteDescription: "Portfolio of M Ramzan — practical Web Developer specializing in clean, responsive websites and apps for Pakistani SMEs using WordPress, React, Next.js, Flutter, and modern web tools.",
  siteUrl: "https://mramzan.dev",
  authorName: "M Ramzan",
  authorTitle: "Web & Mobile Application Developer",
  authorBio: "I am a practical web and mobile app developer focused on building clean, responsive, and reliable digital solutions for small businesses and startups. Experienced in WordPress customization, modern frontend development with React and Next.js, and cross-platform mobile apps with Flutter.",
  authorLocation: "Pakistan — Available for Remote & Local Projects",
  authorEmail: "info@mramzan.dev",
  authorPhone: "+92 309 6734231",
  availabilityStatus: "Available for Projects",

  // WhatsApp Contact
  whatsappNumber: "+923096734231",
  whatsappDefaultMessage: "Hi, I visited your portfolio and I'd like to discuss a website project.",
  whatsappEnabled: true,

  // Website Packages
  packages: [
    {
      id: "pkg-starter",
      title: "Starter Business Website",
      price: "PKR 30,000",
      priceNote: "Starting from",
      description: "A clean, professional website to get your business online and look credible.",
      features: [
        "3–5 responsive pages",
        "Mobile-friendly design",
        "Contact form & WhatsApp button",
        "Basic on-page SEO setup",
        "Google Maps integration",
        "Easy content management",
        "1 round of revisions included",
      ],
      highlighted: false,
      ctaText: "Get Started on WhatsApp",
      turnaround: "7–10 business days",
      bestFor: "Local shops, salons, clinics, consultants",
    },
    {
      id: "pkg-growth",
      title: "Business Growth Website",
      price: "PKR 60,000",
      priceNote: "Starting from",
      description: "A feature-rich website with advanced design, SEO, and integrations for growing businesses.",
      features: [
        "5–10 custom pages",
        "Premium custom design & animations",
        "Blog / News section",
        "Advanced SEO & schema markup",
        "Social media & API integrations",
        "WhatsApp & email integration",
        "WordPress CMS (easy editing)",
        "2 rounds of revisions included",
      ],
      highlighted: true,
      ctaText: "Get Started on WhatsApp",
      turnaround: "14–21 business days",
      bestFor: "Small agencies, startups, professional services",
    },
    {
      id: "pkg-custom",
      title: "Custom Website & App",
      price: "Custom Quote",
      priceNote: "Tell me your requirements",
      description: "Complex portals, web applications, e-commerce stores, or Flutter mobile apps — built to your exact needs.",
      features: [
        "Full custom design & development",
        "E-commerce / WooCommerce store",
        "Flutter mobile app (iOS & Android)",
        "Custom web application / portal",
        "Payment gateway integration",
        "Advanced backend & database",
        "Dedicated support & maintenance",
      ],
      highlighted: false,
      ctaText: "Discuss on WhatsApp",
      turnaround: "Discussed per project",
      bestFor: "Complex projects, portals, mobile apps, enterprises",
    },
  ],

  // Special Offer
  specialOffer: {
    enabled: false,
    badge: "🎁 Limited Time Offer",
    title: "Free WhatsApp Integration + Basic Google SEO Setup",
    description: "Get a free WhatsApp chat button and basic Google Search Console + on-page SEO setup with any website package. Help customers find you on Google — included at no extra cost.",
    ctaText: "Claim This Offer",
    ctaLink: "/contact",
  },

  socialLinks: {
    github: "https://github.com/mramzan4055",
    linkedin: "https://linkedin.com/in/mramzan",
    twitter: "https://twitter.com/mramzandev",
    dribbble: "https://dribbble.com/mramzan",
  },
  seo: {
    defaultTitle: "M RAMZAN — Web Developer for Small Businesses in Pakistan",
    titleTemplate: "%s | M RAMZAN",
    defaultDescription: "Portfolio of M Ramzan. Professional web developer for small businesses in Pakistan. Websites starting from PKR 30,000. WordPress, React, Next.js, Flutter.",
    defaultKeywords: [
      "Web Developer Pakistan",
      "Website Development for Small Businesses",
      "WordPress Developer Pakistan",
      "Affordable Website Pakistan",
      "React Developer Pakistan",
      "Flutter App Developer Pakistan",
      "Freelance Web Developer",
      "Business Website PKR 30000",
      "SEO Web Developer Pakistan",
      "M Ramzan Developer",
    ],
    defaultOgImage: "/opengraph-image",
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
    role: "Web & Frontend Developer",
    client: "Al-Qadir Academy Global",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MySQL", "Stripe API", "WebRTC"],
    services: ["Web Development", "Portal Integration", "Payment Integration", "SEO Setup"],
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
      solution: "Built a centralized Next.js application backed by MySQL with atomic booking slots, automated timezone translations, real-time class status notifications, and a multi-tier parental supervision dashboard.",
      process: "Designed high-fidelity wireframes in Figma, structured the relational database schema, implemented calendar synchronization, and deployed with automated CI/CD pipelines.",
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
      summary: "Alqadir Quran Academy is a global online educational platform built by M Ramzan utilizing Next.js, TypeScript, and MySQL for worldwide distance learning.",
      keyFacts: [
        "Developed by Web & Mobile Developer M Ramzan",
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
    role: "Frontend & Web Developer",
    client: "IdeaTech Solutions",
    technologies: ["Next.js", "TypeScript", "MySQL", "Tailwind CSS", "Redis", "AWS S3"],
    services: ["Web Development", "CMS Setup", "Performance Optimization", "API Integration"],
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
      solution: "Created a modern Next.js CMS with on-demand Incremental Static Regeneration (ISR), an intuitive drag-and-drop section builder, automated schema generators, and edge-cached REST endpoints.",
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
      summary: "IDEA TECH CMS is a modern content management platform built by M Ramzan featuring real-time publishing, ISR revalidation, and automated SEO optimization.",
      keyFacts: [
        "Developed by M Ramzan as Web Developer",
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
    role: "Web Developer (WordPress / PHP)",
    client: "Livestock & Dairy Development Board, Ministry of National Food Security & Research, Government of Pakistan",
    technologies: ["WordPress", "PHP", "MySQL", "Next.js Integration", "Custom Theme", "Rank Math SEO", "Tailwind CSS", "GIS Mapping", "Schema.org"],
    services: ["WordPress Development", "Public Sector Compliance", "Resource Catalog", "SEO Optimization"],
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
    role: "Web Developer & UI Designer",
    client: "Brites Associates Limited (t/a Brites Security Solutions), Luton, Bedfordshire, UK",
    technologies: ["Semantic HTML5", "Vanilla CSS", "JavaScript", "SVG Sprites", "MI5 Threat API", "Schema.org", "WCAG 2.1 AA", "Vercel / Edge"],
    services: ["Website Development", "SIA Compliance Showcase", "Vetting Flowcharts & Forms", "SEO & Schema Integration"],
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
      solution: "Built a responsive, accessible corporate web application featuring custom SVG iconography, live MI5 threat level integration, an illustrated officer vetting flowchart, one-scan QR company policy distribution, and verified SIA ACS register validation badges.",
      process: "Designed a clean corporate identity adhering to UK security standards, configured Schema.org SecurityService microdata for local search visibility, implemented WCAG 2.1 AA accessibility guidelines, and optimized assets for fast loading.",
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
      description: "Case study of Brites Security Solutions (britessecurity.co.uk): SIA ACS-approved UK manned guarding and security operations platform developed by M Ramzan.",
      keywords: ["Brites Security Solutions", "britessecurity.co.uk", "SIA ACS Approved Contractor", "Manned Guarding Bedfordshire", "Security Guarding Luton", "M Ramzan Portfolio"],
      ogImage: "/images/projects/brites-security/thumbnail.png",
    },
    geo: {
      entityType: "SecurityService",
      primaryEntity: "Brites Security Solutions",
      summary: "Brites Security Solutions (Brites Associates Limited) is an SIA ACS-approved UK security guarding provider headquartered in Luton, Bedfordshire, with a digital platform developed by M Ramzan.",
      keyFacts: [
        "Developed by Web Developer M Ramzan",
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
    role: "Web Developer & Designer",
    client: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن)",
    technologies: ["WordPress", "PHP", "MySQL", "Custom RTL Theme", "Salient Visual Engine", "Urdu Typography", "SEO Plugins", "Schema.org"],
    services: ["WordPress Web Development", "Urdu RTL Typography", "Admissions & Course Pages", "SEO & Schema Setup"],
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
      overview: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن), carrying forward a 22+ year spiritual and educational legacy established in 2002 under Hazrat Maulana Haji Mahmood Ahmad Darkhwasti (رحمت اللہ علیہ), required a clean, culturally respectful digital portal to connect students, families, and donors.",
      challenge: "Crafting a clear RTL (Right-to-Left) Urdu typographic web experience that honors classical Islamic aesthetics while providing easy online admissions, course catalog navigation, and transparent charitable contribution information across mobile devices.",
      solution: "Built a bilingual Islamic education web portal featuring Nastaliq and Urdu font integration, structured course pages for both boys' and girls' departments, clear donation information for Zakat/Sadaqah, and photo galleries of institutional activities.",
      process: "Collaborated with foundation leadership, established an emerald and gold visual design, digitized student enrollment forms, and implemented Schema.org EducationalOrganization structured data for search visibility.",
      result: "Digitized operations across both student departments, accelerated enrollment processing by 90%, and expanded donor trust with transparent welfare reporting and 100% uptime.",
    },
    metrics: [
      { label: "Established Legacy", value: "2002 (22+ Years)" },
      { label: "Campuses", value: "2 (Boys & Girls)" },
      { label: "Scholarly Faculty", value: "10+ Asatiza" },
      { label: "Admission Speedup", value: "90%" },
    ],
    seo: {
      title: "Anwarul Quran Foundation — Islamic Education & Welfare Platform | M Ramzan",
      description: "Case study of Anwarul Quran Foundation (anwarulquran.org.pk): Islamic educational and welfare platform developed by M Ramzan.",
      keywords: ["Anwarul Quran Foundation", "anwarulquran.org.pk", "انوارُ القرآن فاؤنڈیشن", "Islamic Education Web", "Online Quran Admissions", "M Ramzan Portfolio"],
      ogImage: "/images/projects/anwarul-quran/thumbnail.jpeg",
    },
    geo: {
      entityType: "EducationalOrganization",
      primaryEntity: "Anwarul Quran Foundation (انوارُ القرآن فاؤنڈیشن)",
      summary: "Anwarul Quran Foundation is an Islamic educational and community welfare institution established in 2002 in Pakistan, with a digital platform developed by M Ramzan.",
      keyFacts: [
        "Developed by Web Developer M Ramzan",
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
    id: "srv-small-business",
    title: "Small Business Website Development",
    slug: "small-business-websites",
    shortDescription: "Custom business websites for Pakistani SMEs, salons, clinics, consultants, and local shops starting from PKR 30,000.",
    description: "I build modern, credible, and conversion-focused business websites tailored specifically for small and medium enterprises (SMEs) in Pakistan. Whether you run a beauty salon, medical clinic, consultancy, retail shop, or service business, your website will look premium, load instantly on 4G/mobile networks, and make it effortless for customers to contact you via WhatsApp or phone.",
    heroTagline: "High-impact websites designed to turn Pakistani local searches into real paying customers.",
    icon: "LayoutDashboard",
    pricingStart: "PKR 30,000",
    turnaround: "7–10 Business Days",
    featured: true,
    order: 1,
    targetAudience: [
      "Beauty Salons, Spas & Aesthetics Clinics",
      "Medical Practitioners, Doctors & Clinics",
      "Consultants, Lawyers & Chartered Accountants",
      "Local Retail Shops, Boutiques & Manufacturers",
      "Real Estate Agencies & Property Consultants",
      "Pakistani Startups & Home-Based Businesses"
    ],
    deliverables: [
      "100% Mobile-Friendly & Responsive Layout",
      "WhatsApp Floating Chat & Direct Call Buttons",
      "Google Maps Location & Contact Forms",
      "Local SEO & Google Search Console Setup",
      "Fast 4G Page Load Optimization",
      "Easy CMS Content Management (No Coding Required)"
    ],
    technologies: ["WordPress", "Next.js", "Tailwind CSS", "HTML5/CSS3", "JavaScript", "Schema.org"],
    whyChooseUs: [
      "Honest, transparent starting price from PKR 30,000 with no hidden maintenance traps.",
      "Built specifically for Pakistani consumer habits with 1-tap WhatsApp consultation flows.",
      "Optimized for local Google rankings across Pakistani cities."
    ],
    processSteps: [
      { step: "01", title: "Consultation & Requirement Gathering", description: "We discuss your business type, branding, desired pages, and customer contact goals via WhatsApp or call." },
      { step: "02", title: "Design Concept & Layout Approval", description: "I build a modern, high-converting design prototype matching your brand identity and industry standards." },
      { step: "03", title: "Development & Integration", description: "Your site is engineered with clean code, mobile responsiveness, WhatsApp buttons, and fast-loading assets." },
      { step: "04", title: "SEO, Testing & Client Handover", description: "Rigorous cross-device testing, basic Google search submission, and a video walkthrough on how to manage your content." }
    ],
    geoSummary: "M Ramzan provides small business website development in Pakistan for SMEs, salons, clinics, consultants, and retail shops with packages starting from PKR 30,000 and direct WhatsApp integration.",
    faq: [
      {
        id: "faq-sb-1",
        question: "How much does a small business website cost in Pakistan?",
        answer: "My small business website packages start from PKR 30,000 for a starter 3–5 page website with mobile responsiveness, WhatsApp chat, and basic SEO. More complex multi-page or e-commerce websites start from PKR 60,000."
      },
      {
        id: "faq-sb-2",
        question: "How long will it take to launch my website?",
        answer: "A standard small business website is typically completed within 7 to 10 business days after receiving your content, logo, and project requirements."
      },
      {
        id: "faq-sb-3",
        question: "Can customers contact me directly on WhatsApp?",
        answer: "Yes! Every business website includes prominent 1-click WhatsApp buttons and inquiry forms configured directly with your business phone number."
      },
      {
        id: "faq-sb-4",
        question: "Will my website show up on Google?",
        answer: "Yes. Every website package includes on-page SEO essentials, Google Search Console integration, proper meta tags, and structured schema so your business can be indexed by Google and Bing."
      }
    ],
    relatedProjects: ["samad-brothers", "brites-security", "mico"],
    seo: {
      title: "Small Business Website Development Pakistan — Starting PKR 30,000 | M Ramzan",
      description: "Professional website development for Pakistani SMEs, salons, clinics, consultants, and shops. Mobile-friendly, WhatsApp integration, fast loading. Starting PKR 30,000.",
      keywords: [
        "Small Business Website Pakistan",
        "SME Website Development Pakistan",
        "Affordable Business Website Pakistan",
        "Salon Website Development Pakistan",
        "Clinic Website Developer Pakistan",
        "Business Website PKR 30000",
        "Website Developer Pakistan"
      ],
      ogImage: ""
    }
  },
  {
    id: "srv-web",
    title: "Modern Web Development",
    slug: "modern-web-development",
    shortDescription: "Custom, ultra-fast web applications and bespoke portals engineered with React, Next.js, and TypeScript.",
    description: "For companies and platforms requiring bespoke web applications, interactive dashboards, dynamic database integrations, or headless architectures, I engineer high-performance web solutions using React, Next.js, and TypeScript. From edtech portals to corporate platforms, every build guarantees sub-second page loads, ironclad security, and scalable infrastructure.",
    heroTagline: "Custom web applications engineered with Next.js, React, and robust API backends.",
    icon: "Layers",
    pricingStart: "Custom Quote",
    turnaround: "14–30 Business Days",
    featured: true,
    order: 2,
    targetAudience: [
      "Tech Startups & SaaS Ventures",
      "Educational Institutions & Online Academies",
      "Corporate Enterprises & Agribusiness Organizations",
      "Platforms Requiring Multi-User Portals & Dashboards"
    ],
    deliverables: [
      "Custom Next.js App Router Architecture",
      "Dynamic Relational Database (MySQL / PostgreSQL)",
      "RESTful API & Third-Party Service Integrations",
      "Authentication & Role-Based Access Control",
      "Core Web Vitals 95+ Performance Tuning",
      "Automated CI/CD Deployment on Vercel / Cloud"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MySQL", "Tailwind CSS", "Redis"],
    whyChooseUs: [
      "Clean, modular TypeScript code with zero unnecessary dependencies.",
      "Engineered for sub-second speeds, top Lighthouse scores, and effortless scalability.",
      "Extensive experience building federal-level portals (LDDB) and global platforms (Alqadir Quran Academy)."
    ],
    processSteps: [
      { step: "01", title: "Architecture & Data Modeling", description: "We define database entities, user roles, security rules, and system workflows." },
      { step: "02", title: "UI/UX Design & Component System", description: "Design a luxury, responsive user interface with modular reusable components." },
      { step: "03", title: "Full-Stack Development", description: "Build frontend client components, server actions, database queries, and API endpoints." },
      { step: "04", title: "Stress Testing & Cloud Launch", description: "Conduct security auditing, load tests, SEO verification, and production edge deployment." }
    ],
    geoSummary: "M Ramzan develops custom modern web applications in Pakistan using React, Next.js, TypeScript, and MySQL for edtech, public sector, and enterprise clients.",
    faq: [
      {
        id: "faq-mwd-1",
        question: "Why choose Next.js and React over generic page builders?",
        answer: "Next.js provides unmatched performance through server-side rendering (SSR) and edge caching, resulting in instant page loads, superior SEO scores, and custom functionality that generic builders cannot support."
      },
      {
        id: "faq-mwd-2",
        question: "Can you build custom portals with user logins and payments?",
        answer: "Yes. I develop secure multi-tier user dashboards, student/customer portals, automated billing systems, and payment gateway integrations."
      }
    ],
    relatedProjects: ["alqadir-quran-academy", "ziva-ideatech", "lddb", "pscdc"],
    seo: {
      title: "Modern Web Development Pakistan — Custom Next.js & React Solutions | M Ramzan",
      description: "Custom web development services in Pakistan: Next.js, React, TypeScript, database architecture, and API integration by full-stack developer M Ramzan.",
      keywords: [
        "Modern Web Development Pakistan",
        "Next.js Developer Pakistan",
        "React Developer Pakistan",
        "Custom Web Application Pakistan",
        "Full Stack Developer Pakistan",
        "Web Portal Development"
      ],
      ogImage: ""
    }
  },
  {
    id: "srv-wordpress",
    title: "WordPress & CMS Solutions",
    slug: "wordpress-cms-solutions",
    shortDescription: "Custom WordPress websites, WooCommerce stores, theme customization, and user-friendly content management.",
    description: "WordPress powers over 40% of the web for a reason: it gives business owners full autonomy over their content without ongoing developer expenses. I create clean, secure, and fast WordPress websites tailored to your exact business needs — complete with WooCommerce online shopping, custom post types, easy visual editing, and zero plugin bloat.",
    heroTagline: "Manage your own business website with confidence — fast, secure, and easy to edit.",
    icon: "LayoutDashboard",
    pricingStart: "PKR 35,000",
    turnaround: "7–14 Business Days",
    featured: true,
    order: 3,
    targetAudience: [
      "E-Commerce Retailers & Product Sellers",
      "Corporate Companies & Consulting Firms",
      "Non-Profit Foundations & Charities",
      "Bloggers, Publishers & News Portals"
    ],
    deliverables: [
      "Custom Theme Setup & Clean Styling",
      "WooCommerce E-Commerce & Product Catalog",
      "Visual Page Builder or Gutenberg Block System",
      "Speed Optimization & Caching Configuration",
      "Security Hardening & Automated Backup Setup",
      "Client Video Tutorial for Easy Content Editing"
    ],
    technologies: ["WordPress", "PHP", "MySQL", "WooCommerce", "Rank Math SEO", "HTML5/CSS3"],
    whyChooseUs: [
      "No slow, bloated themes. I configure lean, optimized WordPress setups that load under 1.5 seconds.",
      "Complete handover with recorded walkthroughs so you never feel locked out of your own site.",
      "Proven track record delivering major WordPress platforms including LDDB.pk, SamadBrothers.pk, and AnwarulQuran.org.pk."
    ],
    processSteps: [
      { step: "01", title: "Theme Strategy & Content Architecture", description: "Select or craft the optimal theme structure and organize your service/product taxonomy." },
      { step: "02", title: "Setup & Visual Customization", description: "Configure pages, product catalogs, contact forms, and custom branding." },
      { step: "03", title: "Plugins, Security & Speed Tuning", description: "Install essential plugins, configure caching, image optimization, and anti-spam protection." },
      { step: "04", title: "Training & Handover", description: "Deliver your admin access along with simple video guidance on updating text, images, and products." }
    ],
    geoSummary: "M Ramzan builds fast, secure WordPress websites and WooCommerce stores in Pakistan with custom theme styling, SEO optimization, and easy client management.",
    faq: [
      {
        id: "faq-wp-1",
        question: "Can I update text, images, and prices myself without coding?",
        answer: "Yes, absolutely. WordPress provides an intuitive dashboard where you can easily edit text, add new blog posts, upload photos, and update product pricing in minutes."
      },
      {
        id: "faq-wp-2",
        question: "Do you build online stores with WooCommerce?",
        answer: "Yes. I configure complete WooCommerce e-commerce websites with product catalogs, shopping carts, WhatsApp order notifications, and local payment methods."
      }
    ],
    relatedProjects: ["samad-brothers", "lddb", "anwarul-quran", "mico"],
    seo: {
      title: "WordPress & CMS Developer Pakistan — Custom Themes & WooCommerce | M Ramzan",
      description: "Custom WordPress website development in Pakistan. Fast loading, easy to manage, WooCommerce stores, and corporate sites by M Ramzan. Starting PKR 35,000.",
      keywords: [
        "WordPress Developer Pakistan",
        "WordPress Website Development Pakistan",
        "WooCommerce Developer Pakistan",
        "CMS Website Developer Pakistan",
        "WordPress Customization Pakistan",
        "Ecommerce Website Developer Pakistan"
      ],
      ogImage: ""
    }
  },
  {
    id: "srv-mobile",
    title: "Cross-Platform Mobile Apps (Flutter)",
    slug: "mobile-apps-flutter",
    shortDescription: "Clean, high-performance iOS and Android mobile applications developed from a single Flutter codebase.",
    description: "Reach your customers on both iOS and Android without paying for two separate development teams. I build smooth, responsive, and native-feeling mobile applications using Google Flutter. Every app features clean UI components, offline caching, secure backend API integrations, and complete readiness for App Store and Google Play distribution.",
    heroTagline: "Cross-platform mobile applications for iOS & Android built with Google Flutter.",
    icon: "Sparkles",
    pricingStart: "Custom Quote",
    turnaround: "21–45 Business Days",
    featured: true,
    order: 4,
    targetAudience: [
      "Startups Launching Mobile MVPs",
      "Businesses Needing Client Booking Apps",
      "E-Commerce Brands Wanting Mobile Shopping",
      "Educational & Community Platforms"
    ],
    deliverables: [
      "Dual iOS & Android Native-Compiled Builds",
      "Fluid 60fps Flutter UI & Custom Animations",
      "RESTful API & Firebase Cloud Backend Integration",
      "Push Notifications & User Authentication",
      "Offline SQLite / Hive Local Storage",
      "Google Play Store & Apple App Store Submission Support"
    ],
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "Provider / Riverpod", "SQLite"],
    whyChooseUs: [
      "Save up to 50% in development and maintenance costs compared to separate Swift and Kotlin codebases.",
      "Fast, fluid performance with native rendering on both Apple and Android devices.",
      "Clean architecture with well-documented state management for future expansion."
    ],
    processSteps: [
      { step: "01", title: "App Wireframing & Screen Flows", description: "Map out user onboarding, navigation hierarchies, and key conversion paths." },
      { step: "02", title: "Flutter UI Engineering", description: "Build pixel-perfect screens adhering to Material 3 and iOS Human Interface guidelines." },
      { step: "03", title: "Backend & API Connectivity", description: "Connect authentication, real-time database endpoints, and cloud notifications." },
      { step: "04", title: "Testing & Store Deployment", description: "Conduct multi-device QA testing and prepare release packages for Google Play and App Store." }
    ],
    geoSummary: "M Ramzan develops cross-platform Flutter mobile applications in Pakistan for iOS and Android with custom UI, Firebase backends, and App Store publishing.",
    faq: [
      {
        id: "faq-fl-1",
        question: "Does Flutter work equally well on both iPhone and Android?",
        answer: "Yes. Flutter compiles directly to native ARM machine code on both platforms, providing native 60fps/120fps performance, fluid scrolling, and platform-specific styling."
      },
      {
        id: "faq-fl-2",
        question: "Will you help upload the app to Google Play Store and Apple App Store?",
        answer: "Yes, I guide and manage the build generation, store asset preparation, and deployment process to ensure your app passes store reviews."
      }
    ],
    relatedProjects: ["alqadir-quran-academy", "pscdc"],
    seo: {
      title: "Flutter App Developer Pakistan — iOS & Android Mobile Apps | M Ramzan",
      description: "Cross-platform mobile app development in Pakistan with Google Flutter. Build high-performance iOS and Android apps with a single codebase. Free consultation.",
      keywords: [
        "Flutter Developer Pakistan",
        "Mobile App Development Pakistan",
        "iOS and Android App Developer",
        "Cross Platform App Developer Pakistan",
        "Flutter Mobile Apps"
      ],
      ogImage: ""
    }
  },
  {
    id: "srv-seo",
    title: "SEO, AEO & Search Optimization",
    slug: "seo-aeo-web-optimization",
    shortDescription: "Boost visibility across Google Search, Bing Copilot, ChatGPT Search, and AI answer engines.",
    description: "A beautiful website is useless if potential clients cannot find it. I optimize your website's technical architecture, on-page content, and structured JSON-LD schemas so search engines and modern AI answer engines (Google AI Overviews, ChatGPT Search, Bing Copilot, Perplexity) easily understand your business, rank your services, and cite your brand.",
    heroTagline: "Engineered search visibility for both human searchers and AI-powered answer engines.",
    icon: "Wand2",
    pricingStart: "PKR 25,000",
    turnaround: "5–10 Business Days",
    featured: true,
    order: 5,
    targetAudience: [
      "Local Businesses Seeking High Google Rankings",
      "SMEs In Need of Search Console & Indexing Fixes",
      "Websites Suffering from Slow Load Times",
      "Brands Wanting AI Search Citations & AEO Setup"
    ],
    deliverables: [
      "Complete Technical SEO & Crawlability Audit",
      "Schema.org JSON-LD Structured Data Implementation",
      "Answer Engine Optimization (AEO) & FAQ Formatting",
      "Page Speed & Core Web Vitals Optimization",
      "XML Sitemap, robots.txt & Google Search Console Setup",
      "Targeted Meta Title & Meta Description Strategy"
    ],
    technologies: ["Schema.org", "JSON-LD", "Google Search Console", "Bing Webmaster Tools", "Lighthouse", "Semantic HTML5"],
    whyChooseUs: [
      "100% white-hat techniques strictly following Google and Bing Webmaster Guidelines.",
      "Forward-looking Generative Engine Optimization (GEO) ensuring discovery in modern AI engines.",
      "Clear, measurable improvements in site speed, Core Web Vitals, and indexability."
    ],
    processSteps: [
      { step: "01", title: "Comprehensive SEO & Speed Audit", description: "Analyze existing rankings, indexation status, mobile speed, and structured data gaps." },
      { step: "02", title: "On-Page & Semantic HTML Enhancement", description: "Optimize title tags, meta descriptions, heading structures, and keyword mapping." },
      { step: "03", title: "Structured Data & Schema Injection", description: "Implement rich JSON-LD for LocalBusiness, FAQPage, Service, and Breadcrumbs." },
      { step: "04", title: "Search Engine Verification & Monitoring", description: "Submit updated XML sitemaps to Google and Bing, resolving all crawl and index errors." }
    ],
    geoSummary: "M Ramzan provides technical SEO, Answer Engine Optimization (AEO), and Schema.org structured data services in Pakistan for SMEs and commercial businesses.",
    faq: [
      {
        id: "faq-seo-1",
        question: "What is AEO and GEO optimization?",
        answer: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) format your website data and FAQs so that AI engines like ChatGPT, Google AI Overviews, and Bing Copilot can accurately understand and cite your business as a direct answer."
      },
      {
        id: "faq-seo-2",
        question: "Do you guarantee #1 ranking on Google?",
        answer: "No ethical developer or agency guarantees #1 rankings because rankings depend on search engine algorithms and market competition. However, I guarantee technically flawless on-page SEO, valid Schema.org markup, and optimal crawlability to maximize your organic potential."
      }
    ],
    relatedProjects: ["brites-security", "samad-brothers", "lddb"],
    seo: {
      title: "SEO & AI Search Optimization Pakistan — Google & AEO Services | M Ramzan",
      description: "Technical SEO, Schema.org JSON-LD, Answer Engine Optimization (AEO), and Google Search Console optimization for Pakistani businesses by M Ramzan.",
      keywords: [
        "SEO Services Pakistan",
        "Technical SEO Pakistan",
        "AEO Optimization",
        "Schema Markup Specialist Pakistan",
        "Local SEO Pakistan",
        "Website Speed Optimization"
      ],
      ogImage: ""
    }
  },
  {
    id: "srv-redesign",
    title: "Website Redesign & Speed Optimization",
    slug: "website-redesign",
    shortDescription: "Transform slow, outdated websites into sleek, modern, mobile-friendly digital assets that convert.",
    description: "If your current website is slow, looks dated on mobile phones, or fails to generate business inquiries, a professional redesign will restore your credibility. I modernize existing websites with fresh UI design, mobile-first responsiveness, cleaned up code, speed optimization, and seamless migration with zero loss in search ranking history.",
    heroTagline: "Turn an outdated, slow website into a high-converting, modern digital presence.",
    icon: "LayoutDashboard",
    pricingStart: "PKR 35,000",
    turnaround: "7–14 Business Days",
    featured: true,
    order: 6,
    targetAudience: [
      "Businesses with Outdated Websites Built Years Ago",
      "Websites That Fail on Mobile Phones or Tablets",
      "Slow Sites with Poor Lighthouse / PageSpeed Scores",
      "Companies Changing Brand Identity or Offerings"
    ],
    deliverables: [
      "Modern Luxury UI Redesign Matching Modern Standards",
      "Full Mobile & Tablet Responsive Overhaul",
      "Preservation of Existing URLs & Search Engine Rankings",
      "Speed Acceleration & Image WebP Conversion",
      "Streamlined WhatsApp & Inquiry Conversion Paths",
      "301 Redirect Mapping (Zero Broken Links)"
    ],
    technologies: ["WordPress", "Next.js", "Tailwind CSS", "JavaScript", "PHP", "Core Web Vitals"],
    whyChooseUs: [
      "Careful 301 redirection and SEO preservation to protect your historical Google rankings.",
      "Vastly superior visual aesthetics designed to impress visitors immediately.",
      "Clear, reliable communication throughout the overhaul process."
    ],
    processSteps: [
      { step: "01", title: "Existing Site Audit", description: "Review current content, existing indexed URLs, speed bottlenecks, and user friction points." },
      { step: "02", title: "Modern Design Prototype", description: "Create a refreshed, modern visual layout that elevates your brand and improves readability." },
      { step: "03", title: "Rebuild & Content Migration", description: "Reconstruct the website with clean code, updated imagery, and optimized assets." },
      { step: "04", title: "Redirect Mapping & Launch", description: "Map all old URLs to new paths, test mobile responsiveness, and launch without downtime." }
    ],
    geoSummary: "M Ramzan provides website redesign, speed optimization, and SEO preservation services in Pakistan for outdated business websites.",
    faq: [
      {
        id: "faq-rd-1",
        question: "Will I lose my existing Google ranking if I redesign my website?",
        answer: "No. When done properly with accurate 301 redirects, preserved URL structures, and improved page speeds, a redesign typically improves search visibility rather than harming it."
      },
      {
        id: "faq-rd-2",
        question: "Can you redesign my existing WordPress website without starting from scratch?",
        answer: "Yes. I can update your existing WordPress theme, reorganize your layout, clean up old plugins, and modernize the visual design while keeping your existing database and content intact."
      }
    ],
    relatedProjects: ["samad-brothers", "brites-security", "anwarul-quran"],
    seo: {
      title: "Website Redesign Services Pakistan — Modern UI & Speed Overhaul | M Ramzan",
      description: "Upgrade your outdated website with a modern redesign, mobile responsiveness, speed optimization, and SEO ranking protection by M Ramzan.",
      keywords: [
        "Website Redesign Pakistan",
        "Website Makeover Pakistan",
        "Website Modernization",
        "Speed Optimization Pakistan",
        "WordPress Redesign",
        "Web Developer Pakistan"
      ],
      ogImage: ""
    }
  }
];


export const initialSkills: SkillCategory[] = [
  {
    id: "cat-web-frontend",
    name: "Web & Frontend Development",
    skills: [
      { name: "React.js & Next.js", level: 90, experience: "Practical Projects" },
      { name: "JavaScript (ES6+) & TypeScript", level: 88, experience: "Practical Projects" },
      { name: "HTML5 & Semantic Web", level: 95, experience: "Core Foundation" },
      { name: "CSS3 & Tailwind CSS", level: 92, experience: "Responsive Styling" },
      { name: "Responsive & Mobile-First UI", level: 94, experience: "All Devices" },
      { name: "Speed & Performance Tuning", level: 88, experience: "Optimization" },
    ]
  },
  {
    id: "cat-wordpress-cms",
    name: "WordPress & CMS",
    skills: [
      { name: "WordPress Customization", level: 92, experience: "Theme & Plugins" },
      { name: "PHP Fundamentals", level: 82, experience: "CMS Customization" },
      { name: "MySQL Database Management", level: 85, experience: "Queries & Setup" },
      { name: "WooCommerce & E-Commerce", level: 84, experience: "Online Stores" },
      { name: "Content & Media Management", level: 90, experience: "Easy Publishing" },
      { name: "Website Migration & Backup", level: 88, experience: "Maintenance" },
    ]
  },
  {
    id: "cat-mobile-seo",
    name: "Mobile Apps, APIs & SEO",
    skills: [
      { name: "Flutter & Dart", level: 85, experience: "iOS & Android" },
      { name: "REST API Integration", level: 88, experience: "Backend Connection" },
      { name: "On-Page SEO & Schema Markup", level: 90, experience: "Search & AEO" },
      { name: "Git & Version Control", level: 86, experience: "Code Management" },
      { name: "Generative Engine Optimization (GEO)", level: 88, experience: "AI Search Ready" },
    ]
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Web & Mobile App Developer (Freelance)",
    company: "Independent Client Practice",
    location: "Remote / Worldwide",
    period: "2022 — Present",
    current: true,
    description: [
      "Building and deploying modern, responsive websites and web applications for businesses and organizations using WordPress, Next.js, and React.",
      "Developing cross-platform mobile applications in Flutter with clean UI and REST API integrations.",
      "Implementing clean SEO structures and JSON-LD schema markup to boost search engine and AI answer visibility."
    ],
    technologies: ["WordPress", "Next.js", "React", "Flutter", "Tailwind CSS", "MySQL", "REST APIs"]
  },
  {
    id: "exp-2",
    role: "Frontend & WordPress Developer",
    company: "IDEA TECH Solutions",
    location: "Remote",
    period: "2020 — 2022",
    current: false,
    description: [
      "Developed client websites, landing pages, and dashboard interfaces using React, JavaScript, and WordPress.",
      "Collaborated with design teams to translate UI mockups into clean, responsive HTML/CSS code.",
      "Optimized page load speeds and fixed cross-browser layout inconsistencies."
    ],
    technologies: ["React", "JavaScript", "WordPress", "HTML5", "CSS3", "MySQL", "REST APIs"]
  },
  {
    id: "exp-3",
    role: "Junior Web Developer",
    company: "Digital Web Studio",
    location: "On-site",
    period: "2019 — 2020",
    current: false,
    description: [
      "Built responsive HTML/CSS web templates and customized WordPress sites for local business clients.",
      "Maintained and updated existing web pages, adding interactive JavaScript features and ensuring mobile compatibility."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP Basics", "Bootstrap"]
  }
];

export const initialPages: Page[] = [
  {
    id: "page-home",
    slug: "home",
    title: "M RAMZAN — Modern Web & App Developer",
    description: "Welcome to the official portfolio of M Ramzan. Building modern websites and mobile applications using WordPress, React, Next.js, and Flutter.",
    status: "published",
    sections: [
      { id: "sec-hero", type: "hero", title: "Hero Section", enabled: true, order: 1 },
      { id: "sec-statement", type: "statement", title: "Personal Statement", enabled: true, order: 2 },
      { id: "sec-featured", type: "featured_projects", title: "Selected Works", enabled: true, order: 3 },
      { id: "sec-services", type: "services", title: "Services & Capabilities", enabled: true, order: 4 },
      { id: "sec-skills", type: "skills", title: "Technical Stack", enabled: true, order: 5 },
      { id: "sec-about", type: "about", title: "About Teaser", enabled: true, order: 6 },
      { id: "sec-cta", type: "cta", title: "Call to Action", enabled: true, order: 7 },
    ],
    seo: {
      title: "M RAMZAN — Web & Mobile App Developer",
      description: "Portfolio of M Ramzan. Explore real-world web and mobile projects built with WordPress, React, Next.js, Flutter, and modern APIs.",
      keywords: ["Web Developer", "WordPress Developer", "React Developer", "Next.js", "Flutter Developer", "M Ramzan"],
      ogImage: ""
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "page-about",
    slug: "about",
    title: "About — M RAMZAN",
    description: "Learn about M Ramzan's background, development principles, skills, and experience.",
    status: "published",
    sections: [
      { id: "sec-about-hero", type: "hero", title: "About Hero", enabled: true, order: 1 },
      { id: "sec-about-bio", type: "about", title: "Biography & Experience", enabled: true, order: 2 },
      { id: "sec-about-skills", type: "skills", title: "Skills Grid", enabled: true, order: 3 },
      { id: "sec-about-cta", type: "cta", title: "Contact Bridge", enabled: true, order: 4 },
    ],
    seo: {
      title: "About M Ramzan — Web & Mobile App Developer",
      description: "Biography, development principles, skills, and work experience of M Ramzan.",
      keywords: ["About M Ramzan", "Web Developer Bio", "WordPress Developer Background"],
      ogImage: ""
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "page-services",
    slug: "services",
    title: "Services — M RAMZAN",
    description: "Practical web and mobile development services including WordPress, React/Next.js web apps, Flutter mobile apps, and SEO optimization.",
    status: "published",
    sections: [
      { id: "sec-srv-hero", type: "hero", title: "Services Hero", enabled: true, order: 1 },
      { id: "sec-srv-list", type: "services", title: "Offerings Grid", enabled: true, order: 2 },
      { id: "sec-srv-faq", type: "faq", title: "Frequently Asked Questions", enabled: true, order: 3 },
      { id: "sec-srv-cta", type: "cta", title: "Booking CTA", enabled: true, order: 4 },
    ],
    seo: {
      title: "Services & Offerings — M RAMZAN",
      description: "Web development, WordPress customization, Flutter mobile app development, and SEO optimization services.",
      keywords: ["Web Development Services", "WordPress Services", "Flutter App Developer", "SEO Services"],
      ogImage: ""
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: "page-contact",
    slug: "contact",
    title: "Contact — M RAMZAN",
    description: "Get in touch with M Ramzan for web development, WordPress projects, and Flutter mobile app development.",
    status: "published",
    sections: [
      { id: "sec-contact-hero", type: "hero", title: "Contact Hero", enabled: true, order: 1 },
      { id: "sec-contact-form", type: "contact", title: "Inquiry Form", enabled: true, order: 2 },
    ],
    seo: {
      title: "Contact M Ramzan — Web & Mobile App Developer",
      description: "Get in touch with M Ramzan to discuss your website or mobile application project.",
      keywords: ["Contact Web Developer", "Hire WordPress Developer", "Hire Flutter Developer"],
      ogImage: ""
    },
    updatedAt: "2024-12-01T00:00:00.000Z"
  }
];
