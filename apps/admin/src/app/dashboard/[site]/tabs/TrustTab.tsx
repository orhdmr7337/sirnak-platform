"use client";

import { useState } from "react";
import { createRecord, updateRecord, deleteRecord } from "../actions";
import type { AdminSiteData } from "../types";
import type { TrustItem } from "@sirnak/shared";
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

interface TrustTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

export default function TrustTab({ data, loadData, showMessage }: TrustTabProps) {
  const [editing, setEditing] = useState<TrustItem | null>(null);
  const [form, setForm] = useState<Partial<TrustItem>>({});
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing({ id: "new" } as TrustItem);
    setForm({
      site_id: data.site.id,
      published: true,
      sort_order: data.trustItems.length + 1,
      title: "",
      icon: "",
      description: "",
    });
  };

  const openEdit = (item: TrustItem) => {
    setEditing(item);
    setForm({ ...item });
  };

  const save = async () => {
    if (!form.title?.trim()) {
      showMessage("Hata: Başlık zorunludur");
      return;
    }
    setSaving(true);
    try {
      if (editing?.id === "new") {
        await createRecord("trust_items", form);
      } else {
        await updateRecord("trust_items", editing!.id, form);
      }
      showMessage("Güven öğesi kaydedildi");
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
      await deleteRecord("trust_items", id);
      showMessage("Güven öğesi silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const items = [...data.trustItems];
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    try {
      await Promise.all(items.map((item, i) => updateRecord("trust_items", item.id, { sort_order: i + 1 })));
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        }
        title="Güven Öğeleri"
        subtitle="Müşterilerinize güven duygusu veren öğeleri yönetin"
        actions={
          <BtnPrimary onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni Öğe
          </BtnPrimary>
        }
      >
        {data.trustItems.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Henüz güven öğesi eklenmemiş"
            description="İlk öğenizi eklemek için sağ üstteki butonu kullanın."
          />
        ) : (
          <div className="divide-y divide-surface-100">
            {data.trustItems.map((item, index) => (
              <div key={item.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 text-xs font-semibold text-surface-500">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.icon && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-surface-100 text-surface-500 rounded border border-surface-200">
                          {item.icon}
                        </span>
                      )}
                      <p className="text-sm font-medium text-surface-900 truncate">{item.title}</p>
                      <PublishBadge published={item.published} />
                    </div>
                    {item.description && (
                      <p className="text-xs text-surface-400 truncate mt-0.5">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <IconBtnUp onClick={() => move(index, -1)} disabled={index === 0} />
                  <IconBtnDown onClick={() => move(index, 1)} disabled={index === data.trustItems.length - 1} />
                  <IconBtnEdit onClick={() => openEdit(item)} />
                  <IconBtnDelete onClick={() => remove(item.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Modal
        open={!!editing}
        title={editing?.id === "new" ? "Yeni Güven Öğesi" : "Öğeyi Düzenle"}
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
          <input type="text" value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Örn: 10 Yıl Garanti" />
        </div>
        <div>
          <label className={labelClass}>İkon (Lucide adı)</label>
          <input type="text" value={form.icon ?? ""} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputClass} placeholder="Örn: ShieldCheck" />
        </div>
        <div>
          <label className={labelClass}>Açıklama</label>
          <textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={textareaClass} placeholder="Bu güven öğesi hakkında kısa bir açıklama..." />
        </div>
        <PublishedToggle checked={form.published ?? false} onChange={(v) => setForm({ ...form, published: v })} />
      </Modal>
    </div>
  );
}
