"use client";

import { createAdminClient } from "./supabase-client";

export type MediaKind = "video" | "image" | "logo" | "favicon" | "poster";

const MAX_BYTES = 50 * 1024 * 1024;
const MAX_IMAGE_SIDE = 1920;

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

/**
 * Büyük fotoğrafları (telefon kamerası 3-8 MB) yüklemeden önce en uzun kenarı 1920 px olacak
 * şekilde WebP'ye çevirir. SVG, GIF ve zaten küçük görseller olduğu gibi bırakılır.
 */
async function shrinkImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || /svg|gif|icon/.test(file.type) || file.size < 400 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

/**
 * Dosyayı tarayıcıdan doğrudan Supabase Storage'a yükler ve media_files kaydını oluşturur.
 * Sunucu eylemi üzerinden yüklemek Next.js (1 MB) ve Netlify (~6 MB) gövde sınırlarına takılıyordu.
 * Yetki, depo ve tablo RLS politikalarıyla (is_site_editor) sağlanır.
 */
export async function uploadMediaDirect(siteId: string, kind: MediaKind, original: File) {
  const file = kind === "image" || kind === "poster" ? await shrinkImage(original) : original;
  if (file.size > MAX_BYTES) throw new Error(`Dosya ${MAX_BYTES / 1024 / 1024} MB sınırını aşıyor`);

  const supabase = createAdminClient();
  const name = safeName(file.name);
  const path = `${siteId}/${kind}/${Date.now()}_${name}`;

  const { error: upErr } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (upErr) throw new Error(upErr.message);

  const publicUrl = supabase.storage.from("media").getPublicUrl(path).data.publicUrl;

  const { error: dbErr } = await supabase.from("media_files").insert({
    site_id: siteId,
    name,
    file_type: kind,
    storage_path: path,
    public_url: publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
  });
  if (dbErr) {
    await supabase.storage.from("media").remove([path]);
    throw new Error(dbErr.message);
  }
  return { url: publicUrl, path };
}
