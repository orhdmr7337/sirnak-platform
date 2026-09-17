"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80&fm=webp",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&fm=webp",
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80&fm=webp",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&fm=webp",
];

export default function ImageStreamHero({
  images,
  children,
}: {
  images?: string[];
  children?: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pics =
    images && images.length > 0
      ? images
      : STOCK_IMAGES;

  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % pics.length);
      setIsTransitioning(false);
    }, 600);
  }, [pics.length]);

  useEffect(() => {
    const interval = setInterval(advance, 5000);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {pics.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
            loading={i === 0 ? undefined : "lazy"}
          />
        </div>
      ))}

      <div className="sc-scrim" />

      <div className="relative z-10 flex h-full items-end pb-16 md:pb-24">
        <div className="sc-wrap w-full">{children}</div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {pics.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
