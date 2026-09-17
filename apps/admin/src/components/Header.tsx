"use client";

import { useRouter } from "next/navigation";

interface HeaderProps {
  siteName: string;
  siteSlug: string;
  message?: string;
  onSignOut: () => void;
}

export default function Header({ siteName, siteSlug, message, onSignOut }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-surface-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 h-[56px] flex items-center justify-between gap-4">
        {/* Left: Back + Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-1.5 text-surface-400 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div className="min-w-0 flex items-center gap-1.5 text-sm">
            <span className="text-surface-400 hidden sm:inline">Ana Sayfa</span>
            <svg className="w-3 h-3 text-surface-300 hidden sm:inline" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-surface-700 font-medium truncate">{siteName}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {message && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-lg animate-slideDown border border-brand-100 text-xs font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {message}
            </div>
          )}

          <button
            onClick={() => router.push("/notifications")}
            className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors relative"
            title="Bildirimler"
          >
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>

          <div className="w-px h-5 bg-surface-200 mx-1 hidden sm:block" />

          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-2 py-1.5 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors text-xs"
          >
            <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[11px] font-semibold">
              A
            </div>
            <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
