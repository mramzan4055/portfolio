"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.16,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
