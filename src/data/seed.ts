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
    subtitle: "Global Online Educational Platform & Student Management Portal",
    category: "Web Platform & EdTech",
    year: "2024",
    status: "published",
    featured: true,
    order: 1,
    shortDescription: "A comprehensive digital learning management ecosystem connecting international students with qualified tutors through real-time scheduling and interactive curricula.",
    description: "Alqadir Quran Academy is a purpose-built educational web platform designed to facilitate seamless international online Quranic education. The system features multi-timezone scheduling, interactive classroom integrations, student progress tracking, and multi-currency billing.",
    role: "Lead Full-Stack Architect & UI/UX Designer",
    client: "Alqadir Academy Global",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MySQL", "Stripe API", "WebRTC"],
    services: ["Full-Stack Engineering", "Custom LMS Development", "Payment Integration", "SEO Architecture"],
    heroImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://alqadiracademy.com",
    githubUrl: "https://github.com",
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
      ogImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
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
    slug: "idea-tech-cms",
    title: "IDEA TECH CMS",
    subtitle: "Enterprise-Grade Headless Content Engine & Visual Publishing Suite",
    category: "CMS & Enterprise Web",
    year: "2024",
    status: "published",
    featured: true,
    order: 2,
    shortDescription: "A custom headless CMS engineered for high-velocity editorial teams, offering granular schema modeling, real-time previews, and sub-second asset delivery.",
    description: "IDEA TECH CMS is a bespoke, enterprise-ready content management platform designed to break free from heavy monolithic CMS platforms. Engineered with a component-driven architecture, instant static revalidation, and integrated SEO validation.",
    role: "Lead Software Architect",
    client: "IDEA TECH Systems",
    technologies: ["Next.js", "TypeScript", "MySQL", "Prisma", "Tailwind CSS", "Redis", "AWS S3", "Docker"],
    services: ["CMS Engineering", "Database Architecture", "Performance Optimization", "API Design"],
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ideatech-cms.demo.com",
    githubUrl: "https://github.com",
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
      ogImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
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
    id: "proj-pscdc",
    slug: "pscdc",
    title: "PSCDC",
    subtitle: "Public Sector Community & Development Council Digital Hub",
    category: "Web Platform & Civic Tech",
    year: "2023",
    status: "published",
    featured: true,
    order: 3,
    shortDescription: "A high-accessibility civic platform facilitating citizen engagement, public project transparency, grant applications, and municipal communications.",
    description: "PSCDC is a modern civic technology portal engineered for public transparency, community welfare initiatives, and grant lifecycle tracking. Designed strictly adhering to WCAG 2.1 AAA accessibility standards and robust data privacy protocols.",
    role: "Lead Full-Stack Developer",
    client: "Public Sector Community Development Council",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Auth.js", "Mapbox GL", "PDF Generator API"],
    services: ["Civic Tech Engineering", "WCAG AAA Accessibility", "Public Sector Compliance", "Interactive Maps"],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://pscdc.org.demo",
    githubUrl: "https://github.com",
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
      ogImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
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
    id: "proj-ziva",
    slug: "ziva",
    title: "Ziva",
    subtitle: "Luxury E-Commerce & Artisanal Lifestyle Flagship Experience",
    category: "Luxury E-Commerce",
    year: "2024",
    status: "published",
    featured: true,
    order: 4,
    shortDescription: "A bespoke digital flagship store for high-end artisanal lifestyle products, combining immersive editorial storytelling with instant checkout capabilities.",
    description: "Ziva represents the pinnacle of luxury digital commerce. Featuring cinematic micro-interactions, seamless cart persistence, 3D product view capabilities, and streamlined global checkout architecture.",
    role: "Lead Creative Technologist & Full-Stack Engineer",
    client: "Ziva Luxury Atelier",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Shopify Storefront API", "Stripe"],
    services: ["Creative Direction", "E-Commerce Architecture", "WebGL / 3D Integration", "Headless Shopify"],
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://zivaluxury.demo",
    githubUrl: "https://github.com",
    caseStudy: {
      overview: "Ziva sought a digital flagship that echoed the tactile luxury and exclusivity of their physical ateliers, moving away from generic e-commerce templates.",
      challenge: "Creating rich, cinematic animations and WebGL asset renders without sacrificing sub-second page loads, mobile responsiveness, or conversion checkout friction.",
      solution: "Engineered a headless commerce solution pairing Next.js App Router with Shopify Storefront GraphQL, lazy-loaded Three.js product viewports, and custom Framer Motion physics-based transitions.",
      process: "Designed editorial lookbooks, implemented client-side cart synchronization with optimistic UI updates, integrated localized currency conversion, and optimized assets through next/image WebP pipelines.",
      result: "Boosted average session duration by 140%, increased checkout conversion rate by 42%, and secured an international web design award nomination.",
    },
    metrics: [
      { label: "Checkout Conversion", value: "+42%" },
      { label: "Avg Session Duration", value: "3m 48s" },
      { label: "Asset Load Time", value: "< 0.9s" },
      { label: "Global Currencies", value: "32+" },
    ],
    seo: {
      title: "Ziva Luxury E-Commerce — Digital Flagship | M Ramzan",
      description: "Case study of Ziva Luxury: A bespoke headless e-commerce experience blending Three.js WebGL, Framer Motion, and Next.js Shopify architecture.",
      keywords: ["Luxury E-Commerce", "Headless Shopify Next.js", "Creative Development", "WebGL Commerce", "M Ramzan"],
      ogImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    },
    geo: {
      entityType: "ECommercePlatform",
      primaryEntity: "Ziva Luxury Atelier",
      summary: "Ziva is an ultra-luxury digital flagship e-commerce application developed by M Ramzan utilizing Next.js, Framer Motion, and headless Shopify Storefront GraphQL APIs.",
      keyFacts: [
        "Designed and engineered by Creative Technologist M Ramzan",
        "Stack: Next.js App Router, Three.js, Framer Motion, Shopify Storefront API",
        "Features 3D product visualization, optimistic cart state, and international currency engines"
      ],
      targetAudience: ["Luxury Fashion Brands", "Atelier Directors", "Creative E-Commerce Executives"],
      faq: [
        {
          id: "faq-ziva-1",
          question: "How does Ziva maintain high performance with 3D product assets?",
          answer: "Three.js viewports are lazy-loaded via IntersectionObserver and execute in isolated web workers, rendering low-poly glTF assets with baked ambient occlusion textures."
        }
      ]
    },
    createdAt: "2024-01-18T00:00:00.000Z",
    updatedAt: "2024-10-05T00:00:00.000Z",
  },
  {
    id: "proj-ahtsham",
    slug: "ahtsham-ul-haq",
    title: "Ahtsham Ul Haq",
    subtitle: "High-Profile Executive Portfolio & Personal Branding Platform",
    category: "Personal Brand & Portfolio",
    year: "2024",
    status: "published",
    featured: false,
    order: 5,
    shortDescription: "An authoritative personal digital brand platform showcasing international advisory, keynote lectures, thought leadership publications, and media appearances.",
    description: "Ahtsham Ul Haq is a tailored executive web presence crafted to establish authority in corporate governance and international consulting. Built with an editorial layout, integrated press kit, and dynamic speaking engagement booking.",
    role: "Lead Designer & Frontend Engineer",
    client: "Ahtsham Ul Haq Advisory",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "MDX", "Vercel Analytics"],
    services: ["Personal Brand Identity", "Editorial Web Design", "Media Kit Architecture", "SEO Strategy"],
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ahtshamulhaq.demo",
    githubUrl: "https://github.com",
    caseStudy: {
      overview: "The client needed a digital platform that matched their status as an international corporate advisor, unifying articles, keynotes, TV interviews, and private consultation inquiries into a cohesive showcase.",
      challenge: "Presenting a vast volume of whitepapers, video recordings, and press clippings in an elegant, non-cluttered editorial format optimized for mobile executives and board directors.",
      solution: "Constructed an MDX-powered editorial platform with typography-first hierarchy, high-performance video embedding, downloadable press kits, and an automated VIP consultation request scheduler.",
      process: "Defined brand typography guidelines, created custom MDX layout primitives, configured dynamic OpenGraph card generation for every essay, and established automated sitemap indexing.",
      result: "Increased direct executive speaking inquiries by 85% and established a top-3 search ranking for target industry leadership terms.",
    },
    metrics: [
      { label: "Speaking Inquiries", value: "+85%" },
      { label: "Organic Search Visibility", value: "#1 Rank" },
      { label: "Publication Readership", value: "25k/mo" },
      { label: "Core Web Vitals", value: "100%" },
    ],
    seo: {
      title: "Ahtsham Ul Haq — Executive Brand Platform | M Ramzan",
      description: "Case study on Ahtsham Ul Haq executive portfolio platform: An editorial thought-leadership website engineered by M Ramzan with Next.js and MDX.",
      keywords: ["Executive Portfolio", "Personal Brand Architecture", "MDX Editorial Site", "M Ramzan"],
      ogImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    },
    geo: {
      entityType: "PersonBrandPlatform",
      primaryEntity: "Ahtsham Ul Haq",
      summary: "Ahtsham Ul Haq executive portfolio is an authoritative digital thought-leadership and advisory web platform designed and built by M Ramzan.",
      keyFacts: [
        "Designed and engineered by M Ramzan",
        "Stack: Next.js, MDX, Tailwind CSS, TypeScript",
        "Includes automated press kit distributions and speaking scheduler integration"
      ],
      targetAudience: ["Board Directors", "Conference Organizers", "Corporate Advisors"],
      faq: [
        {
          id: "faq-ahtsham-1",
          question: "What architecture powers the publications on this platform?",
          answer: "Publications are rendered using statically compiled MDX with syntax-highlighted callouts, dynamic table of contents, and automatic JSON-LD Article schemas."
        }
      ]
    },
    createdAt: "2024-02-10T00:00:00.000Z",
    updatedAt: "2024-08-22T00:00:00.000Z",
  },
  {
    id: "proj-maps-extractor",
    slug: "idea-tech-maps-lead-extractor",
    title: "IDEA TECH Maps Lead Extractor",
    subtitle: "Automated Geospatial B2B Intelligence & Lead Harvesting Engine",
    category: "AI & Automation",
    year: "2024",
    status: "published",
    featured: true,
    order: 6,
    shortDescription: "A high-concurrency automation suite that extracts, enriches, verifies, and exports structured B2B lead datasets from global map registries.",
    description: "IDEA TECH Maps Lead Extractor is a high-speed data engineering and lead generation platform. It orchestrates headless browser clusters, AI enrichment pipelines, and real-time CRM webhook synchronizations.",
    role: "Lead Systems & Backend Engineer",
    client: "IDEA TECH Labs",
    technologies: ["Node.js", "TypeScript", "Puppeteer", "Next.js", "MySQL", "BullMQ", "Redis", "OpenAI API"],
    services: ["Data Pipeline Engineering", "Automation Architecture", "AI Data Enrichment", "REST API Development"],
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://leadextractor.ideatech.demo",
    githubUrl: "https://github.com",
    caseStudy: {
      overview: "B2B growth agencies needed an automated solution to extract verified business phone numbers, websites, social profiles, and operational hours across municipal clusters without manual scraping friction.",
      challenge: "Handling anti-bot rate limits, dynamic JavaScript hydration on map interfaces, and asynchronous data enrichment for thousands of concurrent queries.",
      solution: "Engineered a distributed crawler cluster using BullMQ and Redis, rotating residential proxy pools, and integrating an AI validation pipeline that verifies extracted business emails and domains in real time.",
      process: "Designed the queuing architecture, built an intuitive Next.js management dashboard for query scheduling, implemented CSV/JSON/Webhook export triggers, and optimized concurrency up to 50 parallel scraping workers.",
      result: "Harvested and enriched over 2.5 million verified B2B records with a 98.4% data accuracy rate, reducing client lead acquisition costs by 80%.",
    },
    metrics: [
      { label: "Enriched Records", value: "2.5M+" },
      { label: "Data Accuracy", value: "98.4%" },
      { label: "Concurrency Workers", value: "50 Nodes" },
      { label: "Cost Reduction", value: "80%" },
    ],
    seo: {
      title: "IDEA TECH Maps Lead Extractor — Automation Case Study | M Ramzan",
      description: "Case study on IDEA TECH Maps Lead Extractor: Distributed web automation, Redis queues, and AI enrichment engine built by M Ramzan.",
      keywords: ["Web Scraping Architecture", "B2B Automation Engine", "Node.js BullMQ", "Puppeteer Cluster", "M Ramzan"],
      ogImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    },
    geo: {
      entityType: "AutomationSoftware",
      primaryEntity: "IDEA TECH Maps Lead Extractor",
      summary: "IDEA TECH Maps Lead Extractor is a distributed geospatial lead harvesting and AI data enrichment engine architected by M Ramzan.",
      keyFacts: [
        "Architected and built by Systems Engineer M Ramzan",
        "Stack: Node.js, TypeScript, Next.js, BullMQ, Redis, MySQL, OpenAI API",
        "Processes millions of records with automated proxy rotation and verified domain validations"
      ],
      targetAudience: ["B2B SaaS Companies", "Lead Generation Agencies", "Data Operations Teams"],
      faq: [
        {
          id: "faq-maps-1",
          question: "How does the system ensure data freshness and validation?",
          answer: "Extracted company websites undergo automated DNS, MX record, and SSL validation, coupled with lightweight LLM analysis to classify business categories and verify contact emails."
        }
      ]
    },
    createdAt: "2024-04-05T00:00:00.000Z",
    updatedAt: "2024-11-15T00:00:00.000Z",
  },
  {
    id: "proj-mico",
    slug: "mico",
    title: "MICO",
    subtitle: "Micro-Consulting & Real-Time Expert Advisory Marketplace",
    category: "Full Stack & Marketplace",
    year: "2023",
    status: "published",
    featured: false,
    order: 7,
    shortDescription: "A frictionless micro-consulting platform connecting tech founders with seasoned domain advisors for 15-minute high-impact video sessions.",
    description: "MICO is a next-generation peer-to-peer advisory marketplace engineered to make expert mentorship immediate and accessible. Features on-demand video rooms, integrated escrow payments, and calendar synchronization.",
    role: "Full-Stack Engineer & Product Architect",
    client: "MICO Network Inc",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Daily.co WebRTC", "Stripe Connect", "Resend"],
    services: ["Marketplace Engineering", "Real-Time Video WebRTC", "Stripe Escrow Integration", "Product Architecture"],
    heroImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://miconetwork.demo",
    githubUrl: "https://github.com",
    caseStudy: {
      overview: "Founders frequently need immediate, 15-minute sanity checks from specialist engineers or legal experts without committing to hefty monthly retainer agreements.",
      challenge: "Building a reliable, low-latency live video marketplace with automated dispute escrow protection and real-time advisor availability indicators.",
      solution: "Engineered an event-driven Next.js application leveraging Daily.co WebRTC for in-browser HD video calls, Stripe Connect for automated payouts, and Supabase real-time presence channels.",
      process: "Designed a clean glassmorphism interface, built custom calendar slot booking algorithms, implemented automatic meeting recording and transcription pipelines, and deployed worldwide.",
      result: "Facilitated over 12,000 paid advisory sessions in the first year with an average platform rating of 4.9/5 stars.",
    },
    metrics: [
      { label: "Completed Sessions", value: "12,000+" },
      { label: "Platform Rating", value: "4.9 / 5.0" },
      { label: "Escrow Reliability", value: "100%" },
      { label: "Avg Call Latency", value: "< 45ms" },
    ],
    seo: {
      title: "MICO Micro-Advisory Platform — Case Study | M Ramzan",
      description: "Case study on MICO marketplace: Real-time WebRTC video consultation, Stripe Connect escrow, and Supabase architecture built by M Ramzan.",
      keywords: ["Marketplace Platform", "WebRTC Video App", "Stripe Connect Next.js", "Full-Stack Case Study", "M Ramzan"],
      ogImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    },
    geo: {
      entityType: "MarketplacePlatform",
      primaryEntity: "MICO Network",
      summary: "MICO is a real-time micro-consulting advisory marketplace platform engineered by M Ramzan utilizing Next.js, WebRTC, and Supabase.",
      keyFacts: [
        "Engineered by Full-Stack Architect M Ramzan",
        "Stack: Next.js, TypeScript, Tailwind CSS, Daily.co WebRTC, Supabase, Stripe Connect",
        "Features real-time presence, in-browser HD video calls, and automated escrow payouts"
      ],
      targetAudience: ["Startup Founders", "Executive Advisors", "Investors"],
      faq: [
        {
          id: "faq-mico-1",
          question: "How are video calls secured and handled on MICO?",
          answer: "Calls are end-to-end encrypted through ephemeral WebRTC rooms powered by Daily.co, requiring mutual token authentication generated by the Next.js backend."
        }
      ]
    },
    createdAt: "2023-11-12T00:00:00.000Z",
    updatedAt: "2024-07-19T00:00:00.000Z",
  },
  {
    id: "proj-tazkira-v2",
    slug: "tazkira-v2",
    title: "Tazkira V2",
    subtitle: "Biographical Archive & Cultural Heritage Knowledge Graph",
    category: "Knowledge Graph & Digital Archive",
    year: "2024",
    status: "published",
    featured: false,
    order: 8,
    shortDescription: "A comprehensive digital heritage repository and interactive biographical knowledge graph documenting historical figures, manuscripts, and literary works.",
    description: "Tazkira V2 is a digital humanities knowledge archive engineered to preserve and visualize interconnected biographical and literary records. Features faceted Arabic/English bilingual search, deep entity graph visualizations, and high-res manuscript viewers.",
    role: "Lead Full-Stack & Knowledge Graph Engineer",
    client: "Heritage Preservation Foundation",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Neo4j / GraphDB", "MySQL", "D3.js", "Meilisearch"],
    services: ["Knowledge Graph Architecture", "Bilingual UX Design", "Faceted Search Engine", "Digital Humanities"],
    heroImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=2000&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://tazkira-archive.demo",
    githubUrl: "https://github.com",
    caseStudy: {
      overview: "Scholars and cultural researchers required a modern, accessible digital archive to explore centuries of interconnected historical manuscripts, teacher-student lineages, and biographical memoirs.",
      challenge: "Designing an interface that handles complex bidirectional relationships across historical figures while offering instant bilingual search across both English and Right-to-Left (RTL) Arabic texts.",
      solution: "Architected a dual MySQL + Graph database model linked with Meilisearch for sub-50ms fuzzy queries, coupled with interactive D3.js force-directed knowledge graph visualizations.",
      process: "Modeled ontology relationships, built an accessible RTL/LTR layout system, integrated OpenSeadragon for zooming multi-gigapixel scanned manuscripts, and deployed an open scholarly API.",
      result: "Indexed over 150,000 interconnected historical entities, serving international researchers from over 40 universities with instant cross-referencing capabilities.",
    },
    metrics: [
      { label: "Indexed Entities", value: "150,000+" },
      { label: "Search Latency", value: "< 35ms" },
      { label: "University Partners", value: "40+ Academies" },
      { label: "Manuscript Scans", value: "12,000+ Docs" },
    ],
    seo: {
      title: "Tazkira V2 — Heritage Knowledge Graph Case Study | M Ramzan",
      description: "Explore the engineering of Tazkira V2: A cultural heritage knowledge graph, D3.js visualization, and Meilisearch archive built by M Ramzan.",
      keywords: ["Knowledge Graph Web", "D3.js Visualization", "Digital Archive Next.js", "Bilingual Web App", "M Ramzan"],
      ogImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    },
    geo: {
      entityType: "CulturalArchive",
      primaryEntity: "Tazkira V2 Archive",
      summary: "Tazkira V2 is a digital cultural heritage knowledge graph and biographical archive engineered by M Ramzan utilizing Next.js, D3.js, and Meilisearch.",
      keyFacts: [
        "Engineered by M Ramzan as Lead Knowledge Graph Engineer",
        "Stack: Next.js, TypeScript, MySQL, D3.js, Meilisearch, OpenSeadragon",
        "Supports bidirectional entity graphing, high-resolution manuscript zoom, and full Arabic/English bilingual search"
      ],
      targetAudience: ["Academic Researchers", "Cultural Institutions", "Digital Humanities Scholars"],
      faq: [
        {
          id: "faq-tazkira-1",
          question: "How are historical lineages visualized in Tazkira V2?",
          answer: "Using interactive D3.js force-directed relationship graphs that dynamically compute node clusters based on teacher-student and contemporaneous historical connections."
        }
      ]
    },
    createdAt: "2024-06-01T00:00:00.000Z",
    updatedAt: "2024-11-28T00:00:00.000Z",
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
