import { joinTr } from "@sirnak/shared";

// Google'da aranan ifadeler ("şırnak fıtıkçı", "cizre eve gelen masör") sayfa
// başlıklarında ve H1'lerde birebir geçsin diye tek yerde tutulur.
// İşletme seyyar çalışır (salon yok); metinler "adresinize geliyoruz" üzerine kuruludur.
export const seoCopy = {
  servicesTitle: "Şırnak'ta Eve Gelen Masaj Hizmetleri",
  districtsTitle: "Şırnak İlçelerinde Eve Gelen Masör",
  districtTitle: (district: string) => `${district} Eve Gelen Masör & Fıtıkçı`,
  districtH1: (district: string) => `${district} Eve Gelen Masaj`,
  districtSubtitle: "Fıtık, Kulunç ve Rahatlama Masajı – Adresinize Geliyoruz",
  districtIntro: (district: string, siteName: string, services: string[], hours?: string | null) =>
    [
      `${district} içinde masaj için bir yere gitmenize gerek yok: ${siteName} olarak seyyar çalışıyor, randevu verdiğiniz saatte evinize geliyoruz.` +
        (services.length ? ` ${joinTr(services)} gibi hizmetleri ${district} genelinde adresinizde uyguluyoruz.` : ""),
      `Randevu almak veya şikâyetinize hangi masajın uygun olduğunu öğrenmek için bizi arayabilir ya da WhatsApp'tan yazabilirsiniz.` +
        (hours ? ` Çalışma saatlerimiz: ${hours}.` : ""),
    ],
  serviceTitle: (service: string) => `Şırnak ${service}`,
  serviceAreasHeading: (service: string) => `${service} İçin Geldiğimiz İlçeler`,
};
