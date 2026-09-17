"use client";

import { useState } from "react";
import { createRecord, updateRecord, deleteRecord } from "../actions";
import type { AdminSiteData } from "../types";
import type { BlogPost } from "@sirnak/shared";
import {
  Section,
  Modal,
  Empty,
  BtnPrimary,
  BtnSecondary,
  IconBtnEdit,
  IconBtnDelete,
  PublishBadge,
  PublishedToggle,
  Spinner,
  inputClass,
  textareaClass,
  labelClass,
} from "./kit";

interface BlogTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

export default function BlogTab({ data, loadData, showMessage }: BlogTabProps) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});
  const [saving, setSaving] = useState(false);

  const posts = data.blogPosts ?? [];

  const openCreate = () => {
    setEditing({ id: "new" } as BlogPost);
    setForm({ site_id: data.site.id, published: true, title: "", slug: "", excerpt: "", district: "", content: "" });
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({ ...post });
  };

  const save = async () => {
    if (!form.title?.trim()) {
      showMessage("Hata: Başlık zorunludur");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.slug?.trim() && payload.title) {
        payload.slug = payload.title
          .toLowerCase()
          .replaceAll("ı", "i").replaceAll("ş", "s").replaceAll("ç", "c")
          .replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ö", "o")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      if (editing?.id === "new") {
        await createRecord("blog_posts", payload);
      } else {
        await updateRecord("blog_posts", editing!.id, payload);
      }
      showMessage("Blog yazısı kaydedildi");
      setEditing(null);
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;
    try {
      await deleteRecord("blog_posts", id);
      showMessage("Blog yazısı silindi");
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
          </svg>
        }
        title="Blog Yazıları"
        subtitle={`${posts.length} yazı mevcut`}
        actions={
          <BtnPrimary onClick={openCreate}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Yeni Yazı
          </BtnPrimary>
        }
      >
        {posts.length === 0 ? (
          <Empty
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
              </svg>
            }
            title="Henüz blog yazısı eklenmemiş"
            description="İlk yazıyı eklemek için sağ üstteki butonu kullanın."
          />
        ) : (
          <div className="divide-y divide-surface-100">
            {posts.map((post, index) => (
              <div key={post.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-surface-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center shrink-0 text-xs font-semibold text-surface-500">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-surface-900 truncate">{post.title}</p>
                      <PublishBadge published={post.published} />
                    </div>
                    <p className="text-xs text-surface-400 truncate line-clamp-1 mt-0.5">
                      {post.excerpt ?? `/${post.slug}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <IconBtnEdit onClick={() => openEdit(post)} />
                  <IconBtnDelete onClick={() => remove(post.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Modal
        open={!!editing}
        title={editing?.id === "new" ? "Yeni Blog Yazısı" : "Blog Yazısını Düzenle"}
        onClose={() => setEditing(null)}
        maxWidth="max-w-2xl"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Başlık *</label>
            <input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input value={form.slug ?? ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} placeholder="Boş bırakılırsa başlıktan üretilir" />
          </div>
          <div>
            <label className={labelClass}>İlçe</label>
            <input value={form.district ?? ""} onChange={(e) => setForm({ ...form, district: e.target.value })} className={inputClass} placeholder="ör. merkez" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Özet</label>
            <input value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <label className={labelClass}>İçerik</label>
              <span className="text-[10px] text-surface-400 mb-1.5">{(form.content ?? "").length} karakter</span>
            </div>
            <textarea
              value={form.content ?? ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10}
              className={textareaClass}
            />
          </div>
        </div>
        <PublishedToggle checked={form.published ?? false} onChange={(v) => setForm({ ...form, published: v })} />
      </Modal>
    </div>
  );
}
