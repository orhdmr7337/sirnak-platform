import { joinTr } from "@sirnak/shared";

// Google'da aranan ifadeler ("şırnak masaj", "cizre masaj salonu") sayfa
// başlıklarında ve H1'lerde birebir geçsin diye tek yerde tutulur.
export const seoCopy = {
  servicesTitle: "Şırnak Masaj Hizmetleri",
  districtsTitle: "Şırnak İlçelerinde Masaj Hizmeti",
  districtTitle: (district: string) => `${district} Masaj Salonu & Masaj Hizmeti`,
  districtH1: (district: string) => `${district} Masaj Hizmetleri`,
  districtSubtitle: "Profesyonel ve Doğal Masaj",
  districtIntro: (district: string, siteName: string, services: string[], hours?: string | null) =>
    [
      `${district} bölgesinde masaj hizmeti arıyorsanız ${siteName} olarak yanınızdayız.` +
        (services.length ? ` ${joinTr(services)} seçeneklerimizle ${district} müşterilerimize hizmet veriyoruz.` : ""),
      `Randevu almak veya hangi masajın size uygun olduğunu öğrenmek için bizi arayabilir ya da WhatsApp'tan yazabilirsiniz.` +
        (hours ? ` Çalışma saatlerimiz: ${hours}.` : ""),
    ],
  serviceTitle: (service: string) => `Şırnak ${service}`,
  serviceAreasHeading: (service: string) => `${service} Hizmeti Verdiğimiz İlçeler`,
};
