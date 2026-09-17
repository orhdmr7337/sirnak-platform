"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";
import { useServices } from "@sirnak/shared";
import { Sparkles, Droplets, Wind, Heart, Zap, Flower } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  droplets: Droplets,
  wind: Wind,
  heart: Heart,
  zap: Zap,
  flower: Flower,
  default: Sparkles,
};

const FALLBACK_SERVICES = [
  { id: "1", title: "Klasik Masaj", slug: "klasik-masaj", description: "Vücutteki kas gerginliğini gideren, kan dolaşımını hızlandıran geleneksel masaj tekniği.", icon: "sparkles", price_info: "200₺'den başlayan fiyatlarla" },
  { id: "2", title: "Derin Doku Masajı", slug: "derin-doku", description: "Derin kas tabakalarına etki eden, kronik ağrıları hafifleten yoğun masaj.", icon: "zap", price_info: "300₺'den başlayan fiyatlarla" },
  { id: "3", title: "Aromaterapi Masajı", slug: "aromaterapi", description: "Doğal yağlarla yapılan, hem bedeni hem zihni rahatlatan masaj.", icon: "flower", price_info: "280₺'den başlayan fiyatlarla" },
  { id: "4", title: "Sıcak Taş Masajı", slug: "sicak-tas", description: "Isıtılmış volkanik taşlarla yapılan, kas derinliklerine etki eden masaj.", icon: "wind", price_info: "350₺'den başlayan fiyatlarla" },
  { id: "5", title: "Medikal Masaj", slug: "medikal", description: "Tıbbi gerekliliklere yönelik, rehabilitasyon amaçlı uzman masajı.", icon: "droplets", price_info: "Fiyat için arayın" },
  { id: "6", title: "Masaj Paketi", slug: "paket", description: "Kapsamlı masaj deneyimi paketleri ile tam gün rahatlama.", icon: "heart", price_info: "Özel fiyatlar" },
];

export function Services() {
  const services = useServices();
  const items = services.length > 0 ? services : FALLBACK_SERVICES;

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();
  const { ref: gridRef, opacity: gridOpacity, y: gridY } = useParallax(30);

  return (
    <section id="hizmetler" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0f0a] via-[#0d140d] to-[#0a0f0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Hizmetlerimiz
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Size Uygun <span className="text-[#6b8f71]">Masajı</span> Bulun
          </h2>
        </motion.div>

        <motion.div
          ref={gridRef}
          style={{ opacity: gridOpacity, y: gridY }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((service, index) => {
            const Icon = ICON_MAP[service.icon || "default"] || ICON_MAP.default;
            return (
              <Link
                key={service.id}
                href={`/hizmetler/${service.slug}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-card p-6 group cursor-pointer"
                >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 rounded-xl bg-[#6b8f71]/10 border border-[#6b8f71]/20 flex items-center justify-center mb-5 group-hover:bg-[#6b8f71]/20 transition-colors"
                >
                  <Icon className="w-7 h-7 text-[#6b8f71]" />
                </motion.div>
                <h3
                  className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description || "Profesyonel masaj hizmeti"}
                </p>
                {service.price_info && (
                  <span className="inline-block text-[#c9a96e] text-sm font-medium">
                    {service.price_info}
                  </span>
                )}
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
