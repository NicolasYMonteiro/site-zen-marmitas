import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // DESATIVE StrictMode para evitar conflitos
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY' // Evita que outras páginas frameem seu admin
          }
        ],
      },
    ];
  },
  // Importante para arquivos estáticos
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;