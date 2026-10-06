"use client";

import { useDistricts } from "@sirnak/shared";
import { Wrench, Thermometer, Video, Truck, Clock, MessageCircle } from "lucide-react";

// "Neden biz?" bölümü. Yalnızca işletmenin gerçekten sunduğu yöntem ve hizmetler yazılır.
const POINTS = [
  { icon: Wrench, title: "Kırmadan Dökmeden", text: "Tıkanıklıkları robot, yay makinesi ve basınçlı su ile boru içinden açıyoruz; fayans kırmak son çare." },
  { icon: Thermometer, title: "Termal Kamera ile Tespit", text: "Su kaçağının yerini termal kamera ile buluyor, duvarı sadece gereken noktada açıyoruz." },
  { icon: Video, title: "Kameralı Gider Görüntüleme", text: "Tekrar eden tıkanıklıkların sebebini boru içini kamerayla görerek kalıcı çözüyoruz." },
  { icon: Truck, title: "Aracımızla Adresinize", text: "Seyyar çalışıyoruz; ekipmanımızla ev ve iş yerinize geliyoruz." },
  { icon: Clock, title: "7/24 Acil Servis", text: "Su taşması, tıkanıklık, elektrik arızası gibi bekleyemeyecek işlerde gece gündüz ulaşabilirsiniz." },
  { icon: MessageCircle, title: "Fotoğrafla Ön Bilgi", text: "WhatsApp'tan arızanın fotoğrafını gönderin, gelmeden önce ön bilgi verelim." },
];

export default function WhyUs() {
  const districts = useDistricts();
  return (
    <section className="border-y border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Neden Çözüm Noktası?</p>
          <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">Doğru tespit, temiz işçilik</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {POINTS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 md:p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-12 md:w-12">
                <p.icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-white md:text-lg">{p.title}</h3>
              <p className="text-xs leading-relaxed text-[#9a9ba1] md:text-sm">{p.text}</p>
            </div>
          ))}
        </div>
        {districts.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-sm font-semibold text-white">Hizmet bölgelerimiz:</span>
            {districts.map((d) => (
              <a key={d.id} href={`/ilceler/${d.slug}`} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20">
                {d.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
