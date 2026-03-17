import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "themes.envytheme.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.rocket.new",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "i.pravatar.cc",
      "images.unsplash.com",
      "themes.envytheme.com",
      "lh3.googleusercontent.com",
      "img.rocket.new",
    ],
  },
};

export default nextConfig;
