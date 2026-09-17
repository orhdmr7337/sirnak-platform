import { getSiteData } from "@sirnak/shared";
import MasajClient from "@/components/MasajClient";

export const revalidate = 300;

export default async function HomePage() {
  const data = await getSiteData("masaj");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0a] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Doğal Dokunuş Masaj
          </h1>
          <p className="text-gray-400">Site yükleniyor...</p>
        </div>
      </div>
    );
  }

  return <MasajClient data={data} />;
}
