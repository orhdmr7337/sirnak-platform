"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let animating = true;
    let lastTime = 0;
    const IDLE_TIMEOUT = 150;

    function raf(time: number) {
      if (!animating) return;

      lenis.raf(time);

      if (time - lastTime > IDLE_TIMEOUT) {
        animating = false;
        return;
      }

      requestAnimationFrame(raf);
    }

    function onActivity() {
      lastTime = performance.now();
      if (!animating) {
        animating = true;
        requestAnimationFrame(raf);
      }
    }

    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("touchmove", onActivity, { passive: true });
    window.addEventListener("wheel", onActivity, { passive: true });

    requestAnimationFrame(raf);

    return () => {
      animating = false;
      lenis.destroy();
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchmove", onActivity);
      window.removeEventListener("wheel", onActivity);
    };
  }, []);

  return <>{children}</>;
}
