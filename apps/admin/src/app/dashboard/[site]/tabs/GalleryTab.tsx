"use client";

import { useState, useRef } from "react";
import { uploadMediaFormData, deleteMedia, createRecord, deleteRecord, updateRecord } from "../actions";
import type { AdminSiteData } from "../types";
import type { MediaFile } from "@sirnak/shared";
import {
  Section,
  Empty,
  BtnPrimary,
  BtnSecondary,
  BtnDanger,
  FilterTabs,
  Spinner,
  inputClass,
  labelClass,
} from "./kit";

interface GalleryTabProps {
  data: AdminSiteData;
  loadData: () => void;
  showMessage: (msg: string) => void;
}

type TabView = "media" | "gallery";
type MediaFilter = "all" | "image" | "video";
type ViewMode = "grid" | "list";

export default function GalleryTab({ data, loadData, showMessage }: GalleryTabProps) {
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabView>("media");
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [previewItem, setPreviewItem] = useState<{ type: "image" | "video"; url: string } | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);
  const [editName, setEditName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const allMedia = data.mediaFiles ?? [];
  const filteredMedia = allMedia.filter((m) => {
    if (mediaFilter === "image") return m.file_type === "image";
    if (mediaFilter === "video") return m.file_type === "video";
    return true;
  });
  const galleryItems = data.galleryItems ?? [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadMediaFormData(data.site.id, type === "video" ? "video" : "image", formData);
      showMessage(type === "video" ? "Video yüklendi" : "Görsel yüklendi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadMediaFormData(data.site.id, "image", formData);
      await createRecord("gallery_items", {
        site_id: data.site.id,
        title: file.name.replace(/\.[^/.]+$/, ""),
        label: "gallery",
        category: "gallery",
        image_url: result.url,
        published: true,
        sort_order: galleryItems.length + 1,
      });
      showMessage("Galeri görseli eklendi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeMedia = async (media: MediaFile) => {
    if (!confirm(`"${media.name}" dosyasını silmek istediğinize emin misiniz?`)) return;
    try {
      await deleteMedia(media.id, media.storage_path);
      showMessage("Medya silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const removeGalleryItem = async (id: string) => {
    if (!confirm("Bu galeri öğesini silmek istediğinize emin misiniz?")) return;
    try {
      await deleteRecord("gallery_items", id);
      showMessage("Galeri öğesi silindi");
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const removeSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`${selectedIds.size} medyayı silmek istediğinize emin misiniz?`)) return;
    setUploading(true);
    const count = selectedIds.size;
    for (const id of selectedIds) {
      const media = allMedia.find((m) => m.id === id);
      if (media) {
        try { await deleteMedia(media.id, media.storage_path); } catch {}
      }
    }
    setSelectedIds(new Set());
    setIsMultiSelect(false);
    showMessage(`${count} medya silindi`);
    loadData();
    setUploading(false);
  };

  const copyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      showMessage("URL kopyalandı");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showMessage("Kopyalanamadı");
    }
  };

  const saveEditName = async () => {
    if (!editingMedia || !editName.trim()) return;
    try {
      await updateRecord("media_files", editingMedia.id, { name: editName.trim() });
      showMessage("İsim güncellendi");
      setEditingMedia(null);
      loadData();
    } catch (err: any) {
      showMessage("Hata: " + err.message);
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredMedia.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredMedia.map((m) => m.id)));
  };

  const iconClass = "w-4 h-4";

  return (
    <div className="space-y-5">
      {/* Sekme değiştirici */}
      <FilterTabs<TabView>
        value={activeTab}
        onChange={setActiveTab}
        options={[
          { id: "media", label: "Tüm Medya", count: allMedia.length },
          { id: "gallery", label: "Galeri Öğeleri", count: galleryItems.length },
        ]}
      />

      {/* ========== TÜM MEDYA ========== */}
      {activeTab === "media" && (
        <Section
          icon={
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          }
          title="Tüm Medya Dosyaları"
          subtitle="Yüklenen tüm video ve görseller"
          actions={
            <>
              {isMultiSelect && selectedIds.size > 0 && (
                <BtnDanger onClick={removeSelected}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Sil ({selectedIds.size})
                </BtnDanger>
              )}
              <BtnSecondary onClick={() => { setIsMultiSelect(!isMultiSelect); setSelectedIds(new Set()); }}>
                {isMultiSelect ? "İptal" : "Çoklu Seç"}
              </BtnSecondary>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                title={viewMode === "grid" ? "Liste Görünümü" : "Grid Görünümü"}
              >
                {viewMode === "grid" ? (
                  <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                ) : (
                  <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                )}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
              <input ref={videoInputRef} type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "video")} className="hidden" />
              <BtnSecondary onClick={() => videoInputRef.current?.click()} disabled={uploading}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                Video
              </BtnSecondary>
              <BtnPrimary onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Görsel
              </BtnPrimary>
            </>
          }
        >
          {/* Filtre */}
          <div className="px-5 pt-4 flex items-center gap-2 flex-wrap">
            <FilterTabs<MediaFilter>
              value={mediaFilter}
              onChange={setMediaFilter}
              options={[
                { id: "all", label: "Tümü", count: allMedia.length },
                { id: "image", label: "Görseller", count: allMedia.filter((m) => m.file_type === "image").length },
                { id: "video", label: "Videolar", count: allMedia.filter((m) => m.file_type === "video").length },
              ]}
            />
            {isMultiSelect && (
              <button onClick={toggleAll} className="px-3 py-1.5 rounded-md text-xs font-medium text-brand-600 hover:bg-brand-50 transition-colors">
                {selectedIds.size === filteredMedia.length ? "Hiçbirini Seçme" : "Tümünü Seç"}
              </button>
            )}
          </div>

          <div className="p-5">
            {filteredMedia.length > 0 ? (
              viewMode === "grid" ? (
                /* GRID GÖRÜNÜM */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredMedia.map((media) => {
                    const isVideo = media.file_type === "video";
                    const isSelected = selectedIds.has(media.id);
                    return (
                      <div
                        key={media.id}
                        className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${isSelected ? "border-brand-500 ring-2 ring-brand-200" : "border-surface-200 hover:border-surface-300"}`}
                        onClick={() => isMultiSelect ? toggleSelect(media.id) : undefined}
                      >
                        {isMultiSelect && (
                          <div className={`absolute top-2 left-2 z-10 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? "bg-brand-600 border-brand-600" : "bg-white/80 border-surface-300"}`}>
                            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                          </div>
                        )}
                        {isVideo ? (
                          <div className="relative">
                            <video src={media.public_url} className="w-full h-32 object-cover" muted preload="metadata" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                                <svg className="w-4 h-4 text-surface-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img src={media.public_url} alt={media.name} className="w-full h-32 object-cover" />
                        )}
                        {!isMultiSelect && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                            <button onClick={(e) => { e.stopPropagation(); setPreviewItem({ type: isVideo ? "video" : "image", url: media.public_url }); }} className="p-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30 backdrop-blur-sm" title="Ön İzleme">
                              <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); copyUrl(media.public_url, media.id); }} className={`p-1.5 text-white rounded-lg backdrop-blur-sm transition-colors ${copiedId === media.id ? "bg-brand-500/80" : "bg-white/20 hover:bg-white/30"}`} title="URL Kopyala">
                              {copiedId === media.id ? (
                                <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              ) : (
                                <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                              )}
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setEditingMedia(media); setEditName(media.name); }} className="p-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30 backdrop-blur-sm" title="Düzenle">
                              <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); removeMedia(media); }} className="p-1.5 bg-white/20 text-white rounded-lg hover:bg-danger-500/80 backdrop-blur-sm" title="Sil">
                              <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                            </button>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-[10px] text-white truncate">{media.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`px-1 py-0.5 rounded text-[8px] font-semibold ${isVideo ? "bg-accent-500/80 text-white" : "bg-brand-500/80 text-white"}`}>{isVideo ? "VIDEO" : "GÖRSEL"}</span>
                            <span className="text-[9px] text-white/60">{media.size_bytes ? formatSize(media.size_bytes) : ""}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* LİSTE GÖRÜNÜMÜ */
                <div className="border border-surface-200 rounded-xl overflow-hidden">
                  <div className="bg-surface-50 px-4 py-2 grid grid-cols-[1fr_120px_100px_80px] gap-3 text-[10px] font-semibold text-surface-500 uppercase tracking-wider border-b border-surface-200">
                    <span>Dosya</span>
                    <span>URL</span>
                    <span>Tür</span>
                    <span className="text-right">İşlem</span>
                  </div>
                  {filteredMedia.map((media) => {
                    const isVideo = media.file_type === "video";
                    const isSelected = selectedIds.has(media.id);
                    return (
                      <div key={media.id} className={`px-4 py-2.5 grid grid-cols-[1fr_120px_100px_80px] gap-3 items-center border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors ${isSelected ? "bg-brand-50" : ""}`}>
                        <div className="flex items-center gap-3 min-w-0">
                          {isMultiSelect && (
                            <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(media.id)} className="w-4 h-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500" />
                          )}
                          {isVideo ? (
                            <div className="w-10 h-10 rounded-lg bg-surface-200 flex items-center justify-center shrink-0 overflow-hidden">
                              <video src={media.public_url} className="w-full h-full object-cover" muted />
                            </div>
                          ) : (
                            <img src={media.public_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-surface-900 truncate">{media.name}</p>
                            <p className="text-[10px] text-surface-400">{media.size_bytes ? formatSize(media.size_bytes) : ""}</p>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <button onClick={() => copyUrl(media.public_url, media.id)} className={`text-[10px] font-medium truncate block max-w-full transition-colors ${copiedId === media.id ? "text-brand-600" : "text-brand-600 hover:text-brand-700"}`}>
                            {copiedId === media.id ? "Kopyalandı!" : "URL Kopyala"}
                          </button>
                        </div>
                        <div>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${isVideo ? "bg-accent-50 text-accent-700" : "bg-brand-50 text-brand-700"}`}>{isVideo ? "Video" : "Görsel"}</span>
                        </div>
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setPreviewItem({ type: isVideo ? "video" : "image", url: media.public_url })} className="p-1 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded transition-colors" title="Ön İzleme">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </button>
                          <button onClick={() => removeMedia(media)} className="p-1 text-surface-400 hover:text-danger-500 hover:bg-danger-50 rounded transition-colors" title="Sil">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="text-center py-12 border border-dashed border-surface-300 rounded-xl">
                <svg className="w-10 h-10 text-surface-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                <p className="text-sm text-surface-500 font-medium">Henüz medya yüklenmemiş</p>
                <p className="text-xs text-surface-400 mt-1">Görsel veya video yükleyerek başlayın</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ========== GALERİ ÖĞELERİ ========== */}
      {activeTab === "gallery" && (
        <Section
          icon={
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          }
          title="Galeri Öğeleri"
          subtitle="Sitede galeri bölümünde görünen görseller"
          actions={
            <label className="inline-flex items-center gap-1.5 bg-brand-600 text-white rounded-lg px-4 h-9 text-xs font-semibold hover:bg-brand-700 transition-all active:scale-[0.98] cursor-pointer shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Görsel Ekle
              <input type="file" accept="image/*" onChange={handleGalleryImageUpload} className="hidden" />
            </label>
          }
        >
          <div className="p-5">
            {galleryItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {galleryItems.map((item) => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden border border-surface-200">
                    <img src={item.image_url ?? "/images/placeholder.svg"} alt={item.title} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      <button onClick={() => item.image_url && setPreviewItem({ type: "image", url: item.image_url })} className="p-1.5 bg-white/20 text-white rounded-lg hover:bg-white/30 backdrop-blur-sm" title="Ön İzleme">
                        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </button>
                      <button onClick={() => item.image_url && copyUrl(item.image_url, item.id)} className={`p-1.5 text-white rounded-lg backdrop-blur-sm transition-colors ${copiedId === item.id ? "bg-brand-500/80" : "bg-white/20 hover:bg-white/30"}`} title="URL Kopyala">
                        {copiedId === item.id ? <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>}
                      </button>
                      <button onClick={() => removeGalleryItem(item.id)} className="p-1.5 bg-white/20 text-white rounded-lg hover:bg-danger-500/80 backdrop-blur-sm" title="Sil">
                        <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-[10px] text-white truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-surface-300 rounded-xl">
                <svg className="w-10 h-10 text-surface-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>
                <p className="text-sm text-surface-500 font-medium">Henüz galeri öğesi yok</p>
                <p className="text-xs text-surface-400 mt-1">Görsel ekleyerek başlayın</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ========== Düzenleme Modalı ========== */}
      {editingMedia && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-surface-950/40 backdrop-blur-sm animate-fadeIn" onClick={() => setEditingMedia(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-surface-200 w-full max-w-lg animate-scaleIn">
              <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-surface-900">Medya Düzenle</h3>
                <button onClick={() => setEditingMedia(null)} className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg">
                  <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className={labelClass}>Dosya Adı</label>
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} className={inputClass} onKeyDown={(e) => e.key === "Enter" && saveEditName()} />
                </div>
                <div>
                  <label className={labelClass}>URL</label>
                  <div className="flex items-center gap-2">
                    <input readOnly value={editingMedia.public_url} className="h-10 flex-1 px-3 bg-surface-50 border border-surface-200 rounded-lg text-xs text-surface-600 font-mono" />
                    <button onClick={() => copyUrl(editingMedia.public_url, editingMedia.id)} className={`shrink-0 h-10 px-3 rounded-lg text-xs font-medium transition-all ${copiedId === editingMedia.id ? "bg-brand-50 text-brand-700" : "bg-surface-100 text-surface-700 hover:bg-surface-200"}`}>
                      {copiedId === editingMedia.id ? "Kopyalandı!" : "Kopyala"}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-surface-50 rounded-lg p-3">
                    <p className="text-surface-400 mb-0.5">Tür</p>
                    <p className="font-medium text-surface-700">{editingMedia.file_type === "video" ? "Video" : "Görsel"}</p>
                  </div>
                  <div className="bg-surface-50 rounded-lg p-3">
                    <p className="text-surface-400 mb-0.5">Boyut</p>
                    <p className="font-medium text-surface-700">{editingMedia.size_bytes ? formatSize(editingMedia.size_bytes) : "Bilinmiyor"}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-surface-100 flex justify-end gap-2 bg-surface-50/50 rounded-b-2xl">
                <BtnSecondary onClick={() => setEditingMedia(null)}>İptal</BtnSecondary>
                <BtnPrimary onClick={saveEditName}>Kaydet</BtnPrimary>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== Ön İzleme Modalı ========== */}
      {previewItem && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm animate-fadeIn" onClick={() => setPreviewItem(null)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-surface-200 w-full max-w-4xl animate-scaleIn overflow-hidden">
              <div className="px-5 py-3.5 border-b border-surface-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-surface-900">Ön İzleme</h3>
                <div className="flex items-center gap-2">
                  <BtnSecondary onClick={() => copyUrl(previewItem.url, "preview")}>
                    {copiedId === "preview" ? "Kopyalandı!" : "URL Kopyala"}
                  </BtnSecondary>
                  <button onClick={() => setPreviewItem(null)} className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg">
                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-5">
                {previewItem.type === "video" ? (
                  <video src={previewItem.url} controls autoPlay className="w-full rounded-lg max-h-[70vh]" />
                ) : (
                  <img src={previewItem.url} alt="Ön İzleme" className="w-full rounded-lg object-contain max-h-[70vh]" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Yükleme göstergesi */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-surface-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 z-50">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="text-xs font-medium">Yükleniyor...</span>
        </div>
      )}
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
