import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

export default function config(phase: string): NextConfig {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;

  return withMDX({
    pageExtensions: [...(dev ? ["dev.tsx", "dev.ts"] : []), "ts", "tsx", "mdx"],
    typescript: { tsconfigPath: dev ? "tsconfig.json" : "tsconfig.build.json" },
    experimental: {
      serverActions: { bodySizeLimit: "5mb" },
    },
    async headers() {
      return [{ source: "/:path*", headers: SECURITY_HEADERS }];
    },
  });
}
