import { getSiteData } from "@sirnak/shared";
import { SiteProvider } from "@sirnak/shared";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import ServiceFinder from "@/components/ServiceFinder";
import ProcessSection from "@/components/ProcessSection";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Districts from "@/components/Districts";
import InstagramEmbed from "@/components/InstagramEmbed";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";

export const revalidate = 300;

export default async function TesisatPage() {
  const data = await getSiteData("tesisat");

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Çözüm Noktası Tesisat
          </h1>
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <SiteProvider data={data}>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <ServiceFinder />
        <ProcessSection />
        <GallerySection />
        <Testimonials />
        <FaqSection />
        <Districts />
        <ContactCTA />
        <InstagramEmbed />
        <NewsletterSignup />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </SiteProvider>
  );
}
