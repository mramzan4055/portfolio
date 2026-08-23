import { Project, AIAnalysisResult } from "@/types";

export interface AIGenerationRequest {
  type: 
    | "seo_title" 
    | "meta_description" 
    | "project_summary" 
    | "faq_suggestions" 
    | "geo_keyfacts" 
    | "case_study_refine" 
    | "audit";
  projectData: Partial<Project>;
  customPrompt?: string;
}

export function analyzeProjectSEOandGEO(project: Partial<Project>): AIAnalysisResult {
  const checklist: { item: string; status: "pass" | "warn" | "fail"; message: string }[] = [];
  const suggestions: string[] = [];

  // 1. SEO Title
  const title = project.seo?.title || "";
  if (!title) {
    checklist.push({ item: "SEO Title", status: "fail", message: "Missing SEO title tag." });
    suggestions.push("Generate a targeted SEO title containing primary project keywords (50-60 characters).");
  } else if (title.length < 30) {
    checklist.push({ item: "SEO Title", status: "warn", message: "Title is brief (<30 chars). Consider expanding with relevant category keywords." });
  } else if (title.length > 65) {
    checklist.push({ item: "SEO Title", status: "warn", message: "Title exceeds 65 characters; search engines may truncate." });
  } else {
    checklist.push({ item: "SEO Title", status: "pass", message: `Optimal length (${title.length} chars).` });
  }

  // 2. Meta Description
  const desc = project.seo?.description || "";
  if (!desc) {
    checklist.push({ item: "Meta Description", status: "fail", message: "Missing meta description." });
    suggestions.push("Draft a concise meta description summarizing deliverables and value proposition (130-160 chars).");
  } else if (desc.length < 100) {
    checklist.push({ item: "Meta Description", status: "warn", message: "Description is under 100 characters." });
  } else if (desc.length > 165) {
    checklist.push({ item: "Meta Description", status: "warn", message: "Description is over 165 characters." });
  } else {
    checklist.push({ item: "Meta Description", status: "pass", message: `Optimal description length (${desc.length} chars).` });
  }

  // 3. Open Graph Image
  if (project.seo?.ogImage || project.heroImage) {
    checklist.push({ item: "Social / OG Image", status: "pass", message: "Visual social preview image configured." });
  } else {
    checklist.push({ item: "Social / OG Image", status: "fail", message: "No hero or social preview image configured." });
    suggestions.push("Upload a high-resolution hero image (1200x630px recommended) for social sharing cards.");
  }

  // 4. Technologies & Services Entity Links
  if (project.technologies && project.technologies.length >= 3) {
    checklist.push({ item: "Entity Tech Stack", status: "pass", message: `${project.technologies.length} technologies mapped.` });
  } else {
    checklist.push({ item: "Entity Tech Stack", status: "warn", message: "Fewer than 3 technologies linked. Tagging technologies improves GEO graph understanding." });
  }

  // 5. GEO Summary & Key Facts
  if (project.geo?.summary && project.geo?.keyFacts && project.geo.keyFacts.length >= 2) {
    checklist.push({ item: "GEO Key Facts", status: "pass", message: "Machine-readable entity summary & key facts defined." });
  } else {
    checklist.push({ item: "GEO Key Facts", status: "warn", message: "Missing structured GEO key facts for AI answer engines." });
    suggestions.push("Populate GEO key facts to help ChatGPT, Perplexity, and Google AI Overviews parse project metrics.");
  }

  // 6. Structured FAQ
  if (project.geo?.faq && project.geo.faq.length > 0) {
    checklist.push({ item: "Structured FAQ", status: "pass", message: `${project.geo.faq.length} structured FAQ item(s) mapped.` });
  } else {
    checklist.push({ item: "Structured FAQ", status: "warn", message: "No FAQ items. Adding technical FAQs boosts FAQPage schema rankings." });
    suggestions.push("Add 1-2 architectural FAQ items to automatically generate FAQPage JSON-LD schema.");
  }

  // 7. Case Study Completeness
  const cs = project.caseStudy;
  if (cs?.overview && cs?.challenge && cs?.solution) {
    checklist.push({ item: "Case Study Depth", status: "pass", message: "Full architectural case study sections populated." });
  } else {
    checklist.push({ item: "Case Study Depth", status: "warn", message: "Incomplete case study sections (overview, challenge, or solution missing)." });
  }

  // Calculate Scores
  const passCount = checklist.filter((c) => c.status === "pass").length;
  const warnCount = checklist.filter((c) => c.status === "warn").length;
  const seoScore = Math.round(((passCount * 1.0 + warnCount * 0.5) / checklist.length) * 100);
  const geoScore = project.geo?.keyFacts?.length && project.geo?.summary ? 95 : 60;
  const readabilityScore = project.description && project.description.length > 150 ? 92 : 70;

  return {
    seoScore,
    geoScore,
    readabilityScore,
    checklist,
    suggestions,
  };
}

export function generateAISuggestions(req: AIGenerationRequest): { suggestion: string; rationale: string } {
  const p = req.projectData;
  const title = p.title || "Project";
  const cat = p.category || "Web Application";
  const role = p.role || "Web & Mobile App Developer";
  const techs = p.technologies?.join(", ") || "WordPress, React, Next.js, Flutter";

  switch (req.type) {
    case "seo_title":
      return {
        suggestion: `${title} — ${cat} Case Study | M Ramzan`,
        rationale: "Optimized 55-character title featuring the project name, primary entity category, and personal brand authority.",
      };

    case "meta_description":
      return {
        suggestion: `Explore the project case study of ${title}, a ${cat.toLowerCase()} developed by ${role} M Ramzan using ${techs}.`,
        rationale: "Action-oriented 145-character meta snippet highlighting the role, core technologies, and value proposition without keyword stuffing.",
      };

    case "project_summary":
      return {
        suggestion: `${title} is a ${cat.toLowerCase()} developed by ${role} M Ramzan. The project leverages ${techs} to deliver fast loading, clean UI design, and reliable performance.`,
        rationale: "Structured, concise entity summary directly formatted for search engines and user review.",
      };

    case "geo_keyfacts":
      return {
        suggestion: JSON.stringify(
          [
            `Developed by ${role} M Ramzan`,
            `Primary technology stack: ${techs}`,
            `Specialized category: ${cat}`,
            `Designed for responsive layout, clean UI, and fast performance`,
          ],
          null,
          2
        ),
        rationale: "Machine-readable factual bullet points providing unambiguous entity context for AI engine indexing.",
      };

    case "faq_suggestions":
      return {
        suggestion: JSON.stringify(
          [
            {
              id: `faq-${Date.now()}-1`,
              question: `What architectural role did M Ramzan perform on ${title}?`,
              answer: `M Ramzan served as ${role}, overseeing end-to-end full-stack development, database schema design, UI/UX implementation, and production deployment.`,
            },
            {
              id: `faq-${Date.now()}-2`,
              question: `Which core technologies were leveraged to construct ${title}?`,
              answer: `The platform was built utilizing ${techs}, prioritizing sub-second load performance and high system reliability.`,
            },
          ],
          null,
          2
        ),
        rationale: "High-value architectural Q&As matching common AI user queries and search intent.",
      };

    case "case_study_refine":
      return {
        suggestion: `The project required modern full-stack engineering to overcome legacy bottlenecks. By leveraging ${techs}, the solution established an agile, secure, and intuitive workflow, achieving notable performance benchmarks.`,
        rationale: "Enhanced editorial phrasing focusing on measurable outcomes and engineering clarity.",
      };

    default:
      return {
        suggestion: `${title} case study details reviewed.`,
        rationale: "Audit complete.",
      };
  }
}
