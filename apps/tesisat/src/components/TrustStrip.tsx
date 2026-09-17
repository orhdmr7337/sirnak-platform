"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useTrustItems } from "@sirnak/shared";

const FALLBACK_TRUST = [
  { id: "1", title: "7/24 Hizmet", description: "Her saat acil servis", icon: "clock" },
  { id: "2", title: "Uzman Kadro", description: "Sertifikalı teknisyenler", icon: "shield" },
  { id: "3", title: "Garantili İşçilik", description: "İşçilik garantisi", icon: "check" },
  { id: "4", title: "Hızlı Müdahale", description: "30 dk'da adresinizde", icon: "zap" },
];

const iconMap: Record<string, string> = {
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
};

export default function TrustStrip() {
  const trustItems = useTrustItems();
  const items = trustItems.length > 0 ? trustItems : FALLBACK_TRUST;

  const { ref, opacity, y } = useScrollReveal();

  return (
    <section className="relative z-10 -mt-12 pb-8">
      <div className="sc-wrap">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{ scale: 1.02 }}
              className="glass-card glass-card-hover flex items-center gap-3 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={iconMap[item.icon || "check"]}
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-[#9a9ba1]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
