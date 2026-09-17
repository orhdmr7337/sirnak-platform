import { supabase } from "./supabase";
import type { Service, BlogPost, District, SiteContent } from "./supabase";

export interface SearchResult {
  id: string;
  type: "service" | "blog" | "district" | "page";
  title: string;
  excerpt: string;
  url: string;
  icon: string;
  score: number;
}

export function normalizeTurkish(text: string): string {
  return text
    .replace(/[İI]/g, "i")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .toLowerCase();
}

export function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const normalizedQuery = normalizeTurkish(query);
  const words = normalizedQuery.split(/\s+/).filter(Boolean);
  let result = text;
  for (const word of words) {
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    result = result.replace(regex, "<mark>$1</mark>");
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function scoreResult(title: string, query: string): number {
  const normalizedTitle = normalizeTurkish(title);
  const normalizedQuery = normalizeTurkish(query);
  if (normalizedTitle === normalizedQuery) return 100;
  if (normalizedTitle.startsWith(normalizedQuery)) return 90;
  if (normalizedTitle.includes(normalizedQuery)) return 70;
  const words = normalizedQuery.split(/\s+/);
  const matchedWords = words.filter((w) => normalizedTitle.includes(w));
  return (matchedWords.length / words.length) * 50;
}

export async function searchSite(
  siteId: string,
  query: string,
  options?: {
    types?: Array<"service" | "blog" | "district" | "page">;
    limit?: number;
  }
): Promise<SearchResult[]> {
  const limit = options?.limit ?? 20;
  const types = options?.types ?? ["service", "blog", "district", "page"];
  const results: SearchResult[] = [];

  const pattern = `%${query}%`;

  if (types.includes("service")) {
    const { data } = await supabase
      .from("services")
      .select("id, title, slug, description, icon")
      .eq("site_id", siteId)
      .eq("published", true)
      .or(`title.ilike.${pattern},description.ilike.${pattern}`)
      .limit(limit);

    for (const s of (data ?? []) as Pick<Service, "id" | "title" | "slug" | "description" | "icon">[]) {
      results.push({
        id: s.id,
        type: "service",
        title: s.title,
        excerpt: s.description?.slice(0, 150) ?? "",
        url: `/hizmetler/${s.slug}`,
        icon: s.icon ?? "wrench",
        score: scoreResult(s.title, query),
      });
    }
  }

  if (types.includes("blog")) {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content")
      .eq("site_id", siteId)
      .eq("published", true)
      .or(`title.ilike.${pattern},excerpt.ilike.${pattern},content.ilike.${pattern}`)
      .limit(limit);

    for (const b of (data ?? []) as Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "content">[]) {
      results.push({
        id: b.id,
        type: "blog",
        title: b.title,
        excerpt: b.excerpt?.slice(0, 150) ?? b.content?.slice(0, 150) ?? "",
        url: `/blog/${b.slug}`,
        icon: "file-text",
        score: scoreResult(b.title, query),
      });
    }
  }

  if (types.includes("district")) {
    const { data } = await supabase
      .from("districts")
      .select("id, name, slug, description")
      .or(`name.ilike.${pattern},description.ilike.${pattern}`)
      .limit(limit);

    for (const d of (data ?? []) as Pick<District, "id" | "name" | "slug" | "description">[]) {
      results.push({
        id: d.id,
        type: "district",
        title: d.name,
        excerpt: d.description?.slice(0, 150) ?? "",
        url: `/ilceler/${d.slug}`,
        icon: "map-pin",
        score: scoreResult(d.name, query),
      });
    }
  }

  if (types.includes("page")) {
    const { data } = await supabase
      .from("site_content")
      .select("id, section, key, value")
      .eq("site_id", siteId)
      .or(`value.ilike.${pattern}`)
      .limit(limit);

    for (const p of (data ?? []) as Pick<SiteContent, "id" | "section" | "key" | "value">[]) {
      if (p.value && p.value.length > 10) {
        results.push({
          id: p.id,
          type: "page",
          title: `${p.section} - ${p.key}`,
          excerpt: p.value.slice(0, 150),
          url: `/#${p.section}`,
          icon: "file",
          score: 30,
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
