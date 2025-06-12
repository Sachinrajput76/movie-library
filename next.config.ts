import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "img.omdbapi.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
