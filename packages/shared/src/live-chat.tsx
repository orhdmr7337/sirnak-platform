"use client";

import { useEffect } from "react";

interface LiveChatProps {
  tawkId?: string;
  hideOnPages?: string[];
}

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export function LiveChat({ tawkId, hideOnPages = [] }: LiveChatProps) {
  const id = tawkId || process.env.NEXT_PUBLIC_TAWK_ID;

  useEffect(() => {
    if (!id) return;

    if (hideOnPages.length > 0 && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const shouldHide = hideOnPages.some(
        (page) => currentPath === page || currentPath.startsWith(page + "/")
      );
      if (shouldHide) return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${id}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector(
        `script[src*="embed.tawk.to"]`
      );
      if (existing) {
        existing.remove();
      }
    };
  }, [id, hideOnPages]);

  return null;
}
