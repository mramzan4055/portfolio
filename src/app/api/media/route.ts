import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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
    const contentType = req.headers.get("content-type") || "";

    // Multipart Form Upload (Direct File from PC)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const customName = (formData.get("name") as string) || "";
      const altText = (formData.get("altText") as string) || "";

      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Ensure directory exists
      const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
      await mkdir(uploadDir, { recursive: true });

      // Clean filename
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${Date.now()}-${sanitizedName}`;
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      const publicUrl = `/images/uploads/${filename}`;

      const mediaItem: MediaItem = {
        id: `media-${Date.now()}`,
        name: customName || file.name,
        url: publicUrl,
        size: file.size,
        type: file.type || "image/jpeg",
        dimensions: { width: 1920, height: 1080 },
        altText: altText || customName || file.name,
        caption: "",
        createdAt: new Date().toISOString(),
      };

      const saved = await saveMediaItem(mediaItem);
      return NextResponse.json({ success: true, media: saved });
    }

    // JSON Payload with URL
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
    console.error("Media upload error:", error);
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
