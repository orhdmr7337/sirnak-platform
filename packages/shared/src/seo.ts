import type { Site, Service, Testimonial, Faq, District, SocialLink } from "./supabase";
import { phoneDigits, siteBaseUrl } from "./site-utils";

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * `sites.working_hours` serbest metindir ("7/24", "09:00 - 21:00").
 * Yalnızca güvenle çözümlenebiliyorsa OpeningHoursSpecification üretir.
 */
function openingHours(text?: string | null) {
  const t = (text ?? "").trim();
  if (!t) return undefined;
  if (/7\s*\/\s*24|24\s*\/\s*7|24\s*saat/i.test(t)) {
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, opens: "00:00", closes: "23:59" }];
  }
  const m = t.match(/(\d{1,2}[:.]\d{2})\s*[-–]\s*(\d{1,2}[:.]\d{2})/);
  if (m) {
    const norm = (s: string) => s.replace(".", ":").padStart(5, "0");
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, opens: norm(m[1]), closes: norm(m[2]) }];
  }
  return undefined;
}

/** Boş/null alanları JSON-LD'den çıkarır — uydurma değer üretmez. */
function compact<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0))
  ) as T;
}

interface JsonLdInput {
  site: Site;
  schemaType: string;
  services: Service[];
  testimonials: Testimonial[];
  faqs: Faq[];
  districts: District[];
  socialLinks: SocialLink[];
}

/** Tüm alanlar veritabanından gelir. Gerçek yorum yoksa puan/yorum yazılmaz. */
export function buildJsonLd({ site, schemaType, services, testimonials, faqs, districts, socialLinks }: JsonLdInput) {
  const base = siteBaseUrl(site);
  const digits = phoneDigits(site.phone);
  const rated = testimonials.filter((t) => t.approved && t.rating > 0);
  const avg = rated.length ? rated.reduce((s, t) => s + t.rating, 0) / rated.length : 0;

  const sameAs = [
    ...socialLinks.map((l) => l.url),
    site.instagram_username ? `https://www.instagram.com/${site.instagram_username}` : null,
    site.tiktok_username ? `https://www.tiktok.com/@${site.tiktok_username}` : null,
  ].filter(Boolean) as string[];

  const business = compact({
    "@context": "https://schema.org",
    "@type": schemaType,
    name: site.name,
    description: site.meta_description ?? undefined,
    url: base ?? undefined,
    telephone: digits ? `+${digits}` : undefined,
    email: site.email ?? undefined,
    image: site.og_image_url ?? undefined,
    logo: site.logo_url ?? undefined,
    address: site.address ? { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "TR" } : undefined,
    openingHoursSpecification: openingHours(site.working_hours),
    areaServed: districts.map((d) => d.name),
    hasOfferCatalog: services.length
      ? {
          "@type": "OfferCatalog",
          name: site.name,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: compact({ "@type": "Service", name: s.title, description: s.description ?? undefined }),
          })),
        }
      : undefined,
    aggregateRating: rated.length
      ? {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: String(rated.length),
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
    review: rated.slice(0, 5).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.customer_name },
      reviewRating: { "@type": "Rating", ratingValue: String(t.rating) },
      reviewBody: t.content,
    })),
    sameAs,
  });

  const website = compact({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: base ?? undefined,
    inLanguage: "tr",
    potentialAction: base
      ? {
          "@type": "SearchAction",
          target: `${base}/arama?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        }
      : undefined,
  });

  const faqPage = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return [business, website, faqPage].filter(Boolean) as Record<string, unknown>[];
}

/** Next.js `Metadata` ile yapısal olarak uyumlu, next'e bağımlı olmayan çıktı. */
export function buildSiteMetadata(site: Site) {
  const base = siteBaseUrl(site);
  const title = site.meta_title || site.name;
  const description = site.meta_description ?? undefined;
  const keywords = site.meta_keywords ?? undefined;
  const images = site.og_image_url ? [{ url: site.og_image_url }] : undefined;

  return {
    title: { default: title, template: `%s | ${site.name}` },
    description,
    keywords,
    authors: [{ name: site.name }],
    metadataBase: base ? new URL(base) : undefined,
    // Canonical burada verilmez: kök layout'taki değer tüm alt sayfalara miras kalır
    // ve hepsini ana sayfanın kopyası gibi gösterir. Her sayfa kendi yolunu bildirir.
    icons: site.favicon_url ? { icon: site.favicon_url } : undefined,
    openGraph: {
      type: "website" as const,
      locale: "tr_TR",
      siteName: site.name,
      title,
      description,
      url: base ?? undefined,
      images,
    },
    twitter: {
      card: images ? ("summary_large_image" as const) : ("summary" as const),
      title,
      description,
      images: site.og_image_url ? [site.og_image_url] : undefined,
    },
    robots: { index: true, follow: true },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

/** Sayfa yolu listesinden BreadcrumbList üretir. Adres bilinmiyorsa null. */
export function buildBreadcrumbJsonLd(base: string | null, items: { name: string; path: string }[]) {
  if (!base) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path === "/" ? base : `${base}${it.path}`,
    })),
  };
}

/** "a, b ve c" biçiminde Türkçe liste. */
export function joinTr(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;
}

/** Genel SSS için FAQPage; sayfada tek FAQPage olsun diye yalnızca ana sayfada kullanılır. */
export function buildFaqJsonLd(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
