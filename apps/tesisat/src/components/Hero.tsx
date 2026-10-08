"use client";

import { motion } from "framer-motion";
import { useSiteConfig, useSiteContent, useMediaFiles, telHref } from "@sirnak/shared";
import VideoHero from "./VideoHero";

interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}


export default function Hero() {
  const site = useSiteConfig();
  const { get } = useSiteContent();
  const mediaFiles = useMediaFiles();

  // Medya dosyalarından hero medyası oluştur
  const heroMedia: MediaItem[] = mediaFiles
    .filter((m) => m.file_type === "video" || m.file_type === "image")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((m) => ({
      type: m.file_type === "video" ? "video" as const : "image" as const,
      src: m.public_url,
      poster: undefined,
    }));

  // Tüm metinler `site_content` (section: hero) kaydından gelir.
  const badge = get("hero", "badge", "");
  // Google için anahtar kelimeli başlık ("Şırnak Tesisatçı & Elektrikçi"). Boşsa slogan H1 olur.
  const seoHeading = get("hero", "seo_heading", "");
  const slogan = get("hero", "slogan", "") || site?.slogan || "";
  const subtext = get("hero", "description", "");
  const ctaText = get("hero", "cta_call_label", "");
  const ctaSecondary = get("hero", "cta_services_label", "");
  const tel = telHref(site);

  return (
    <VideoHero media={heroMedia}>
      <div className="max-w-3xl ml-auto pr-2 md:pr-32" data-sc-cue="0 0.8" data-sc-kinetic="words">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.75, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {badge && (
            <p className="sc-label mb-4 text-primary text-sm tracking-widest font-bold italic uppercase">
              {badge}
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.75, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {seoHeading && (
            <h1 className="mb-3 text-white/90 text-sm md:text-base tracking-widest font-bold uppercase">
              {seoHeading}
            </h1>
          )}
          {(() => {
            const SloganTag = seoHeading ? "p" : "h1";
            return (
              <SloganTag
                className="text-2xl md:text-4xl font-black italic mb-5 leading-tight text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {slogan}
              </SloganTag>
            );
          })()}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.75, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base italic mb-8 text-[#e8b876] font-bold max-w-2xl leading-relaxed">
            {subtext}
          </p>
        </motion.div>
        <div className="flex flex-wrap gap-4">
          {tel && ctaText && (
          <a
            href={tel}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-dark px-8 py-4 text-sm font-bold italic text-[#050505] transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 hover:scale-110 active:scale-95"
          >
            <svg className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="transition-all group-hover:tracking-wide">{ctaText}</span>
          </a>
          )}
          <a
            href="#hizmetler"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-sm font-bold italic text-white transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95"
          >
            <span>{ctaSecondary}</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </VideoHero>
  );
}
