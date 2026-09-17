import { getDistricts, getSiteData, SiteProvider } from "@sirnak/shared";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileActionBar } from "@/components/MobileActionBar";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "İlçeler | Doğal Dokunuş Masaj",
  description: "Şırnak ve tüm ilçelerinde profesyonel masaj hizmetleri. Thai masajı, derin doku, sıcak taş, aromaterapi. Uzman masörler, doğal ürünler.",
  keywords: "Şırnak masaj, Cizre masaj, İdil masaj, Silopi masaj, Beytüşşebap masaj, Uludere masaj",
  openGraph: {
    title: "İlçeler | Doğal Dokunuş Masaj",
    description: "Şırnak ve tüm ilçelerinde profesyonel masaj hizmetleri.",
    type: "website",
    locale: "tr_TR",
  },
};

export default async function DistrictsPage() {
  const districts = await getDistricts();
  const data = await getSiteData("masaj");

  return (
    <SiteProvider data={data}>
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
              Hizmet <span className="text-[#6b8f71]">Bölgelerimiz</span>
            </h1>
            <p className="text-xl text-[#9a9ba1] mb-4">
              Şırnak ve Tüm İlçelerinde Hizmetinizdeyiz
            </p>
            <p className="text-[#9a9ba1] max-w-2xl mx-auto">
              Profesyonel masaj hizmetlerimizle Şırnak il merkezi ve
              tüm ilçelerinde uzman masörlerimizle yanınızdayız.
            </p>
          </div>
        </section>

        {/* Districts Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {districts.map((district) => (
                <Link
                  key={district.id}
                  href={`/ilceler/${district.slug}`}
                  className="glass-card p-6 rounded-xl block group hover:border-[#6b8f71]/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#6b8f71]/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#6b8f71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2
                        className="text-xl font-semibold text-white mb-2 group-hover:text-[#6b8f71] transition-colors"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {district.name}
                      </h2>
                      {district.description && (
                        <p className="text-sm text-[#9a9ba1] mb-3 line-clamp-2">
                          {district.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[#6b8f71] text-sm font-medium">
                        <span>Detaylı Bilgi</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-[#111811]">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Bölgenizde <span className="text-[#6b8f71]">Masaj Hizmeti</span> mi Arıyorsunuz?
            </h2>
            <p className="text-[#9a9ba1] mb-8 max-w-xl mx-auto">
              Bulunduğunuz ilçede profesyonel masaj hizmeti için hemen randevu alın.
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
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 glass-card hover:border-[#6b8f71]/40 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </SiteProvider>
  );
}
