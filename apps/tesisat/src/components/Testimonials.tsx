"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useTestimonials, useSiteContent } from "@sirnak/shared";

const FALLBACK_TESTIMONIALS = [
  { id: "1", customer_name: "Ahmet Y.", district: "Şırnak Merkez", rating: 5, content: "Su kaçağını kırmadan buldular. Çok profesyonel bir ekip. Herkese tavsiye ederim." },
  { id: "2", customer_name: "Fatma K.", district: "Cizre", rating: 5, content: "Kombi bakımı için çağırdım, çok memnun kaldım. Hem fiyat hem işçilik mükemmeldi." },
  { id: "3", customer_name: "Mehmet S.", district: "İdil", rating: 5, content: "Petek temizliği sonrası evim çok ısındı. Emeğinize sağlık." },
  { id: "4", customer_name: "Ayşe D.", district: "Silopi", rating: 4, content: "Elektrik arızası için gece geç saatte aradım, hemen geldiler. Teşekkürler." },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-primary" : "text-white/10"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const testimonials = useTestimonials();
  const { get } = useSiteContent();
  const items = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  const title = get("testimonials", "title", "Müşterilerimiz Ne Diyor?");
  const subtitle = get("testimonials", "subtitle", "Gerçek müşteri yorumları");

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  return (
    <section className="sc-section">
      <div className="sc-wrap">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="mb-12 text-center"
        >
          <p className="sc-label mb-3 text-primary">{title}</p>
          <h2
            className="sc-display sc-display--md text-white"
            style={{ fontFamily: "var(--sc-font-display)" }}
          >
            {subtitle}
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              className="glass-card p-5"
            >
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm leading-relaxed text-[#9a9ba1]">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.customer_name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {t.customer_name}
                  </p>
                  {t.district && (
                    <p className="text-xs text-[#9a9ba1]">{t.district}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
