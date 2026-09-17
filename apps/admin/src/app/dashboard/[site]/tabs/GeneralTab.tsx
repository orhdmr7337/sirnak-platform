"use client";

import { useEffect, useState } from "react";
import type { AdminSiteData } from "../types";
import {
  Section,
  BtnPrimary,
  Spinner,
  inputClass,
  textareaClass,
  labelClass,
} from "./kit";

interface GeneralTabProps {
  data: AdminSiteData;
  content: Record<string, Record<string, string>>;
  onSaveSiteSettings: (e: React.FormEvent<HTMLFormElement>) => void;
  onSaveContent: (section: string, key: string, value: string) => void;
  saving: boolean;
}

export default function GeneralTab({
  data,
  content,
  onSaveSiteSettings,
  onSaveContent,
  saving,
}: GeneralTabProps) {
  const [heroForm, setHeroForm] = useState({
    badge: content.hero?.badge ?? "",
    title_line1: content.hero?.title_line1 ?? "",
    title_line2: content.hero?.title_line2 ?? "",
    description: content.hero?.description ?? "",
    slogan: content.hero?.slogan ?? "",
  });

  const [aboutForm, setAboutForm] = useState({
    title: content.about?.title ?? "",
    paragraph1: content.about?.paragraph1 ?? "",
    paragraph2: content.about?.paragraph2 ?? "",
  });

  // content prop'u değiştiğinde (kayıt + yeniden yükleme sonrası) formları senkronize et
  useEffect(() => {
    setHeroForm({
      badge: content.hero?.badge ?? "",
      title_line1: content.hero?.title_line1 ?? "",
      title_line2: content.hero?.title_line2 ?? "",
      description: content.hero?.description ?? "",
      slogan: content.hero?.slogan ?? "",
    });
    setAboutForm({
      title: content.about?.title ?? "",
      paragraph1: content.about?.paragraph1 ?? "",
      paragraph2: content.about?.paragraph2 ?? "",
    });
  }, [content.hero, content.about]);

  const saveBtn = (
    label: string
  ) => (
    <BtnPrimary type="submit" disabled={saving}>
      {saving ? <Spinner /> : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      )}
      {label}
    </BtnPrimary>
  );

  return (
    <div className="space-y-5">
      {/* Site Ayarları */}
      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
        title="Site Ayarları"
        subtitle="Temel site bilgilerini düzenleyin"
      >
        <form onSubmit={onSaveSiteSettings} className="p-5 grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Site Adı</label>
            <input name="name" defaultValue={data.site.name} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tagline</label>
            <input name="tagline" defaultValue={data.site.tagline ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slogan</label>
            <input name="slogan" defaultValue={data.site.slogan ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Telefon</label>
            <input name="phone" defaultValue={data.site.phone ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input name="whatsapp" defaultValue={data.site.whatsapp ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Adres</label>
            <input name="address" defaultValue={data.site.address ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Çalışma Saatleri</label>
            <input name="working_hours" defaultValue={data.site.working_hours ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Instagram Kullanıcı Adı</label>
            <input name="instagram_username" defaultValue={data.site.instagram_username ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Meta Başlık</label>
            <input name="meta_title" defaultValue={data.site.meta_title ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Meta Açıklama</label>
            <input name="meta_description" defaultValue={data.site.meta_description ?? ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ana Renk</label>
            <div className="flex items-center gap-2">
              <input name="primary_color" type="color" defaultValue={data.site.primary_color ?? "#1c1917"} className="h-10 w-14 rounded-lg cursor-pointer border border-surface-200 p-1 bg-white" />
              <span className="text-xs text-surface-400 font-mono">{data.site.primary_color ?? "#1c1917"}</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>İkincil Renk</label>
            <div className="flex items-center gap-2">
              <input name="secondary_color" type="color" defaultValue={data.site.secondary_color ?? "#0ea5e9"} className="h-10 w-14 rounded-lg cursor-pointer border border-surface-200 p-1 bg-white" />
              <span className="text-xs text-surface-400 font-mono">{data.site.secondary_color ?? "#0ea5e9"}</span>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end pt-2 border-t border-surface-100">
            {saveBtn("Ayarları Kaydet")}
          </div>
        </form>
      </Section>

      {/* Hero Bölümü */}
      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        }
        title="Hero Bölümü"
        subtitle="Ana sayfa giriş bölümünü düzenleyin"
      >
        <div className="p-5 grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Rozet</label>
            <input value={heroForm.badge} onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Başlık Satır 1</label>
            <input value={heroForm.title_line1} onChange={(e) => setHeroForm({ ...heroForm, title_line1: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Başlık Satır 2</label>
            <input value={heroForm.title_line2} onChange={(e) => setHeroForm({ ...heroForm, title_line2: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slogan</label>
            <input value={heroForm.slogan} onChange={(e) => setHeroForm({ ...heroForm, slogan: e.target.value })} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Açıklama</label>
            <textarea
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              rows={3}
              className={textareaClass}
            />
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-surface-100 flex justify-end bg-surface-50/50">
          <BtnPrimary
            onClick={() => Object.entries(heroForm).forEach(([key, value]) => onSaveContent("hero", key, value))}
            disabled={saving}
          >
            {saving && <Spinner />}
            Hero&apos;yu Kaydet
          </BtnPrimary>
        </div>
      </Section>

      {/* Hakkımızda */}
      <Section
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        }
        title="Hakkımızda"
        subtitle="Hakkımızda bölümünü düzenleyin"
      >
        <div className="p-5 space-y-4">
          <div>
            <label className={labelClass}>Başlık</label>
            <input value={aboutForm.title} onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Paragraf 1</label>
            <textarea
              value={aboutForm.paragraph1}
              onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
              rows={3}
              className={textareaClass}
            />
          </div>
          <div>
            <label className={labelClass}>Paragraf 2</label>
            <textarea
              value={aboutForm.paragraph2}
              onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
              rows={3}
              className={textareaClass}
            />
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-surface-100 flex justify-end bg-surface-50/50">
          <BtnPrimary
            onClick={() => Object.entries(aboutForm).forEach(([key, value]) => onSaveContent("about", key, value))}
            disabled={saving}
          >
            {saving && <Spinner />}
            Hakkımızda&apos;yı Kaydet
          </BtnPrimary>
        </div>
      </Section>
    </div>
  );
}
