import type { Site } from "./supabase";

/** Yalnızca rakamlar: "+90 544 216 70 09" -> "905442167009" */
export function phoneDigits(phone?: string | null): string {
  return (phone ?? "").replace(/\D/g, "");
}

/** tel: bağlantısı. Telefon yoksa null döner (çağıran butonu gizlemeli). */
export function telHref(site?: Pick<Site, "phone"> | null): string | null {
  const d = phoneDigits(site?.phone);
  return d ? `tel:+${d}` : null;
}

/** wa.me bağlantısı (whatsapp, yoksa phone). Numara yoksa null. */
export function whatsappHref(
  site?: Pick<Site, "whatsapp" | "phone"> | null,
  text?: string
): string | null {
  const d = phoneDigits(site?.whatsapp || site?.phone);
  if (!d) return null;
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/**
 * Sitenin yayın adresi. Öncelik: NEXT_PUBLIC_SITE_URL (dağıtıma özel),
 * sonra veritabanındaki `sites.domain`. Hiçbiri yoksa null.
 */
export function siteBaseUrl(site?: Pick<Site, "domain"> | null): string | null {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const raw = env || site?.domain?.trim();
  if (!raw) return null;
  const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return url.replace(/\/+$/, "");
}

/**
 * site_content içinde JSON olarak saklanan liste değerini okur.
 * Örn. section "certificates", key "items". Bozuk/eksik veri -> [].
 */
export function contentList<T>(
  content: Record<string, Record<string, string>> | undefined,
  section: string,
  key = "items"
): T[] {
  const raw = content?.[section]?.[key];
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

/** Belgeler / ekip / değerler için ortak öğe tipleri (site_content JSON). */
export interface CertificateItem {
  title: string;
  issuer?: string;
  year?: string;
  image_url?: string;
}
export interface TeamMember {
  name: string;
  role?: string;
  specialty?: string;
  image_url?: string;
}
export interface ValueItem {
  title: string;
  description?: string;
}
