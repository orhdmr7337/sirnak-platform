"use client";

import { useState } from "react";
import { useServiceFinderOptions, useServices } from "@sirnak/shared";
import { useInView } from "@/hooks/useInView";
import { Search, ChevronDown } from "lucide-react";

const FALLBACK_OPTIONS = [
  { id: "1", need_label: "Sırt ağrım var", recommended_service_slug: "derin-doku" },
  { id: "2", need_label: "Rahatlamak istiyorum", recommended_service_slug: "klasik-masaj" },
  { id: "3", need_label: "Stresimi atmak istiyorum", recommended_service_slug: "aromaterapi" },
  { id: "4", need_label: "Uyku problemi yaşıyorum", recommended_service_slug: "aromaterapi" },
  { id: "5", need_label: "Spor sonrası iyileşme", recommended_service_slug: "derin-doku" },
];

export function ServiceFinder() {
  const options = useServiceFinderOptions();
  const services = useServices();
  const { ref, visible } = useInView();
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState("");

  const items = options.length > 0 ? options : FALLBACK_OPTIONS;

  const handleChange = (slug: string) => {
    setSelected(slug);
    if (!slug) {
      setResult("");
      return;
    }
    const service = services.find((s) => s.slug === slug);
    if (service) {
      setResult(service.description || `${service.title} hizmetimiz size uygun.`);
    } else {
      setResult("Size uygun masajı bulmak için bizi arayın.");
    }
  };

  return (
    <section className="py-16 relative">
      <div ref={ref} className={`section-hidden ${visible ? "section-visible" : ""}`}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center">
                <Search className="w-6 h-6 text-[#c9a96e]" />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Masaj Bulucu
                </h3>
                <p className="text-sm text-gray-400">Ne ihtiyacınız var?</p>
              </div>
            </div>

            <div className="relative">
              <select
                value={selected}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full appearance-none bg-[#1a231a] border border-[#2a3a2a] text-white rounded-xl px-5 py-4 pr-12
                  focus:outline-none focus:border-[#6b8f71] transition-colors cursor-pointer"
              >
                <option value="">Seçiminizi yapın...</option>
                {items.map((opt) => (
                  <option key={opt.id} value={opt.recommended_service_slug}>
                    {opt.need_label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {result && (
              <div className="mt-5 p-4 bg-[#6b8f71]/10 border border-[#6b8f71]/20 rounded-xl">
                <p className="text-gray-300">{result}</p>
                <button
                  onClick={() => {
                    const el = document.getElementById("iletisim");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-3 text-[#c9a96e] text-sm font-medium hover:underline"
                >
                  Hemen randevu alın →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
