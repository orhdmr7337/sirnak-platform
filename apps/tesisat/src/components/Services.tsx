"use client";

import { motion } from "framer-motion";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";
import { useServices, useSiteContent } from "@sirnak/shared";


const iconPaths: Record<string, string> = {
  droplet: "M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c1.53 0 2.97.38 4.24 1.06A9 9 0 0112 21z",
  flame: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  thermometer: "M12 9V2m0 0a2 2 0 100 4 2 2 0 000-4zm0 0v7m0 0a2 2 0 100 4 2 2 0 000-4z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
  wrench: "M14.121 14.121a2 2 0 010 2.828l-1.414 1.414a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828l1.414-1.414a2 2 0 012.828 0l1.414 1.414z",
  pipe: "M4 6h16M4 12h16M4 18h16",
};

export default function Services() {
  const services = useServices();
  const { get } = useSiteContent();
  // Ana sayfada ilk 9 hizmet kart olarak, kalanlar link olarak gösterilir (hepsi tek tıkla erişilebilir kalır).
  const items = services.slice(0, 9);
  const more = services.slice(9);

  const sectionTitle = get("services", "title", "Hizmetlerimiz");
  const sectionSubtitle = get("services", "subtitle", "İhtiyacınıza uygun profesyonel çözümler");

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();
  const { ref: gridRef, opacity: gridOpacity, y: gridY } = useParallax(30);

  if (items.length === 0) return null;

  return (
    <section id="hizmetler" className="sc-section">
      <div className="sc-wrap">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="mb-12 text-center"
        >
          <p className="sc-label mb-3 text-primary">{sectionTitle}</p>
          <h2
            className="sc-display sc-display--md text-white"
            style={{ fontFamily: "var(--sc-font-display)" }}
          >
            {sectionSubtitle}
          </h2>
        </motion.div>

        <motion.div
          ref={gridRef}
          style={{ opacity: gridOpacity, y: gridY }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(index, 5) * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <a
                href={`/hizmetler/${service.slug}`}
                className="glass-card glass-card-hover group p-6 block"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:from-primary/40 group-hover:to-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30">
                  {service.svg_path ? (
                    <svg
                      className="h-6 w-6 text-primary transition-transform group-hover:scale-125 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={service.svg_path}
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-primary transition-transform group-hover:scale-125 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={iconPaths[service.icon || "wrench"]}
                      />
                    </svg>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9ba1]">
                  {service.description}
                </p>
                {service.price_info && (
                  <p className="mt-3 text-sm font-medium text-primary">
                    {service.price_info}
                  </p>
                )}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {more.length > 0 && (
          <div className="mt-10 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {more.map((service) => (
                <a
                  key={service.id}
                  href={`/hizmetler/${service.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#9a9ba1] transition-colors hover:border-primary/50 hover:text-white"
                >
                  {service.title}
                </a>
              ))}
            </div>
            <a
              href="/hizmetler"
              className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Tüm hizmetleri gör →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
