import type { Metadata } from "next";
import { searchSite, highlightMatch, getSiteBySlug, getSiteData, SiteProvider } from "@sirnak/shared";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Arama Sonuçları | Çözüm Noktası Tesisat",
  description: "Şırnak tesisat hizmetleri, blog yazıları ve bölgelerinde arama yapın.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AramaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q ?? "";

  const site = await getSiteBySlug("tesisat");
  const data = await getSiteData("tesisat");
  const results = query.length >= 2 && site ? await searchSite(site.id, query, { limit: 30 }) : [];

  const groupedResults = results.reduce<Record<string, typeof results>>((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    service: "Hizmetler",
    blog: "Blog Yazıları",
    district: "Bölgeler",
    page: "Sayfalar",
  };

  return (
    <SiteProvider data={data}>
      <div className="min-h-screen bg-[#050505]">
        <Header />
      <main className="pt-28 pb-20">
        <div className="sc-wrap mx-auto max-w-4xl px-6">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {query ? (
              <>
                &ldquo;{query}&rdquo; için {results.length} sonuç bulundu
              </>
            ) : (
              "Arama"
            )}
          </h1>

          {query.length < 2 && (
            <p className="mt-4 text-white/40">En az 2 karakter girerek arama yapın.</p>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="mt-12 text-center">
              <svg className="mx-auto h-16 w-16 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="mt-4 text-lg text-white/40">Sonuç bulunamadı</p>
              <p className="mt-2 text-sm text-white/20">Farklı anahtar kelimelerle tekrar deneyin.</p>
            </div>
          )}

          {Object.entries(groupedResults).map(([type, items]) => (
            <div key={type} className="mt-10">
              <h2 className="mb-4 text-lg font-semibold text-white/60">{typeLabels[type] ?? type}</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <a
                    key={`${item.type}-${item.id}`}
                    href={item.url}
                    className="block rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/40">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-base font-medium text-white"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(item.title, query),
                          }}
                        />
                        {item.excerpt && (
                          <p
                            className="mt-1 text-sm text-white/40 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(item.excerpt.slice(0, 200), query),
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
        <Footer />
      </div>
    </SiteProvider>
  );
}
