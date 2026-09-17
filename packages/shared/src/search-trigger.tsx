"use client";

import { useState, useEffect } from "react";
import { SearchModal } from "./search-modal";
import type { SiteSlug } from "./supabase";

interface SearchTriggerProps {
  siteId: string;
  siteSlug: SiteSlug;
  primaryColor: string;
}

export function SearchTrigger({ siteId, siteSlug, primaryColor }: SearchTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/40 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/60"
        aria-label="Ara"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span className="hidden md:inline">Ara</span>
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30 md:inline">⌘K</kbd>
      </button>

      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        siteId={siteId}
        siteSlug={siteSlug}
        primaryColor={primaryColor}
      />
    </>
  );
}
