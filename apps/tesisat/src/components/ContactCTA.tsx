"use client";

import { useState } from "react";
import { useSiteConfig, useServices, useDistricts, submitContact } from "@sirnak/shared";

export default function ContactCTA() {
  const site = useSiteConfig();
  const services = useServices();
  const districts = useDistricts();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    service_slug: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await submitContact({
      site_id: site.id,
      ...form,
    });
    setStatus(error ? "error" : "sent");
  };

  return (
    <section id="iletisim" className="sc-section">
      <div className="sc-wrap">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center" data-sc-in>
            <p className="sc-label mb-3 text-primary">İletişim</p>
            <h2
              className="sc-display sc-display--md text-white"
              style={{ fontFamily: "var(--sc-font-display)" }}
            >
              Hemen Teklif Alın
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#9a9ba1]">
              Formu doldurun, size en kısa sürede dönüş yapalım. Ya da
              doğrudan bizi arayın.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5" data-sc-in>
            <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#9a9ba1] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#9a9ba1] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <input
                type="email"
                placeholder="E-posta (opsiyonel)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#9a9ba1] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={form.district}
                  onChange={(e) =>
                    setForm({ ...form, district: e.target.value })
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="" className="bg-[#101217]">
                    İlçe Seçin
                  </option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name} className="bg-[#101217]">
                      {d.name}
                    </option>
                  ))}
                </select>
                <select
                  value={form.service_slug}
                  onChange={(e) =>
                    setForm({ ...form, service_slug: e.target.value })
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="" className="bg-[#101217]">
                    Hizmet Seçin
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.slug} className="bg-[#101217]">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Mesajınız (opsiyonel)"
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#9a9ba1] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[#e85a0f] px-6 py-3.5 text-sm font-bold text-[#050505] transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                {status === "sending"
                  ? "⏳ Gönderiliyor..."
                  : status === "sent"
                    ? "✓ Gönderildi!"
                    : status === "error"
                      ? "Tekrar Dene"
                      : "Mesaj Gönder"}
              </button>
            </form>

            <div className="space-y-4 lg:col-span-2">
              <div className="glass-card p-5">
                <h3 className="mb-3 font-semibold text-white">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm text-[#9a9ba1]">
                  <a
                    href={`tel:${site.phone}`}
                    className="flex items-center gap-3 hover:text-white transition-colors"
                  >
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {site.phone || "+90 500 123 45 67"}
                  </a>
                  {site.email && (
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-3 hover:text-white transition-colors"
                    >
                      <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {site.email}
                    </a>
                  )}
                  {site.address && (
                    <div className="flex items-start gap-3">
                      <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{site.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{site.working_hours || "7/24 Hizmet"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
