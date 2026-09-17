"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { searchSite, highlightMatch, debounce, normalizeTurkish } from "./search";
import type { SearchResult } from "./search";

const RECENT_KEY = "sirnak_search_recent";
const POPULAR_SEARCHES = ["tesisat", "su kaçağı", "petek temizliği", "masaj", "thai masajı", "elektrik"];

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function addRecentSearch(query: string) {
  const recent = getRecentSearches().filter((r) => r !== query);
  recent.unshift(query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 5)));
}

const typeLabels: Record<string, string> = {
  service: "Hizmetler",
  blog: "Blog",
  district: "Bölgeler",
  page: "Sayfalar",
};

const typeIcons: Record<string, React.ReactNode> = {
  service: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.049.58.025 1.193-.14 1.743" />
    </svg>
  ),
  blog: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  district: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  page: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: string;
  siteSlug: "tesisat" | "masaj";
  primaryColor: string;
}

export function SearchModal({ isOpen, onClose, siteId, siteSlug, primaryColor }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches());
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const performSearch = useCallback(
    debounce(async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await searchSite(siteId, q, { limit: 15 });
        setResults(data);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300),
    [siteId]
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    setLoading(value.length >= 2);
    performSearch(value);
  };

  const groupedResults = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  const flatResults = Object.values(groupedResults).flat();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const item = flatResults[selectedIndex];
      if (item) {
        addRecentSearch(query);
        window.location.href = item.url;
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const selectResult = (result: SearchResult) => {
    addRecentSearch(query);
    window.location.href = result.url;
  };

  const searchPopular = (term: string) => {
    setQuery(term);
    handleQueryChange(term);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] md:pt-[15vh]"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111111]/95 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "searchSlideIn 0.2s ease-out" }}
      >
        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
          <svg className="h-5 w-5 shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hizmetler, blog yazıları, bölgeler ara..."
            className="flex-1 bg-transparent text-base text-white placeholder-white/30 outline-none"
          />
          <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/30 md:block">ESC</kbd>
        </div>

        <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="p-6">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-lg bg-white/5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="mt-3 text-sm text-white/40">&ldquo;{query}&rdquo; için sonuç bulunamadı</p>
              <p className="mt-1 text-xs text-white/20">Farklı anahtar kelimelerle tekrar deneyin</p>
            </div>
          )}

          {!loading && query.length < 2 && (
            <div className="p-5">
              {recentSearches.length > 0 && (
                <div className="mb-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/30">Son Aramalar</p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => searchPopular(term)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/30">Popüler Aramalar</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => searchPopular(term)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white/80"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="p-3">
              {Object.entries(groupedResults).map(([type, items]) => (
                <div key={type} className="mb-3">
                  <p className="mb-1 px-2 text-xs font-medium uppercase tracking-wider text-white/30">
                    {typeLabels[type] ?? type}
                  </p>
                  {items.map((item) => {
                    const globalIndex = flatResults.indexOf(item);
                    return (
                      <button
                        key={`${item.type}-${item.id}`}
                        onClick={() => selectResult(item)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                          selectedIndex === globalIndex ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/40">
                          {typeIcons[item.type]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate text-sm font-medium text-white"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(item.title, query),
                            }}
                          />
                          {item.excerpt && (
                            <p className="mt-0.5 truncate text-xs text-white/40">
                              {highlightMatch(item.excerpt.slice(0, 80), query)}
                              {item.excerpt.length > 80 ? "..." : ""}
                            </p>
                          )}
                        </div>
                        <svg className="h-4 w-4 shrink-0 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 px-5 py-2.5">
          <div className="flex items-center gap-3 text-xs text-white/20">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↑↓</kbd>
              gezin
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↵</kbd>
              seç
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">esc</kbd>
              kapat
            </span>
          </div>
          <a
            href={`/arama?q=${encodeURIComponent(query)}`}
            className="text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            Tam sayfada göster →
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes searchSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
