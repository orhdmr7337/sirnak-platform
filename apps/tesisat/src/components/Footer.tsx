"use client";

import { useSiteConfig, useServices, useNavLinks, useSocialLinks } from "@sirnak/shared";

export default function Footer() {
  const site = useSiteConfig();
  const services = useServices();
  const navLinks = useNavLinks();
  const socialLinks = useSocialLinks();

  const defaultNav = [
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Süreç", href: "#surec" },
    { label: "Galeri", href: "#galeri" },
    { label: "SSS", href: "#sss" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "#iletisim" },
  ];

  const nav = navLinks.length > 0
    ? navLinks.map((l) => ({ label: l.label, href: l.href }))
    : defaultNav;

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a]">
      <div className="sc-wrap py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo-tesisat.svg"
                alt="Çözüm Noktası"
                className="h-10 w-10"
              />
              <span className="font-semibold text-white" style={{ fontFamily: "var(--sc-font-display)" }}>
                Çözüm Noktası Tesisat
              </span>
            </div>
            <p className="mb-4 max-w-sm text-sm text-[#9a9ba1]">
              {site.slogan ||
                "Şırnak'ta profesyonel tesisat ve elektrik hizmetleri. 7/24 acil servis."}
            </p>
            <div className="flex gap-3">
              {socialLinks.length > 0
                ? socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-[#9a9ba1] transition-colors hover:border-primary/20 hover:text-primary"
                    >
                      <span className="text-xs font-bold">
                        {s.platform.charAt(0).toUpperCase()}
                      </span>
                    </a>
                  ))
                : site.instagram_username && (
                    <a
                      href={`https://instagram.com/${site.instagram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 text-[#9a9ba1] transition-colors hover:border-primary/20 hover:text-primary"
                    >
                      <span className="text-xs font-bold">Ig</span>
                    </a>
                  )}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#9a9ba1] transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Hizmetler</h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <a
                    href={`#iletisim?service=${s.slug}`}
                    className="text-sm text-[#9a9ba1] transition-colors hover:text-white"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              {services.length === 0 && (
                <>
                  <li>
                    <a href="#iletisim?service=su-kacagi" className="text-sm text-[#9a9ba1] hover:text-white transition-colors">
                      Su Kaçağı Tespiti
                    </a>
                  </li>
                  <li>
                    <a href="#iletisim?service=petek-temizligi" className="text-sm text-[#9a9ba1] hover:text-white transition-colors">
                      Petek Temizliği
                    </a>
                  </li>
                  <li>
                    <a href="#iletisim?service=kombi-bakimi" className="text-sm text-[#9a9ba1] hover:text-white transition-colors">
                      Kombi Bakımı
                    </a>
                  </li>
                  <li>
                    <a href="#iletisim?service=elektrik-ariza" className="text-sm text-[#9a9ba1] hover:text-white transition-colors">
                      Elektrik Arıza
                    </a>
                  </li>
                  <li>
                    <a href="#iletisim?service=tikaniklik" className="text-sm text-[#9a9ba1] hover:text-white transition-colors">
                      Tıkanıklık Açma
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-[#9a9ba1] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Çözüm Noktası Tesisat & Elektrik. Tüm hakları saklıdır.</p>
          <p>Şırnak, Türkiye</p>
        </div>
      </div>
    </footer>
  );
}
