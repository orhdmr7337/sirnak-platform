"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppHeader from "@/components/AppHeader";
import HeaderAction from "@/components/HeaderAction";
import PageHeader from "@/components/PageHeader";
import { createClient } from "@supabase/supabase-js";

interface Site {
  id: string;
  slug: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardClient() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from("sites")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setSites(data || []);
        setLoading(false);
      });
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  const activeCount = sites.filter((s) => s.is_active).length;

  const stats = [
    {
      label: "Toplam Site",
      value: sites.length,
      color: "text-surface-900",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      bg: "bg-surface-100 text-surface-500",
    },
    {
      label: "Aktif",
      value: activeCount,
      color: "text-brand-600",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-brand-50 text-brand-600",
    },
    {
      label: "Pasif",
      value: sites.length - activeCount,
      color: "text-warning-600",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      bg: "bg-warning-50 text-warning-600",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <AppHeader
        actions={
          <>
            <span className="hidden md:block text-xs text-surface-400 mr-1">{user.email}</span>
            <HeaderAction
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              }
              label="Belgeler"
              href="/dashboard/certificates"
            />
            <HeaderAction
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.298-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              label="Ayarlar"
              href="/dashboard/settings"
            />
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-surface-500 hover:text-danger-600 hover:bg-danger-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className="hidden sm:inline">Çıkış Yap</span>
            </button>
          </>
        }
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <PageHeader
          title="Dashboard"
          description="Sitelerinizi yönetmek için birini seçin"
        />

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`bg-white rounded-xl border border-surface-200 p-4 sm:p-5 ${
                mounted ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${stat.bg}`}>
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-surface-400 uppercase tracking-wider truncate">
                    {stat.label}
                  </p>
                  <p className={`text-xl sm:text-2xl font-bold tracking-tight ${stat.color}`}>
                    {loading ? "—" : stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Site Kartları */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-surface-200 p-6 animate-pulse">
                <div className="h-5 w-32 bg-surface-100 rounded mb-3" />
                <div className="h-4 w-48 bg-surface-100 rounded mb-4" />
                <div className="h-8 w-24 bg-surface-100 rounded" />
              </div>
            ))}
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-surface-200">
            <svg className="w-12 h-12 text-surface-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
            <p className="text-sm font-medium text-surface-500">Henüz site eklenmemiş</p>
            <p className="text-xs text-surface-400 mt-1">Supabase dashboard&apos;dan site kayıtları oluşturun</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sites.map((site, idx) => (
              <button
                key={site.id}
                onClick={() => router.push(`/dashboard/${site.slug}`)}
                className={`text-left bg-white rounded-xl border border-surface-200 p-6 hover:shadow-md hover:border-brand-200 transition-all duration-200 hover-lift ${
                  mounted ? "animate-slideUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                    <span className="text-sm font-bold text-brand-600">
                      {site.name.charAt(0)}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      site.is_active
                        ? "bg-brand-50 text-brand-600"
                        : "bg-surface-100 text-surface-500"
                    }`}
                  >
                    {site.is_active ? "Aktif" : "Pasif"}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-surface-900">{site.name}</h3>
                <p className="text-xs text-surface-400 mt-1">{site.slug}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-brand-600">
                  Yönet
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
