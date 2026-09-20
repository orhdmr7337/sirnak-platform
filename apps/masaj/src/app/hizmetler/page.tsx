import type { Metadata } from "next";
import Link from "next/link";
import { getSiteData, telHref, whatsappHref } from "@sirnak/shared";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData("masaj");
  return { title: data ? `Hizmetlerimiz | ${data.site.name}` : "Hizmetlerimiz" };
}

// Hizmet adı, açıklama ve fiyat bilgisi doğrudan `services` tablosundan gelir.
export default async function HizmetlerPage() {
  const data = await getSiteData("masaj");
  if (!data) return null;

  const { site, services } = data;
  const tel = telHref(site);
  const wa = whatsappHref(site);

  return (
    <div className="min-h-screen bg-[#0a0f0a]">
      <div className="border-b border-[#2a3a2a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-white transition-colors hover:text-[#c9a96e]">
            {site.name}
          </Link>
          <Link href="/" className="text-sm text-[#999] transition-colors hover:text-[#c9a96e]">
            ← Ana Sayfa
          </Link>
        </div>
      </div>

      <section className="px-6 py-16 text-center md:py-24">
        <h1 className="mb-4 text-4xl font-bold text-[#f4f2ef] md:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
          Hizmetlerimiz
        </h1>
        {site.tagline && <p className="mx-auto max-w-2xl text-lg text-[#999]">{site.tagline}</p>}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        {services.length === 0 ? (
          <p className="text-center text-[#999]">Henüz yayınlanmış hizmet bulunmuyor.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/hizmetler/${service.slug}`}
                className="group flex flex-col rounded-lg border border-[#2a3a2a] bg-gradient-to-br from-[#6b8f71]/10 to-transparent p-6 transition-all hover:-translate-y-1 hover:border-[#c9a96e]/50"
              >
                <h2 className="mb-2 text-lg font-semibold text-[#f4f2ef] transition-colors group-hover:text-[#c9a96e]">
                  {service.title}
                </h2>
                {service.description && (
                  <p className="mb-4 flex-1 text-sm text-[#999]">{service.description}</p>
                )}
                <div className="mt-auto flex items-center justify-between border-t border-[#2a3a2a] pt-4">
                  {service.price_info ? (
                    <p className="text-lg font-bold text-[#c9a96e]">{service.price_info}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm font-medium text-[#8ab891]">Detay →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {(tel || wa) && (
        <section className="px-6 pb-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-[#f4f2ef]" style={{ fontFamily: "Georgia, serif" }}>
              Randevu Almak İçin
            </h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {tel && (
                <a href={tel} className="rounded-lg bg-[#6b8f71] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#5a7a60]">
                  Hemen Ara
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#c9a96e] px-8 py-3 font-semibold text-[#c9a96e] transition-colors hover:bg-[#c9a96e]/10"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
