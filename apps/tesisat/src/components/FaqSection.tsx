"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useFaqs, useSiteContent } from "@sirnak/shared";


export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const faqs = useFaqs();
  const { get } = useSiteContent();

  const items = faqs;
  const title = get("faq", "title", "Sıkça Sorulan Sorular");
  const subtitle = get("faq", "subtitle", "Merak ettiklerinizin cevapları");

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  if (items.length === 0) return null;

  return (
    <section id="sss" className="sc-section">
      <div className="sc-wrap">
        <div className="mx-auto max-w-3xl">
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

          <div className="space-y-3">
            {items.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 text-sm font-medium text-white">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-5 w-5 shrink-0 text-[#9a9ba1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#9a9ba1]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
