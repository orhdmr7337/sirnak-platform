import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { GoogleAnalytics, LiveChat, CookieConsent, PWAInstall, OfflineIndicator } from "@sirnak/shared";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: {
    default: "Doğal Dokunuş Masaj | Şırnak Masaj Salonu & Spa",
    template: "%s | Doğal Dokunuş Masaj Şırnak",
  },
  description:
    "Şırnak'ta profesyonel masaj hizmeti. Thai masajı, derin doku, sıcak taş, aromaterapi ve spor masajı. Uzman masörler, doğal ürünler. Randevu için hemen arayın!",
  keywords: [
    "şırnak masaj",
    "şırnak masaj salonu",
    "şırnak spa",
    "şırnak thai masajı",
    "şırnak derin doku masajı",
    "şırnak aromaterapi",
    "şırnak sıcak taş masajı",
    "şırnak spor masajı",
    "şırnak refleksoloji",
    "masaj şırnak",
    "spa şırnak",
    "rahatlatıcı masaj şırnak",
    "tıbbi masaj şırnak",
    "kas ağrıları masaj şırnak",
    "bel ağrısı masaj şırnak",
    "boyun tutulması masaj şırnak",
    "stres masajı şırnak",
    "vücut tarama şırnak",
    "masaj fiyatları şırnak",
    "en iyi masaj şırnak",
  ],
  authors: [{ name: "Doğal Dokunuş Masaj" }],
  creator: "Doğal Dokunuş Masaj",
  publisher: "Doğal Dokunuş Masaj",
  metadataBase: new URL("https://masaj.sirnakplatform.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://masaj.sirnakplatform.com",
    siteName: "Doğal Dokunuş Masaj Şırnak",
    title: "Doğal Dokunuş Masaj | Şırnak Masaj Salonu & Spa",
    description:
      "Şırnak'ta profesyonel masaj hizmeti. Thai masajı, derin doku, sıcak taş, aromaterapi. Uzman masörler, doğal ürünler.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Doğal Dokunuş Masaj Şırnak - Profesyonel Masaj Hizmeti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doğal Dokunuş Masaj | Şırnak Masaj Salonu",
    description: "Şırnak'ta profesyonel masaj hizmeti. Thai masajı, derin doku, sıcak taş.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Doğal Dokunuş Masaj",
  alternateName: "Şırnak Masaj Salonu",
  description:
    "Şırnak'ta profesyonel masaj hizmeti sunan, uzman masörler ve doğal ürünlerle çalışan masaj salonu. Thai masajı, derin doku, sıcak taş, aromaterapi ve daha fazlası.",
  url: "https://masaj.sirnakplatform.com",
  telephone: "+90-555-123-4567",
  email: "info@dogaldokunus.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "İl Merkezi",
    addressLocality: "Şırnak",
    addressRegion: "Şırnak",
    postalCode: "73000",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.4187,
    longitude: 42.4919,
  },
  image: "https://masaj.sirnakplatform.com/og-image.jpg",
  logo: "https://masaj.sirnakplatform.com/logo.png",
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
  priceRange: "$$",
  paymentAccepted: "Nakit, Kredi Kartı",
  currenciesAccepted: "TRY",
  areaServed: {
    "@type": "City",
    name: "Şırnak",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Masaj Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Thai Masajı",
          description: "Geleneksel Thai masajı ile vücut esnekliğini artırın",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Derin Doku Masajı",
          description: "Kas derinliklerine inen yoğun masaj tekniği",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sıcak Taş Masajı",
          description: "Isıtmalı taşlarla yapılan rahatlatıcı masaj",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Aromaterapi Masajı",
          description: "Doğal yağlarla yapılan dinginlik verici masaj",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Spor Masajı",
          description: "Sporcular için özel kas kurtarma masajı",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vücut Tarama Testi",
          description: "Gelişmiş tarama cihazı ile vücut analizi",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ayşe K." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Şırnak'taki en iyi masaj salonu. Thai masajı muhteşem!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Mehmet Y." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Bel ağrım için gelmiştim, çok memnun kaldım.",
    },
  ],
  sameAs: [
    "https://www.instagram.com/dogaldokunusmasaj",
    "https://www.facebook.com/dogaldokunusmasaj",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Doğal Dokunuş Masaj Şırnak",
  url: "https://masaj.sirnakplatform.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://masaj.sirnakplatform.com/arama?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  inLanguage: "tr",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Şırnak'ta en iyi masaj salonu neresidir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Doğal Dokunuş Masaj, Şırnak'ta uzman masörleri ve doğal ürünleriyle en çok tercih edilen masaj salonudur.",
      },
    },
    {
      "@type": "Question",
      name: "Şırnak masaj fiyatları ne kadar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Masaj fiyatlarımız seanstan seanstan değişmektedir. Detaylı bilgi için bizi arayın.",
      },
    },
    {
      "@type": "Question",
      name: "Thai masajı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Thai masajı, geleneksel bir Thai tekniği ile yapılan, vücut esnekliğini artıran ve stresi azaltan bir masaj türüdür.",
      },
    },
    {
      "@type": "Question",
      name: "Masaj randevusu nasıl alınır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WhatsApp veya telefon ile bize ulaşarak randevu alabilirsiniz. Online randevu için sitemizi ziyaret edin.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${playfairDisplay.variable} relative overflow-x-hidden`}>
      <head>
        <GoogleAnalytics />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <meta name="theme-color" content="#6b8f71" />
        <meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="geo.region" content="TR-73" />
        <meta name="geo.placename" content="Şırnak" />
        <meta name="geo.position" content="37.4187;42.4919" />
        <meta name="ICBM" content="37.4187, 42.4919" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="relative antialiased font-serif">
        <OfflineIndicator />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <LiveChat />
        <CookieConsent />
        <PWAInstall appName="Doğal Dokunuş Masaj" themeColor="#6b8f71" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
