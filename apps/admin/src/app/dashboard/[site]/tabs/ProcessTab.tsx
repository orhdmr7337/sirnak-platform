"use client";

import { useState } from "react";
import { createRecord, updateRecord, deleteRecord } from "../actions";
import type { AdminSiteData } from "../types";
import type { ProcessStep } from "@sirnak/shared";
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

interface ProcessTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

export default function ProcessTab({ data, loadData, showMessage }: ProcessTabProps) {
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [form, setForm] = useState<Partial<ProcessStep>>({});
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing({ id: "new" } as ProcessStep);
    setForm({
      site_id: data.site.id,
      published: true,
      sort_order: data.processSteps.length + 1,
      title: "",
      icon: "",
      description: "",
    });
  };

  const openEdit = (step: ProcessStep) => {
    setEditing(step);
    setForm({ ...step });
  };

  const save = async () => {
    if (!form.title?.trim()) {
      showMessage("Hata: Başlık zorunludur");
      return;
    }
    setSaving(true);
    try {
      if (editing?.id === "new") {
        await createRecord("process_steps", form);
      } else {
        await updateRecord("process_steps", editing!.id, form);
      }
      showMessage("Süreç adımı kaydedildi");
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
      await deleteRecord("process_steps", id);
      showMessage("Süreç adımı silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const items = [...data.processSteps];
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    try {
      await Promise.all(items.map((item, i) => updateRecord("process_steps", item.id, { sort_order: i + 1 })));
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
        }
        title="Süreç Adımları"
        subtitle="Müşterilerin gördüğü süreç akışını yönetin"
        actions={
          <BtnPrimary onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni Adım
          </BtnPrimary>
        }
      >
        {data.processSteps.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Henüz süreç adımı eklenmemiş"
            description="İlk adımı eklemek için sağ üstteki butonu kullanın."
          />
        ) : (
          <div className="divide-y divide-surface-100">
            {data.processSteps.map((step, index) => (
              <div key={step.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 text-xs font-semibold text-surface-500">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {step.icon && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-surface-100 text-surface-500 rounded border border-surface-200">
                          {step.icon}
                        </span>
                      )}
                      <p className="text-sm font-medium text-surface-900 truncate">{step.title}</p>
                      <PublishBadge published={step.published} />
                    </div>
                    {step.description && (
                      <p className="text-xs text-surface-400 truncate mt-0.5">{step.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <IconBtnUp onClick={() => move(index, -1)} disabled={index === 0} />
                  <IconBtnDown onClick={() => move(index, 1)} disabled={index === data.processSteps.length - 1} />
                  <IconBtnEdit onClick={() => openEdit(step)} />
                  <IconBtnDelete onClick={() => remove(step.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Modal
        open={!!editing}
        title={editing?.id === "new" ? "Yeni Süreç Adımı" : "Adımı Düzenle"}
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
          <input type="text" value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Örn: Keşif Ziyareti" />
        </div>
        <div>
          <label className={labelClass}>İkon (Lucide adı)</label>
          <input type="text" value={form.icon ?? ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputClass} placeholder="Örn: ClipboardCheck" />
        </div>
        <div>
          <label className={labelClass}>Açıklama</label>
          <textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={textareaClass} placeholder="Bu aşama hakkında kısa bir açıklama..." />
        </div>
        <PublishedToggle checked={form.published ?? false} onChange={(v) => setForm({ ...form, published: v })} />
      </Modal>
    </div>
  );
}
