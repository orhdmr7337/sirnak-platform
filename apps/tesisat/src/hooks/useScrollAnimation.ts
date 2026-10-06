"use client";

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollAnimationOptions {
  offset?: ["start end", "end start"] | ["start start", "end end"] | string[];
  target?: React.RefObject<HTMLElement>;
}

export function useScrollAnimation(options?: ScrollAnimationOptions) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (options?.offset as any) || ["start end", "end start"],
  });

  // İçerik ekrana girer girmez okunur olsun; yukarı kayarken tekrar soluklaşmasın (mobilde boş ekran etkisi).
  const opacity = useTransform(scrollYProgress, [0, 0.12, 1], [0.35, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 1], [0.98, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.12, 1], [30, 0, 0]);

  return { ref, scrollYProgress, opacity, scale, y };
}

export function useParallax(distance: number = 50) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return { ref, y };
}

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "start 0.7"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return { ref, opacity, y };
}

export function useScrollScale() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return { ref, scale, opacity };
}

export function useScrollRotate(maxRotation: number = 5) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-maxRotation, maxRotation]);

  return { ref, rotate };
}
