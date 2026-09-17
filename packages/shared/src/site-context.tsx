"use client";

import { createContext, useContext, ReactNode } from "react";
import type { PublicSiteData } from "./data";

const SiteContext = createContext<PublicSiteData | null>(null);

export function SiteProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: PublicSiteData;
}) {
  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}

export function useSiteContent() {
  const { siteContent } = useSite();
  return {
    content: siteContent,
    get: (section: string, key: string, fallback = "") =>
      siteContent.find((c) => c.section === section && c.key === key)?.value ??
      fallback,
  };
}

export function useServices() {
  return useSite().services;
}

export function useDistricts() {
  return useSite().districts;
}

export function useTestimonials() {
  return useSite().testimonials;
}

export function useFaqs() {
  return useSite().faqs;
}

export function useProcessSteps() {
  return useSite().processSteps;
}

export function useTrustItems() {
  return useSite().trustItems;
}

export function useGalleryItems() {
  return useSite().galleryItems;
}

export function useServiceFinderOptions() {
  return useSite().serviceFinderOptions;
}

export function useMediaFiles() {
  return useSite().mediaFiles;
}

export function useNavLinks() {
  return useSite().navLinks;
}

export function useSocialLinks() {
  return useSite().socialLinks;
}

export function useSiteConfig() {
  return useSite().site;
}
