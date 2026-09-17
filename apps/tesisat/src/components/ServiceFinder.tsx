"use client";

import { useState } from "react";
import { useServiceFinderOptions, useServices } from "@sirnak/shared";

export default function ServiceFinder() {
  const [selected, setSelected] = useState("");
  const options = useServiceFinderOptions();
  const services = useServices();

  const needs = options.map((o) => ({
    need: o.need_label,
    slug: o.recommended_service_slug,
  }));

  const matched = services.find((s) => s.slug === selected);

  return (
    <section className="sc-section">
      <div className="sc-wrap">
        <div className="mx-auto max-w-2xl text-center" data-sc-in>
          <p className="sc-label mb-3 text-primary">Hizmet Bulucu</p>
          <h2
            className="sc-display sc-display--md mb-8 text-white"
            style={{ fontFamily: "var(--sc-font-display)" }}
          >
            Neye İhtiyacınız Var?
          </h2>

          <div className="glass-card p-6">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#9a9ba1] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="" className="bg-[#101217]">
                Seçiniz...
              </option>
              {needs.map((n) => (
                <option key={n.slug} value={n.slug} className="bg-[#101217]">
                  {n.need}
                </option>
              ))}
              {needs.length === 0 && (
                <>
                  <option value="su-kacagi" className="bg-[#101217]">
                    Su kaçağı var
                  </option>
                  <option value="petek-temizligi" className="bg-[#101217]">
                    Peteklerim ısınmıyor
                  </option>
                  <option value="kombi-bakimi" className="bg-[#101217]">
                    Kombi bakımına ihtiyacım var
                  </option>
                  <option value="elektrik-ariza" className="bg-[#101217]">
                    Elektrik arızası var
                  </option>
                  <option value="tikaniklik" className="bg-[#101217]">
                    Gider tıkanmış
                  </option>
                </>
              )}
            </select>

            {matched && (
              <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left">
                <h3 className="mb-2 font-semibold text-white">
                  Önerilen Hizmet: {matched.title}
                </h3>
                <p className="mb-3 text-sm text-[#9a9ba1]">
                  {matched.description}
                </p>
                <a
                  href={`#iletisim?service=${matched.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-[#050505] transition-all hover:bg-primary-dark"
                >
                  Teklif Al
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}

            {!matched && (
              <p className="mt-4 text-sm text-[#9a9ba1]">
                Seçiminizi yapın, size en uygun hizmeti önereceğiz
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
