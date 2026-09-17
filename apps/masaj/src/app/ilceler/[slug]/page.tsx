import { getDistrictBySlug, getSiteData, SiteProvider } from "@sirnak/shared";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileActionBar } from "@/components/MobileActionBar";

const DISTRICT_SLUGS = ["merkez", "cizre", "idil", "silopi", "beytussebap", "uludere"];

export const revalidate = 300;

export async function generateStaticParams() {
  return DISTRICT_SLUGS.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const district = await getDistrictBySlug(slug);
  if (!district) return {};

  return {
    title: `${district.name} Masaj Hizmetleri | Doğal Dokunuş Masaj`,
    description: district.description || `${district.name} bölgesinde profesyonel masaj hizmetleri. Thai masajı, derin doku, sıcak taş, aromaterapi. Uzman masörler, doğal ürünler.`,
    keywords: `${district.name} masaj, ${district.name} masaj salonu, ${district.name} spa, ${district.name} thai masajı, ${district.name} derin doku masajı, Şırnak masaj`,
    openGraph: {
      title: `${district.name} Masaj Hizmetleri | Doğal Dokunuş Masaj`,
      description: district.description || `${district.name} bölgesinde profesyonel masaj hizmetleri.`,
      type: "website",
      locale: "tr_TR",
    },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { slug } = await params;
  const district = await getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  const siteData = await getSiteData("masaj");
  const services = siteData?.services ?? [];
  const testimonials = (siteData?.testimonials ?? []).filter(
    (t) => !t.district || t.district === district.name
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Doğal Dokunuş Masaj",
    description: `${district.name} bölgesinde profesyonel masaj hizmetleri.`,
    telephone: "+90-555-123-4567",
    address: {
      "@type": "PostalAddress",
      addressLocality: district.name,
      addressRegion: district.region || "Şırnak",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "City",
      name: district.name,
    },
    url: "https://masaj.sirnakplatform.com",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <SiteProvider data={siteData}>
      <Header />
      <main className="min-h-screen bg-[#0a0f0a]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#9a9ba1] hover:text-white transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Ana Sayfa
            </Link>

            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {district.name}
            </h1>
            <p className="text-xl text-[#9a9ba1] mb-4">
              Profesyonel Masaj Hizmetleri
            </p>
            {district.description && (
              <p className="text-[#9a9ba1] max-w-2xl mx-auto">
                {district.description}
              </p>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
                Hizmetlerimiz
              </span>
              <h2
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {district.name} İçin <span className="text-[#6b8f71]">Hizmetlerimiz</span>
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="glass-card p-6 rounded-xl hover:border-[#6b8f71]/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6b8f71]/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#6b8f71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  {service.description && (
                    <p className="text-sm text-[#9a9ba1]">{service.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="py-16 px-6 bg-[#111811]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-[#c9a96e] text-sm font-medium tracking-widest uppercase mb-4">
                  Müşteri Yorumları
                </span>
                <h2
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {district.name} Müşterilerimizin <span className="text-[#6b8f71]">Yorumları</span>
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.slice(0, 6).map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="glass-card p-6 rounded-xl"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-[#c9a96e]" : "text-[#9a9ba1]/30"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-[#9a9ba1] mb-4">{testimonial.content}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6b8f71]/20 flex items-center justify-center">
                        <span className="text-[#6b8f71] font-semibold text-sm">
                          {testimonial.customer_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{testimonial.customer_name}</p>
                        {testimonial.district && (
                          <p className="text-xs text-[#9a9ba1]">{testimonial.district}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {district.name} Masaj Hizmeti İçin <span className="text-[#6b8f71]">Bize Ulaşın</span>
            </h2>
            <p className="text-[#9a9ba1] mb-8 max-w-xl mx-auto">
              Profesyonel masaj hizmetleri için hemen randevu alın.
              Uzman masörlerimiz sizleri bekliyor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+905551234567"
                className="inline-flex items-center justify-center gap-2 bg-[#6b8f71] hover:bg-[#5a7d60] text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hemen Ara
              </a>
              <a
                href="https://wa.me/905551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 glass-card hover:border-[#6b8f71]/40 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile İletişim
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SiteProvider>
  );
}
