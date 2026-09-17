"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const PARTICLE_CONFIG = [
  { x: 15, y: 25, endY: 70, duration: 3.2, delay: 0.5 },
  { x: 82, y: 10, endY: 45, duration: 4.1, delay: 1.2 },
  { x: 45, y: 60, endY: 20, duration: 3.8, delay: 0.8 },
  { x: 70, y: 80, endY: 35, duration: 4.5, delay: 1.8 },
  { x: 25, y: 40, endY: 85, duration: 3.5, delay: 0.3 },
  { x: 55, y: 15, endY: 55, duration: 4.3, delay: 1.5 },
  { x: 90, y: 50, endY: 75, duration: 3.7, delay: 1.0 },
  { x: 35, y: 70, endY: 30, duration: 4.0, delay: 0.7 },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("text"), 800);
    const timer2 = setTimeout(() => setPhase("exit"), 2200);
    const timer3 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0f0a]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f0a] via-[#1a231a] to-[#0a0f0a]" />
          
          <div className="absolute inset-0 overflow-hidden">
            {PARTICLE_CONFIG.map((p, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: p.x + "%",
                  y: p.y + "%",
                  opacity: 0
                }}
                animate={{ 
                  y: [p.y + "%", p.endY + "%"],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay
                }}
                className="absolute w-1 h-1 bg-[#6b8f71] rounded-full"
              />
            ))}
          </div>

          {/* Logo animation */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6b8f71] to-[#c9a96e] flex items-center justify-center shadow-2xl shadow-[#6b8f71]/30">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === "logo" ? 0 : 1, y: phase === "logo" ? 20 : 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Doğal <span className="text-[#c9a96e]">Dokunuş</span>
              </h1>
              <p className="text-[#6b8f71] text-lg tracking-widest uppercase">
                Masaj & Wellness
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 w-48 h-0.5 bg-[#2a3a2a] rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#6b8f71] to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
