"use client";

import { motion } from "framer-motion";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";
import { useSiteConfig } from "@sirnak/shared";

export function InstagramEmbed() {
  const site = useSiteConfig();
  const username = site?.instagram_username;

  if (!username) return null;

  const { ref: titleRef, opacity: titleOpacity, y: titleY } = useScrollReveal();
  const { ref: cardRef, opacity: cardOpacity, y: cardY } = useParallax(20);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
            Instagram
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Bizi <span className="text-[#6b8f71]">Takip Edin</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Güncel paylaşımlar ve kampanyalar için Instagram hesabımızı takip edin.
          </p>
        </motion.div>

        <motion.div
          ref={cardRef}
          style={{ opacity: cardOpacity, y: cardY }}
          className="flex flex-col items-center gap-8"
        >
          {/* Instagram Profile Card */}
          <motion.a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card px-8 py-5 flex items-center gap-4 hover:border-[#c9a96e]/40 transition-all duration-300 group"
          >
            <div className="relative">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="ig-gradient-masaj" x1="0" y1="24" x2="24" y2="0">
                    <stop offset="0%" stopColor="#feda75" />
                    <stop offset="25%" stopColor="#fa7e1e" />
                    <stop offset="50%" stopColor="#d62976" />
                    <stop offset="75%" stopColor="#962fbf" />
                    <stop offset="100%" stopColor="#4f5bd5" />
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#ig-gradient-masaj)" />
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
              </svg>
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] opacity-0 blur-sm"
                whileHover={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold group-hover:text-[#c9a96e] transition-colors text-lg">
                @{username}
              </div>
              <div className="text-gray-500 text-sm">Instagram&apos;da takip et</div>
            </div>
            <svg className="w-5 h-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>

          {/* Instagram Feed Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#2a3a2a]/50 bg-[#111811]">
              {/* Instagram Header */}
              <div className="flex items-center gap-3 border-b border-[#2a3a2a]/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]">
                  <span className="text-sm font-bold text-white">
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">@{username}</p>
                  <p className="text-xs text-gray-500">Instagram</p>
                </div>
              </div>

              {/* Embedded Feed */}
              <iframe
                src={`https://www.instagram.com/${username}/embed/`}
                className="w-full h-[600px] border-0"
                loading="lazy"
                title={`${username} Instagram Feed`}
              />

              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111811] to-transparent" />
            </div>
          </motion.div>

          {/* Follow Button */}
          <motion.a
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#d62976]/20"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram'da Takip Et
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
