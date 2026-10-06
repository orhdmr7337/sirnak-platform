import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sirnak/shared"],
  async redirects() {
    // Hizmet adresi yazım hatasıyla yayına çıkmıştı; eski bağlantılar ve Google kaydı yeni adrese taşınır.
    const legacy: [string, string][] = [
      // cozumnoktasi.tr (eski site) adresleri, alan adı bu siteye bağlandığında boşa düşmesin.
      ["/Hakkimizda.html", "/belgeler"],
      ["/iletisim.html", "/#iletisim"],
      ["/Sayfa/133/galeri", "/#galeri"],
      ["/Sayfa/331/hizmetlerimiz", "/hizmetler"],
      ["/Sayfa/332/hizmet-bolgelerimiz", "/ilceler"],
      ["/Sayfa/326/sirnak-sihhi-tesisat", "/hizmetler/sihhi-tesisat"],
      ["/Sayfa/327/sirnak-tikaniklik-acma", "/hizmetler/tikaniklik-acma"],
      ["/Sayfa/328/sirnak-lavabo-acma", "/hizmetler/lavabo-tikanikligi-acma"],
      ["/Sayfa/329/sirnak-gider-acma", "/hizmetler/gider-acma"],
      ["/Sayfa/333/sirnak-petek-temizligi", "/hizmetler/petek-temizligi"],
      ["/Sayfa/334/sirnak-kombi-bakimi", "/hizmetler/kombi-bakimi"],
      ["/Sayfa/337/sirnak-kombi-bakimi", "/hizmetler/kombi-bakimi"],
      ["/Sayfa/335/sirnak-elektrik-tesisati", "/hizmetler/elektrik-tesisati"],
      ["/Sayfa/336/sirnak-su-deposu-kurulumu", "/hizmetler/su-deposu-kurulumu"],
      ["/Sayfa/338/sirnak-su-kacagi-tespiti", "/hizmetler/su-kacagi-tespiti"],
      ["/Sayfa/339/sirnak-termosifon-bakimi", "/hizmetler/termosifon-montaji"],
      ["/Sayfa/340/beytussebap-tikaniklik-acma", "/ilceler/beytussebap/tikaniklik-acma"],
      ["/Sayfa/341/cizre-tikaniklik-acma", "/ilceler/cizre/tikaniklik-acma"],
      ["/Sayfa/342/guclukonak-tikaniklik-acma", "/ilceler/guclukonak/tikaniklik-acma"],
      ["/Sayfa/343/idil-tikaniklik-acma", "/ilceler/idil/tikaniklik-acma"],
      ["/Sayfa/344/silopi-tikaniklik-acma", "/ilceler/silopi/tikaniklik-acma"],
      ["/Sayfa/345/uludere-tikaniklik-acma", "/ilceler/uludere/tikaniklik-acma"],
    ];
    return [
      { source: "/hizmetler/kaniklik-acma", destination: "/hizmetler/tikaniklik-acma", permanent: true },
      ...legacy.flatMap(([from, to]) => [
        { source: from, destination: to, permanent: true },
        { source: `${from}/`, destination: to, permanent: true },
      ]),
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
