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
      `${district} ve çevresinde tesisat, elektrik ve acil arıza işleriniz için ${siteName} olarak aracımızla adresinize geliyoruz.` +
        (services.length ? ` ${joinTr(services)} hizmetlerini ${district} genelinde ev ve iş yerlerinde yerinde yapıyoruz.` : ""),
      `${district} içinde su kaçağı, tıkanıklık ya da elektrik arızası gibi bekletilmemesi gereken bir sorununuz varsa bizi arayın veya WhatsApp'tan konum atın, adresinize usta yönlendirelim.` +
        (hours ? ` Çalışma saatlerimiz: ${hours}.` : ""),
    ],
  serviceTitle: (service: string) => `Şırnak ${service}`,
  serviceAreasHeading: (service: string) => `${service} Hizmeti Verdiğimiz İlçeler`,
};

/** Türkçe bulunma eki: "Cizre'de", "Beytüşşebap'ta", "Şırnak Merkez'de". */
export function locative(name: string): string {
  const lower = name.toLocaleLowerCase("tr-TR");
  const vowels = lower.match(/[aeıioöuü]/g);
  const last = vowels ? vowels[vowels.length - 1] : "e";
  const back = "aıou".includes(last);
  const hard = "fstkçşhp".includes(lower[lower.length - 1]);
  return `${name}'${hard ? "t" : "d"}${back ? "a" : "e"}`;
}

/** İlçe + hizmet sayfası açılan (sitemap'e giren) en çok aranan hizmetler. */
export const LOCAL_SERVICE_SLUGS = [
  "tikaniklik-acma",
  "gider-acma",
  "wc-tikanikligi-acma",
  "su-kacagi-tespiti",
  "kombi-bakimi",
  "kombi-tamiri",
  "petek-temizligi",
  "su-tesisati",
];

export const localCopy = {
  title: (district: string, service: string) => `${district} ${service} 7/24`,
  h1: (district: string, service: string) => `${district} ${service}`,
  intro: (district: string, service: string, siteName: string) => [
    `${locative(district)} ${service.toLocaleLowerCase("tr-TR")} için ${siteName} olarak aracımız ve ekipmanımızla adresinize geliyoruz. Sorunu yerinde tespit edip mümkün olan en kısa sürede, kırmadan ve temiz şekilde çözmeye çalışıyoruz.`,
    `${district} genelinde ev, apartman ve iş yerlerinde çalışıyoruz. Acil durumlarda 7/24 arayabilir ya da WhatsApp'tan konum atarak ustamızı çağırabilirsiniz.`,
  ],
  faqs: (district: string, service: string) => [
    {
      q: `${locative(district)} ${service.toLocaleLowerCase("tr-TR")} hizmeti veriyor musunuz?`,
      a: `Evet. ${district} genelindeki tüm mahallelere aracımızla geliyor, ${service.toLocaleLowerCase("tr-TR")} işini yerinde yapıyoruz.`,
    },
    {
      q: `${locative(district)} ${service.toLocaleLowerCase("tr-TR")} fiyatı ne kadar?`,
      a: "Fiyat işin büyüklüğüne göre değişir. WhatsApp'tan fotoğraf veya video gönderirseniz ön bilgi veririz; net ücret yerinde görüldükten sonra, işe başlamadan önce konuşulur.",
    },
    {
      q: `${district} için gece veya hafta sonu gelir misiniz?`,
      a: "Evet, acil işler için 7/24 ulaşabilirsiniz.",
    },
  ],
};
