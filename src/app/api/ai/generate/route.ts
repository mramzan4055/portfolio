import { NextRequest, NextResponse } from "next/server";
import { generateAISuggestions, analyzeProjectSEOandGEO, AIGenerationRequest } from "@/lib/ai/assistant";
import { getProjects, getSiteSettings } from "@/lib/data/store";

// ─── M Ramzan's Full Knowledge Graph ──────────────────────────────────────────
const RAMZAN_PROFILE = {
  name: "M Ramzan",
  title: "Web & Mobile Application Developer",
  location: "Pakistan (Available for Local & Remote Worldwide Projects)",
  email: "info@mramzan.dev",
  whatsapp: "+923096734231",
  portfolioUrl: "https://mramzan.dev",
  experienceYears: 5,
  startingYear: 2019,
  availability: "Currently Available for New Projects",
  minimumBudget: "PKR 30,000",
  bio: "Practical web and mobile app developer specializing in clean, responsive, and easy-to-manage websites for Pakistani SMEs, startups, and local businesses using WordPress, React, Next.js, and Flutter.",
  stack: [
    "WordPress (Custom themes, Elementor, ACF, WooCommerce, PHP)",
    "Frontend (React.js, Next.js 15, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS)",
    "Mobile Apps (Flutter, Dart for iOS & Android)",
    "Database & Backend (MySQL, REST APIs, Node.js)",
    "SEO & Web Optimization (JSON-LD Schemas, On-page SEO, Fast Core Web Vitals, Google Search Console)",
  ],
  pricing: [
    {
      name: "Starter Business Website",
      price: "Starting from PKR 30,000",
      time: "7–10 days",
      bestFor: "Local shops, salons, clinics, consultants, personal branding",
      features: "3–5 responsive pages, mobile-friendly, WhatsApp button, contact form, Google Maps, basic SEO setup",
    },
    {
      name: "Business Growth Website",
      price: "Starting from PKR 60,000",
      time: "14–21 days",
      bestFor: "Small agencies, established businesses, growing startups",
      features: "5–10 custom pages, WordPress CMS, blog/news, advanced SEO & Schema, social integrations, revision rounds",
    },
    {
      name: "Custom Website & Mobile App",
      price: "Custom Quote (Contact for estimate)",
      time: "Varies by scope",
      bestFor: "E-commerce stores, custom portals, Flutter iOS/Android mobile apps",
      features: "Full custom UI, payment gateway integration, database backend, Flutter app, dedicated maintenance",
    },
  ],
  projects: [
    {
      name: "Livestock & Dairy Development Board (LDDB)",
      url: "https://lddb.pk",
      caseStudy: "/projects/lddb",
      type: "Government / AgTech Platform",
      summary: "National digital infrastructure for Pakistan's Ministry of National Food Security & Research. Manages PM's special livestock initiatives, breed registries (Nili-Ravi, Sahiwal, Kundhi), and agribusiness feasibility databases.",
      tech: "WordPress, PHP, MySQL, SEO Schema",
    },
    {
      name: "Brites Security Solutions",
      url: "https://britessecurity.co.uk",
      caseStudy: "/projects/brites-security",
      type: "UK Corporate Security Platform",
      summary: "SIA ACS-approved UK manned guarding security company in Luton, Bedfordshire. Integrates live MI5 threat level feeds, BS7858 officer screening workflows, and scannable QR company policy verification.",
      tech: "WordPress, PHP, JavaScript, Custom UI",
    },
    {
      name: "Anwarul Quran Foundation",
      url: "https://anwarulquran.org.pk",
      caseStudy: "/projects/anwarul-quran",
      type: "Islamic Education & Welfare Portal",
      summary: "Established in 2002 under Hazrat Maulana Haji Mahmood Ahmad Darkhwasti. Dual campus management for male and female students, Hifz/Tajweed admissions, and digital welfare donation flows.",
      tech: "WordPress, RTL Urdu/Arabic, PHP, MySQL",
    },
    {
      name: "Alqadir Quran Academy",
      url: "https://alqadirquranacademy.com",
      caseStudy: "/projects/alqadir-quran-academy",
      type: "Global EdTech Platform",
      summary: "Online distance-learning portal connecting international students with Quran tutors across 24+ countries with multi-timezone scheduling and automated tuition billing.",
      tech: "React, Next.js, TypeScript, MySQL, Stripe API",
    },
    {
      name: "Ziva IdeaTech",
      url: "https://ziva2.ideatech.org.pk",
      caseStudy: "/projects/ziva-ideatech",
      type: "CMS & Enterprise Web Application",
      summary: "Dynamic content management system and high-performance digital experience platform built for IdeaTech Solutions.",
      tech: "Next.js, TypeScript, MySQL, Tailwind CSS",
    },
    {
      name: "Samad Brothers",
      caseStudy: "/projects/samad-brothers",
      type: "Commercial Catalog & E-commerce",
      summary: "Product catalog and customer quotation portal for Samad Brothers in Islamabad, increasing online customer inquiries significantly.",
      tech: "WordPress, WooCommerce, PHP",
    },
    {
      name: "PSCDC",
      caseStudy: "/projects/pscdc",
      type: "Government / Skill Development",
      summary: "Punjab Skill Certification and Development Council education and certification verification portal.",
      tech: "WordPress, PHP, MySQL",
    },
    {
      name: "ABM Foundation",
      caseStudy: "/projects/abm-foundation",
      type: "Non-Profit & Humanitarian",
      summary: "Welfare foundation website showcasing humanitarian campaigns, transparent project reporting, and community donation collection.",
      tech: "WordPress, PHP, JavaScript",
    },
  ],
};

function getLiveDateContext() {
  const now = new Date();
  return {
    dateString: now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    year: now.getFullYear(),
    monthName: now.toLocaleDateString("en-US", { month: "long" }),
  };
}

// ─── External LLM Support (if GEMINI_API_KEY or OPENAI_API_KEY is available) ───
async function tryExternalLLM(prompt: string, history: Array<{ role: string; content: string }> = []): Promise<string | null> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const { dateString, year } = getLiveDateContext();

  const systemInstruction = `You are M Ramzan's official AI Assistant on his portfolio website (https://mramzan.dev).
Today's live date is ${dateString} (${year}).

YOUR PERSONALITY & TONE:
- Talk like a real, helpful, friendly, and knowledgeable AI agent.
- Keep answers concise, natural, and engaging (2-4 paragraphs maximum, with bullet points when listing).
- You represent M Ramzan: a practical, grounded Web & Mobile App Developer in Pakistan with 5+ years of real experience (since 2019).
- DO NOT make exaggerated claims (he is NOT a "senior enterprise architect", but a practical developer who builds great websites with WordPress, React, Next.js, and Flutter).
- Always be polite, proactive, and business-focused.

CORE FACTS YOU MUST KNOW:
1. Target Clients: Pakistani SMEs (salons, clinics, shops, restaurants, startups, consultants, agencies, non-profits) and overseas clients.
2. Pricing in PKR:
   - Starter Business Website: Starting from PKR 30,000 (3-5 pages, responsive, WhatsApp, basic SEO, 7-10 days)
   - Business Growth Website: Starting from PKR 60,000 (5-10 pages, WordPress CMS, animations, advanced SEO, 14-21 days)
   - Custom Projects & Mobile Apps: Custom Quote
   - Minimum project starting budget: PKR 30,000.
3. Tech Stack: WordPress, React.js, Next.js 15, Flutter (iOS & Android), HTML5, CSS3, JavaScript, PHP, MySQL, SEO Schemas.
4. Key Projects:
   - LDDB (lddb.pk): Federal AgTech portal for Pakistan Ministry of National Food Security.
   - Brites Security (britessecurity.co.uk): UK SIA ACS security guarding platform with MI5 threat level integration.
   - Anwarul Quran Foundation (anwarulquran.org.pk): Dual-campus Islamic educational & welfare portal founded 2002.
   - Alqadir Quran Academy (alqadirquranacademy.com): Global distance learning across 24+ countries.
   - Ziva IdeaTech (ziva2.ideatech.org.pk): CMS & enterprise web app.
   - Samad Brothers: Islamabad product catalog and quotation platform.
5. Direct Contact: WhatsApp (+92 309 6734231), Email (info@mramzan.dev), Contact page (/contact).
6. Language: If the user writes in Urdu or Roman Urdu (e.g. "kese ho", "website banwani hai"), reply naturally in friendly Roman Urdu or English!`;

  if (geminiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const contents = [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "Understood! I am M Ramzan's official AI Assistant. I will converse naturally, accurately, and politely, helping visitors with all questions about his projects, skills, pricing, and services." }] },
        ...history.slice(-6).map((h) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        })),
        { role: "user", parts: [{ text: prompt }] },
      ];

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch {
      // fallback to local brain
    }
  }

  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemInstruction },
            ...history.slice(-4).map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
            { role: "user", content: prompt },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text.trim();
      }
    } catch {
      // fallback to local brain
    }
  }

  return null;
}

// ─── Conversational AI Agent Engine (Intelligent Local Brain) ─────────────────
function generateConversationalAgentResponse(userQuery: string): { result: string; links: { label: string; url: string }[] } {
  const q = userQuery.toLowerCase().trim();
  const { dateString, year } = getLiveDateContext();

  // Roman Urdu / Urdu Greetings & Inquiries
  if (q.includes("kese ho") || q.includes("kya hal") || q.includes("kaisay ho") || q.includes("kaisa hai") || q.includes("salam") || q.includes("assalam")) {
    return {
      result: `Walaikum Assalam! Main bilkul theek hoon. 😊 Main M Ramzan ka AI Assistant hoon.\n\nRamzan Pakistan based web aur mobile app developer hain jo Pakistani businesses (shops, clinics, salons, startups) ke liye modern aur affordable websites banate hain.\n\nAaj ki date **${dateString}** hai aur Ramzan naye projects ke liye available hain. Aap bataiye, aap kis tarah ki website ya app banwana chahte hain?`,
      links: [
        { label: "Website Packages", url: "/packages" },
        { label: "View Portfolio", url: "/work" },
        { label: "WhatsApp Chat", url: "https://wa.me/923096734231" },
      ],
    };
  }

  // Roman Urdu Pricing / Cost Inquiry
  if (q.includes("kitne ki") || q.includes("kitna kharcha") || q.includes("rate kya") || q.includes("price kya") || q.includes("charges kya") || q.includes("kitne paise")) {
    return {
      result: `Ramzan ke website packages bohat transparent aur affordable hain:\n\n• **Starter Business Website**: Starting from **PKR 30,000** (3–5 pages, mobile-friendly, WhatsApp button, contact form, 7–10 days delivery)\n• **Business Growth Website**: Starting from **PKR 60,000** (5–10 pages, WordPress CMS, custom design, Google SEO setup, 14–21 days)\n• **Custom Web / Flutter App**: Custom quote ke mutabiq.\n\nHar package mein mobile optimization aur WhatsApp integration shamil hoti hai. Aap WhatsApp par directly details discuss kar sakte hain!`,
      links: [
        { label: "All Packages", url: "/packages" },
        { label: "Get Quote on WhatsApp", url: "https://wa.me/923096734231?text=Hi%2C%20mujhe%20website%20ka%20rate%20chahiye" },
      ],
    };
  }

  // Salon / Clinic / Local Business Specific
  if (q.includes("salon") || q.includes("clinic") || q.includes("beauty") || q.includes("doctor") || q.includes("shop") || q.includes("restaurant") || q.includes("cafe")) {
    return {
      result: `Great question! Local businesses like salons, clinics, and shops are exactly what Ramzan specializes in. 🏪✨\n\nFor your business, he typically builds:\n1. **A Clean Service Showcase**: Displaying your services, price list, and doctor/stylist profiles.\n2. **Direct WhatsApp Booking**: So customers can book an appointment with a single tap.\n3. **Google Maps & Location**: Helping local customers find your branch easily.\n4. **Mobile-First Design**: Over 85% of Pakistani customers visit on mobile phones.\n\nStarter websites for salons and clinics start from **PKR 30,000** with a 7–10 day turnaround.`,
      links: [
        { label: "Starter Package (PKR 30k)", url: "/packages" },
        { label: "Contact Ramzan", url: "/contact" },
        { label: "WhatsApp Direct", url: "https://wa.me/923096734231" },
      ],
    };
  }

  // General Greetings
  if (q.match(/^(hi|hello|hey|greetings|good morning|good evening|good afternoon|what's up|yo|sup)\b/)) {
    return {
      result: `Hello! 👋 Glad to connect with you today (${dateString}).\n\nI'm M Ramzan's AI Assistant. M Ramzan is a web and mobile developer based in Pakistan who builds high-quality, responsive websites for small businesses, startups, and institutions starting from **PKR 30,000**.\n\nI can help you explore his portfolio, calculate pricing estimates, or connect you directly on WhatsApp. What are you looking to build?`,
      links: [
        { label: "Explore Projects", url: "/work" },
        { label: "Website Pricing", url: "/packages" },
        { label: "Get in Touch", url: "/contact" },
      ],
    };
  }

  // Who are you / Tell me about Ramzan
  if (q.includes("who is ramzan") || q.includes("who are you") || q.includes("about ramzan") || q.includes("tell me about yourself") || q.includes("experience") || q.includes("background")) {
    return {
      result: `**M Ramzan** is a practical Web & Mobile Application Developer with **5+ years of hands-on experience** (building since 2019).\n\nKey highlights:\n• **Real Projects Delivered**: Over 10+ major live platforms, including Pakistan's Federal AgTech portal (**LDDB**), UK security platform (**Brites Security**), and the global **Alqadir Quran Academy** (active in 24+ countries).\n• **Core Stack**: WordPress, React, Next.js 15, Flutter (iOS & Android), PHP, and MySQL.\n• **Philosophy**: Clean, reliable code without unnecessary complexity or bloated enterprise jargon.\n• **Status**: Currently available for freelance and contract work as of ${dateString}.`,
      links: [
        { label: "Full About Page", url: "/about" },
        { label: "View Portfolio", url: "/work" },
        { label: "Contact Ramzan", url: "/contact" },
      ],
    };
  }

  // Pricing / Cost / Budget / Packages
  if (q.includes("cost") || q.includes("price") || q.includes("package") || q.includes("budget") || q.includes("pkr") || q.includes("rate") || q.includes("how much") || q.includes("pricing") || q.includes("fee")) {
    return {
      result: `Here is a clear breakdown of M Ramzan's website development packages for ${year}:\n\n` +
        `📦 **1. Starter Business Website** — **Starting from PKR 30,000**\n` +
        `• 3–5 responsive pages, mobile-friendly design, WhatsApp button, contact form, Google Maps, basic SEO setup. (Delivery: 7–10 days)\n\n` +
        `🚀 **2. Business Growth Website** — **Starting from PKR 60,000**\n` +
        `• 5–10 custom pages, WordPress CMS for easy editing, custom styling, blog section, advanced SEO & Schema markup. (Delivery: 14–21 days)\n\n` +
        `⚡ **3. Custom Web Platform & Flutter App** — **Custom Quote**\n` +
        `• Full-featured e-commerce, custom web apps, or cross-platform Flutter mobile apps (iOS & Android).\n\n` +
        `*Payment terms are straightforward: 50% advance to initiate work, and 50% upon final delivery after your review.*`,
      links: [
        { label: "View Packages Page", url: "/packages" },
        { label: "Get a Custom Quote", url: "/contact" },
        { label: "Chat on WhatsApp", url: "https://wa.me/923096734231" },
      ],
    };
  }

  // Date / Time / Current Availability
  if (q.includes("today") || q.includes("date") || q.includes("year") || q.includes("current time") || q.includes("when are you available") || q.includes("available")) {
    return {
      result: `📅 Today is **${dateString}** (${year}).\n\nM Ramzan is **actively available** for new projects right now. If you have an upcoming website or app project, you can get started immediately with a free consultation on WhatsApp.`,
      links: [
        { label: "Book a Project", url: "/contact" },
        { label: "WhatsApp Ramzan", url: "https://wa.me/923096734231" },
      ],
    };
  }

  // Specific Projects: LDDB
  if (q.includes("lddb") || q.includes("livestock") || q.includes("dairy") || q.includes("agtech") || q.includes("buffalo")) {
    const p = RAMZAN_PROFILE.projects.find((x) => x.name.includes("LDDB"))!;
    return {
      result: `🏛️ **${p.name}**\n\n${p.summary}\n\n• **Category**: ${p.type}\n• **Technologies**: ${p.tech}\n• **Live Website**: [lddb.pk](https://lddb.pk)\n\nRamzan developed the web platform coordinating multi-million rupee initiatives like 'Save the Buffalo Calf' and national livestock breed registries.`,
      links: [
        { label: "Read LDDB Case Study", url: p.caseStudy },
        { label: "Visit lddb.pk Live", url: p.url! },
      ],
    };
  }

  // Specific Projects: Brites Security
  if (q.includes("brites") || q.includes("security") || q.includes("sia") || q.includes("guarding") || q.includes("luton")) {
    const p = RAMZAN_PROFILE.projects.find((x) => x.name.includes("Brites"))!;
    return {
      result: `🛡️ **${p.name}**\n\n${p.summary}\n\n• **Category**: ${p.type}\n• **Technologies**: ${p.tech}\n• **Live Website**: [britessecurity.co.uk](https://britessecurity.co.uk)\n\nFeatures real-time MI5 national threat level API integration, BS7858 officer screening workflows, and scannable QR verification for policies.`,
      links: [
        { label: "Brites Case Study", url: p.caseStudy },
        { label: "Visit Brites Live Site", url: p.url! },
      ],
    };
  }

  // Specific Projects: Anwarul Quran
  if (q.includes("anwar") || q.includes("quran foundation") || q.includes("darkhwasti") || q.includes("islamic")) {
    const p = RAMZAN_PROFILE.projects.find((x) => x.name.includes("Anwarul"))!;
    return {
      result: `📖 **${p.name}**\n\n${p.summary}\n\n• **Category**: ${p.type}\n• **Technologies**: ${p.tech}\n• **Live Website**: [anwarulquran.org.pk](https://anwarulquran.org.pk)\n\nIncludes dual male/female campus admissions, Tajweed/Hifz departments, and transparent online welfare donation workflows.`,
      links: [
        { label: "Anwarul Quran Case Study", url: p.caseStudy },
        { label: "Visit anwarulquran.org.pk", url: p.url! },
      ],
    };
  }

  // Specific Projects: Alqadir Quran Academy
  if (q.includes("alqadir") || q.includes("academy") || q.includes("lms") || q.includes("distance learning")) {
    const p = RAMZAN_PROFILE.projects.find((x) => x.name.includes("Alqadir"))!;
    return {
      result: `🎓 **${p.name}**\n\n${p.summary}\n\n• **Category**: ${p.type}\n• **Technologies**: ${p.tech}\n• **Live Website**: [alqadirquranacademy.com](https://alqadirquranacademy.com)\n\nServes 1,500+ active students globally with atomic scheduling across 14 time zones and automated recurring tuition billing.`,
      links: [
        { label: "Alqadir Case Study", url: p.caseStudy },
        { label: "Visit Live Site", url: p.url! },
      ],
    };
  }

  // Projects Overview / Portfolio List
  if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("examples") || q.includes("show me")) {
    return {
      result: `M Ramzan has built 10+ real-world web and mobile applications across diverse industries:\n\n` +
        `1. **LDDB (lddb.pk)** — Pakistan Ministry of National Food Security AgTech portal\n` +
        `2. **Brites Security (britessecurity.co.uk)** — UK SIA ACS corporate security platform\n` +
        `3. **Anwarul Quran Foundation (anwarulquran.org.pk)** — 2002 legacy educational foundation\n` +
        `4. **Alqadir Quran Academy (alqadirquranacademy.com)** — Global distance learning portal in 24+ countries\n` +
        `5. **Ziva IdeaTech (ziva2.ideatech.org.pk)** — Dynamic CMS and digital platform\n` +
        `6. **Samad Brothers** — Commercial product catalog & quotation portal\n\n` +
        `All projects include live URLs and case studies in the Portfolio section.`,
      links: [
        { label: "Explore All Projects", url: "/work" },
        { label: "Start Your Project", url: "/contact" },
      ],
    };
  }

  // Technologies / Stack
  if (q.includes("tech") || q.includes("stack") || q.includes("wordpress") || q.includes("react") || q.includes("next") || q.includes("flutter") || q.includes("php") || q.includes("mysql") || q.includes("tools")) {
    return {
      result: `M Ramzan uses industry-standard, reliable technologies to build high-performance websites and apps:\n\n` +
        `• **WordPress & CMS**: Custom themes, WooCommerce, PHP, Elementor, easy content editing for business owners.\n` +
        `• **Frontend Engineering**: React.js, Next.js 15, TypeScript, Tailwind CSS, clean semantic HTML5 & CSS3.\n` +
        `• **Mobile Apps**: Google Flutter & Dart for cross-platform iOS and Android applications.\n` +
        `• **Databases & APIs**: MySQL, REST APIs, Node.js.\n` +
        `• **SEO & Optimization**: Schema.org JSON-LD, On-Page SEO, Core Web Vitals optimization.`,
      links: [
        { label: "Services & Capabilities", url: "/services" },
        { label: "Browse Works", url: "/work" },
      ],
    };
  }

  // Contact / WhatsApp / How to reach
  if (q.includes("contact") || q.includes("whatsapp") || q.includes("email") || q.includes("hire") || q.includes("phone") || q.includes("call") || q.includes("reach")) {
    return {
      result: `You can connect with M Ramzan through several direct channels:\n\n` +
        `📱 **WhatsApp**: [+92 309 6734231](https://wa.me/923096734231) *(Fastest response, typically same-day)*\n` +
        `📧 **Email**: [info@mramzan.dev](mailto:info@mramzan.dev)\n` +
        `📝 **Project Inquiry Form**: Available on the Contact page with budget selections in PKR.\n\n` +
        `Feel free to send a brief description of your business and what kind of website you're looking for!`,
      links: [
        { label: "Go to Contact Form", url: "/contact" },
        { label: "Chat on WhatsApp", url: "https://wa.me/923096734231" },
      ],
    };
  }

  // How the development process works
  if (q.includes("process") || q.includes("how it works") || q.includes("steps") || q.includes("how do we start") || q.includes("workflow")) {
    return {
      result: `Here is M Ramzan's straightforward 5-step development workflow:\n\n` +
        `1. **Discovery & Requirement Discussion**: You discuss your business goals, required pages, and reference designs via WhatsApp or Contact form.\n` +
        `2. **Quotation & Scope Agreement**: Ramzan provides a clear timeline, deliverables list, and fixed quote in PKR.\n` +
        `3. **Kickoff**: Work starts upon a 50% advance deposit.\n` +
        `4. **Design & Build**: You receive live preview links to test and request adjustments.\n` +
        `5. **Launch & Handover**: The website is deployed to your domain, tested on mobile, with final 50% balance payment and full walkthrough.`,
      links: [
        { label: "Get Started", url: "/contact" },
        { label: "WhatsApp Discussion", url: "https://wa.me/923096734231" },
      ],
    };
  }

  // Default intelligent fallback
  return {
    result: `Thanks for asking! As M Ramzan's AI Assistant (active today, ${dateString}), I can assist you with:\n\n` +
      `• **Website Pricing**: Starter websites from PKR 30,000 / Growth websites from PKR 60,000\n` +
      `• **Real Projects**: LDDB, Brites Security, Anwarul Quran, Alqadir Academy, and more\n` +
      `• **Services**: WordPress, React/Next.js web apps, Flutter mobile apps, and SEO\n` +
      `• **Hiring & Inquiries**: Fast direct connection on WhatsApp\n\n` +
      `What specific question or project can I help you with?`,
    links: [
      { label: "Website Packages", url: "/packages" },
      { label: "Portfolio Works", url: "/work" },
      { label: "Contact Ramzan", url: "/contact" },
    ],
  };
}

// ─── Main POST Handler ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Visitor Concierge Chat Assistant
    if (body.context === "portfolio_visitor_assistant" || (body.prompt && !body.type)) {
      const userPrompt = body.prompt || "";
      const history = body.history || [];

      // Try external LLM first if API key is present
      const llmResponse = await tryExternalLLM(userPrompt, history);
      if (llmResponse) {
        return NextResponse.json({
          success: true,
          result: llmResponse,
          links: [
            { label: "Website Packages", url: "/packages" },
            { label: "View Portfolio", url: "/work" },
            { label: "Contact Ramzan", url: "/contact" },
          ],
        });
      }

      // Intelligent Local Conversational Engine
      const { result, links } = generateConversationalAgentResponse(userPrompt);
      return NextResponse.json({ success: true, result, links });
    }

    // 2. SEO & GEO Audit for Project Editor
    if (body.type === "audit") {
      const audit = analyzeProjectSEOandGEO(body.projectData);
      return NextResponse.json({ success: true, audit });
    }

    // 3. Admin AI Content Suggestions
    const suggestionResult = generateAISuggestions(body as AIGenerationRequest);
    return NextResponse.json({ success: true, ...suggestionResult });
  } catch (error) {
    return NextResponse.json({ success: false, error: "AI assistant failed to process" }, { status: 500 });
  }
}
