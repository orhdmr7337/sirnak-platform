"use client";

import { useMemo, useState } from "react";
import { approveTestimonial, deleteRecord } from "../actions";
import type { AdminSiteData } from "../types";
import type { Testimonial } from "@sirnak/shared";
import { Section, Empty, IconBtnDelete, FilterTabs } from "./kit";

interface TestimonialsTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

type Filter = "all" | "approved" | "pending";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= rating ? "text-amber-400 fill-amber-400" : "text-surface-200 fill-surface-200"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
        </svg>
      ))}
      <span className="text-xs text-surface-400 ml-1">{rating}/5</span>
    </div>
  );
}

export default function TestimonialsTab({ data, loadData, showMessage }: TestimonialsTabProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const testimonials = data.testimonials;
  const approvedCount = testimonials.filter((t) => t.approved).length;
  const pendingCount = testimonials.length - approvedCount;

  const filtered = useMemo(() => {
    if (filter === "approved") return testimonials.filter((t) => t.approved);
    if (filter === "pending") return testimonials.filter((t) => !t.approved);
    return testimonials;
  }, [testimonials, filter]);

  const toggleApproval = async (t: Testimonial) => {
    try {
      await approveTestimonial(t.id, !t.approved);
      showMessage(t.approved ? "Yorum onayı kaldırıldı" : "Yorum onaylandı");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await deleteRecord("testimonials", id);
      showMessage("Yorum silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  return (
    <div className="space-y-5">
      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        }
        title="Müşteri Yorumları"
        subtitle="Gelen yorumları inceleyin ve yönetin"
      >
        {testimonials.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            }
            title="Henüz yorum yok"
            description="Müşteri yorumları burada görünecek."
          />
        ) : (
          <>
            <div className="px-5 pt-4">
              <FilterTabs<Filter>
                value={filter}
                onChange={setFilter}
                options={[
                  { id: "all", label: "Tümü", count: testimonials.length },
                  { id: "approved", label: "Onaylı", count: approvedCount },
                  { id: "pending", label: "Bekleyen", count: pendingCount },
                ]}
              />
            </div>
            <div className="p-5 pt-4 divide-y divide-surface-100">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-surface-500">Bu filtrede yorum bulunmuyor.</p>
              ) : (
                filtered.map((t) => (
                  <div key={t.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-surface-900">{t.customer_name}</p>
                          {t.district && (
                            <span className="text-xs px-2 py-0.5 bg-surface-100 text-surface-600 rounded-full">
                              {t.district}
                            </span>
                          )}
                          {t.approved ? (
                            <span className="bg-brand-50 text-brand-700 rounded-full px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Onaylı
                            </span>
                          ) : (
                            <span className="bg-warning-50 text-warning-600 rounded-full px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Bekliyor
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5">
                          <Stars rating={t.rating} />
                        </div>
                        <p className="text-sm text-surface-600 mt-1.5">{t.content}</p>
                        {t.service_slug && (
                          <span className="inline-block mt-1.5 text-xs px-2 py-0.5 bg-surface-50 text-surface-500 rounded border border-surface-100">
                            {t.service_slug}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleApproval(t)}
                          className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${
                            t.approved
                              ? "text-warning-600 bg-warning-50 hover:bg-warning-100"
                              : "text-brand-700 bg-brand-50 hover:bg-brand-100"
                          }`}
                          title={t.approved ? "Onayı kaldır" : "Onayla"}
                        >
                          {t.approved ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Onayı Kaldır
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Onayla
                            </>
                          )}
                        </button>
                        <IconBtnDelete onClick={() => remove(t.id)} />
                      </div>
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
