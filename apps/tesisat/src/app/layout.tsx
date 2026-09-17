import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { GoogleAnalytics, LiveChat, CookieConsent, PWAInstall, OfflineIndicator } from "@sirnak/shared";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Çözüm Noktası Tesisat & Elektrik | Şırnak",
  description:
    "Şırnak'ta profesyonel tesisat ve elektrik hizmetleri. Su kaçağı tespiti, petek temizliği, kombi bakımı, elektrik arıza giderme. 7/24 acil servis.",
  keywords:
    "tesisat, elektrik, su kaçağı, petek temizliği, kombi, Şırnak, tesisatçı, elektrikçi",
  openGraph: {
    title: "Çözüm Noktası Tesisat & Elektrik | Şırnak",
    description:
      "Şırnak'ta profesyonel tesisat ve elektrik hizmetleri. 7/24 acil servis.",
    type: "website",
    locale: "tr_TR",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Çözüm Noktası Tesisat & Elektrik",
  description:
    "Şırnak'ta profesyonel tesisat ve elektrik hizmetleri.",
  telephone: "+90-500-123-4567",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Şırnak",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.52,
    longitude: 42.49,
  },
  url: "https://tesisat.sirnak platform.com",
  priceRange: "$$",
  openingHours: "Mo-Su 00:00-23:59",
  areaServed: ["Şırnak", "Cizre", "İdil", "Silopi", "Beytüşşebap"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${instrumentSans.variable} relative overflow-x-hidden`}>
      <head>
        <GoogleAnalytics />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="relative bg-[#050505] text-[#f4f2ef] antialiased font-sans">
        <OfflineIndicator />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <LiveChat />
        <CookieConsent />
        <PWAInstall appName="Çözüm Noktası" themeColor="#f97316" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
