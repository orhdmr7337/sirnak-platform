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

const iconPaths: Record<string, string> = {
  droplet:
    "M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c1.53 0 2.97.38 4.24 1.06A9 9 0 0112 21z",
  flame:
    "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  thermometer:
    "M12 9V2m0 0a2 2 0 100 4 2 2 0 000-4zm0 0v7m0 0a2 2 0 100 4 2 2 0 000-4z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
  wrench:
    "M14.121 14.121a2 2 0 010 2.828l-1.414 1.414a2 2 0 01-2.828 0l-1.414-1.414a2 2 0 010-2.828l1.414-1.414a2 2 0 012.828 0l1.414 1.414z",
  pipe: "M4 6h16M4 12h16M4 18h16",
};

async function getServicePageData(slug: string) {
  const site = await getSiteBySlug("tesisat");
  if (!site) return null;
  const service = await getServiceBySlug(site.id, slug);
  if (!service) return null;
  const data = await getSiteData("tesisat");
  const relatedServices = (data?.services ?? []).filter(
    (s) => s.id !== service.id
  );
  return { site, service, relatedServices };
}

export async function generateStaticParams() {
  const site = await getSiteBySlug("tesisat");
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
    service.description || `${service.title} - Şırnak'ta profesyonel hizmet.`;
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

  const cleanPhone = (site.whatsapp || site.phone || "905001234567").replace(
    /[^0-9]/g,
    ""
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Merhaba, ${service.title} hizmeti hakkında bilgi almak istiyorum.`
  )}`;
  const phoneUrl = `tel:${site.phone || "+905001234567"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || undefined,
    provider: {
      "@type": "HomeAndConstructionBusiness",
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

  const whatsappMsg = service.price_info
    ? `${service.title} hizmeti fiyatı ve detayları hakkında bilgi almak istiyorum.`
    : `${service.title} hizmeti hakkında bilgi almak istiyorum.`;

  return (
    <main className="min-h-screen bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-white transition-colors hover:text-[#f97316]"
          >
            {site.name}
          </Link>
          <Link
            href="/#hizmetler"
            className="text-sm text-[#9a9ba1] transition-colors hover:text-white"
          >
            ← Tüm Hizmetler
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f97316]/10">
              {service.svg_path ? (
                <svg
                  className="h-8 w-8 text-[#f97316]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={service.svg_path}
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8 text-[#f97316]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={iconPaths[service.icon || "wrench"]}
                  />
                </svg>
              )}
            </div>

            <h1
              className="mb-4 text-4xl font-bold text-white md:text-5xl"
              style={{ fontFamily: "var(--sc-font-display)" }}
            >
              {service.title}
            </h1>

            {service.price_info && (
              <p className="mb-6 text-lg font-medium text-[#f97316]">
                {service.price_info}
              </p>
            )}

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-[#9a9ba1]">
              {service.description ||
                "Profesyonel hizmetimiz hakkında detaylı bilgi için bizimle iletişime geçin."}
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
                WhatsApp ile İletişim
              </a>
              <a
                href={phoneUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 px-6 py-3.5 text-sm font-semibold text-[#f97316] transition-all hover:bg-[#f97316]/20"
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
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={service.image_url}
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2
            className="mb-8 text-2xl font-bold text-white"
            style={{ fontFamily: "var(--sc-font-display)" }}
          >
            Diğer Hizmetlerimiz
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.id}
                href={`/hizmetler/${related.slug}`}
                className="glass-card glass-card-hover group block p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f97316]/10 transition-colors group-hover:bg-[#f97316]/20">
                  {related.svg_path ? (
                    <svg
                      className="h-5 w-5 text-[#f97316]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={related.svg_path}
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-[#f97316]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={iconPaths[related.icon || "wrench"]}
                      />
                    </svg>
                  )}
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {related.title}
                </h3>
                <p className="text-sm text-[#9a9ba1] line-clamp-2">
                  {related.description}
                </p>
                {related.price_info && (
                  <p className="mt-2 text-sm font-medium text-[#f97316]">
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
