"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useGalleryItems, useSiteConfig } from "@sirnak/shared";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&fm=webp",
  "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80&fm=webp",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80&fm=webp",
  "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80&fm=webp",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&fm=webp",
];

export function ImageStreamHero() {
  const gallery = useGalleryItems();
  const site = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const images =
    gallery.length > 0
      ? gallery
          .filter((g) => g.image_url)
          .map((g) => g.image_url!)
      : FALLBACK_IMAGES;

  const allImages = images.length > 0 ? images : FALLBACK_IMAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {allImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {i === 0 ? (
            <Image
              src={src}
              alt={site?.name || "Doğal Dokunuş Masaj"}
              fill
              sizes="100vw"
              priority
              className="object-cover hero-img"
            />
          ) : (
            <Image
              src={src}
              alt={site?.name || "Doğal Dokunuş Masaj"}
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover hero-img"
            />
          )}
        </div>
      ))}

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>")`,
        }}
      />

      {/* Image stream dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {allImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-[#c9a96e] w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Görsel ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
