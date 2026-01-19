import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "baseagrodata.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
