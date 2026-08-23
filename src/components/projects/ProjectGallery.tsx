"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  gallery: string[];
  title: string;
}

export function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-display font-bold text-white tracking-tight">
          Visual Interface Gallery
        </h3>
        <span className="text-xs font-mono text-platinum-400">
          {gallery.length} High-Res Frames
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(imgUrl)}
            className="group relative aspect-[16/10] rounded-2xl overflow-hidden glass-panel cursor-pointer hover:border-[#dfb15b]/40 transition-all"
          >
            <Image
              src={imgUrl}
              alt={`${title} Gallery Preview ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="p-3 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                <ZoomIn className="w-5 h-5 text-[#dfb15b]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12 cursor-zoom-out"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#dfb15b] hover:text-black transition-colors z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={selectedImage}
              alt={title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
