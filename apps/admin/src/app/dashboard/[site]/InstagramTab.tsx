"use client";

import { useState } from "react";
import { createRecord } from "./actions";
import type { AdminSiteData } from "./types";
import {
  Section,
  BtnPrimary,
  textareaClass,
  inputClass,
  labelClass,
} from "./tabs/kit";

export default function InstagramTab({
  data,
  loadData,
  showMessage,
}: {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const posts = data.mediaFiles
    .filter((m) => m.file_type === "image")
    .map((m) => ({ id: m.id, url: m.public_url, name: m.name }));

  const queuePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setSaving(true);
    try {
      await createRecord("instagram_posts", {
        site_id: data.site.id,
        caption,
        image_url: imageUrl,
        media_type: "IMAGE",
        status: "draft",
      });
      showMessage("Gönderi kuyruğa eklendi");
      setCaption("");
      setImageUrl("");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-5">
      <Section
        icon={
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          </svg>
        }
        title="Instagram Kuyruğu"
        subtitle="Gönderileri burada hazırlayın"
      >
        <div className="p-5 grid md:grid-cols-[1fr_220px] gap-5">
          <form onSubmit={queuePost} className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className={labelClass}>Açıklama</label>
                <span className={`text-[10px] ${caption.length > 2200 ? "text-danger-500" : "text-surface-400"}`}>
                  {caption.length}/2200
                </span>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={5}
                maxLength={2200}
                className={textareaClass}
                placeholder="Instagram gönderi metni..."
              />
            </div>
            <div>
              <label className={labelClass}>Görsel URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div className="flex justify-end">
              <BtnPrimary type="submit" disabled={saving || !imageUrl.trim()}>
                {saving && (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                Kuyruğa Ekle
              </BtnPrimary>
            </div>
          </form>

          {/* Canlı önizleme */}
          <div>
            <p className="text-xs font-medium text-surface-500 mb-1.5">Önizleme</p>
            <div className="border border-surface-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-surface-100">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-900">
                    {data.site.instagram_username || data.site.name}
                  </p>
                  <p className="text-[10px] text-surface-400">Instagram</p>
                </div>
              </div>
              {imageUrl ? (
                <img src={imageUrl} alt="Önizleme" className="w-full aspect-square object-cover" />
              ) : (
                <div className="w-full aspect-square bg-surface-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-surface-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}
              {caption && (
                <p className="px-3 py-2.5 text-xs text-surface-600 line-clamp-4 whitespace-pre-wrap">
                  <span className="font-semibold text-surface-900">
                    {data.site.instagram_username || data.site.name}{" "}
                  </span>
                  {caption}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        }
        title="Yüklenen Görseller"
        subtitle="Galeri & Medya sekmesinden yükledikleriniz"
      >
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setImageUrl(post.url)}
                className={`relative group text-left rounded-xl overflow-hidden border-2 transition-all ${
                  imageUrl === post.url
                    ? "border-brand-500 ring-2 ring-brand-200"
                    : "border-surface-200 hover:border-surface-300"
                }`}
              >
                <img src={post.url} alt={post.name} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Seç</span>
                </div>
              </button>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-xs text-surface-400 py-8 text-center">
              Henüz yüklenen görsel yok. Galeri & Medya sekmesinden yükleyin.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
