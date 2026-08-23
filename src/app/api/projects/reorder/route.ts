import { NextRequest, NextResponse } from "next/server";
import { reorderProjects } from "@/lib/data/store";

export async function POST(req: NextRequest) {
  try {
    const { orderedIds } = await req.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ success: false, error: "orderedIds array is required" }, { status: 400 });
    }
    const success = await reorderProjects(orderedIds);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reorder projects" }, { status: 500 });
  }
}
