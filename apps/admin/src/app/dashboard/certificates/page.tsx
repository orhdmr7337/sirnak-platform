"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STORAGE_KEY = "platform_certificates";

type CertType = "massage" | "plumbing";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: CertType;
}

const EMPTY_FORM = { title: "", issuer: "", year: "", type: "massage" as CertType };

const TYPE_META: Record<CertType, { label: string; badge: string; icon: React.ReactNode; emptyText: string }> = {
  massage: {
    label: "Masaj",
    badge: "bg-purple-50 text-purple-700",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    emptyText: "Henüz masaj belgesi eklenmemiş",
  },
  plumbing: {
    label: "Tesisat",
    badge: "bg-accent-50 text-accent-600",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.25 2.25 0 0021 17.25l-5.877-5.877M11.42 15.17L2.25 9.75m9.17 5.42V4.5m0 10.67L4.5 21" />
      </svg>
    ),
    emptyText: "Henüz tesisat belgesi eklenmemiş",
  },
};

export default function CertificatesPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | CertType>("all");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // localStorage'dan yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCertificates(JSON.parse(raw));
    } catch {
      // bozuk veri — boş listeyle devam
    }
    setHydrated(true);
  }, []);

  // değişiklikleri kaydet
  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
  }, [certificates, hydrated]);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.issuer.trim() || !form.year.trim()) {
      showToast("Lütfen tüm alanları doldurun", "error");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    if (editingId) {
      setCertificates((certs) => certs.map((c) => (c.id === editingId ? { ...form, id: editingId } : c)));
      showToast("Belge güncellendi");
    } else {
      setCertificates((certs) => [...certs, { ...form, id: crypto.randomUUID() }]);
      showToast("Belge eklendi");
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
    setSaving(false);
  };

  const handleEdit = (cert: Certificate) => {
    setForm({ title: cert.title, issuer: cert.issuer, year: cert.year, type: cert.type });
    setEditingId(cert.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (cert: Certificate) => {
    if (!confirm(`"${cert.title}" belgesini silmek istediğinize emin misiniz?`)) return;
    setCertificates((certs) => certs.filter((c) => c.id !== cert.id));
    if (editingId === cert.id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }
    showToast("Belge silindi");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const filtered = useMemo(
    () => (filter === "all" ? certificates : certificates.filter((c) => c.type === filter)),
    [certificates, filter]
  );

  const massageCerts = certificates.filter((c) => c.type === "massage");
  const plumbingCerts = certificates.filter((c) => c.type === "plumbing");

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

  const renderCertRow = (cert: Certificate) => (
    <div
      key={cert.id}
      className={`flex items-center justify-between px-4 py-3 hover:bg-surface-50 transition-colors ${
        editingId === cert.id ? "bg-brand-50/50" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-surface-900">{cert.title}</p>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${TYPE_META[cert.type].badge}`}>
            {TYPE_META[cert.type].label}
          </span>
        </div>
        <p className="text-xs text-surface-400 mt-0.5">
          {cert.issuer} &middot; {cert.year}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-3">
        <button
          onClick={() => handleEdit(cert)}
          className="p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
          title="Düzenle"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(cert)}
          className="p-2 text-surface-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-colors"
          title="Sil"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );

  const renderSection = (type: CertType, certs: Certificate[]) => (
    <section className="bg-white rounded-xl border border-surface-200 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-surface-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${TYPE_META[type].badge}`}>
            {TYPE_META[type].icon}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-surface-900">{TYPE_META[type].label} Belgeleri</h2>
            <p className="text-xs text-surface-400">{certs.length} belge</p>
          </div>
        </div>
      </div>
      {certs.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-surface-500 font-medium">{TYPE_META[type].emptyText}</p>
          <p className="text-xs text-surface-400 mt-1">Yukarıdaki formdan ekleyebilirsiniz</p>
        </div>
      ) : (
        <div className="divide-y divide-surface-100">{certs.map(renderCertRow)}</div>
      )}
    </section>
  );

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

      <main className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader
          title="Belgeler & Sertifikalar"
          description="Masaj ve tesisat hizmetlerine ait belgeleri yönetin"
        />

        {/* Form Kartı */}
        <section className="bg-white rounded-xl border border-surface-200 mb-6 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-surface-100">
            <h2 className="text-sm font-semibold text-surface-900">
              {editingId ? "Belgeyi Düzenle" : "Yeni Belge Ekle"}
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className={labelClass}>Belge Adı</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
                placeholder="Örn: Profesyonel Masaj Terapisti"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Yayın Kuruluşu</label>
                <input
                  type="text"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  className={inputClass}
                  placeholder="Örn: Türkiye Terapist Birliği"
                />
              </div>
              <div>
                <label className={labelClass}>Yıl</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className={inputClass}
                  placeholder="2024"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(TYPE_META) as CertType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, type: t })}
                    className={`flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium border transition-all ${
                      form.type === t
                        ? "border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20"
                        : "border-surface-200 text-surface-500 hover:border-surface-300 hover:bg-surface-50"
                    }`}
                  >
                    {TYPE_META[t].icon}
                    {TYPE_META[t].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 h-10 px-5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 disabled:opacity-60 transition-all active:scale-[0.98]"
              >
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={editingId ? "M4.5 12.75l6 6 9-13.5" : "M12 4.5v15m7.5-7.5h-15"} />
                  </svg>
                )}
                {saving ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
              </button>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="h-10 px-5 border border-surface-200 text-surface-600 rounded-lg text-sm font-medium hover:bg-surface-50 transition-colors"
                >
                  İptal
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Filtre */}
        <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1 w-fit mb-6">
          {([
            { id: "all" as const, label: `Tümü (${certificates.length})` },
            { id: "massage" as const, label: `Masaj (${massageCerts.length})` },
            { id: "plumbing" as const, label: `Tesisat (${plumbingCerts.length})` },
          ]).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === f.id ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Liste */}
        {certificates.length === 0 ? (
          <div className="bg-white rounded-xl border border-surface-200 py-16 text-center">
            <svg className="w-12 h-12 text-surface-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-sm font-medium text-surface-500">Henüz belge eklenmemiş</p>
            <p className="text-xs text-surface-400 mt-1">Yukarıdaki formu kullanarak ilk belgenizi ekleyin</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-surface-200 py-16 text-center">
            <p className="text-sm font-medium text-surface-500">Bu kategoride belge yok</p>
            <p className="text-xs text-surface-400 mt-1">Filtreyi değiştirerek diğer belgeleri görebilirsiniz</p>
          </div>
        ) : filter === "all" ? (
          <div className="space-y-5">
            {renderSection("massage", massageCerts)}
            {renderSection("plumbing", plumbingCerts)}
          </div>
        ) : (
          <section className="bg-white rounded-xl border border-surface-200 overflow-hidden">
            <div className="divide-y divide-surface-100">{filtered.map(renderCertRow)}</div>
          </section>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${toast.type === "success" ? "bg-surface-900" : "bg-danger-600"}`}>
            {toast.type === "success" ? (
              <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            <span className="text-sm text-white font-medium">{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
