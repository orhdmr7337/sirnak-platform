"use client";

import { useState, useEffect } from "react";
import { useNavLinks, useSite } from "@sirnak/shared";
import { SearchTrigger } from "@sirnak/shared";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = useNavLinks();
  const { site } = useSite();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const defaultLinks = [
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Süreç", href: "#surec" },
    { label: "Galeri", href: "#galeri" },
    { label: "SSS", href: "#sss" },
    { label: "Blog", href: "/blog" },
    { label: "Belgeler", href: "/belgeler" },
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "#iletisim" },
  ];

  const links = navLinks.length > 0
    ? navLinks.map((l) => ({ label: l.label, href: l.href }))
    : defaultLinks;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="sc-wrap flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/images/logo-tesisat.svg"
            alt="Çözüm Noktası"
            className="h-10 w-10"
          />
          <span className="font-semibold text-white" style={{ fontFamily: "var(--sc-font-display)" }}>
            Çözüm Noktası
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#9a9ba1] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <SearchTrigger siteId={site.id} siteSlug="tesisat" primaryColor={site.primary_color} />
          <a
            href="tel:+905001234567"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-[#050505] transition-all hover:bg-primary-dark"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Hemen Ara
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          aria-label="Menü"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl md:hidden">
          <nav className="sc-wrap flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-[#9a9ba1] transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+905001234567"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#050505]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Hemen Ara
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
