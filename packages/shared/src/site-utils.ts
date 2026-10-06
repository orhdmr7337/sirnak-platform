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

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

/**
 * Admin panelinden yazılan düz metni bloklara ayırır:
 * "## Başlık" ara başlık, "- madde" liste, boş satır paragraf sonu.
 */
export function parseContentBlocks(content?: string | null): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let para: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    if (list.length) blocks.push({ type: "ul", items: list });
    para = [];
    list = [];
  };
  for (const raw of (content ?? "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      flush();
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      if (para.length) flush();
      list.push(line.slice(2).trim());
    } else {
      if (list.length) flush();
      para.push(line);
    }
  }
  flush();
  return blocks;
}

/** Form bilgilerinden işletmeye gidecek WhatsApp mesajını hazırlar. */
export function bookingMessage(
  heading: string,
  f: { name: string; phone: string; service?: string; district?: string; message?: string }
): string {
  return [
    `Merhaba, siteden ${heading}:`,
    `Ad: ${f.name}`,
    `Telefon: ${f.phone}`,
    f.service ? `Hizmet: ${f.service}` : "",
    f.district ? `İlçe: ${f.district}` : "",
    f.message ? `Not: ${f.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
