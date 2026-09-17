"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useGalleryItems, useSiteContent } from "@sirnak/shared";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryMedia {
  id: string;
  title: string;
  image_url?: string;
  video_url?: string;
  type: "image" | "video";
  category?: string;
}

const FALLBACK_GALLERY: GalleryMedia[] = [
  { id: "1", title: "Su Kaçağı Tespiti", image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&fm=webp", type: "image", category: "gallery" },
  { id: "2", title: "Petek Temizliği", image_url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fm=webp", type: "image", category: "gallery" },
  { id: "3", title: "Kombi Bakımı", image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80&fm=webp", type: "image", category: "gallery" },
  { id: "4", title: "Elektrik Arıza", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&fm=webp", type: "image", category: "gallery" },
  { id: "5", title: "Tıkanıklık Açma", image_url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80&fm=webp", type: "image", category: "gallery" },
  { id: "6", title: "Su Tesisatı", image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&fm=webp", type: "image", category: "gallery" },
];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryItems = useGalleryItems();
  const { get } = useSiteContent();

  const title = get("gallery", "title", "Galeri");
  const subtitle = get("gallery", "subtitle", "Yaptığımız işlerden örnekler");

  // Gallery items'ı media formatına çevir
  const items: GalleryMedia[] = galleryItems.length > 0
    ? galleryItems
        .filter((g) => g.image_url || (g as any).video_url)
        .map((g) => ({
          id: g.id,
          title: g.title,
          image_url: g.image_url,
          video_url: (g as any).video_url,
          type: (g as any).video_url ? "video" as const : "image" as const,
          category: g.category,
        }))
    : FALLBACK_GALLERY;

  const open = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const prev = () => setSelectedIndex((l) => (l !== null ? (l - 1 + items.length) % items.length : null));
  const next = () => setSelectedIndex((l) => (l !== null ? (l + 1) % items.length : null));

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section id="galeri" className="sc-section">
      <div className="sc-wrap">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="mb-12 text-center"
        >
          <p className="sc-label mb-3 text-primary">{title}</p>
          <h2
            className="sc-display sc-display--md text-white"
            style={{ fontFamily: "var(--sc-font-display)" }}
          >
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ scale: 1.03 }}
              onClick={() => open(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              {/* Thumbnail */}
              <Image
                src={item.image_url || `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&fm=webp`}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Video play icon */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  {item.type === "video" && (
                    <p className="text-xs text-white/70 mt-1">Video İzle</p>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={close}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Content */}
            <motion.div
              key={selectedItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "video" && selectedItem.video_url ? (
                <video
                  src={selectedItem.video_url}
                  controls
                  autoPlay
                  className="w-full rounded-2xl"
                />
              ) : (
                <div className="relative w-full max-h-[85vh]">
                  <Image
                    src={selectedItem.image_url || ""}
                    alt={selectedItem.title}
                    width={1200}
                    height={800}
                    className="w-full rounded-2xl object-contain max-h-[85vh]"
                  />
                </div>
              )}
              
              {/* Title */}
              <div className="text-center mt-4">
                <p className="text-white font-medium">{selectedItem.title}</p>
                {selectedItem.type === "video" && (
                  <p className="text-white/60 text-sm mt-1">Video</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
