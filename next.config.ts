import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
    ],
  },
  reactComponentAnnotation: {
    enabled: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
