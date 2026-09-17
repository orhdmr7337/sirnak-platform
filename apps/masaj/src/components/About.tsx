"use client";

import { motion } from "framer-motion";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@sirnak/shared";
import { Shield, Clock, Leaf, Award } from "lucide-react";

export function About() {
  const { get } = useSiteContent();

  const stats = [
    { icon: Clock, value: get("about", "years", "5+"), label: "Yıl Deneyim" },
    { icon: Award, value: get("about", "clients", "2000+"), label: "Mutlu Müşteri" },
    { icon: Leaf, value: get("about", "products", "%100"), label: "Doğal Ürünler" },
    { icon: Shield, value: get("about", "guarantee", "100%"), label: "Memnuniyet" },
  ];

  const { ref: textRef, opacity: textOpacity, y: textY } = useScrollReveal();
  const { ref: statsRef, opacity: statsOpacity, y: statsY } = useParallax(20);

  return (
    <section id="hakkimizda" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            ref={textRef}
            style={{ opacity: textOpacity, y: textY }}
          >
            <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
              Hakkımızda
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Doğal Dokunuş ile{" "}
              <span className="text-[#6b8f71]">Yenilenin</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {get("about", "description", "Doğal Dokunuş Masaj, Şırnak'ta uzun yıllara dayanan tecrübesiyle profesyonel masaj hizmeti sunmaktadır. Doğal ürünler ve uzman ellerde, vücudunuzun hak ettiği bakımı sağlıyoruz.")}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {get("about", "description2", "Her müşterimize özel, ihtiyaçlarına yönelik masaj programları uyguluyoruz. Sağlığınız ve rahatlığınız bizim için en önemli önceliktir.")}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            ref={statsRef}
            style={{ opacity: statsOpacity, y: statsY }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-8 h-8 text-[#6b8f71] mx-auto mb-3" />
                </motion.div>
                <div className="text-3xl font-bold text-[#c9a96e] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
