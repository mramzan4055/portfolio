import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/data/store";
import { Project } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as any;
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") ? searchParams.get("featured") === "true" : undefined;

    const projects = await getProjects({ status, category, featured });
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const projectData: Project = await req.json();

    if (!projectData.title || !projectData.slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const savedProject = await saveProject(projectData);
    return NextResponse.json({ success: true, project: savedProject });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save project" }, { status: 500 });
  }
}
