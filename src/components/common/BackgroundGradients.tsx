import React from "react";

export function BackgroundGradients() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Top Left Gold / Amber Glow */}
      <div 
        className="ambient-glow bg-[#dfb15b] top-[-10%] left-[-10%] w-[600px] h-[600px] opacity-[0.08]" 
      />
      {/* Center Right Indigo / Deep Violet Glow */}
      <div 
        className="ambient-glow bg-[#363675] top-[30%] right-[-15%] w-[700px] h-[700px] opacity-[0.07]" 
      />
      {/* Bottom Center Subtle Bronze Glow */}
      <div 
        className="ambient-glow bg-[#c7963b] bottom-[-10%] left-[25%] w-[800px] h-[600px] opacity-[0.05]" 
      />
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-70" />
    </div>
  );
}
