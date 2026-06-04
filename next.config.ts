import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
/** GitHub Pages: /{repository-name} (예: /portal-admin). 로컬 prod 테스트 시 env로 지정 */
const basePath = isProd ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath && { basePath, assetPrefix: basePath }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
