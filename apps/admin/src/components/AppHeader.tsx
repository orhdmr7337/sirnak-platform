"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "./BottomNav";

interface AppHeaderProps {
  actions?: ReactNode;
}

/**
 * Bağımsız dashboard sayfaları için ortak üst bar.
 * Logo + marka solda, aksiyonlar sağda.
 */
export default function AppHeader({ actions }: AppHeaderProps) {
  const router = useRouter();

  return (
    <>
    <header className="bg-white/95 backdrop-blur border-b border-surface-200 sticky top-0 z-30 pt-safe">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2.5 group min-h-11"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center group-hover:bg-brand-700 transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
          </div>
          <span className="text-base sm:text-sm font-semibold text-surface-900">Şırnak Platform</span>
        </button>
        {/* Mobilde gezinme alt çubukta; üst çubuktaki aksiyonlar sadece masaüstünde */}
        <div className="hidden lg:flex items-center gap-1">{actions}</div>
      </div>
    </header>
    <BottomNav />
    </>
  );
}
