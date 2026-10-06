import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDistrictBySlug,
  getDistricts,
  getSiteData,
  SiteProvider,
  siteBaseUrl,
  buildBreadcrumbJsonLd,
  parseContentBlocks,
  telHref,
  whatsappHref,
} from "@sirnak/shared";
import type { ServiceFaq } from "@sirnak/shared";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";
import { serviceFaqJsonLd } from "@/components/ServiceContent";
import defaultContent from "@/content/service-content.json";
import { LOCAL_SERVICE_SLUGS, localCopy, locative, withPhone } from "@/lib/seo-copy";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string; hizmet: string }> };

// İlçe + hizmet sayfaları ("Cizre Tıkanıklık Açma"). En çok arananlar derlemede üretilir,
// diğer hizmetler ilk istekte oluşturulur.
export async function generateStaticParams() {
  const districts = await getDistricts();
  return districts.flatMap((d) => LOCAL_SERVICE_SLUGS.map((hizmet) => ({ slug: d.slug, hizmet })));
}

async function load(slug: string, hizmet: string) {
  const [district, data] = await Promise.all([getDistrictBySlug(slug), getSiteData("tesisat")]);
  const service = data?.services.find((s) => s.slug === hizmet);
  if (!district || !data || !service) return null;
  return { district, data, service };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, hizmet } = await params;
  const r = await load(slug, hizmet);
  if (!r) return {};
  const title = localCopy.title(r.district.name, r.service.title);
  const description = localCopy.intro(r.district.name, r.service.title, r.data.site.name)[0];
  return {
    title: { absolute: withPhone(title, r.data.site.phone) },
    description,
    alternates: { canonical: `/ilceler/${slug}/${hizmet}` },
    openGraph: { title, description, type: "website", locale: "tr_TR" },
  };
}

type Fallback = Record<string, { content: string; faqs: ServiceFaq[] }>;

export default async function LocalServicePage({ params }: Props) {
  const { slug, hizmet } = await params;
  const r = await load(slug, hizmet);
  if (!r) notFound();
  const { district, data, service } = r;
  const site = data.site;

  // Hizmetin kapsam ve süreç listeleri ana hizmet metninden alınır (ilk iki liste).
  const content = service.content?.trim() ? service.content : (defaultContent as Fallback)[service.slug]?.content;
  const lists = parseContentBlocks(content).filter((b) => b.type === "ul") as { type: "ul"; items: string[] }[];
  const scope = lists[0]?.items ?? [];
  const steps = lists[2]?.items ?? lists[1]?.items ?? [];

  const faqs = localCopy.faqs(district.name, service.title);
  const intro = localCopy.intro(district.name, service.title, site.name);
  const h1 = localCopy.h1(district.name, service.title);
  const otherServices = data.services.filter((s) => s.id !== service.id && LOCAL_SERVICE_SLUGS.includes(s.slug));
  const otherDistricts = data.districts.filter((d) => d.id !== district.id);
  const tel = telHref(site);
  const wa = whatsappHref(site, `Merhaba, ${locative(district.name)} ${service.title.toLocaleLowerCase("tr-TR")} için bilgi almak istiyorum.`);

  const breadcrumb = buildBreadcrumbJsonLd(siteBaseUrl(site), [
    { name: "Ana Sayfa", path: "/" },
    { name: "İlçeler", path: "/ilceler" },
    { name: district.name, path: `/ilceler/${district.slug}` },
    { name: h1, path: `/ilceler/${district.slug}/${service.slug}` },
  ]);
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: h1,
    serviceType: service.title,
    areaServed: { "@type": "City", name: district.name },
    provider: { "@type": "Plumber", name: site.name, telephone: site.phone || undefined },
  };
  const faqLd = serviceFaqJsonLd(faqs);

  return (
    <SiteProvider data={data}>
      <Header />
      <main className="min-h-screen bg-[#050505] pb-24">
        {[serviceLd, breadcrumb, faqLd].filter(Boolean).map((ld, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        ))}

        <section className="relative overflow-hidden px-5 pb-12 pt-28 md:pt-36">
          {service.image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${service.image_url})` }}
              aria-hidden
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]" aria-hidden />
          <div className="relative mx-auto max-w-3xl">
            <nav className="mb-6 flex flex-wrap gap-1 text-xs text-[#9a9ba1]">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link> /
              <Link href={`/ilceler/${district.slug}`} className="hover:text-white">{district.name}</Link> /
              <span className="text-white">{service.title}</span>
            </nav>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">7/24 · Aracımızla adresinize geliyoruz</p>
            <h1 className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">{h1}</h1>
            {intro.map((t, i) => (
              <p key={i} className="mb-3 text-base leading-relaxed text-[#b4b5ba] md:text-lg">{t}</p>
            ))}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex">
              {tel && (
                <a href={tel} className="rounded-xl bg-primary px-5 py-3.5 text-center text-sm font-bold text-[#050505]">
                  Hemen Ara
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#25D366] px-5 py-3.5 text-center text-sm font-bold text-white">
                  WhatsApp&apos;tan Yaz
                </a>
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-6 px-5 md:grid-cols-2">
          {scope.length > 0 && (
            <section className="glass-card p-6">
              <h2 className="mb-4 text-xl font-bold text-white">{locative(district.name)} {service.title} Kapsamında</h2>
              <ul className="space-y-2 text-sm text-[#b4b5ba]">
                {scope.map((it, i) => (
                  <li key={i} className="flex gap-2"><span className="text-primary">✓</span>{it}</li>
                ))}
              </ul>
            </section>
          )}
          {steps.length > 0 && (
            <section className="glass-card p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Nasıl Çalışıyoruz?</h2>
              <ol className="space-y-3 text-sm text-[#b4b5ba]">
                {steps.map((it, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                    {it}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <section className="mx-auto max-w-3xl px-5 pt-12">
          <h2 className="mb-5 text-2xl font-bold text-white">{district.name} {service.title} Hakkında Sorular</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="glass-card rounded-xl p-5" open={i === 0}>
                <summary className="cursor-pointer list-none font-semibold text-white"><h3 className="inline">{f.q}</h3></summary>
                <p className="mt-3 leading-relaxed text-[#b4b5ba]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#9a9ba1]">
            Hizmet hakkında detaylı bilgi:{" "}
            <Link href={`/hizmetler/${service.slug}`} className="text-primary hover:underline">Şırnak {service.title}</Link>
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 pt-12">
          <h2 className="mb-4 text-xl font-bold text-white">{locative(district.name)} Diğer Hizmetlerimiz</h2>
          <div className="flex flex-wrap gap-2">
            {otherServices.map((s) => (
              <Link key={s.id} href={`/ilceler/${district.slug}/${s.slug}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#9a9ba1] hover:border-primary/50 hover:text-white">
                {district.name} {s.title}
              </Link>
            ))}
          </div>
          <h2 className="mb-4 mt-10 text-xl font-bold text-white">Diğer İlçelerde {service.title}</h2>
          <div className="flex flex-wrap gap-2">
            {otherDistricts.map((d) => (
              <Link key={d.id} href={`/ilceler/${d.slug}/${service.slug}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#9a9ba1] hover:border-primary/50 hover:text-white">
                {d.name} {service.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </SiteProvider>
  );
}
