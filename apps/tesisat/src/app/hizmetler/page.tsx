import type { Metadata } from "next";
import Link from "next/link";
import { getSiteData, telHref, whatsappHref } from "@sirnak/shared";
import { seoCopy } from "@/lib/seo-copy";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData("tesisat");
  const names = (data?.services ?? []).map((s) => s.title);
  return {
    title: seoCopy.servicesTitle,
    description: names.length ? `${seoCopy.servicesTitle}: ${names.join(", ")}.` : undefined,
    alternates: { canonical: "/hizmetler" },
  };
}

// Hizmet adı, açıklama ve fiyat bilgisi doğrudan `services` tablosundan gelir.
export default async function HizmetlerPage() {
  const data = await getSiteData("tesisat");
  if (!data) return null;

  const { site, services } = data;
  const tel = telHref(site);
  const wa = whatsappHref(site);

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="border-b border-[#1f1f1f]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-white transition-colors hover:text-primary">
            {site.name}
          </Link>
          <Link href="/" className="text-sm text-[#999] transition-colors hover:text-primary">
            ← Ana Sayfa
          </Link>
        </div>
      </div>

      <section className="px-6 py-16 text-center md:py-24">
        <h1 className="mb-4 text-4xl font-bold text-[#f4f2ef] md:text-5xl">
          {seoCopy.servicesTitle}
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
                className="group flex flex-col rounded-lg border border-[#1f1f1f] bg-gradient-to-br from-primary/10 to-transparent p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <h2 className="mb-2 text-lg font-semibold text-[#f4f2ef] transition-colors group-hover:text-primary">
                  {service.title}
                </h2>
                {service.description && (
                  <p className="mb-4 flex-1 text-sm text-[#999]">{service.description}</p>
                )}
                <div className="mt-auto flex items-center justify-between border-t border-[#1f1f1f] pt-4">
                  {service.price_info ? (
                    <p className="text-lg font-bold text-primary">{service.price_info}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm font-medium text-primary">Detay →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {(tel || wa) && (
        <section className="px-6 pb-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-[#f4f2ef]">
              Hemen Usta Çağırın
            </h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {tel && (
                <a href={tel} className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-dark">
                  Hemen Ara
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-primary px-8 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
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
