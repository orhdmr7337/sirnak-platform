"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createAdminClient } from "@/lib/supabase-client";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";

interface Notification {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  status: "new" | "contacted" | "completed";
  created_at: string;
  site: { name: string; slug: string } | null;
}

function timeAgo(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Az önce";
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} sa önce`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} gün önce`;
  return new Date(iso).toLocaleDateString("tr-TR");
}

const STATUS_LABEL: Record<Notification["status"], string> = {
  new: "Yeni",
  contacted: "Arandı",
  completed: "Tamamlandı",
};

/**
 * Bildirimler = gelen iletişim talepleri (`contact_submissions`).
 * "Yeni" durumundakiler okunmamış sayılır.
 */
export default function NotificationsClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new">("all");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await createAdminClient()
      .from("contact_submissions")
      .select("id,name,phone,message,status,created_at,site:sites(name,slug)")
      .order("created_at", { ascending: false })
      .limit(100);
    setItems((data ?? []) as unknown as Notification[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const markContacted = async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, status: "contacted" } : n)));
    const { error } = await createAdminClient().from("contact_submissions").update({ status: "contacted" }).eq("id", id);
    if (error) load();
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  const unreadCount = items.filter((n) => n.status === "new").length;
  const filtered = filter === "new" ? items.filter((n) => n.status === "new") : items;

  return (
    <div className="min-h-screen bg-surface-50">
      <AppHeader
        actions={
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs font-medium px-3 py-1.5 rounded-lg text-surface-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
          >
            Dashboard
          </button>
        }
      />

      <main className="max-w-2xl mx-auto px-4 pt-5 pb-nav sm:pt-8">
        <PageHeader
          title="Bildirimler"
          description={unreadCount > 0 ? `${unreadCount} yeni talep var` : "Yeni talep yok"}
        />

        <div className="flex items-center gap-1 bg-surface-100 rounded-xl p-1 mb-4 w-full sm:w-fit">
          {(
            [
              ["all", `Tümü (${items.length})`],
              ["new", `Yeni (${unreadCount})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`flex-1 sm:flex-none px-4 h-10 rounded-lg text-xs font-medium transition-all ${
                filter === id ? "bg-white text-surface-900 shadow-sm" : "text-surface-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-xl border border-surface-200 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-surface-200">
            <p className="text-sm font-medium text-surface-500">Bildirim bulunmuyor</p>
            <p className="text-xs text-surface-400 mt-1">Sitelerden gelen talepler burada görünür</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((n) => (
              <div
                key={n.id}
                className={`bg-white rounded-xl border border-surface-200 p-4 ${
                  n.status === "new" ? "border-l-[3px] border-l-brand-500" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-900 break-words">{n.name}</p>
                    <p className="text-xs text-surface-400 mt-0.5">
                      {n.site?.name ?? "—"} · {timeAgo(n.created_at)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      n.status === "new" ? "bg-brand-50 text-brand-700" : "bg-surface-100 text-surface-500"
                    }`}
                  >
                    {STATUS_LABEL[n.status]}
                  </span>
                </div>
                {n.message && <p className="text-sm text-surface-600 mt-2 break-words whitespace-pre-line">{n.message}</p>}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${n.phone}`}
                    className="h-11 inline-flex items-center justify-center rounded-xl bg-brand-50 text-brand-700 text-sm font-medium active:scale-[0.98] transition-transform"
                  >
                    {n.phone}
                  </a>
                  {n.site ? (
                    <button
                      onClick={() => router.push(`/dashboard/${n.site!.slug}`)}
                      className="h-11 rounded-xl bg-surface-100 text-surface-700 text-sm font-medium active:scale-[0.98] transition-transform"
                    >
                      Siteyi Aç
                    </button>
                  ) : (
                    <span />
                  )}
                  {n.status === "new" && (
                    <button
                      onClick={() => markContacted(n.id)}
                      className="col-span-2 h-11 rounded-xl border border-surface-200 text-surface-700 text-sm font-medium active:scale-[0.98] transition-transform"
                    >
                      Arandı olarak işaretle
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
