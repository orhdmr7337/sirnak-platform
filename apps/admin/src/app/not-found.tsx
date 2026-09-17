"use client";

import { NotFoundGlitch } from "@/components/ui/be-ui-404-not-found";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-surface-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">Ş</span>
          </div>
          <span className="text-sm font-semibold text-surface-900">Şırnak Platform</span>
        </div>
      </header>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center">
        <NotFoundGlitch
          code="404"
          title="Sayfa Bulunamadı"
          description="Aradığınız sayfa mevcut değil veya taşınmış olabilir."
          homeHref="/dashboard"
          homeLabel="Ana Sayfaya Dön"
          browseHref="/dashboard"
          browseLabel="Sayfaları Keşfet"
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-100 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs text-surface-400">
          <span>© 2024 Şırnak Platform</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-surface-600 transition-colors">Gizlilik</a>
            <a href="/cookies" className="hover:text-surface-600 transition-colors">Çerezler</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
