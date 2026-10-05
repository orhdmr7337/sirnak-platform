import { joinTr } from "@sirnak/shared";

// Google'da aranan ifadeler ("cizre tesisatçı", "şırnak tıkanıklık açma") sayfa
// başlıklarında ve H1'lerde birebir geçsin diye tek yerde tutulur.
export const seoCopy = {
  servicesTitle: "Şırnak Tesisat ve Elektrik Hizmetleri",
  districtsTitle: "Şırnak İlçelerinde Tesisatçı ve Elektrikçi",
  districtTitle: (district: string) => `${district} Tesisatçı & Elektrikçi 7/24`,
  districtH1: (district: string) => `${district} Tesisatçı ve Elektrikçi`,
  districtSubtitle: "7/24 Tesisat, Elektrik ve Acil Arıza Hizmeti",
  districtIntro: (district: string, siteName: string, services: string[], hours?: string | null) =>
    [
      `${district} ve çevresinde tesisat, elektrik ve acil arıza işleriniz için ${siteName} olarak hizmet veriyoruz.` +
        (services.length ? ` ${joinTr(services)} hizmetlerini ${district} genelinde ev ve iş yerlerinde yerinde yapıyoruz.` : ""),
      `${district} içinde su kaçağı, tıkanıklık ya da elektrik arızası gibi bekletilmemesi gereken bir sorununuz varsa bizi arayın veya WhatsApp'tan konum atın, adresinize usta yönlendirelim.` +
        (hours ? ` Çalışma saatlerimiz: ${hours}.` : ""),
    ],
  serviceTitle: (service: string) => `Şırnak ${service}`,
  serviceAreasHeading: (service: string) => `${service} Hizmeti Verdiğimiz İlçeler`,
};
