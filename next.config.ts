import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-r21r.onrender.com',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
