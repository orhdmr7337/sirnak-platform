"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}

const STOCK_MEDIA: MediaItem[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&fm=webp" },
];

interface VideoHeroProps {
  media?: MediaItem[];
}

export function VideoHero({ media }: VideoHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const items = media && media.length > 0 ? media : STOCK_MEDIA;

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const current = items[currentIndex];
    if (current.type === "video") {
      const timeout = setTimeout(advance, 15000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(advance, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, items, advance]);

  useEffect(() => {
    items.forEach((item, i) => {
      if (item.type === "video") {
        const video = videoRefs.current[i];
        if (video) {
          if (i === currentIndex) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      }
    });
  }, [currentIndex, items]);

  const prevIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.map((item, i) => {
        const isActive = i === currentIndex;
        const isNearby = i === prevIndex || i === nextIndex;
        if (!isActive && !isNearby) return null;

        return (
          <motion.div
            key={`${item.src}-${i}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.1
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{ visibility: isActive ? "visible" : "hidden" }}
          >
            {item.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={item.src}
                poster={item.poster}
                className="w-full h-full object-cover hero-img"
                muted
                loop
                playsInline
                preload={isActive ? "auto" : "metadata"}
              />
            ) : (
              i === 0 ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover hero-img"
                />
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover hero-img"
                />
              )
            )}
          </motion.div>
        );
      })}

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-[#c9a96e] w-6"
                : "bg-white/40 hover:bg-white/60 w-2"
            }`}
            aria-label={item.type === "video" ? `Video ${i + 1}` : `Görsel ${i + 1}`}
          />
        ))}
      </div>

      {/* Video indicator */}
      {items[currentIndex]?.type === "video" && (
        <div className="absolute top-6 right-6 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-white/80">Video</span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
