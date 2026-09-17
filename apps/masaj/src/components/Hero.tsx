"use client";

import { useSiteConfig, useMediaFiles } from "@sirnak/shared";
import { VideoHero } from "./VideoHero";

interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}

const FALLBACK_MEDIA: MediaItem[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&fm=webp" },
  { type: "video", src: "https://assets.mixkit.co/videos/preview/mixkit-woman-getting-a-relaxing-back-massage-47848-large.mp4", poster: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80&fm=webp" },
  { type: "image", src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80&fm=webp" },
];

export function Hero() {
  const site = useSiteConfig();
  const mediaFiles = useMediaFiles();

  // Medya dosyalarından hero medyası oluştur
  const heroMedia: MediaItem[] = mediaFiles
    .filter((m) => m.file_type === "video" || m.file_type === "image")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((m) => ({
      type: m.file_type === "video" ? "video" as const : "image" as const,
      src: m.public_url,
      poster: m.file_type === "video" ? m.public_url : undefined,
    }));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      <VideoHero media={heroMedia.length > 0 ? heroMedia : FALLBACK_MEDIA} />

      {/* Subtle Scrim - Reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a]/70 via-[#0a0f0a]/20 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/40 to-transparent z-[1]" />

      {/* Right Panel Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="ml-auto mr-8 md:mr-16 max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6b8f71]/20 border border-[#6b8f71]/30 mb-6">
            <span className="w-2 h-2 bg-[#6b8f71] rounded-full animate-pulse" />
            <span className="text-[#8ab891] text-sm font-medium">
              Şırnak'ın Masaj Uzmanı
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {site?.name || "Doğal Dokunuş"}
            <span className="block text-[#c9a96e] text-2xl md:text-3xl mt-2 font-normal">
              {site?.slogan || "Doğal Rahatlama, Profesyonel Dokunuş"}
            </span>
          </h1>

          <p className="text-base text-gray-300 mb-8 leading-relaxed">
            Uzman ellerde, doğal ürünlerle tanışın. Vücudunuzu ve zihninizi
            yeniden canlandırın.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("iletisim")}
              className="px-6 py-3 bg-[#c9a96e] text-[#0a0f0a] font-semibold rounded-lg
                hover:bg-[#dbc28e] transition-all duration-300 hover:scale-105
                shadow-lg shadow-[#c9a96e]/20 text-sm md:text-base"
            >
              Randevu Al
            </button>
            <button
              onClick={() => scrollTo("hizmetler")}
              className="px-6 py-3 border border-[#6b8f71]/50 text-white rounded-lg
                hover:bg-[#6b8f71]/20 transition-all duration-300 hover:border-[#6b8f71] text-sm md:text-base"
            >
              Keşfet
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40 uppercase tracking-widest">Keşfet</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
