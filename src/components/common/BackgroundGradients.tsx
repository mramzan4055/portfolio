import React from "react";

export function BackgroundGradients() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Top Left Gold / Amber Glow - High Performance Radial Gradient */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(223, 177, 91, 0.08) 0%, rgba(223, 177, 91, 0.02) 45%, transparent 70%)",
        }}
      />
      {/* Center Right Indigo / Deep Violet Glow */}
      <div
        className="absolute top-[30%] right-[-15%] w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(54, 54, 117, 0.09) 0%, rgba(54, 54, 117, 0.02) 50%, transparent 70%)",
        }}
      />
      {/* Bottom Center Subtle Bronze Glow */}
      <div
        className="absolute bottom-[-10%] left-[25%] w-[800px] h-[600px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(199, 150, 59, 0.06) 0%, rgba(199, 150, 59, 0.01) 45%, transparent 70%)",
        }}
      />
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-60" />
    </div>
  );
}
