import { joinTr, phoneDigits } from "@sirnak/shared";

/** "+905442167009" -> "0544 216 70 09"; çözülemezse boş. */
export function phoneTr(phone?: string | null): string {
  const d = phoneDigits(phone).replace(/^90/, "");
  if (d.length !== 10) return "";
  return `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

/** Arama sonucunda numara görünsün diye başlığın sonuna eklenir. */
export function withPhone(title: string, phone?: string | null): string {
  const tel = phoneTr(phone);
  return tel ? `${title} | ☎ ${tel}` : title;
}

// Google'da aranan ifadeler ("şırnak fıtıkçı", "cizre eve gelen masör") sayfa
// başlıklarında ve H1'lerde birebir geçsin diye tek yerde tutulur.
// İşletme seyyar çalışır (salon yok); metinler "adresinize geliyoruz" üzerine kuruludur.
export const seoCopy = {
  servicesTitle: "Şırnak Masaj Fiyatları ve Hizmetleri",
  servicesIntro:
    "Tüm masajları evinize gelerek uyguluyoruz. Fiyatlar seansın süresine ve uygulamaya göre değişir; net ücret randevu sırasında söylenir.",
  priceFaq: (service: string, price: string) => ({
    q: `Şırnak'ta ${service.toLocaleLowerCase("tr-TR")} fiyatı ne kadar?`,
    a: `${service} için fiyatlarımız ${price} arasındadır. Net ücret seansın süresine göre randevu sırasında söylenir.`,
  }),
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
