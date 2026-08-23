import { NextRequest, NextResponse } from "next/server";
import { generateAISuggestions, analyzeProjectSEOandGEO, AIGenerationRequest } from "@/lib/ai/assistant";
import { getProjects } from "@/lib/data/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Visitor Concierge Chat Assistant
    if (body.context === "portfolio_visitor_assistant" || (body.prompt && !body.type)) {
      const query = (body.prompt || "").toLowerCase();
      const allProjects = await getProjects({ status: "published" });

      let resultText = "";
      let relevantLinks: { label: string; url: string }[] = [];

      if (query.includes("brites") || query.includes("security") || query.includes("sia") || query.includes("guarding")) {
        resultText = "Brites Security Solutions (britessecurity.co.uk) is an SIA ACS-approved UK security guarding operations platform headquartered in Luton, Bedfordshire. M Ramzan architected the platform with live MI5 national threat level API integration, 100% BS7858 officer screening workflows, scannable QR company policy systems, and NPSA/ProtectUK safety compliance resources.";
        relevantLinks = [
          { label: "Brites Security Case Study", url: "/projects/brites-security" },
          { label: "Visit Brites Live Site", url: "https://britessecurity.co.uk" },
        ];
      } else if (query.includes("lddb") || query.includes("livestock") || query.includes("dairy") || query.includes("agtech") || query.includes("buffalo")) {
        resultText = "The Livestock & Dairy Development Board (lddb.pk) is a national AgTech digital ecosystem for Pakistan's Ministry of National Food Security & Research. Architected by M Ramzan, it powers major federal initiatives like 'Save the Buffalo Calf' (PKR 2.87B budget), calf feedlot fattening, backyard poultry, Gilgit-Baltistan yak development, and national breed registries.";
        relevantLinks = [
          { label: "LDDB AgTech Case Study", url: "/projects/lddb" },
          { label: "Visit lddb.pk Live", url: "https://lddb.pk" },
        ];
      } else if (query.includes("anwar") || query.includes("quran") || query.includes("islamic") || query.includes("foundation")) {
        resultText = "Anwarul Quran Foundation (anwarulquran.org.pk) is an Islamic educational and community welfare institution founded in 2002 under Hazrat Maulana Haji Mahmood Ahmad Darkhwasti (رحمت اللہ علیہ). M Ramzan engineered an elegant bilingual RTL web architecture featuring student portals across dual boys/girls campuses, Tajweed/Hifz admissions, and digital welfare donation flows.";
        relevantLinks = [
          { label: "Anwarul Quran Case Study", url: "/projects/anwarul-quran" },
          { label: "Visit anwarulquran.org.pk", url: "https://anwarulquran.org.pk" },
        ];
      } else if (query.includes("alqadir") || query.includes("academy") || query.includes("lms")) {
        resultText = "Alqadir Quran Academy is a global distance-learning portal engineered with live video classroom scheduling, multi-timezone management, automated billing, and student portals serving learners across 24+ countries.";
        relevantLinks = [
          { label: "Alqadir Case Study", url: "/projects/alqadir-academy" },
          { label: "Selected Works", url: "/work" },
        ];
      } else if (query.includes("mysql") || query.includes("database") || query.includes("wasmer") || query.includes("backend")) {
        resultText = "M Ramzan works with relational MySQL and REST APIs to handle data storage, user authentication, and content management cleanly and reliably across web and mobile applications.";
        relevantLinks = [
          { label: "Services", url: "/services" },
          { label: "About M Ramzan", url: "/about" },
        ];
      } else if (query.includes("skill") || query.includes("stack") || query.includes("tech") || query.includes("next.js") || query.includes("wordpress") || query.includes("flutter")) {
        resultText = "M Ramzan's technology stack includes WordPress, HTML5, CSS3, JavaScript, React, Next.js, and Flutter for cross-platform iOS/Android mobile apps, along with REST APIs, Tailwind CSS, MySQL, and SEO/GEO optimization.";
        relevantLinks = [
          { label: "Skills & Services", url: "/services" },
          { label: "Browse Projects", url: "/work" },
        ];
      } else if (query.includes("available") || query.includes("hire") || query.includes("contact") || query.includes("cost") || query.includes("pricing") || query.includes("consult")) {
        resultText = "M Ramzan is available for freelance projects, WordPress customization, React/Next.js web development, and Flutter mobile app development. You can reach out directly via the Contact page.";
        relevantLinks = [
          { label: "Contact Ramzan", url: "/contact" },
          { label: "Explore Projects", url: "/work" },
        ];
      } else {
        // Search matching projects by keywords
        const matched = allProjects.find(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            (p.technologies || []).some((t) => t.toLowerCase().includes(query))
        );

        if (matched) {
          resultText = `${matched.title} is a ${matched.category} project (${matched.year}) developed by M Ramzan using ${(matched.technologies || []).slice(0, 4).join(", ")}. ${matched.shortDescription || matched.description}`;
          relevantLinks = [
            { label: `View ${matched.title} Case Study`, url: `/projects/${matched.slug}` },
            { label: "All Projects", url: "/work" },
          ];
        } else {
          resultText = "M Ramzan is a Web & Mobile App Developer specializing in building modern, responsive websites and mobile apps using WordPress, React, Next.js, and Flutter. How can I help you learn more about his work?";
          relevantLinks = [
            { label: "My Projects", url: "/work" },
            { label: "Services", url: "/services" },
            { label: "Contact Ramzan", url: "/contact" },
          ];
        }
      }

      return NextResponse.json({ success: true, result: resultText, links: relevantLinks });
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
    return NextResponse.json({ success: false, error: "AI generation failed" }, { status: 500 });
  }
}
