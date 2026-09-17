"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { createAdminClient } from "@/lib/supabase-client";
import {
  PublicSiteData,
  Service,
  Faq,
  ProcessStep,
  TrustItem,
  GalleryItem,
  Testimonial,
  ContactSubmission,
  MediaFile,
  SiteContent,
  BlogPost,
  contentBySection,
} from "@sirnak/shared";
import { updateSiteSettings, upsertSiteContent } from "./actions";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import GeneralTab from "./tabs/GeneralTab";
import ServicesTab from "./tabs/ServicesTab";
import GalleryTab from "./tabs/GalleryTab";
import FaqsTab from "./tabs/FaqsTab";
import ProcessTab from "./tabs/ProcessTab";
import TrustTab from "./tabs/TrustTab";
import TestimonialsTab from "./tabs/TestimonialsTab";
import MessagesTab from "./tabs/MessagesTab";
import InstagramTab from "./InstagramTab";
import BlogTab from "./tabs/BlogTab";
import type { AdminSiteData } from "./types";

type Tab =
  | "general"
  | "services"
  | "gallery"
  | "faqs"
  | "process"
  | "trust"
  | "testimonials"
  | "messages"
  | "instagram"
  | "blog";

const tabConfig: { id: Tab; label: string; icon: string }[] = [
  { id: "general", label: "Genel", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "services", label: "Hizmetler", icon: "M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" },
  { id: "gallery", label: "Galeri", icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" },
  { id: "faqs", label: "SSS", icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" },
  { id: "process", label: "Süreç", icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" },
  { id: "trust", label: "Güven", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { id: "testimonials", label: "Yorumlar", icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" },
  { id: "messages", label: "Mesajlar", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
  { id: "instagram", label: "Instagram", icon: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" },
  { id: "blog", label: "Blog", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" },
];

export default function SiteDashboardPage() {
  const params = useParams();
  const siteSlug = params.site as string;
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AdminSiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!authLoading && !user) {
      router.replace("/login");
      return;
    }
    if (user) loadData();
  }, [user, authLoading, router, siteSlug]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createAdminClient();
      const { data: siteData, error } = await supabase
        .from("sites")
        .select("*")
        .eq("slug", siteSlug)
        .single();

      if (error || !siteData) {
        setLoading(false);
        return;
      }

      const siteId = siteData.id;
      const [
        services, faqs, processSteps, trustItems,
        galleryItems, testimonials, contactSubmissions,
        mediaFiles, siteContent, blogPosts,
      ] = await Promise.all([
        supabase.from("services").select("*").eq("site_id", siteId).order("sort_order"),
        supabase.from("faqs").select("*").eq("site_id", siteId).order("sort_order"),
        supabase.from("process_steps").select("*").eq("site_id", siteId).order("sort_order"),
        supabase.from("trust_items").select("*").eq("site_id", siteId).order("sort_order"),
        supabase.from("gallery_items").select("*").eq("site_id", siteId).order("sort_order"),
        supabase.from("testimonials").select("*").eq("site_id", siteId).order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").eq("site_id", siteId).order("created_at", { ascending: false }),
        supabase.from("media_files").select("*").eq("site_id", siteId).order("created_at", { ascending: false }),
        supabase.from("site_content").select("*").eq("site_id", siteId),
        supabase.from("blog_posts").select("*").eq("site_id", siteId).order("created_at", { ascending: false }),
      ]);

      setData({
        site: siteData as PublicSiteData["site"],
        socialLinks: [],
        services: (services.data ?? []) as Service[],
        districts: [],
        testimonials: (testimonials.data ?? []) as Testimonial[],
        faqs: (faqs.data ?? []) as Faq[],
        processSteps: (processSteps.data ?? []) as ProcessStep[],
        trustItems: (trustItems.data ?? []) as TrustItem[],
        galleryItems: (galleryItems.data ?? []) as GalleryItem[],
        serviceFinderOptions: [],
        siteContent: (siteContent.data ?? []) as SiteContent[],
        mediaFiles: (mediaFiles.data ?? []) as MediaFile[],
        navLinks: [],
        contactSubmissions: (contactSubmissions.data ?? []) as ContactSubmission[],
        blogPosts: (blogPosts.data ?? []) as BlogPost[],
      });
    } catch (err) {
      console.error("loadData error:", err);
    }
    setLoading(false);
  }, [siteSlug]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSaveSiteSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      await updateSiteSettings(data.site.id, {
        name: form.get("name"),
        tagline: form.get("tagline"),
        slogan: form.get("slogan"),
        phone: form.get("phone"),
        whatsapp: form.get("whatsapp"),
        address: form.get("address"),
        working_hours: form.get("working_hours"),
        instagram_username: form.get("instagram_username"),
        meta_title: form.get("meta_title"),
        meta_description: form.get("meta_description"),
        primary_color: form.get("primary_color"),
        secondary_color: form.get("secondary_color"),
      });
      showMessage("Ayarlar kaydedildi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  const handleSaveContent = async (section: string, key: string, value: string) => {
    if (!data) return;
    setSaving(true);
    try {
      await upsertSiteContent(data.site.id, section, key, value, "text");
      showMessage("İçerik kaydedildi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center animate-pulse-soft">
            <span className="text-sm font-bold text-white">Ş</span>
          </div>
          <div className="flex items-center gap-2 text-surface-400">
            <div className="w-4 h-4 border-2 border-surface-200 border-t-brand-600 rounded-full animate-spin" />
            <span className="text-xs">Yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !data) return null;

  const content = contentBySection(data.siteContent);
  const messageCount = data.contactSubmissions?.length ?? 0;

  const tabsWithBadge = tabConfig.map((t) => ({
    ...t,
    badge: t.id === "messages" ? messageCount : undefined,
  }));

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <Sidebar
        siteName={data.site.name}
        tabs={tabsWithBadge}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as Tab)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header
          siteName={data.site.name}
          siteSlug={siteSlug}
          message={message}
          onSignOut={signOut}
        />

        <main className="flex-1 p-4 lg:p-6">
          <div
            className={`max-w-5xl mx-auto transition-all duration-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {activeTab === "general" && (
              <GeneralTab
                data={data}
                content={content}
                onSaveSiteSettings={handleSaveSiteSettings}
                onSaveContent={handleSaveContent}
                saving={saving}
              />
            )}
            {activeTab === "services" && (
              <ServicesTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "gallery" && (
              <GalleryTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "faqs" && (
              <FaqsTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "process" && (
              <ProcessTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "trust" && (
              <TrustTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "testimonials" && (
              <TestimonialsTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "messages" && (
              <MessagesTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "instagram" && (
              <InstagramTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
            {activeTab === "blog" && (
              <BlogTab data={data} loadData={loadData} showMessage={showMessage} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
