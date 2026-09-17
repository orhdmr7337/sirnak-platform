"use client";

import { useSiteConfig, useServices, useSocialLinks } from "@sirnak/shared";
import { Phone, Mail, MapPin, Clock, Heart } from "lucide-react";

export function Footer() {
  const site = useSiteConfig();
  const services = useServices();
  const socialLinks = useSocialLinks();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#2a3a2a]/50 bg-[#080c08]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6b8f71] to-[#4a6b4f] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
                  {site?.name?.charAt(0) || "D"}
                </span>
              </div>
              <span className="text-white font-semibold" style={{ fontFamily: "Georgia, serif" }}>
                {site?.name || "Doğal Dokunuş"}
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {site?.tagline || "Doğal ürünlerle profesyonel masaj hizmeti. Sağlığınız ve rahatlığınız bizim için önemli."}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hizmetler</h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo("hizmetler")}
                    className="text-gray-500 text-sm hover:text-[#6b8f71] transition-colors"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <a href="/blog" className="text-gray-500 text-sm hover:text-[#6b8f71] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3">
              {site?.phone && (
                <li className="flex items-center gap-2 text-gray-500 text-sm">
                  <Phone className="w-4 h-4 text-[#6b8f71]" />
                  <a href={`tel:${site.phone}`} className="hover:text-white transition-colors">
                    {site.phone}
                  </a>
                </li>
              )}
              {site?.email && (
                <li className="flex items-center gap-2 text-gray-500 text-sm">
                  <Mail className="w-4 h-4 text-[#6b8f71]" />
                  <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                    {site.email}
                  </a>
                </li>
              )}
              {site?.address && (
                <li className="flex items-start gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-[#6b8f71] mt-0.5" />
                  <span>{site.address}</span>
                </li>
              )}
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4 text-[#6b8f71]" />
                <span>{site?.working_hours || "Her gün 09:00 - 21:00"}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Bizi Takip Edin</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.length > 0
                ? socialLinks.map((l) => (
                    <a
                      key={l.id}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#1a231a] border border-[#2a3a2a] flex items-center justify-center
                        hover:border-[#6b8f71]/40 hover:bg-[#6b8f71]/10 transition-all"
                    >
                      <span className="text-sm text-gray-400 capitalize">{l.platform.charAt(0)}</span>
                    </a>
                  ))
                : site?.instagram_username && (
                    <a
                      href={`https://instagram.com/${site.instagram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#1a231a] border border-[#2a3a2a] flex items-center justify-center
                        hover:border-[#6b8f71]/40 hover:bg-[#6b8f71]/10 transition-all"
                    >
                      <span className="text-sm text-gray-400">Ig</span>
                    </a>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2a3a2a]/30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} {site?.name || "Doğal Dokunuş Masaj"}. Tüm hakları saklıdır.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#6b8f71]" /> in Şırnak
          </p>
        </div>
      </div>
    </footer>
  );
}
