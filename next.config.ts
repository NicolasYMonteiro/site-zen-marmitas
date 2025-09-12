import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // Desabilita ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opcional: também desabilita verificações do TypeScript durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
