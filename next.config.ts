import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "192.168.100.81",
    //     port: "8001",
    //     pathname: "/media/uploads/blog/**",
    //   },
    // ],
    domains: [
      "192.168.100.81",
      "res.cloudinary.com",
    ]
  },
};

export default nextConfig;
