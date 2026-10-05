import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sirnak/shared"],
  async redirects() {
    // Hizmet adresi yazım hatasıyla yayına çıkmıştı; eski bağlantılar ve Google kaydı yeni adrese taşınır.
    return [{ source: "/hizmetler/kaniklik-acma", destination: "/hizmetler/tikaniklik-acma", permanent: true }];
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
