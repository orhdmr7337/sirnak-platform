"use client";

import { useSiteConfig, useSiteContent, useServices, useNavLinks, useSocialLinks } from "@sirnak/shared";
import { Globe, Play as YoutubeIcon } from "lucide-react";

type IconProps = { className?: string; "aria-label"?: string };
const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const TiktokIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.11V9.77a5.68 5.68 0 1 0 4.91 5.63V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48z" />
  </svg>
);
const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8a0 0 0 0 1 0 0z" />
  </svg>
);

const SOCIAL_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon as unknown as (p: IconProps) => React.ReactElement,
};

export default function Footer() {
  const site = useSiteConfig();
  const { get } = useSiteContent();
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
                alt={site.name}
                className="h-10 w-10"
              />
              <span className="font-semibold text-white" style={{ fontFamily: "var(--sc-font-display)" }}>
                {site.name}
              </span>
            </div>
            <p className="mb-4 max-w-sm text-sm text-[#9a9ba1]">
              {get("footer", "description", "") || site.slogan}
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
                      {(() => {
                        const Icon = SOCIAL_ICONS[s.platform.toLowerCase()] ?? (Globe as unknown as (p: IconProps) => React.ReactElement);
                        return <Icon className="h-4 w-4" aria-label={s.platform} />;
                      })()}
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
          <p>&copy; {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.</p>
          {site.address && <p>{site.address}</p>}
        </div>
      </div>
    </footer>
  );
}
