import type { MetadataRoute } from "next";
import { getSiteBySlug, siteBaseUrl } from "@sirnak/shared";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = siteBaseUrl(await getSiteBySlug("tesisat"));
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] }],
    sitemap: base ? `${base}/sitemap.xml` : undefined,
  };
}
