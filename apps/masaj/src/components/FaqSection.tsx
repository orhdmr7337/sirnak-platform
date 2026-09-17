"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useFaqs } from "@sirnak/shared";
import { ChevronDown } from "lucide-react";

const FALLBACK_FAQS = [
  { id: "1", question: "Masaj seansı ne kadar sürüyor?", answer: "Seans süresi 30 ile 90 dakika arasında değişmektedir. İlk görüşmede size en uygun süreyi birlikte belirliyoruz." },
  { id: "2", question: "Hangi yağları kullanıyorsunuz?", answer: "%100 doğal ve organik yağlar kullanıyoruz. Lavanta, çam, portakal ve özel karışımlarımız mevcuttur." },
  { id: "3", question: "Randevu iptali mümkün mü?", answer: "Randevunuzu en az 24 saat öncesinden iptal edebilirsiniz. Daha kısa sürede iptallerde ücret iadesi yapılamamaktadır." },
  { id: "4", question: "Masaj sonrası nelere dikkat etmeliyim?", answer: "Seans sonrası bol su içmeniz, ağır aktivitelerden kaçınmanız ve dinlenmeniz önerilir." },
];

export function FaqSection() {
  const faqs = useFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  return (
    <section id="sss" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0f0a] via-[#0d140d] to-[#0a0f0a]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Sıkça Sorulan Sorular
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Merak <span className="text-[#6b8f71]">Ettikleriniz</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {items.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#6b8f71] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
