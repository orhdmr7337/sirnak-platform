"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollAnimation";
import { useTrustItems } from "@sirnak/shared";
import { Shield, Award, Leaf, Clock, Heart, Star } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  shield: Shield,
  award: Award,
  leaf: Leaf,
  clock: Clock,
  heart: Heart,
  star: Star,
};


export function TrustStrip() {
  const items = useTrustItems();
  const display = items;

  const { ref, opacity, y } = useScrollReveal();

  if (display.length === 0) return null;

  return (
    <section className="py-14 border-y border-[#2a3a2a]/50">
      <motion.div
        ref={ref}
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {display.map((item, index) => {
            const Icon = ICON_MAP[item.icon || "shield"] || Shield;
            return (
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
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-[#6b8f71] flex-shrink-0" />
                </motion.div>
                <div>
                  <h4 className="text-white font-medium text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
