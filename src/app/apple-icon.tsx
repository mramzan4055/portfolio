import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #08080a 0%, #14141a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#dfb15b",
            fontFamily: "sans-serif",
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
