import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local SVG logos for the venture map
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
