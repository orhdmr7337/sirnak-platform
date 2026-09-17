"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

function adminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase service role credentials");
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

async function getUserRole(userId: string): Promise<string> {
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", userId)
    .single();
  if (error || !data) return "viewer";
  return data.role;
}

async function requireRole(allowedRoles: string[]): Promise<void> {
  const supabase = adminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Giriş yapmanız gerekiyor");
  const role = await getUserRole(user.id);
  if (!allowedRoles.includes(role)) {
    throw new Error("Bu işlem için yetkiniz yok");
  }
}

function assertTable(table: string) {
  const ALLOWED = new Set([
    "services",
    "districts",
    "faqs",
    "process_steps",
    "testimonials",
    "gallery_items",
    "trust_items",
    "service_finder_options",
    "social_links",
    "nav_links",
    "site_content",
    "media_files",
    "contact_submissions",
    "instagram_posts",
    "blog_posts",
  ]);
  if (!ALLOWED.has(table)) {
    throw new Error(`Table "${table}" is not allowed`);
  }
}

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export async function updateRecord(
  table: string,
  id: string,
  data: Record<string, unknown>
) {
  assertTable(table);
  if (!id || typeof id !== "string") throw new Error("Invalid id");
  await requireRole(["admin", "editor"]);
  const supabase = adminClient();
  const { error } = await supabase.from(table).update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function createRecord(
  table: string,
  data: Record<string, unknown>
) {
  assertTable(table);
  await requireRole(["admin", "editor"]);
  const supabase = adminClient();
  const { error } = await supabase.from(table).insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function deleteRecord(table: string, id: string) {
  assertTable(table);
  if (!id || typeof id !== "string") throw new Error("Invalid id");
  await requireRole(["admin"]);
  const supabase = adminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function updateSiteSettings(
  siteId: string,
  data: Record<string, unknown>
) {
  if (!siteId || typeof siteId !== "string") throw new Error("Invalid siteId");
  const supabase = adminClient();
  const { error } = await supabase.from("sites").update(data).eq("id", siteId);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function upsertSiteContent(
  siteId: string,
  section: string,
  key: string,
  value: string,
  valueType = "text"
) {
  if (!siteId || typeof siteId !== "string") throw new Error("Invalid siteId");
  if (!section || section.length > 100) throw new Error("Invalid section");
  if (!key || key.length > 100) throw new Error("Invalid key");
  const supabase = adminClient();
  const { error } = await supabase.from("site_content").upsert(
    {
      site_id: siteId,
      section,
      key,
      value,
      value_type: valueType,
    },
    { onConflict: "site_id,section,key" }
  );
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function uploadMedia(
  siteId: string,
  fileType: "video" | "image" | "logo" | "favicon" | "poster",
  fileName: string,
  base64Data: string,
  mimeType: string
) {
  if (!siteId || typeof siteId !== "string") throw new Error("Invalid siteId");

  const base64 = base64Data.split(",")[1];
  if (!base64) throw new Error("Invalid base64 data");
  const buffer = Buffer.from(base64, "base64");

  if (buffer.length > MAX_UPLOAD_BYTES) {
    throw new Error(`File size exceeds ${MAX_UPLOAD_BYTES / 1024 / 1024}MB limit`);
  }

  const safeName = sanitizeFileName(fileName);
  const supabase = adminClient();
  const path = `${siteId}/${fileType}/${Date.now()}_${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, buffer, {
      contentType: mimeType,
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  const { error: dbError } = await supabase.from("media_files").insert({
    site_id: siteId,
    name: safeName,
    file_type: fileType,
    storage_path: path,
    public_url: publicUrl,
    mime_type: mimeType,
    size_bytes: buffer.length,
  });

  if (dbError) {
    await supabase.storage.from("media").remove([path]).catch(() => {});
    throw new Error(dbError.message);
  }

  revalidatePath("/dashboard/[site]", "page");
  return { success: true, url: publicUrl };
}

export async function uploadMediaFormData(
  siteId: string,
  fileType: "video" | "image" | "logo" | "favicon" | "poster",
  formData: FormData
) {
  if (!siteId || typeof siteId !== "string") throw new Error("Invalid siteId");

  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided");

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`File size exceeds ${MAX_UPLOAD_BYTES / 1024 / 1024}MB limit`);
  }

  const safeName = sanitizeFileName(file.name);
  const supabase = adminClient();
  const path = `${siteId}/${fileType}/${Date.now()}_${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  const { error: dbError } = await supabase.from("media_files").insert({
    site_id: siteId,
    name: safeName,
    file_type: fileType,
    storage_path: path,
    public_url: publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
  });

  if (dbError) {
    await supabase.storage.from("media").remove([path]).catch(() => {});
    throw new Error(dbError.message);
  }

  revalidatePath("/dashboard/[site]", "page");
  return { success: true, url: publicUrl };
}

export async function deleteMedia(id: string, storagePath: string) {
  if (!id || typeof id !== "string") throw new Error("Invalid id");

  const supabase = adminClient();

  if (storagePath && typeof storagePath === "string") {
    await supabase.storage.from("media").remove([storagePath]).catch((err) => {
      console.warn("Storage delete warning:", err.message);
    });
  }

  const { error } = await supabase.from("media_files").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function approveTestimonial(id: string, approved: boolean) {
  if (!id || typeof id !== "string") throw new Error("Invalid id");
  if (typeof approved !== "boolean") throw new Error("Invalid approved value");
  const supabase = adminClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ approved })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}

export async function updateContactStatus(
  id: string,
  status: "new" | "contacted" | "completed"
) {
  if (!id || typeof id !== "string") throw new Error("Invalid id");
  if (!["new", "contacted", "completed"].includes(status)) throw new Error("Invalid status");
  const supabase = adminClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/[site]", "page");
  return { success: true };
}
