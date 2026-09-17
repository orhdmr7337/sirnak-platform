"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useProcessSteps, useSiteContent } from "@sirnak/shared";

const FALLBACK_STEPS = [
  { id: "1", title: "Bize Ulaşın", description: "Telefonla veya WhatsApp ile iletişime geçin. 5 dakika içinde ekibimiz geri döner.", icon: "phone" },
  { id: "2", title: "Yerinde Keşif", description: "Sertifikalı teknisyenlerimiz yerinde sorunu analiz eder ve en iyi çözümü önerir.", icon: "search" },
  { id: "3", title: "Fiyat Teklifi", description: "Detaylı yazılı teklif sunulur. Gizli maliyetler olmaz, önceden bildirilen fiyat geçerli.", icon: "document" },
  { id: "4", title: "Profesyonel Hizmet", description: "Hizmet tamamlandıktan sonra 1 yıl garantisi verilir. Memnun değilseniz, geri ödeme yapılır.", icon: "check" },
];

const stepIcons: Record<string, string> = {
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
};

export default function ProcessSection() {
  const processSteps = useProcessSteps();
  const { get } = useSiteContent();
  const steps = processSteps.length > 0 ? processSteps : FALLBACK_STEPS;

  const title = get("process", "title", "Nasıl Çalışıyoruz?");
  const subtitle = get("process", "subtitle", "4 basit adımda profesyonel hizmet");

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  return (
    <section id="surec" className="sc-section">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="glass-card relative p-6 text-center"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-[#050505]"
                >
                  {i + 1}
                </motion.span>
              </div>
              <div className="mx-auto mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <svg
                  className="h-7 w-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={stepIcons[step.icon || "check"]}
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#9a9ba1]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
