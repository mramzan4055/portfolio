"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Plus,
  ImageIcon,
  Maximize2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { MediaItem } from "@/types";

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Media Modal / Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAltText, setNewAltText] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.success) {
        setMediaItems(data.media);
      }
    } catch (e) {
      console.error("Failed to fetch media:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete media asset "${name}"?`)) return;

    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMediaItems((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      alert("Failed to delete media asset");
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    try {
      if (uploadMode === "file") {
        if (!selectedFile) {
          alert("Please select a file to upload");
          setAdding(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        if (newName) formData.append("name", newName);
        if (newAltText) formData.append("altText", newAltText);

        const res = await fetch("/api/media", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          setMediaItems((prev) => [data.media, ...prev]);
          setShowAddModal(false);
          setSelectedFile(null);
          setNewName("");
          setNewAltText("");
        } else {
          alert(data.error || "Failed to upload file");
        }
      } else {
        if (!newUrl.trim()) return;

        const res = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newName || "New Media Asset",
            url: newUrl,
            altText: newAltText || newName || "Media graphic asset",
            size: 450000,
            type: "image/jpeg",
            dimensions: { width: 1920, height: 1080 },
          }),
        });

        const data = await res.json();
        if (data.success) {
          setMediaItems((prev) => [data.media, ...prev]);
          setShowAddModal(false);
          setNewName("");
          setNewUrl("");
          setNewAltText("");
        } else {
          alert(data.error || "Failed to add media URL");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add media");
    } finally {
      setAdding(false);
    }
  };

  const filteredMedia = mediaItems.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-platinum-400 font-mono">
            Manage high-resolution imagery, thumbnails, and visual assets with Wasmer Database & local storage integration.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Add Media</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-platinum-500" />
          <input
            type="text"
            placeholder="Search media by name or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b]/50"
          />
        </div>

        <span className="text-xs font-mono text-platinum-400">
          {filteredMedia.length} Assets
        </span>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="glass-panel p-12 rounded-3xl text-center text-xs font-mono text-platinum-400">
          Loading media library...
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center text-xs font-mono text-platinum-400">
          No media assets found. Click &ldquo;Upload / Add Media&rdquo; to add your first asset.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#dfb15b]/40 transition-all"
            >
              <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.altText || item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-xs font-mono font-semibold text-white truncate" title={item.name}>
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-mono text-platinum-500 truncate" title={item.altText}>
                    Alt: {item.altText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-platinum-500">
                    {(item.size / 1024).toFixed(0)} KB
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.id, item.url)}
                      className="p-1.5 rounded-lg bg-white/[0.04] text-platinum-300 hover:text-white"
                      title="Copy Public URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 rounded-lg bg-white/[0.04] text-red-400 hover:text-red-300"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel-elevated p-8 rounded-3xl max-w-lg w-full flex flex-col gap-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-white">
                Add Image / Media Asset
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-platinum-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setUploadMode("file")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  uploadMode === "file"
                    ? "bg-[#dfb15b] text-black font-bold"
                    : "text-platinum-400 hover:text-white"
                }`}
              >
                Upload File from PC
              </button>
              <button
                type="button"
                onClick={() => setUploadMode("url")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  uploadMode === "url"
                    ? "bg-[#dfb15b] text-black font-bold"
                    : "text-platinum-400 hover:text-white"
                }`}
              >
                Add via URL / CDN
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="flex flex-col gap-4">
              {uploadMode === "file" ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-platinum-400">
                    Select Image File <span className="text-[#dfb15b]">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedFile(file);
                      if (file && !newName) {
                        setNewName(file.name.replace(/\.[^/.]+$/, ""));
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-[#dfb15b] file:text-black hover:file:bg-[#dfb15b]/90 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono uppercase text-platinum-400">
                    Image URL / CDN Link <span className="text-[#dfb15b]">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-[#dfb15b]"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Asset Title / Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alqadir Hero Banner"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-platinum-400">
                  Accessibility Alt Text
                </label>
                <input
                  type="text"
                  placeholder="Description for screen readers and SEO..."
                  value={newAltText}
                  onChange={(e) => setNewAltText(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-[#dfb15b]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-platinum-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-6 py-2 rounded-full bg-[#dfb15b] text-black font-bold text-xs font-mono uppercase tracking-wider hover:shadow-gold transition-all"
                >
                  {adding ? "Saving..." : uploadMode === "file" ? "Upload File" : "Save Asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
