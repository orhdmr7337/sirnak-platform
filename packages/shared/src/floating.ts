"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ekranın altına yapışan bantlar (çerez, PWA yükleme) için yerleşim.
 *
 * - Sayfada `[data-mobile-bar]` işaretli bir alt aksiyon çubuğu varsa (mobilde görünür,
 *   masaüstünde `display:none` olduğu için yüksekliği 0), bant onun ÜSTÜNE oturur.
 * - Bandın yüksekliğini `--float-h` CSS değişkenine yazar; WhatsApp gibi yüzen butonlar
 *   `margin-bottom: var(--float-h, 0px)` ile bandın üstüne kayar. Böylece hiçbir şey üst üste binmez.
 */
export function useBottomBanner(visible: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.style.removeProperty("--float-h");
      return;
    }

    const measure = () => {
      const bar = document.querySelector<HTMLElement>("[data-mobile-bar]");
      setBottom(bar ? bar.offsetHeight : 0);
      root.style.setProperty("--float-h", `${ref.current?.offsetHeight ?? 0}px`);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--float-h");
    };
  }, [visible]);

  return { ref, bottom };
}

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-change";
