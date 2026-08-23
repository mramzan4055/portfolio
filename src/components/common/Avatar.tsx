"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: number;
  initials?: string;
  ring?: boolean;
}

export function Avatar({
  src = "/images/profile.jpg",
  alt = "M Ramzan",
  className = "w-10 h-10 rounded-xl",
  size = 64,
  initials = "MR",
  ring = false,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#dfb15b] to-[#a27429] shadow-gold flex-shrink-0 flex items-center justify-center ${
        ring ? "ring-2 ring-[#dfb15b]/40" : ""
      } ${className}`}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-cover object-top"
          onError={() => setHasError(true)}
          unoptimized
        />
      ) : (
        <span className="font-bold text-black text-sm tracking-wider select-none">
          {initials}
        </span>
      )}
    </div>
  );
}
