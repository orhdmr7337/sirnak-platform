"use client";

import { useState, useCallback } from "react";
import { SiteProvider } from "@sirnak/shared";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ServiceFinder } from "@/components/ServiceFinder";
import { ProcessSection } from "@/components/ProcessSection";
import { TrustStrip } from "@/components/TrustStrip";
import { GallerySection } from "@/components/GallerySection";
import { FaqSection } from "@/components/FaqSection";
import { Testimonials } from "@/components/Testimonials";
import { BookingCTA } from "@/components/BookingCTA";
import { Districts } from "@/components/Districts";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileActionBar } from "@/components/MobileActionBar";
import SplashScreen from "@/components/SplashScreen";

import type { PublicSiteData } from "@sirnak/shared";

interface MasajClientProps {
  data: PublicSiteData;
}

export default function MasajClient({ data }: MasajClientProps) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <SiteProvider data={data}>
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <ServiceFinder />
          <ProcessSection />
          <TrustStrip />
          <GallerySection />
          <Testimonials />
          <FaqSection />
          <BookingCTA />
          <Districts />
          <InstagramEmbed />
          <NewsletterSignup />
        </main>
        <Footer />
        <WhatsAppButton />
        <MobileActionBar />
      </SiteProvider>
    </>
  );
}
