import type { MetadataRoute } from "next";
import { getSiteBySlug, getAllServiceSlugs, getDistricts, getBlogPosts, siteBaseUrl } from "@sirnak/shared";
import { LOCAL_SERVICE_SLUGS } from "@/lib/seo-copy";

export const revalidate = 3600;

// Tüm adresler veritabanındaki hizmet / ilçe / blog kayıtlarından üretilir.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteBySlug("tesisat");
  const base = siteBaseUrl(site);
  if (!site || !base) return [];

  const [serviceSlugs, districts, posts] = await Promise.all([
    getAllServiceSlugs(site.id),
    getDistricts(),
    getBlogPosts(site.id),
  ]);

  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hizmetler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...serviceSlugs.map(({ slug }) => ({ url: `${base}/hizmetler/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${base}/ilceler`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...districts.map((d) => ({ url: `${base}/ilceler/${d.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...districts.flatMap((d) =>
      LOCAL_SERVICE_SLUGS.filter((h) => serviceSlugs.some((x) => x.slug === h)).map((h) => ({
        url: `${base}/ilceler/${d.slug}/${h}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    ),
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updated_at), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
