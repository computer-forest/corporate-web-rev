import type { NextConfig } from "next";
import { environment, currentEnvironment } from "./src/environments/environment";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: environment.basePath || undefined,
  // "standalone" is a production packaging mode. Leaving it on for `next dev`
  // stops Next from emitting .next/routes-manifest.json, so the first 404
  // (e.g. /favicon.ico) throws ENOENT and every later request 500s.
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  sassOptions: {
    includePaths: ["./src"],
    additionalData: `$public-base-path: "${environment.basePath || ""}";`,
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.fathomgrid.com" }],
    unoptimized: true,
  },

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
