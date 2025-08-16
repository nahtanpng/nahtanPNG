import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },

  // Configuração dos headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com https://va.vercel-scripts.com https://maps.googleapis.com https://maps.gstatic.com https://github-readme-stats.vercel.app",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://github-readme-stats.vercel.app",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http: https://maps.googleapis.com https://maps.gstatic.com https://github.com https://avatars.githubusercontent.com https://github-readme-stats.vercel.app",
              "media-src 'self' https:",
              "connect-src 'self' https://api.spotify.com https://accounts.spotify.com https://vitals.vercel-analytics.com https://lanyard.cnrad.dev https://maps.googleapis.com https://api.github.com https://github.com https://github-readme-stats.vercel.app",
              "frame-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=(self)',
              'interest-cohort=()',
            ].join(', '),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
