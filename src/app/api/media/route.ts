import { NextRequest, NextResponse } from "next/server";
import { getMediaItems, saveMediaItem, deleteMediaItem } from "@/lib/data/store";
import { MediaItem } from "@/types";

export async function GET() {
  try {
    const media = await getMediaItems();
    return NextResponse.json({ success: true, media });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mediaItem: MediaItem = {
      id: body.id || `media-${Date.now()}`,
      name: body.name || "Uploaded Image",
      url: body.url,
      size: body.size || 256000,
      type: body.type || "image/jpeg",
      dimensions: body.dimensions || { width: 1920, height: 1080 },
      altText: body.altText || body.name || "Project media asset",
      caption: body.caption || "",
      createdAt: new Date().toISOString(),
    };

    if (!mediaItem.url) {
      return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    const saved = await saveMediaItem(mediaItem);
    return NextResponse.json({ success: true, media: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save media" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    const success = await deleteMediaItem(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete media" }, { status: 500 });
  }
}
