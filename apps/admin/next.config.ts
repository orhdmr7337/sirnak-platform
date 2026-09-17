import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sirnak/shared"],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
