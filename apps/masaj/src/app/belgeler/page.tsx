import type { Metadata } from "next";
import { getSiteData, contentBySection, contentList } from "@sirnak/shared";
import type { CertificateItem, TeamMember, ValueItem } from "@sirnak/shared";
import BelgelerView from "@/components/BelgelerView";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Hakkımızda & Belgeler",
  alternates: { canonical: "/belgeler" },
};

// Tüm içerik veritabanından gelir: `site_content` (about, values, team, certificates) ve `sites`.
export default async function BelgelerPage() {
  const data = await getSiteData("masaj");
  if (!data) return null;

  const content = contentBySection(data.siteContent);
  return (
    <BelgelerView
      site={data.site}
      about={content.about ?? {}}
      values={contentList<ValueItem>(content, "values")}
      team={contentList<TeamMember>(content, "team")}
      certificates={contentList<CertificateItem>(content, "certificates")}
    />
  );
}
