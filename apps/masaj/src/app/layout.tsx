import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const revalidate = 300;

// Başlık, açıklama, anahtar kelimeler, OG görseli, alan adı: hepsi `sites` tablosundan.
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData("masaj");
  if (!data) return {};
  return buildSiteMetadata(data.site) as Metadata;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData("masaj");
  const site = data?.site;
  const jsonLd = data
    ? buildJsonLd({
        site: data.site,
        schemaType: "HealthAndBeautyBusiness",
        services: data.services,
        testimonials: data.testimonials,
        faqs: data.faqs,
        districts: data.districts,
        socialLinks: data.socialLinks,
      })
    : [];
  const themeColor = site?.primary_color;

  return (
    <html lang="tr" className={`${playfairDisplay.variable} relative overflow-x-hidden`}>
      <head>
        <GoogleAnalytics />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href={site?.favicon_url || "/favicon.svg"} />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        {themeColor && <meta name="theme-color" content={themeColor} />}
        <meta name="mobile-web-app-capable" content="yes" />
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
      <body className="relative antialiased font-serif">
        <OfflineIndicator />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <LiveChat />
        <CookieConsent />
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
