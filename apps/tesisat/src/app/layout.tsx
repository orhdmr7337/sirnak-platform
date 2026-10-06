import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import {
  GoogleAnalytics,
  LiveChat,
  CookieConsent,
  PWAInstall,
  OfflineIndicator,
} from "@sirnak/shared";
import { getSiteData, buildJsonLd, buildSiteMetadata } from "@sirnak/shared/src/server";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const revalidate = 300;

// Başlık, açıklama, anahtar kelimeler, OG görseli, alan adı: hepsi `sites` tablosundan.
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData("tesisat");
  if (!data) return {};
  return buildSiteMetadata(data.site) as Metadata;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData("tesisat");
  const site = data?.site;
  const jsonLd = data
    ? buildJsonLd({
        site: data.site,
        schemaType: "Plumber",
        services: data.services,
        testimonials: data.testimonials,
        // Genel SSS yalnızca ana sayfada (app/page.tsx) basılır; hizmet sayfalarının kendi SSS'si var.
        faqs: [],
        districts: data.districts,
        socialLinks: data.socialLinks,
      })
    : [];

  return (
    <html lang="tr" className={`${instrumentSans.variable} relative overflow-x-hidden`}>
      <head>
        <GoogleAnalytics />
        <link rel="manifest" href="/manifest.webmanifest" />
        {site?.primary_color && <meta name="theme-color" content={site.primary_color} />}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="relative bg-[#050505] text-[#f4f2ef] antialiased font-sans">
        <OfflineIndicator />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <LiveChat />
        <CookieConsent accentColor={site?.primary_color} />
        {site && <PWAInstall appName={site.name} themeColor={site.primary_color} />}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
