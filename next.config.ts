import type { NextConfig } from "next";

// Baseline security headers for every route. A full Content-Security-Policy is
// a separate go-live item: GTM, HubSpot and the ad pixels load scripts from many
// hosts, so it needs testing against the live tag setup before it's enforced.
const securityHeaders = [
  // Don't let other sites frame these pages (clickjacking).
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The careers job map asks for the visitor's location; nothing uses the rest.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), payment=(), usb=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // The per-pillar solutions overview pages were removed (Solutions is a
      // dropdown now); send old links and bookmarks to the pillar home page.
      {
        source: "/:pillar(retail-execution|training-enablement|experiential-marketing)/solutions",
        destination: "/:pillar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
