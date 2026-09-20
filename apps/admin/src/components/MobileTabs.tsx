"use client";

import { useEffect, useRef } from "react";

interface Tab {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface MobileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

/**
 * Mobil sekme şeridi: yatay kaydırılabilir, aktif sekme otomatik ortalanır.
 * Header'ın hemen altında yapışkan durur (lg ve üzerinde gizli).
 */
export default function MobileTabs({ tabs, activeTab, onTabChange }: MobileTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Aktif sekmeyi şeridin içinde ortala (sayfanın kendisini kaydırmadan)
  useEffect(() => {
    const list = listRef.current;
    const el = activeRef.current;
    if (!list || !el) return;
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="lg:hidden sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-20 bg-white/95 backdrop-blur border-b border-surface-200">
      <div ref={listRef} role="tablist" className="relative flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2.5">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={active ? activeRef : undefined}
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(tab.id)}
              className={`shrink-0 h-10 inline-flex items-center gap-2 pl-3 pr-3.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors active:scale-[0.97] ${
                active
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface-100 text-surface-600"
              }`}
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`min-w-5 h-5 px-1.5 rounded-full text-[10px] font-semibold inline-flex items-center justify-center ${
                    active ? "bg-white/25 text-white" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
