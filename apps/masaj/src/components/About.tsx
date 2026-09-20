"use client";

import { motion } from "framer-motion";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";
import { useSiteContent } from "@sirnak/shared";
import { Clock, Leaf, Award } from "lucide-react";

export function About() {
  const { get } = useSiteContent();

  // Rakamlar ve metinler `site_content` (section: about) kaydından gelir.
  const icons = [Clock, Award, Leaf];
  const stats = [1, 2, 3]
    .map((n, i) => ({
      icon: icons[i],
      value: get("about", `stat${n}_value`, ""),
      label: get("about", `stat${n}_label`, ""),
    }))
    .filter((st) => st.value && st.label);

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
              {get("about", "label", "")}
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {get("about", "title", "")}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {get("about", "paragraph1", "")}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {get("about", "paragraph2", "")}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            ref={statsRef}
            style={{ opacity: statsOpacity, y: statsY }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
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
