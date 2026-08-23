import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/data/store";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "M Ramzan — Web & Mobile App Developer, Pakistan";

export default async function OpengraphImage() {
  const settings = await getSiteSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #08080a 0%, #14141a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#dfb15b",
              display: "flex",
            }}
          />
          <div style={{ color: "#dfb15b", fontSize: 24, letterSpacing: 4, fontWeight: 700 }}>
            M RAMZAN
          </div>
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {settings.authorTitle || "Web & Mobile App Developer"}
        </div>

        <div
          style={{
            color: "#c9c9d4",
            fontSize: 30,
            fontWeight: 400,
            marginTop: 24,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Websites & apps for Pakistani SMEs — starting from PKR 30,000
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 56,
          }}
        >
          {["WordPress", "React", "Next.js", "Flutter"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(223,177,91,0.4)",
                color: "#dfb15b",
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
