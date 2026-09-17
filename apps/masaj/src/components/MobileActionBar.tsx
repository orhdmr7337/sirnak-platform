"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { useSiteConfig } from "@sirnak/shared";

export function MobileActionBar() {
  const site = useSiteConfig();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const phone = site?.phone || "05551234567";
  const cleanPhone = phone.replace(/[^0-9]/g, "");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0a0f0a]/95 backdrop-blur-xl border-t border-[#2a3a2a]/50">
      <div className="flex items-center justify-around py-2 px-3">
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#6b8f71] transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px]">Ara</span>
        </a>
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Merhaba, randevu almak istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#25d366] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px]">WhatsApp</span>
        </a>
        <button
          onClick={() => scrollTo("iletisim")}
          className="flex flex-col items-center gap-1 py-2 px-6 bg-[#c9a96e] text-[#0a0f0a] rounded-xl -mt-2"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Randevu Al</span>
        </button>
        <button
          onClick={() => scrollTo("hizmetler")}
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#6b8f71] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-[10px]">Hizmetler</span>
        </button>
        <a
          href={`https://instagram.com/${site?.instagram_username || ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 hover:text-[#c9a96e] transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-[10px]">Instagram</span>
        </a>
      </div>
    </div>
  );
}
