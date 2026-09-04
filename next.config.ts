import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    // Static export has no server to run the /_next/image optimizer,
    // so emit plain <img src="/imgs/..."> that a static host can serve.
    unoptimized: true,
  },
};

export default nextConfig;
