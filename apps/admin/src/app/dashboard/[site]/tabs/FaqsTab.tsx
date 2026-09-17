"use client";

import { useState } from "react";
import { createRecord, updateRecord, deleteRecord } from "../actions";
import type { AdminSiteData } from "../types";
import type { Faq } from "@sirnak/shared";
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

interface FaqsTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

export default function FaqsTab({ data, loadData, showMessage }: FaqsTabProps) {
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState<Partial<Faq>>({});
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing({ id: "new" } as Faq);
    setForm({ site_id: data.site.id, published: true, sort_order: data.faqs.length + 1, question: "", answer: "" });
  };

  const openEdit = (faq: Faq) => {
    setEditing(faq);
    setForm({ ...faq });
  };

  const save = async () => {
    if (!form.question?.trim() || !form.answer?.trim()) {
      showMessage("Hata: Soru ve cevap zorunludur");
      return;
    }
    setSaving(true);
    try {
      if (editing?.id === "new") {
        await createRecord("faqs", form);
      } else {
        await updateRecord("faqs", editing!.id, form);
      }
      showMessage("SSS kaydedildi");
      setEditing(null);
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Bu SSS'yi silmek istediğinize emin misiniz?")) return;
    try {
      await deleteRecord("faqs", id);
      showMessage("SSS silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const items = [...data.faqs];
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    try {
      await Promise.all(items.map((item, i) => updateRecord("faqs", item.id, { sort_order: i + 1 })));
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        }
        title="Sıkça Sorulan Sorular"
        subtitle={`${data.faqs.length} soru mevcut`}
        actions={
          <BtnPrimary onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni SSS
          </BtnPrimary>
        }
      >
        {data.faqs.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            }
            title="Henüz SSS eklenmemiş"
            description="İlk soruyu eklemek için sağ üstteki butonu kullanın."
          />
        ) : (
          <div className="divide-y divide-surface-100">
            {data.faqs.map((faq, index) => (
              <div key={faq.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 text-xs font-semibold text-surface-500">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-surface-900 truncate">{faq.question}</p>
                      <PublishBadge published={faq.published} />
                    </div>
                    <p className="text-xs text-surface-400 truncate line-clamp-1 mt-0.5">{faq.answer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <IconBtnUp onClick={() => move(index, -1)} disabled={index === 0} />
                  <IconBtnDown onClick={() => move(index, 1)} disabled={index === data.faqs.length - 1} />
                  <IconBtnEdit onClick={() => openEdit(faq)} />
                  <IconBtnDelete onClick={() => remove(faq.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Modal
        open={!!editing}
        title={editing?.id === "new" ? "Yeni SSS" : "SSS Düzenle"}
        onClose={() => setEditing(null)}
        footer={
          <>
            <BtnSecondary onClick={() => setEditing(null)}>İptal</BtnSecondary>
            <BtnPrimary onClick={save} disabled={saving || !form.question?.trim() || !form.answer?.trim()}>
              {saving && <Spinner />}
              Kaydet
            </BtnPrimary>
          </>
        }
      >
        <div>
          <label className={labelClass}>Soru *</label>
          <input value={form.question ?? ""} onChange={(e) => setForm({ ...form, question: e.target.value })} className={inputClass} placeholder="Örn: Acil servis veriyor musunuz?" />
        </div>
        <div>
          <label className={labelClass}>Cevap *</label>
          <textarea value={form.answer ?? ""} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className={textareaClass} />
        </div>
        <PublishedToggle checked={form.published ?? false} onChange={(v) => setForm({ ...form, published: v })} />
      </Modal>
    </div>
  );
}
