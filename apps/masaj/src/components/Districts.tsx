"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useDistricts } from "@sirnak/shared";
import { MapPin } from "lucide-react";

export function Districts() {
  const districts = useDistricts();

  if (districts.length === 0) return null;

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Hizmet Bölgelerimiz
          </span>
          <h2
            className="text-2xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Şırnak ve <span className="text-[#6b8f71]">Çevresi</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {districts.map((d, index) => (
            <motion.a
              key={d.id}
              href={`/ilceler/${d.slug}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ scale: 1.05 }}
              className="glass-card px-5 py-3 flex items-center gap-2 hover:border-[#6b8f71]/40 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#6b8f71]" />
              <span className="text-white text-sm">{d.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
