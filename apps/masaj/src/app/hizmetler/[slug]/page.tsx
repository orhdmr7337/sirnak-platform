import { Metadata } from "next";
import Link from "next/link";
import {
  getSiteBySlug,
  getSiteData,
  getServiceBySlug,
  getAllServiceSlugs,
} from "@sirnak/shared";
import type { Site, Service } from "@sirnak/shared";
import { notFound } from "next/navigation";

export const revalidate = 300;

const ICON_MAP: Record<string, string> = {
  sparkles:
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  droplets:
    "M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c1.53 0 2.97.38 4.24 1.06A9 9 0 0112 21z",
  wind: "M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2",
  heart:
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
  flower:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
};

async function getServicePageData(slug: string) {
  const site = await getSiteBySlug("masaj");
  if (!site) return null;
  const service = await getServiceBySlug(site.id, slug);
  if (!service) return null;
  const data = await getSiteData("masaj");
  const relatedServices = (data?.services ?? []).filter(
    (s) => s.id !== service.id
  );
  return { site, service, relatedServices };
}

export async function generateStaticParams() {
  const site = await getSiteBySlug("masaj");
  if (!site) return [];
  return getAllServiceSlugs(site.id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getServicePageData(slug);
  if (!result) return { title: "Hizmet Bulunamadı" };
  const { site, service } = result;
  const title = `${service.title} | ${site.name}`;
  const description =
    service.description || `${service.title} - Şırnak'ta profesyonel masaj hizmeti.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "tr_TR",
      images: service.image_url ? [service.image_url] : [],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getServicePageData(slug);
  if (!result) notFound();

  const { site, service, relatedServices } = result;

  const cleanPhone = (site.whatsapp || site.phone || "905551234567").replace(
    /[^0-9]/g,
    ""
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Merhaba, ${service.title} hizmeti hakkında bilgi almak istiyorum.`
  )}`;
  const phoneUrl = `tel:${site.phone || "+905551234567"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || undefined,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: site.name,
      telephone: site.phone || undefined,
    },
    areaServed: {
      "@type": "City",
      name: "Şırnak",
    },
    offers: service.price_info
      ? {
          "@type": "Offer",
          priceCurrency: "TRY",
          description: service.price_info,
        }
      : undefined,
  };

  return (
    <main className="min-h-screen bg-[#0a0f0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b border-[#2a3a2a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-white transition-colors hover:text-[#c9a96e]"
          >
            {site.name}
          </Link>
          <Link
            href="/#hizmetler"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            ← Tüm Hizmetler
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#6b8f71]/20 bg-[#6b8f71]/10">
              <svg
                className="h-8 w-8 text-[#6b8f71]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICON_MAP[service.icon || "sparkles"] || ICON_MAP.sparkles}
                />
              </svg>
            </div>

            <h1
              className="mb-4 text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {service.title}
            </h1>

            {service.price_info && (
              <p className="mb-6 text-lg font-medium text-[#c9a96e]">
                {service.price_info}
              </p>
            )}

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-400">
              {service.description ||
                "Profesyonel masaj hizmetimiz hakkında detaylı bilgi için bizimle iletişime geçin."}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/20"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile Randevu Al
              </a>
              <a
                href={phoneUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-[#6b8f71]/30 bg-[#6b8f71]/10 px-6 py-3.5 text-sm font-semibold text-[#6b8f71] transition-all hover:bg-[#6b8f71]/20"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Hemen Ara
              </a>
            </div>
          </div>

          {service.image_url && (
            <div className="relative overflow-hidden rounded-2xl border border-[#2a3a2a]">
              <img
                src={service.image_url}
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a]/60 to-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2
            className="mb-8 text-2xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Diğer Masaj Hizmetlerimiz
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.id}
                href={`/hizmetler/${related.slug}`}
                className="glass-card group block p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#6b8f71]/20 bg-[#6b8f71]/10 transition-colors group-hover:bg-[#6b8f71]/20">
                  <svg
                    className="h-5 w-5 text-[#6b8f71]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={
                        ICON_MAP[related.icon || "sparkles"] ||
                        ICON_MAP.sparkles
                      }
                    />
                  </svg>
                </div>
                <h3
                  className="mb-1 text-lg font-semibold text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {related.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {related.description}
                </p>
                {related.price_info && (
                  <p className="mt-2 text-sm font-medium text-[#c9a96e]">
                    {related.price_info}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
