import type { Metadata } from "next";
import { getSiteData } from "@sirnak/shared";
import MasajClient from "@/components/MasajClient";

export const revalidate = 300;

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const data = await getSiteData("masaj");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0a] text-white">
        <div className="text-center">
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return <MasajClient data={data} />;
}
