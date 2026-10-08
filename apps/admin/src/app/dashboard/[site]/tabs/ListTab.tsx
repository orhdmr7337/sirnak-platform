"use client";

import { useState } from "react";
import type { AdminSiteData } from "../types";
import { upsertSiteContent } from "../actions-client";
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
  Spinner,
  inputClass,
  textareaClass,
  labelClass,
} from "./kit";

export interface ListField {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
}

interface ListTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
  /** `site_content.section` — sitelerin okuduğu bölüm adı (ör. "certificates"). */
  section: string;
  title: string;
  subtitle: string;
  itemName: string;
  emptyText: string;
  fields: ListField[];
}

type Item = Record<string, string>;

/**
 * `site_content` içinde JSON liste olarak saklanan içerikler (belgeler, ekip, değerler)
 * için ortak yönetim sekmesi. İlk alan öğenin başlığıdır.
 */
export default function ListTab({
  data,
  loadData,
  showMessage,
  section,
  title,
  subtitle,
  itemName,
  emptyText,
  fields,
}: ListTabProps) {
  const raw = data.siteContent.find((c) => c.section === section && c.key === "items")?.value;
  const items: Item[] = (() => {
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const [editingIndex, setEditingIndex] = useState<number | null>(null); // -1 = yeni
  const [form, setForm] = useState<Item>({});
  const [saving, setSaving] = useState(false);

  const primary = fields[0].key;
  const secondaryKeys = fields.slice(1).filter((f) => !f.multiline);

  const persist = async (next: Item[], okMessage: string) => {
    setSaving(true);
    try {
      await upsertSiteContent(data.site.id, section, "items", JSON.stringify(next), "json");
      showMessage(okMessage);
      setEditingIndex(null);
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  const openCreate = () => {
    setEditingIndex(-1);
    setForm(Object.fromEntries(fields.map((f) => [f.key, ""])));
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setForm({ ...Object.fromEntries(fields.map((f) => [f.key, ""])), ...items[index] });
  };

  const save = () => {
    const missing = fields.find((f) => f.required && !form[f.key]?.trim());
    if (missing) {
      showMessage(`Hata: ${missing.label} zorunludur`);
      return;
    }
    // Boş alanları saklama
    const clean = Object.fromEntries(
      Object.entries(form)
        .map(([k, v]) => [k, v.trim()])
        .filter(([, v]) => v !== "")
    ) as Item;
    const next = [...items];
    if (editingIndex === -1) next.push(clean);
    else next[editingIndex as number] = clean;
    persist(next, `${itemName} kaydedildi`);
  };

  const remove = (index: number) => {
    if (!confirm(`Bu ${itemName.toLowerCase()} silinsin mi?`)) return;
    persist(items.filter((_, i) => i !== index), `${itemName} silindi`);
  };

  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[index], next[j]] = [next[j], next[index]];
    persist(next, "Sıralama güncellendi");
  };

  return (
    <div className="space-y-5">
      <Section
        title={title}
        subtitle={`${items.length} kayıt · ${subtitle}`}
        actions={
          <BtnPrimary onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni {itemName}
          </BtnPrimary>
        }
      >
        {items.length === 0 ? (
          <Empty title={emptyText} description="Eklediğiniz kayıtlar sitede otomatik olarak görünür." />
        ) : (
          <div className="divide-y divide-surface-100">
            {items.map((item, index) => (
              <div
                key={`${item[primary]}-${index}`}
                className="px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 hover:bg-surface-50/60 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-surface-900 break-words">{item[primary]}</p>
                  <p className="text-xs text-surface-400 mt-0.5 break-words">
                    {secondaryKeys.map((f) => item[f.key]).filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-1 sm:gap-0.5 shrink-0 -mb-1 sm:mb-0 pt-1 sm:pt-0 border-t border-surface-100 sm:border-0">
                  <IconBtnUp onClick={() => move(index, -1)} disabled={index === 0 || saving} />
                  <IconBtnDown onClick={() => move(index, 1)} disabled={index === items.length - 1 || saving} />
                  <IconBtnEdit onClick={() => openEdit(index)} />
                  <IconBtnDelete onClick={() => remove(index)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Modal
        open={editingIndex !== null}
        title={editingIndex === -1 ? `Yeni ${itemName}` : `${itemName} Düzenle`}
        onClose={() => setEditingIndex(null)}
        footer={
          <>
            <BtnSecondary onClick={() => setEditingIndex(null)}>İptal</BtnSecondary>
            <BtnPrimary onClick={save} disabled={saving}>
              {saving ? <Spinner /> : "Kaydet"}
            </BtnPrimary>
          </>
        }
      >
        {fields.map((f) => (
          <div key={f.key}>
            <label className={labelClass}>
              {f.label}
              {f.required && " *"}
            </label>
            {f.multiline ? (
              <textarea
                rows={3}
                value={form[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className={textareaClass}
              />
            ) : (
              <input
                value={form[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className={inputClass}
              />
            )}
          </div>
        ))}
      </Modal>
    </div>
  );
}
