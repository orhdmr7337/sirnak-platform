"use client";

import { useServices } from "@sirnak/shared";
import { SatelliteDish, Zap } from "lucide-react";

// Ana sayfa "Ne Yapıyoruz?" bölümü: hizmetler kategorilere ayrılır, her kart gerçek iş fotoğrafıyla
// ve kategorinin tüm hizmet bağlantılarıyla gösterilir. Kategoride yayında hizmet yoksa kart gizlenir.
const CATEGORIES = [
  {
    title: "Tıkanıklık & Gider Açma",
    text: "Tuvalet, banyo, lavabo, mutfak, yağmur gideri ve kanalizasyon tıkanıklıklarını robot ve kamera ile kırmadan açıyoruz.",
    image: "/images/is/logar-tikaniklik-acma.webp",
    slugs: ["tikaniklik-acma", "wc-tikanikligi-acma", "banyo-tikanikligi-acma", "lavabo-tikanikligi-acma", "mutfak-gideri-acma", "gider-acma", "yagmur-gideri-acma", "kanalizasyon-tikanikligi", "kamerali-gider-goruntuleme"],
  },
  {
    title: "Su Kaçağı & Sızıntı",
    text: "Termal kamera ile su kaçağını kırmadan buluyor, sadece sorunlu noktayı açıp onarıyoruz.",
    image: "/images/is/termal-kamera-su-kacagi-tespiti.webp",
    slugs: ["su-kacagi-tespiti", "su-sizintisi-giderme"],
  },
  {
    title: "Kombi & Petek",
    text: "Kombi arızası, yıllık bakım, eşanjör temizliği ve makine ile petek yıkama.",
    image: "/images/is/kombi-tesisat-baglantisi.webp",
    slugs: ["kombi-tamiri", "kombi-bakimi", "kombi-yikama", "petek-temizligi", "dogalgaz-tesisati"],
  },
  {
    title: "Su Tesisatı & Su Deposu",
    text: "Sıhhi tesisat, musluk ve batarya değişimi, su deposu, hidrofor ve termosifon montajı.",
    image: "/images/is/su-deposu-kurulumu.webp",
    slugs: ["sihhi-tesisat", "su-tesisati", "musluk-degisimi", "su-deposu-kurulumu", "termosifon-montaji"],
  },
  {
    title: "Uydu & Televizyon",
    text: "Çanak anten kurulumu, uydu ayarı, uydu cihazı bağlama, televizyon askı montajı ve kanal ayarı.",
    image: null,
    slugs: ["uydu-canak-kurulumu", "televizyon-kurulumu"],
  },
  {
    title: "Elektrik & Tadilat",
    text: "Elektrik arızası, tesisat yenileme, pano ve aydınlatma; banyo ve mutfak tadilatı.",
    image: null,
    slugs: ["elektrik-arizasi", "elektrik-tesisati", "komple-tadilat"],
  },
];

export default function WhatWeDo() {
  const services = useServices();
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const cards = CATEGORIES.map((c) => ({ ...c, items: c.slugs.map((s) => bySlug.get(s)).filter(Boolean) as typeof services })).filter(
    (c) => c.items.length > 0
  );
  if (!cards.length) return null;

  return (
    <section id="hizmetler" className="scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Ne Yapıyoruz?</p>
          <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
            Evinizdeki her arıza için <span className="text-primary">tek usta</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#9a9ba1] md:text-base">
            Tıkanıklıktan kombiye, su kaçağından uyduya kadar {services.length} farklı hizmeti Şırnak&apos;ın tüm ilçelerinde,
            aracımızla adresinize gelerek yapıyoruz.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-[#111] to-secondary/20">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image}
                    alt={`Şırnak ${c.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-primary/80" aria-hidden>
                    {c.title.startsWith("Uydu") ? <SatelliteDish className="h-20 w-20" /> : <Zap className="h-20 w-20" />}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                <h3 className="absolute bottom-4 left-5 right-5 text-xl font-black text-white md:text-2xl">{c.title}</h3>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-4 text-sm leading-relaxed text-[#b4b5ba]">{c.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {c.items.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`/hizmetler/${s.slug}`}
                        className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#d4d4d8] transition-colors hover:border-primary/60 hover:text-white"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/hizmetler" className="inline-block rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-primary/60">
            Tüm hizmetleri ve detaylarını gör →
          </a>
        </div>
      </div>
    </section>
  );
}
