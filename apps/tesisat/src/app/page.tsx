import type { Metadata } from "next";
import { getSiteData, buildFaqJsonLd } from "@sirnak/shared";
import { SiteProvider } from "@sirnak/shared";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import QuickActions from "@/components/QuickActions";
import WhatWeDo from "@/components/WhatWeDo";
import WhyUs from "@/components/WhyUs";
import ProcessSection from "@/components/ProcessSection";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Districts from "@/components/Districts";
import InstagramEmbed from "@/components/InstagramEmbed";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";

export const revalidate = 300;

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function TesisatPage() {
  const data = await getSiteData("tesisat");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const faqLd = buildFaqJsonLd(data.faqs);

  return (
    <SiteProvider data={data}>
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Header />
      <main>
        <Hero />
        <QuickActions />
        <WhatWeDo />
        <WhyUs />
        <GallerySection />
        <ProcessSection />
        <Testimonials />
        <ContactCTA />
        <FaqSection />
        <Districts />
        <InstagramEmbed />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </SiteProvider>
  );
}
