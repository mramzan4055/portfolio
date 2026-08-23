"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth springs with high stiffness for instant response without lag
  const springConfig = { damping: 28, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!isVisible && cursorRef.current && haloRef.current) {
        cursorRef.current.style.opacity = "1";
        haloRef.current.style.opacity = "1";
        isVisible = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !haloRef.current) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button";

      if (isInteractive) {
        haloRef.current.style.transform = "translate(-50%, -50%) scale(1.6)";
        haloRef.current.style.borderColor = "rgba(223, 177, 91, 0.8)";
        haloRef.current.style.backgroundColor = "rgba(223, 177, 91, 0.08)";
      } else {
        haloRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        haloRef.current.style.borderColor = "rgba(223, 177, 91, 0.35)";
        haloRef.current.style.backgroundColor = "transparent";
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && haloRef.current) {
        cursorRef.current.style.opacity = "0";
        haloRef.current.style.opacity = "0";
        isVisible = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        ref={cursorRef}
        style={{
          x: rawX,
          y: rawY,
          opacity: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#dfb15b] rounded-full pointer-events-none z-[9999] will-change-transform"
      />
      {/* Outer Halo */}
      <motion.div
        ref={haloRef}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#dfb15b]/35 pointer-events-none z-[9998] transition-[transform,border-color,background-color] duration-150 ease-out will-change-transform"
      />
    </>
  );
}
