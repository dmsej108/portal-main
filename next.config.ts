import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/potal-admin",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
