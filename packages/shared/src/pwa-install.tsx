"use client";

import { useEffect, useState, useCallback } from "react";

interface PWAInstallProps {
  appName: string;
  themeColor: string;
}

export function PWAInstall({ appName, themeColor }: PWAInstallProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

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

  if (isDismissed || (!showInstall && !isIOS)) return null;

  if (isIOS) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1a1a1a] border-t border-gray-800"
        style={{ borderTopColor: themeColor }}
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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1a1a1a] border-t"
      style={{ borderTopColor: themeColor }}
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
