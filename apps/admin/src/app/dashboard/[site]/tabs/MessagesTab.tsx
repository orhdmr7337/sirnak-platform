"use client";

import { useMemo, useState } from "react";
import { updateContactStatus } from "../actions";
import type { AdminSiteData } from "../types";
import type { ContactSubmission } from "@sirnak/shared";
import { Section, Empty, FilterTabs, inputClass } from "./kit";

interface MessagesTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

type Filter = "all" | ContactSubmission["status"];

const STATUS_LABELS: Record<ContactSubmission["status"], string> = {
  new: "Yeni",
  contacted: "Arandı",
  completed: "Tamamlandı",
};

const STATUS_CLASSES: Record<ContactSubmission["status"], string> = {
  new: "bg-accent-50 text-accent-700",
  contacted: "bg-warning-50 text-warning-600",
  completed: "bg-brand-50 text-brand-700",
};

const STATUS_DOTS: Record<ContactSubmission["status"], string> = {
  new: "bg-accent-500",
  contacted: "bg-warning-500",
  completed: "bg-brand-500",
};

export default function MessagesTab({ data, loadData, showMessage }: MessagesTabProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const messages = data.contactSubmissions ?? [];

  const counts = useMemo(
    () => ({
      all: messages.length,
      new: messages.filter((m) => m.status === "new").length,
      contacted: messages.filter((m) => m.status === "contacted").length,
      completed: messages.filter((m) => m.status === "completed").length,
    }),
    [messages]
  );

  const filtered = useMemo(() => {
    let result = filter === "all" ? messages : messages.filter((m) => m.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.phone.toLowerCase().includes(q) ||
          (m.message ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [messages, filter, search]);

  const handleStatusChange = async (id: string, status: ContactSubmission["status"]) => {
    setUpdatingId(id);
    try {
      await updateContactStatus(id, status);
      showMessage("Durum güncellendi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-5">
      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-18.25 0V5.625a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v7.688m-18 0V5.625A2.25 2.25 0 016.75 3.375h10.5A2.25 2.25 0 0119.5 5.625v7.688" />
          </svg>
        }
        title="Mesajlar"
        subtitle={`${messages.length} mesaj mevcut`}
      >
        {messages.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-18.25 0V5.625a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v7.688m-18 0V5.625A2.25 2.25 0 016.75 3.375h10.5A2.25 2.25 0 0119.5 5.625v7.688" />
              </svg>
            }
            title="Henüz mesaj bulunmuyor"
            description="Web sitenizden gelen iletişim formları burada listelenecek."
          />
        ) : (
          <>
            <div className="px-5 pt-4 flex flex-wrap items-center gap-3">
              <FilterTabs<Filter>
                value={filter}
                onChange={setFilter}
                options={[
                  { id: "all", label: "Tümü", count: counts.all },
                  { id: "new", label: "Yeni", count: counts.new },
                  { id: "contacted", label: "Arandı", count: counts.contacted },
                  { id: "completed", label: "Tamamlandı", count: counts.completed },
                ]}
              />
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="İsim, telefon veya mesaj ara..."
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div className="p-5 pt-4 divide-y divide-surface-100">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-surface-500">Aramanızla eşleşen mesaj bulunamadı.</p>
              ) : (
                filtered.map((msg) => (
                  <div key={msg.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-surface-900">{msg.name}</span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5 ${STATUS_CLASSES[msg.status]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[msg.status]}`} />
                            {STATUS_LABELS[msg.status]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                          <a
                            href={`tel:${msg.phone}`}
                            className="inline-flex items-center gap-1 text-xs text-surface-500 hover:text-brand-600 hover:underline"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            {msg.phone}
                          </a>
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-surface-500 hover:text-brand-600 hover:underline"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                            WhatsApp
                          </a>
                        </div>
                        {msg.message && <p className="text-sm text-surface-600 mt-1.5">{msg.message}</p>}
                        <p className="text-xs text-surface-400 mt-1">
                          {new Date(msg.created_at).toLocaleString("tr-TR")}
                        </p>
                      </div>
                      <select
                        value={msg.status}
                        onChange={(e) => handleStatusChange(msg.id, e.target.value as ContactSubmission["status"])}
                        disabled={updatingId === msg.id}
                        className="h-8 px-2 bg-white border border-surface-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-500/20 focus:outline-none disabled:opacity-50 shrink-0"
                      >
                        <option value="new">Yeni</option>
                        <option value="contacted">Arandı</option>
                        <option value="completed">Tamamlandı</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </Section>
    </div>
  );
}
