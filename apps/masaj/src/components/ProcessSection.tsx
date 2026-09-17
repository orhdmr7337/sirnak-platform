"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useProcessSteps } from "@sirnak/shared";
import { Phone, UserCheck, Sparkles, ThumbsUp } from "lucide-react";

const ICONS = [Phone, UserCheck, Sparkles, ThumbsUp];

const FALLBACK_STEPS = [
  { id: "1", title: "İletişime Geçin", description: "Bizi arayın veya web sitemizden randevu talebinde bulunun.", icon: "phone" },
  { id: "2", title: "Danışmanlık", description: "Uzman ekibimiz ihtiyaçlarınızı değerlendirir.", icon: "user" },
  { id: "3", title: "Masaj Seansı", description: "Uzman ellerde profesyonel masaj hizmeti alın.", icon: "sparkles" },
  { id: "4", title: "Memnuniyet", description: "Sağlığınız ve mutluluğunuz için devam edin.", icon: "thumbs" },
];

export function ProcessSection() {
  const steps = useProcessSteps();
  const items = steps.length > 0 ? steps : FALLBACK_STEPS;

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Nasıl Çalışıyoruz
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            4 <span className="text-[#6b8f71]">Kolay</span> Adım
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
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
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center relative group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#c9a96e] text-[#0a0f0a] font-bold text-lg flex items-center justify-center shadow-lg"
                >
                  {i + 1}
                </motion.div>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-2xl bg-[#6b8f71]/10 border border-[#6b8f71]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#6b8f71]/20 transition-colors"
                >
                  <Icon className="w-8 h-8 text-[#6b8f71]" />
                </motion.div>
                <h3
                  className="text-lg font-semibold text-white mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
