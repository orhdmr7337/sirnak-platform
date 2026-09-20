import { getSiteBySlug, whatsappHref } from "@sirnak/shared";
import OfflineClient from "@/components/OfflineClient";

export const revalidate = 3600;

// Çevrimdışı sayfası önbelleğe alınır; iletişim numarası veritabanından üretilir.
export default async function OfflinePage() {
  const site = await getSiteBySlug("masaj");
  return <OfflineClient whatsappUrl={whatsappHref(site)} />;
}
