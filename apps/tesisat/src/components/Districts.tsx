"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useDistricts, useSiteContent } from "@sirnak/shared";

const FALLBACK_DISTRICTS = [
  { id: "1", name: "Şırnak Merkez", slug: "merkez", region: "Şırnak" },
  { id: "2", name: "Cizre", slug: "cizre", region: "Şırnak" },
  { id: "3", name: "İdil", slug: "idil", region: "Şırnak" },
  { id: "4", name: "Silopi", slug: "silopi", region: "Şırnak" },
  { id: "5", name: "Beytüşşebap", slug: "beytussebap", region: "Şırnak" },
  { id: "6", name: "Uludere", slug: "uludere", region: "Şırnak" },
];

export default function Districts() {
  const districts = useDistricts();
  const { get } = useSiteContent();
  const items = districts.length > 0 ? districts : FALLBACK_DISTRICTS;

  const title = get("districts", "title", "Hizmet Bölgelerimiz");
  const subtitle = get("districts", "subtitle", "Şırnak ve tüm ilçelerinde hizmetinizdeyiz");

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

        <div className="flex flex-wrap justify-center gap-3">
          {items.map((d, index) => (
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
              whileTap={{ scale: 0.95 }}
              className="glass-card glass-card-hover rounded-full px-6 py-3 text-sm font-medium text-white transition-all"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
              {d.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
