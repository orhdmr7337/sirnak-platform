"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STORAGE_KEY = "platform_company_settings";

interface CompanySettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  about: string;
  openingHours: string;
  lat: string;
  lng: string;
}

const DEFAULT_SETTINGS: CompanySettings = {
  companyName: "Çözüm Noktası Tesisat & Elektrik",
  phone: "+90 500 123 4567",
  email: "iletisim@cozumnoktasi.com",
  address: "Şırnak, Türkiye",
  about: "Şırnak'ın en güvenilir tesisat ve elektrik hizmet sağlayıcısı.",
  openingHours: "Mo-Su 00:00-23:59",
  lat: "37.52",
  lng: "42.49",
};

export default function SettingsPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  // Kayıtlı ayarları yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // bozuk veri — varsayılanlarla devam
    }
    setLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      await new Promise((r) => setTimeout(r, 400));
      setSavedAt(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    if (!confirm("Tüm alanları varsayılan değerlere sıfırlamak istediğinize emin misiniz?")) return;
    setFormData(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
    setSavedAt(null);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass =
    "h-10 w-full px-3 bg-white border border-surface-200 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-surface-300 transition-all duration-200";
  const labelClass = "block text-xs font-medium text-surface-500 mb-1.5";

  return (
    <div className="min-h-screen bg-surface-50">
      <AppHeader
        actions={
          <>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-surface-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-surface-500 hover:text-danger-600 hover:bg-danger-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Çıkış
            </button>
          </>
        }
      />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <PageHeader
          title="Şirket Ayarları"
          description="Şirket bilgilerini ve iletişim detaylarını yönetin"
        />

        {loading ? (
          <div className="bg-white rounded-xl border border-surface-200 p-6 space-y-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-surface-100 rounded-lg" />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-surface-200 p-5 sm:p-6 space-y-5">
            <div>
              <label className={labelClass}>Şirket Adı</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Telefon (24/7)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>E-posta</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Adres</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Hakkımızda</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2.5 bg-white border border-surface-200 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-surface-300 transition-all duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Çalışma Saatleri</label>
                <input type="text" name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="Mo-Su 00:00-23:59" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Konum (Koordinatlar)</label>
                <div className="flex gap-2">
                  <input type="text" name="lat" value={formData.lat} onChange={handleChange} placeholder="Enlem" className={inputClass} />
                  <input type="text" name="lng" value={formData.lng} onChange={handleChange} placeholder="Boylam" className={inputClass} />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-surface-100">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 disabled:opacity-60 transition-all active:scale-[0.98]"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                {saving ? "Kaydediliyor..." : "Ayarları Kaydet"}
              </button>

              <button
                type="button"
                onClick={resetToDefaults}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 border border-surface-200 text-surface-600 rounded-lg text-sm font-medium hover:bg-surface-50 transition-colors"
              >
                Sıfırla
              </button>

              {savedAt && (
                <span className="text-xs text-brand-600 flex items-center gap-1.5 sm:ml-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  Son kayıt: {savedAt}
                </span>
              )}
            </div>
          </form>
        )}

        <div className="mt-6 bg-white rounded-xl border border-surface-200 p-5">
          <h2 className="text-sm font-semibold text-surface-900 mb-3">Bilgiler</h2>
          <ul className="text-xs text-surface-500 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">✓</span>
              Ayarlar tarayıcınıza kaydedilir (localStorage) ve tüm değişiklikler anında etkili olur.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">✓</span>
              Harita koordinatları (enlem/boylam) sitedeki konum bilgisini belirler.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">✓</span>
              Telefon numarası sitedeki &quot;Hemen Ara&quot; butonunda kullanılır.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-0.5">✓</span>
              E-posta ve adres hakkında sayfasında gösterilir.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
