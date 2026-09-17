"use client";

import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const id = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!id) return null;

  if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
    page_path: url,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}