import { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/data/store";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();

  return {
    name: settings.siteName || "M RAMZAN — Web & Mobile App Developer",
    short_name: "M Ramzan",
    description:
      settings.siteDescription ||
      "Web and mobile application developer in Pakistan specializing in WordPress, React, Next.js, Flutter, and business websites for SMEs.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    categories: ["business", "portfolio", "technology"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
