"use client";

import { useState, useEffect } from "react";
import { useBottomBanner, CONSENT_KEY, CONSENT_EVENT } from "./floating";

interface CookieConsentProps {
  /** Kabul butonu rengi (site ana rengi). Verilmezse site temasının yeşili kullanılır. */
  accentColor?: string;
}

export function CookieConsent({ accentColor = "#6b8f71" }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const { ref, bottom } = useBottomBanner(visible);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // localStorage kapalıysa (gizli mod vb.) bandı göstermeyiz
    }
  }, []);

  const answer = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // yoksay
    }
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Çerez tercihleri"
      style={{ bottom }}
      className="fixed left-2 right-2 z-[9999] rounded-2xl border border-white/10 bg-[#111]/95 p-3 shadow-2xl backdrop-blur md:left-0 md:right-0 md:rounded-none md:border-x-0 md:border-b-0 md:px-6 md:py-4"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs leading-snug text-gray-300 md:text-sm md:text-gray-400">
          Bu site çerez kullanmaktadır. Kabul ediyor musunuz?
        </p>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => answer("accepted")}
            style={{ backgroundColor: accentColor }}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:flex-none md:px-5"
          >
            Kabul Et
          </button>
          <button
            onClick={() => answer("declined")}
            className="flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-white/30 hover:text-white md:flex-none md:px-5"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}
