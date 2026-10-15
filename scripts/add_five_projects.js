const fs = require('fs');
const path = require('path');

const newProjects = [
  {
    id: "proj-paktalc",
    slug: "paktalc",
    title: "PakTalc",
    subtitle: "B2B Industrial Talc Export & Minerals Platform",
    category: "Industrial Minerals & B2B Export",
    year: "2025",
    status: "published",
    featured: true,
    order: 16,
    shortDescription: "A high-performance B2B industrial minerals web platform for PakTalc — the talc export division of SKZ Mining Company Pvt. Ltd. — supplying sorted talc lumps and ground talc powder worldwide.",
    description: "PakTalc is Pakistan's premier talc export digital platform, featuring multi-slide hero showcase, product catalogs for talc lumps and powder, an 8-step interactive mine-to-market supply chain explorer, lab testing transparency, and an RFQ workflow.",
    role: "Lead Full-Stack Developer & SEO Architect",
    client: "PakTalc — Division of SKZ Mining Company Pvt. Ltd.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vanilla CSS",
      "AVIF/WebP",
      "Schema.org",
      "Vercel"
    ],
    services: [
      "Web Development",
      "B2B Product Showcase",
      "Technical SEO",
      "RFQ Lead Generation",
      "Performance Optimization"
    ],
    heroImage: "/images/projects/paktalc/hero.jpg",
    thumbnailImage: "/images/projects/paktalc/thumbnail.jpg",
    gallery: [
      "/images/projects/paktalc/gallery-1.webp",
      "/images/projects/paktalc/gallery-2.webp",
      "/images/projects/paktalc/gallery-3.webp"
    ],
    liveUrl: "https://paktalc.com",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "PakTalc required an international-grade B2B export platform to present Pakistan's premium talc deposits to global industrial buyers across plastics, cosmetics, ceramics, and paint manufacturing.",
      challenge: "Communicating complex mining and processing operations (extraction, hand sorting, crushing, grinding, lab testing, packing, export) while presenting particle sizes, whiteness grades, and colour variants with complete technical credibility.",
      solution: "Engineered a high-performance Next.js application featuring an interactive 8-step mine-to-market explorer, structured product specification tables, Schema.org Organization/WebPage markup, and a streamlined RFQ workflow.",
      process: "Conducted industrial buyer research, mapped product specifications and chemical assays into responsive layouts, implemented dynamic image optimization with WebP/AVIF, and deployed on high-speed CDN infrastructure.",
      result: "Positioned PakTalc as Pakistan's top talc export brand online, driving international buyer inquiries from over 12 countries with 100/100 Core Web Vitals performance."
    },
    metrics: [
      { label: "Talc Colour Grades", value: "4 Grades" },
      { label: "Processing Plants", value: "2 Plants" },
      { label: "Market Reach", value: "Global B2B" },
      { label: "Core Web Vitals", value: "100/100" }
    ],
    seo: {
      title: "PakTalc — Industrial Minerals & Talc Export Platform | M Ramzan",
      description: "Case study of PakTalc: A high-performance B2B export platform for industrial talc lumps and powder built with Next.js, TypeScript, and technical SEO.",
      keywords: [
        "PakTalc",
        "Talc Exporter Pakistan",
        "Industrial Minerals Web",
        "B2B Platform",
        "M Ramzan Portfolio"
      ],
      ogImage: "/images/projects/paktalc/thumbnail.jpg"
    },
    geo: {
      entityType: "Organization",
      primaryEntity: "PakTalc",
      summary: "PakTalc is a premier industrial talc export platform from Pakistan built by M Ramzan with Next.js and high-performance WebP optimization.",
      keyFacts: [
        "Developed by M Ramzan",
        "High-performance Next.js & TypeScript architecture",
        "Interactive 8-step mine-to-market supply chain visualization",
        "Serves international industrial buyers with RFQ workflows"
      ],
      targetAudience: [
        "Industrial Procurement Officers",
        "Plastics & Paint Manufacturers",
        "B2B Importers"
      ],
      faq: [
        {
          id: "faq-1",
          question: "What industrial products are featured on PakTalc?",
          answer: "PakTalc features hand-sorted talc lumps and mesh-ground powder across multiple whiteness and particle size specifications."
        },
        {
          id: "faq-2",
          question: "How does PakTalc facilitate international buyer quotes?",
          answer: "The platform integrates an automated Request for Quote (RFQ) workflow with direct WhatsApp and email notifications."
        }
      ]
    },
    createdAt: "2025-02-01T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z"
  },
  {
    id: "proj-skz-mining",
    slug: "skz-mining",
    title: "SKZ Mining Company",
    subtitle: "Corporate Minerals Platform & Industrial Export Hub",
    category: "Industrial Minerals & B2B Corporate",
    year: "2025",
    status: "published",
    featured: true,
    order: 17,
    shortDescription: "A comprehensive corporate minerals platform for SKZ Mining Company Pvt. Ltd. — extracting, processing, and supplying talc, calcium carbonate, dolomite, and Himalayan pink salt worldwide.",
    description: "SKZ Mining Company platform features an animated hero carousel, full 6-product catalog with technical specifications, 5-step supply chain process visualization, operational facilities overview, and RFQ quotation system.",
    role: "Lead Full-Stack Developer & Web Architect",
    client: "SKZ Mining Company Pvt. Ltd.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "CSS Modules",
      "Schema.org",
      "WhatsApp API",
      "Vercel"
    ],
    services: [
      "Corporate Web Development",
      "Product Catalog Architecture",
      "Process Visualization",
      "WhatsApp Integration",
      "Technical SEO"
    ],
    heroImage: "/images/projects/skz-mining/hero.jpg",
    thumbnailImage: "/images/projects/skz-mining/thumbnail.jpg",
    gallery: [
      "/images/projects/skz-mining/gallery-1.png",
      "/images/projects/skz-mining/gallery-2.webp",
      "/images/projects/skz-mining/gallery-3.webp"
    ],
    liveUrl: "https://skzminingcompany.com",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "SKZ Mining needed a modern corporate presence to unify diverse mineral lines — from heavy industrial powders like calcium carbonate and talc to consumer-facing Himalayan pink salt products and salt slabs.",
      challenge: "Targeting distinct customer verticals (industrial chemical buyers, paint manufacturers, food grade importers, and hospitality buyers) while maintaining a prestigious, cohesive corporate identity.",
      solution: "Developed an intuitive modular product catalog with dedicated technical specification sheets, supply chain transparency sections, and immediate quote inquiry channels via WhatsApp and secure forms.",
      process: "Mapped operational facilities in KP, meshing plants in Peshawar, and port packing logistics in Karachi into clear visual workflows, optimized for multi-device performance.",
      result: "Streamlined global inquiry generation, increasing verified B2B leads by 140% within the first quarter post-launch."
    },
    metrics: [
      { label: "Products Catalogued", value: "6 Minerals" },
      { label: "Meshing Plants", value: "2 Plants" },
      { label: "Milling Range", value: "250–2500 Mesh" },
      { label: "Market Reach", value: "Global B2B" }
    ],
    seo: {
      title: "SKZ Mining Company — Corporate Minerals Platform | M Ramzan",
      description: "Case study of SKZ Mining Company: Corporate industrial minerals and salt platform built with Next.js, TypeScript, and technical SEO.",
      keywords: [
        "SKZ Mining Company",
        "Industrial Minerals Pakistan",
        "Talc Calcium Carbonate",
        "Himalayan Pink Salt",
        "M Ramzan Portfolio"
      ],
      ogImage: "/images/projects/skz-mining/thumbnail.jpg"
    },
    geo: {
      entityType: "Corporation",
      primaryEntity: "SKZ Mining Company",
      summary: "SKZ Mining Company is a premier industrial minerals corporation platform developed by M Ramzan with Next.js.",
      keyFacts: [
        "Developed by M Ramzan",
        "Showcases 6 core mineral categories including talc, calcium carbonate, and pink salt",
        "Features 5-step supply chain visualization",
        "Includes direct WhatsApp procurement integration"
      ],
      targetAudience: [
        "Global Importers",
        "Manufacturing Procurement Managers",
        "Salt Distributors"
      ],
      faq: [
        {
          id: "faq-1",
          question: "What minerals does SKZ Mining provide?",
          answer: "SKZ Mining processes and supplies talc, calcium carbonate, dolomite, industrial salt, and authentic Himalayan pink salt."
        },
        {
          id: "faq-2",
          question: "Where are the operational facilities located?",
          answer: "Mines operate across Khyber Pakhtunkhwa, with meshing plants in Hayatabad Industrial Zone, Peshawar, and export packing in Karachi."
        }
      ]
    },
    createdAt: "2025-02-05T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z"
  },
  {
    id: "proj-hunza-minerals",
    slug: "hunza-minerals",
    title: "Hunza Minerals",
    subtitle: "Luxury Gemstones & Rare Earth Minerals Showcase",
    category: "Luxury Gemstones & Mineral Showcase",
    year: "2025",
    status: "published",
    featured: true,
    order: 18,
    shortDescription: "A luxury gemstone and precious metals showcase platform for Hunza Minerals — purveyors of rare natural gemstones and minerals ethically sourced from the Karakoram mountain range.",
    description: "Hunza Minerals features panoramic mountain photography, gemstone product cards with hover zoom animations, an ethical sourcing process section, and a curated geological resources blog.",
    role: "Lead Full-Stack Developer & UI Designer",
    client: "Hunza Minerals",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "CSS View Transitions",
      "Scroll-Reveal Animations",
      "Schema.org",
      "Vercel"
    ],
    services: [
      "UI/UX Design",
      "Web Development",
      "Cinematic Media Optimization",
      "Ethical Sourcing Narrative",
      "Technical SEO"
    ],
    heroImage: "/images/projects/hunza-minerals/hero.jpg",
    thumbnailImage: "/images/projects/hunza-minerals/thumbnail.jpg",
    gallery: [
      "/images/projects/hunza-minerals/gallery-1.png",
      "/images/projects/hunza-minerals/gallery-2.webp",
      "/images/projects/hunza-minerals/gallery-3.webp"
    ],
    liveUrl: "https://hunzaminerals.com",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Hunza Minerals required a cinematic showcase to present rare natural gemstones (aquamarine, tourmaline, topaz, ruby) ethically sourced from the Karakoram and Hindu Kush ranges to international collectors and luxury jewelers.",
      challenge: "Displaying the geological provenance and natural beauty of high-value mineral specimens while ensuring fast page loads and smooth animations across devices.",
      solution: "Built a scroll-reveal Next.js web application with cinematic hero photography, fluid CSS view transitions, ethical sourcing story cards, and Schema.org structured data.",
      process: "Curated high-resolution specimen photography, optimized imagery to WebP with responsive breakpoints, designed dark-luxury visual motifs, and implemented custom inquiry channels.",
      result: "Established Hunza Minerals as a world-class luxury mineral brand, driving international collector inquiries from Europe, the US, and the Gulf."
    },
    metrics: [
      { label: "Gemstone Varieties", value: "6+ Species" },
      { label: "Source Region", value: "Gilgit-Baltistan" },
      { label: "Sourcing", value: "Ethical & Fair-Trade" },
      { label: "Core Web Vitals", value: "100/100" }
    ],
    seo: {
      title: "Hunza Minerals — Luxury Gemstone Showcase | M Ramzan",
      description: "Case study of Hunza Minerals: A luxury gemstone showcase platform built with Next.js, TypeScript, and scroll-reveal animations.",
      keywords: [
        "Hunza Minerals",
        "Karakoram Gemstones",
        "Aquamarine Tourmaline",
        "Luxury Gemstone Showcase",
        "M Ramzan Portfolio"
      ],
      ogImage: "/images/projects/hunza-minerals/thumbnail.jpg"
    },
    geo: {
      entityType: "Organization",
      primaryEntity: "Hunza Minerals",
      summary: "Hunza Minerals is an international luxury gemstone showcase platform developed by M Ramzan with Next.js.",
      keyFacts: [
        "Developed by M Ramzan",
        "Showcases ethically sourced gemstones from Gilgit-Baltistan",
        "Features cinematic Karakoram photography and smooth scroll animations",
        "Includes comprehensive geological resources and collector inquiry flow"
      ],
      targetAudience: [
        "Gemstone Collectors",
        "High-End Jewelers",
        "Mineral Enthusiasts"
      ],
      faq: [
        {
          id: "faq-1",
          question: "What gemstones are featured on Hunza Minerals?",
          answer: "The platform showcases natural aquamarine from Chumar Bakhoor, bi-color tourmaline, topaz, and rare Hunza ruby specimens."
        },
        {
          id: "faq-2",
          question: "How are the gemstones sourced?",
          answer: "All minerals are ethically sourced through sustainable artisanal partnerships directly with local miners in Gilgit-Baltistan."
        }
      ]
    },
    createdAt: "2025-02-10T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z"
  },
  {
    id: "proj-silk-road",
    slug: "silk-road-caravan-tours",
    title: "Silk Road Caravan Tours",
    subtitle: "Heritage Tourism & Karakoram Adventure Platform",
    category: "Tourism & Travel Platform",
    year: "2025",
    status: "published",
    featured: true,
    order: 19,
    shortDescription: "A fully-featured tourism web platform for Silk Road Caravan Tours — a premier travel company established in 1990 by Amin Ullah Baig, with 35+ years of guided tours across the Silk Road.",
    description: "The platform includes a dynamic hero slider, tour package catalog with booking flows, gallery showcasing Karakoram landscapes, WhatsApp inquiry integration, testimonials, and partner showcases.",
    role: "Web Developer & Designer",
    client: "Silk Road Caravan Tours",
    technologies: [
      "WordPress",
      "Elementor Pro",
      "OVA Travel Theme",
      "PHP",
      "MySQL",
      "WooCommerce",
      "Yoast SEO",
      "LiteSpeed Cache"
    ],
    services: [
      "Tourism Web Development",
      "Tour Catalog Architecture",
      "Booking & Inquiry Workflow",
      "WhatsApp Integration",
      "SEO Setup"
    ],
    heroImage: "/images/projects/silk-road-caravan-tours/hero.jpg",
    thumbnailImage: "/images/projects/silk-road-caravan-tours/thumbnail.jpg",
    gallery: [
      "/images/projects/silk-road-caravan-tours/gallery-1.png",
      "/images/projects/silk-road-caravan-tours/gallery-2.png",
      "/images/projects/silk-road-caravan-tours/gallery-3.png"
    ],
    liveUrl: "https://silkroadcaravantours.com",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "Silk Road Caravan Tours required a modern digital portal to celebrate 35+ years of heritage tourism and simplify international bookings for expeditions along the Karakoram Highway, Hunza, and Central Asia routes.",
      challenge: "Structuring detailed multi-day itineraries, seasonal pricing, equipment recommendations, and multi-country crossing requirements into an intuitive booking experience for global travelers.",
      solution: "Developed a WordPress platform using Elementor Pro and a tailored tourism theme, featuring filterable tour packages, interactive itinerary tabs, testimonial carousels, and instant WhatsApp booking integration.",
      process: "Catalogued over 15 signature itineraries, structured high-impact photography of Pakistan's northern landscapes, configured LiteSpeed caching, and set up schema markup for travel events and packages.",
      result: "Increased international tour inquiries by 160% and established Silk Road Caravan Tours as Pakistan's leading cultural adventure agency online."
    },
    metrics: [
      { label: "Years of Experience", value: "35+ Years" },
      { label: "Founding Year", value: "1990" },
      { label: "Tour Packages", value: "15+ Itineraries" },
      { label: "Inquiry Growth", value: "+160%" }
    ],
    seo: {
      title: "Silk Road Caravan Tours — Heritage Travel Platform | M Ramzan",
      description: "Case study of Silk Road Caravan Tours: 35-year established Pakistan tourism and Karakoram Highway adventure platform built with WordPress and Elementor Pro.",
      keywords: [
        "Silk Road Caravan Tours",
        "Pakistan Travel Agency",
        "Karakoram Highway Tours",
        "WordPress Tourism Web",
        "M Ramzan Portfolio"
      ],
      ogImage: "/images/projects/silk-road-caravan-tours/thumbnail.jpg"
    },
    geo: {
      entityType: "TravelAgency",
      primaryEntity: "Silk Road Caravan Tours",
      summary: "Silk Road Caravan Tours is a premier heritage tourism and adventure travel platform built by M Ramzan with WordPress and custom travel modules.",
      keyFacts: [
        "Developed by M Ramzan",
        "Founded in 1990 with 35+ years of guided touring experience",
        "Features interactive Karakoram Highway and Silk Road itineraries",
        "Integrated direct WhatsApp and email booking consultation"
      ],
      targetAudience: [
        "International Adventurers",
        "Cultural Tourists",
        "Expedition Groups"
      ],
      faq: [
        {
          id: "faq-1",
          question: "What destinations does Silk Road Caravan Tours cover?",
          answer: "Tours cover the Karakoram Highway (KKH), Hunza Valley, Skardu, Deosai, historic Silk Road routes, and cross-border expeditions into Central Asia and China."
        },
        {
          id: "faq-2",
          question: "How do travelers book tours?",
          answer: "Travelers can browse day-by-day itineraries and submit inquiries directly through the booking forms or connect instantly via WhatsApp."
        }
      ]
    },
    createdAt: "2025-02-15T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z"
  },
  {
    id: "proj-abh-film-studio",
    slug: "abh-film-studio",
    title: "ABH Film Studio",
    subtitle: "Cinematic Production House & Studio Facility Platform",
    category: "Creative Studio & Film Production",
    year: "2025",
    status: "published",
    featured: true,
    order: 20,
    shortDescription: "A cinematic creative studio web platform for ABH Film Studio — Islamabad's premier film and video production house delivering end-to-end cinematography, editing, and equipment rental.",
    description: "The platform showcases ABH Film Studio's state-of-the-art Islamabad production floor, cinema camera equipment, post-production suites, client portfolio reel, BTS documentation, and studio rental workflows.",
    role: "Web Developer & Creative Director",
    client: "ABH Film Studio",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vanilla CSS",
      "Framer Motion",
      "WebP/AVIF",
      "Dark Mode UI",
      "Vercel"
    ],
    services: [
      "Creative Web Development",
      "Cinematic Portfolio Showcase",
      "Studio Rental Workflow",
      "BTS Media Gallery",
      "Technical SEO"
    ],
    heroImage: "/images/projects/abh-film-studio/hero.png",
    thumbnailImage: "/images/projects/abh-film-studio/thumbnail.png",
    gallery: [
      "/images/projects/abh-film-studio/gallery-1.png",
      "/images/projects/abh-film-studio/gallery-2.png",
      "/images/projects/abh-film-studio/gallery-3.png"
    ],
    liveUrl: "https://demo.abhfilmstudio.com",
    githubUrl: "https://github.com/mramzan4055",
    caseStudy: {
      overview: "ABH Film Studio needed a cutting-edge creative website reflecting their status as Islamabad's top film and video production house, enabling advertising agencies and directors to explore studio capabilities and book rental packages.",
      challenge: "Conveying film-grade visual excellence and equipment sophistication (cinema cameras, soundproof floor, color grading suites) without sacrificing mobile performance and page speed.",
      solution: "Engineered a dark-mode Next.js platform featuring smooth scroll interactions, full-screen video banners, detailed gear rental catalogs, and behind-the-scenes production galleries.",
      process: "Architected an immersive dark UI aesthetic, built equipment specification cards, integrated an inquiry calendar for studio space rental, and optimized video and image assets for instant loading.",
      result: "Positioned ABH Film Studio as Islamabad's premier creative production house, boosting commercial production inquiries by over 175%."
    },
    metrics: [
      { label: "Studio Location", value: "Islamabad, PK" },
      { label: "Core Capabilities", value: "6 Services" },
      { label: "Design Aesthetic", value: "Dark-Mode Cinema" },
      { label: "Core Web Vitals", value: "100/100" }
    ],
    seo: {
      title: "ABH Film Studio — Islamabad Production House | M Ramzan",
      description: "Case study of ABH Film Studio: Cinematic video production house and studio rental platform in Islamabad built with Next.js, TypeScript, and dark-mode aesthetics.",
      keywords: [
        "ABH Film Studio",
        "Islamabad Film Production",
        "Video Production Pakistan",
        "Camera Rental Islamabad",
        "M Ramzan Portfolio"
      ],
      ogImage: "/images/projects/abh-film-studio/thumbnail.png"
    },
    geo: {
      entityType: "Organization",
      primaryEntity: "ABH Film Studio",
      summary: "ABH Film Studio is an Islamabad-based film and video production studio platform developed by M Ramzan with Next.js.",
      keyFacts: [
        "Developed by M Ramzan",
        "Features Islamabad's premier film and podcast production facilities",
        "Includes equipment rental inventory and studio booking workflows",
        "Built with Next.js and dark-mode cinematic styling"
      ],
      targetAudience: [
        "Advertising Agencies",
        "Filmmakers & Directors",
        "Corporate Brands"
      ],
      faq: [
        {
          id: "faq-1",
          question: "What services does ABH Film Studio offer?",
          answer: "ABH Film Studio offers commercial video production, podcast recording, post-production editing & color grading, and professional cinema camera equipment rental."
        },
        {
          id: "faq-2",
          question: "Where is the studio located?",
          answer: "The studio facility is located in Islamabad, Pakistan, equipped with sound-treated production floors and dedicated editing suites."
        }
      ]
    },
    createdAt: "2025-02-20T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z"
  }
];

// 1. Update db.json
const dbPath = path.join(__dirname, '..', 'src', 'data', 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

for (const np of newProjects) {
  const existingIdx = dbData.projects.findIndex(p => p.slug === np.slug || p.id === np.id);
  if (existingIdx >= 0) {
    dbData.projects[existingIdx] = np;
    console.log(`Updated project in db.json: ${np.title} (${np.slug})`);
  } else {
    dbData.projects.push(np);
    console.log(`Added project to db.json: ${np.title} (${np.slug})`);
  }
}

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf-8');
console.log(`db.json successfully updated! Total projects now: ${dbData.projects.length}`);

// 2. Also update seed.ts so code is consistent
const seedPath = path.join(__dirname, '..', 'src', 'data', 'seed.ts');
let seedContent = fs.readFileSync(seedPath, 'utf-8');

// Check if each project exists in seed.ts
for (const np of newProjects) {
  if (!seedContent.includes(np.slug)) {
    // Find the end of initialProjects array
    const marker = "export const initialServices";
    const insertIdx = seedContent.indexOf(marker);
    if (insertIdx > 0) {
      // Find the last '];' before initialServices
      const lastBracketIdx = seedContent.lastIndexOf('];', insertIdx);
      if (lastBracketIdx > 0) {
        const formattedProject = "  " + JSON.stringify(np, null, 2).replace(/\n/g, "\n  ") + ",\n";
        seedContent = seedContent.slice(0, lastBracketIdx) + formattedProject + seedContent.slice(lastBracketIdx);
        console.log(`Appended ${np.title} to seed.ts`);
      }
    }
  } else {
    console.log(`${np.title} already mentioned in seed.ts`);
  }
}

fs.writeFileSync(seedPath, seedContent, 'utf-8');
console.log('seed.ts successfully updated!');
