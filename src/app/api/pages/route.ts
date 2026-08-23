import { NextRequest, NextResponse } from "next/server";
import { getPages, savePage } from "@/lib/data/store";
import { Page } from "@/types";

export async function GET() {
  try {
    const pages = await getPages();
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const pageData: Page = await req.json();
    const saved = await savePage(pageData);
    return NextResponse.json({ success: true, page: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save page" }, { status: 500 });
  }
}
