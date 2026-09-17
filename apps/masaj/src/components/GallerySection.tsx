"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useGalleryItems } from "@sirnak/shared";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryMedia {
  id: string;
  title: string;
  image_url?: string;
  video_url?: string;
  type: "image" | "video";
  label?: string;
  category?: string;
}

const FALLBACK_GALLERY: GalleryMedia[] = [
  { id: "1", title: "Masaj Salonu", image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80&fm=webp", type: "image", label: "Salon", category: "gallery" },
  { id: "2", title: "Yağlar", image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80&fm=webp", type: "image", label: "Ürünler", category: "gallery" },
  { id: "3", title: "Aromaterapi", image_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80&fm=webp", type: "image", label: "Aromaterapi", category: "gallery" },
  { id: "4", title: "Rahatlama", image_url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&fm=webp", type: "image", label: "Relax", category: "gallery" },
  { id: "5", title: "Taş Masajı", image_url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80&fm=webp", type: "image", label: "Sıcak Taş", category: "gallery" },
  { id: "6", title: "Spa", image_url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80&fm=webp", type: "image", label: "Spa", category: "gallery" },
];

export function GallerySection() {
  const gallery = useGalleryItems();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const items: GalleryMedia[] = gallery.length > 0
    ? gallery
        .filter((g) => g.image_url || (g as any).video_url)
        .map((g) => ({
          id: g.id,
          title: g.title,
          image_url: g.image_url,
          video_url: (g as any).video_url,
          type: (g as any).video_url ? "video" as const : "image" as const,
          label: g.label,
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
    <section id="galeri" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Galeri
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Mekanımızdan <span className="text-[#6b8f71]">Kareler</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ scale: 1.03 }}
              onClick={() => open(i)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <Image
                src={item.image_url || `https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80&fm=webp`}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Video play icon */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-14 h-14 rounded-full bg-[#c9a96e]/80 flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors">
                    <Play className="w-7 h-7 text-[#0a0f0a] fill-[#0a0f0a] ml-1" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-sm font-medium">
                  {item.label || item.title}
                </span>
                {item.type === "video" && (
                  <span className="text-white/70 text-xs ml-2">• Video</span>
                )}
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <button onClick={close} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/70 hover:text-white z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white/70 hover:text-white z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "video" && selectedItem.video_url ? (
                <video
                  src={selectedItem.video_url}
                  controls
                  autoPlay
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="relative w-full max-h-[80vh]">
                  <Image
                    src={selectedItem.image_url || ""}
                    alt={selectedItem.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[80vh] object-contain rounded-xl mx-auto block"
                  />
                </div>
              )}
              
              <div className="text-center mt-4">
                <p className="text-white font-medium">{selectedItem.label || selectedItem.title}</p>
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
