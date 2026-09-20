import type { MetadataRoute } from "next";
import { getSiteBySlug } from "@sirnak/shared";

export const revalidate = 3600;

// PWA manifest: ad, açıklama ve renkler veritabanındaki site kaydından gelir.
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteBySlug("masaj");
  return {
    name: site?.name ?? "",
    short_name: site?.name?.split(" ").slice(0, 2).join(" ") ?? "",
    description: site?.meta_description ?? undefined,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: site?.primary_color ?? "#050505",
    lang: "tr",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
      { src: "/icons/icon-maskable.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
