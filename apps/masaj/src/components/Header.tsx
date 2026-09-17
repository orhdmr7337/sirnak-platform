"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useSiteConfig, useNavLinks, useSite } from "@sirnak/shared";
import { SearchTrigger } from "@sirnak/shared";

export function Header() {
  const site = useSiteConfig();
  const navLinks = useNavLinks();
  const { site: fullSite } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links =
    navLinks.length > 0
      ? navLinks.map((l) => ({ label: l.label, href: l.href }))
      : [
          { label: "Hakkımızda", href: "/belgeler" },
          { label: "Hizmetler", href: "/hizmetler" },
          { label: "Galeri", href: "#galeri" },
          { label: "Yorumlar", href: "#yorumlar" },
          { label: "Blog", href: "/blog" },
          { label: "İletişim", href: "#iletisim" },
        ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0f0a]/90 backdrop-blur-xl border-b border-[#2a3a2a]/50 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6b8f71] to-[#4a6b4f] flex items-center justify-center">
            <span className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
              {site?.name?.charAt(0) || "D"}
            </span>
          </div>
          <span
            className="text-white font-semibold text-lg hidden sm:block"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {site?.name?.split(" ").slice(0, 2).join(" ") || "Doğal Dokunuş"}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            link.href.startsWith("/") ? (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-[#c9a96e] transition-colors duration-300"
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href.replace("#", ""))}
                className="text-sm text-gray-300 hover:text-[#c9a96e] transition-colors duration-300"
              >
                {link.label}
              </button>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {fullSite && (
            <SearchTrigger siteId={fullSite.id} siteSlug="masaj" primaryColor={fullSite.primary_color} />
          )}
          {site?.phone && (
            <a
              href={`tel:${site.phone}`}
              className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
          )}
          <button
            onClick={() => scrollTo("iletisim")}
            className="hidden md:inline-flex px-5 py-2.5 bg-[#c9a96e] text-[#0a0f0a] text-sm font-semibold rounded-lg
              hover:bg-[#dbc28e] transition-all duration-300"
          >
            Randevu Al
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-[#0a0f0a]/95 backdrop-blur-xl border-b border-[#2a3a2a]/50`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {links.map((link) => (
            link.href.startsWith("/") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-left py-3 text-gray-300 hover:text-[#c9a96e] transition-colors border-b border-[#2a3a2a]/30"
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href.replace("#", ""))}
                className="text-left py-3 text-gray-300 hover:text-[#c9a96e] transition-colors border-b border-[#2a3a2a]/30"
              >
                {link.label}
              </button>
            )
          ))}
          <button
            onClick={() => scrollTo("iletisim")}
            className="mt-3 w-full py-3 bg-[#c9a96e] text-[#0a0f0a] font-semibold rounded-lg"
          >
            Randevu Al
          </button>
        </nav>
      </div>
    </header>
  );
}
