import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — deploys to any static host (Netlify) with no server runtime.
  output: "export",
  // Required for static export: skip the Image Optimization server.
  images: { unoptimized: true },
  // Emit /route/index.html so clean URLs work on static hosts.
  trailingSlash: true,
};

export default nextConfig;
