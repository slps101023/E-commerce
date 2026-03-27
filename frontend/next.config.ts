import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',           // 留空即可
        pathname: '/**',    // 允許該網域下的所有路徑
      },
    ],
  },
};

export default nextConfig;
