"use client";

import { useSiteConfig, telHref, whatsappHref } from "@sirnak/shared";
import { Phone, MapPin, Camera } from "lucide-react";

// Videonun hemen altındaki acil aksiyon şeridi: telefonda başparmakla tek dokunuş.
export default function QuickActions() {
  const site = useSiteConfig();
  const tel = telHref(site);
  const waLocation = whatsappHref(site, "Merhaba, usta lazım. Konumumu gönderiyorum.");
  const waPhoto = whatsappHref(site, "Merhaba, arızanın fotoğrafını gönderiyorum, fiyat bilgisi alabilir miyim?");

  const items = [
    tel && { href: tel, label: "Hemen Ara", sub: "7/24 acil servis", cls: "bg-primary text-[#050505]", icon: Phone, external: false },
    waLocation && { href: waLocation, label: "Konum At", sub: "WhatsApp'tan", cls: "bg-[#25D366] text-white", icon: MapPin, external: true },
    waPhoto && { href: waPhoto, label: "Fotoğraf Gönder", sub: "Ön fiyat bilgisi al", cls: "bg-white/10 text-white border border-white/15", icon: Camera, external: true },
  ].filter(Boolean) as { href: string; label: string; sub: string; cls: string; icon: typeof Phone; external: boolean }[];

  if (!items.length) return null;

  return (
    <section aria-label="Hızlı iletişim" className="relative z-10 -mt-6 px-4 md:-mt-10 md:px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-4 shadow-2xl shadow-black/60 backdrop-blur md:p-6">
        <p className="mb-4 text-center text-sm font-semibold text-white md:text-base">
          Acil bir arıza mı var? <span className="text-primary">Şırnak&apos;ın 7 ilçesine</span> aracımızla geliyoruz.
        </p>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-transform active:scale-95 md:flex-row md:gap-3 md:py-4 ${it.cls}`}
            >
              <it.icon className="mb-1 h-5 w-5 md:mb-0 md:h-6 md:w-6" aria-hidden />
              <span className="flex flex-col md:items-start">
                <span className="text-sm font-bold leading-tight md:text-base">{it.label}</span>
                <span className="text-[10px] opacity-80 md:text-xs">{it.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
