import { NextRequest, NextResponse } from "next/server";
import { generateAISuggestions, analyzeProjectSEOandGEO, AIGenerationRequest } from "@/lib/ai/assistant";

export async function POST(req: NextRequest) {
  try {
    const body: AIGenerationRequest = await req.json();

    if (body.type === "audit") {
      const audit = analyzeProjectSEOandGEO(body.projectData);
      return NextResponse.json({ success: true, audit });
    }

    const suggestionResult = generateAISuggestions(body);
    return NextResponse.json({ success: true, ...suggestionResult });
  } catch (error) {
    return NextResponse.json({ success: false, error: "AI generation failed" }, { status: 500 });
  }
}
