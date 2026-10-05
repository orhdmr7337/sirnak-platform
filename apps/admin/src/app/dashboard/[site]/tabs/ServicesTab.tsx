"use client";

import { useState } from "react";
import type { AdminSiteData } from "../types";
import type { Service, ServiceFaq } from "@sirnak/shared";

// SSS düz metin olarak düzenlenir: her soru-cevap çifti boş satırla ayrılır,
// ilk satır soru, kalan satırlar cevap.
function faqsToText(faqs?: ServiceFaq[] | null): string {
  return (faqs ?? []).map((f) => `${f.q}\n${f.a}`).join("\n\n");
}

function textToFaqs(text: string): ServiceFaq[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => {
      const [q, ...rest] = block.trim().split("\n");
      return { q: (q ?? "").trim(), a: rest.join(" ").trim() };
    })
    .filter((f) => f.q && f.a);
}
import { createRecord, updateRecord, deleteRecord } from "../actions";
import {
  Section,
  Modal,
  Empty,
  BtnPrimary,
  BtnSecondary,
  IconBtnEdit,
  IconBtnDelete,
  IconBtnUp,
  IconBtnDown,
  PublishBadge,
  PublishedToggle,
  Spinner,
  inputClass,
  textareaClass,
  labelClass,
} from "./kit";

interface ServicesTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

export default function ServicesTab({ data, loadData, showMessage }: ServicesTabProps) {
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);
  const [faqText, setFaqText] = useState("");

  const openCreate = () => {
    setEditing({ id: "new" } as Service);
    setForm({
      site_id: data.site.id,
      published: true,
      sort_order: data.services.length + 1,
      title: "",
      slug: "",
      icon: "",
      price_info: "",
      description: "",
      content: "",
      faqs: [],
    });
    setFaqText("");
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({ ...service });
    setFaqText(faqsToText(service.faqs));
  };

  const save = async () => {
    if (!form.title?.trim()) {
      showMessage("Hata: Başlık zorunludur");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, faqs: textToFaqs(faqText) };
      // slug boşsa başlıktan üret
      if (!payload.slug?.trim() && payload.title) {
        payload.slug = payload.title
          .toLowerCase()
          .replaceAll("ı", "i").replaceAll("ş", "s").replaceAll("ç", "c")
          .replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ö", "o")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      if (editing?.id === "new") {
        await createRecord("services", payload);
      } else {
        await updateRecord("services", editing!.id, payload);
      }
      showMessage("Hizmet kaydedildi");
      setEditing(null);
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await deleteRecord("services", id);
      showMessage("Hizmet silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const items = [...data.services];
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    try {
      await Promise.all(
        items.map((item, i) => updateRecord("services", item.id, { sort_order: i + 1 }))
      );
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const set = (key: keyof Service, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-5">
      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
          </svg>
        }
        title="Hizmetler"
        subtitle={`${data.services.length} hizmet mevcut`}
        actions={
          <BtnPrimary onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni Hizmet
          </BtnPrimary>
        }
      >
        {data.services.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
              </svg>
            }
            title="Henüz hizmet eklenmemiş"
            description="İlk hizmetinizi eklemek için sağ üstteki butonu kullanın."
          />
        ) : (
          <div className="divide-y divide-surface-100">
            {data.services.map((service, index) => (
              <div key={service.id} className="px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 hover:bg-surface-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 text-xs font-semibold text-surface-500">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-surface-900 truncate">{service.title}</p>
                      <PublishBadge published={service.published} />
                    </div>
                    <p className="text-xs text-surface-400 truncate mt-0.5">
                      /{service.slug}
                      {service.price_info ? ` · ${service.price_info}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 sm:gap-0.5 shrink-0 -mb-1 sm:mb-0 pt-1 sm:pt-0 border-t border-surface-100 sm:border-0">
                  <IconBtnUp onClick={() => move(index, -1)} disabled={index === 0} />
                  <IconBtnDown onClick={() => move(index, 1)} disabled={index === data.services.length - 1} />
                  <IconBtnEdit onClick={() => openEdit(service)} />
                  <IconBtnDelete onClick={() => remove(service.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Modal
        open={!!editing}
        title={editing?.id === "new" ? "Yeni Hizmet" : "Hizmeti Düzenle"}
        onClose={() => setEditing(null)}
        footer={
          <>
            <BtnSecondary onClick={() => setEditing(null)}>İptal</BtnSecondary>
            <BtnPrimary onClick={save} disabled={saving || !form.title?.trim()}>
              {saving && <Spinner />}
              Kaydet
            </BtnPrimary>
          </>
        }
      >
        <div>
          <label className={labelClass}>Başlık *</label>
          <input value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} className={inputClass} placeholder="Örn: Su Kaçağı Tespiti" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Slug</label>
            <input value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} className={inputClass} placeholder="Boş bırakılırsa başlıktan üretilir" />
          </div>
          <div>
            <label className={labelClass}>Fiyat Bilgisi</label>
            <input value={form.price_info ?? ""} onChange={(e) => set("price_info", e.target.value)} className={inputClass} placeholder="Örn: 500 TL'den başlayan" />
          </div>
        </div>
        <div>
          <label className={labelClass}>İkon (Lucide adı)</label>
          <input value={form.icon ?? ""} onChange={(e) => set("icon", e.target.value)} className={inputClass} placeholder="Örn: droplet, wrench, flame, heart" />
        </div>
        <div>
          <label className={labelClass}>Açıklama</label>
          <textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={3} className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>Sayfa Metni (Google için uzun açıklama)</label>
          <textarea
            value={form.content ?? ""}
            onChange={(e) => set("content", e.target.value)}
            rows={10}
            className={textareaClass}
            placeholder={"## Ara başlık\nParagraf metni...\n\n- Madde 1\n- Madde 2"}
          />
          <p className="mt-1 text-xs text-gray-500">&quot;## &quot; ile başlayan satır ara başlık, &quot;- &quot; ile başlayan satır madde olur. Paragrafları boş satırla ayırın.</p>
        </div>
        <div>
          <label className={labelClass}>Sık Sorulan Sorular</label>
          <textarea
            value={faqText}
            onChange={(e) => setFaqText(e.target.value)}
            rows={8}
            className={textareaClass}
            placeholder={"Soru?\nCevap.\n\nİkinci soru?\nCevap."}
          />
          <p className="mt-1 text-xs text-gray-500">Her soruda ilk satır soru, alt satır cevap. Soruları boş satırla ayırın.</p>
        </div>
        <PublishedToggle checked={form.published ?? false} onChange={(v) => set("published", v)} />
      </Modal>
    </div>
  );
}
