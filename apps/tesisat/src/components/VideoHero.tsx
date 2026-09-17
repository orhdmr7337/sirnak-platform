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
  { type: "image", src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80&fm=webp" },
];

interface VideoHeroProps {
  media?: MediaItem[];
  children?: React.ReactNode;
}

export default function VideoHero({ media, children }: VideoHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const items = media && media.length > 0 ? media : STOCK_MEDIA;

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const current = items[currentIndex];
    if (current.type === "video") {
      // Video otomatik geçiş için süre
      const timeout = setTimeout(advance, 15000);
      return () => clearTimeout(timeout);
    } else {
      // Resim için 5 saniye
      const timeout = setTimeout(advance, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, items, advance]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    items.forEach((item, i) => {
      if (item.type === "video") {
        const video = videoRefs.current[i];
        if (!video) return;
        if (i === currentIndex) {
          const onCanPlay = () => { video.play().catch(() => {}); };
          video.addEventListener("canplay", onCanPlay);
          cleanups.push(() => video.removeEventListener("canplay", onCanPlay));
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
    return () => cleanups.forEach((fn) => fn());
  }, [currentIndex, items]);

  const prevIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {items.map((item, i) => {
        const isActive = i === currentIndex;
        const isNearby = i === prevIndex || i === nextIndex;
        if (!isActive && !isNearby) return null;

        return (
          <motion.div
            key={`${item.src}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{ visibility: isActive ? "visible" : "hidden" }}
          >
            {item.type === "video" ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={item.src}
                poster={item.poster}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                autoPlay={isActive}
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
                  className="object-cover"
                />
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="100vw"
                  loading="lazy"
                  className="object-cover"
                />
              )
            )}
          </motion.div>
        );
      })}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-16 md:pb-24">
        <div className="sc-wrap w-full">{children}</div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={item.type === "video" ? `Video ${i + 1}` : `Slide ${i + 1}`}
          >
            {item.type === "video" && i === currentIndex && (
              <motion.div
                className="h-full bg-white/50 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Video indicator */}
      {items[currentIndex]?.type === "video" && (
        <div className="absolute top-6 right-6 z-20">
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
