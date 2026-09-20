"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useTestimonials } from "@sirnak/shared";
import { Star, Quote } from "lucide-react";


export function Testimonials() {
  const testimonials = useTestimonials();
  const items = testimonials;

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  if (items.length === 0) return null;

  return (
    <section id="yorumlar" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Müşteri Yorumları
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Müşterilerimiz <span className="text-[#6b8f71]">Ne Diyor?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 flex flex-col"
            >
              <Quote className="w-8 h-8 text-[#6b8f71]/30 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating ? "text-[#c9a96e] fill-[#c9a96e]" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div className="border-t border-[#2a3a2a]/50 pt-3">
                <div className="text-white font-medium text-sm">{t.customer_name}</div>
                {t.district && (
                  <div className="text-gray-500 text-xs">{t.district}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
