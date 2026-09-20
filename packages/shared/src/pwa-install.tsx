"use client";

import { useEffect, useState, useCallback } from "react";
import { useBottomBanner, CONSENT_KEY, CONSENT_EVENT } from "./floating";

interface PWAInstallProps {
  appName: string;
  themeColor: string;
}

export function PWAInstall({ appName, themeColor }: PWAInstallProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  // Çerez bandıyla üst üste binmesin: çerez cevaplanmadan yükleme bandı gösterilmez.
  const [consentDone, setConsentDone] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setConsentDone(!!localStorage.getItem(CONSENT_KEY));
      } catch {
        setConsentDone(true);
      }
    };
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const ua = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    setIsIOS(ios);

    if (!ios) {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstall(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowInstall(false);
    setIsDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "true");
  }, []);

  const visible = consentDone && !isDismissed && (showInstall || isIOS);
  const { ref, bottom } = useBottomBanner(visible);

  if (!visible) return null;

  if (isIOS) {
    return (
      <div
        ref={ref}
        className="fixed left-0 right-0 z-50 p-4 bg-[#1a1a1a] border-t border-gray-800"
        style={{ borderTopColor: themeColor, bottom }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{appName}</p>
            <p className="text-xs text-gray-400">
              Ana ekrana eklemek için Paylaş &gt; Ana Ekrana Ekle
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 text-gray-500 hover:text-gray-300 transition-colors p-1"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="fixed left-0 right-0 z-50 p-4 bg-[#1a1a1a] border-t"
      style={{ borderTopColor: themeColor, bottom }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{appName}</p>
          <p className="text-xs text-gray-400">Uygulamayı yükleyin</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleInstall}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors"
            style={{ backgroundColor: themeColor }}
          >
            Yükle
          </button>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
