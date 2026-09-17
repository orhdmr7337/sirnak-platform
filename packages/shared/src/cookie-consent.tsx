"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/10 bg-[#111] px-6 py-4 shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-gray-400 sm:text-left">
          Bu site çerez kullanmaktadır. Kabul ediyor musunuz?
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[#6b8f71] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5a7d60]"
          >
            Kabul Ediyorum
          </button>
          <button
            onClick={handleDecline}
            className="rounded-lg border border-white/10 px-5 py-2 text-sm font-medium text-gray-400 transition-colors hover:border-white/20 hover:text-white"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}
