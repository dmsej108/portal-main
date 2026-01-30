import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/event", // 리다이렉트할 경로
        permanent: false, // false: 307 (임시), true: 308 (영구)
      },
    ];
  },
};

export default nextConfig;
