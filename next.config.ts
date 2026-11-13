import type { NextConfig } from "next";

// The WordPress install the blog reads from (see src/lib/blog.ts).
const WORDPRESS_URL = (process.env.WORDPRESS_URL ?? "https://channelpartners.com").replace(/\/$/, "");

// Top-level paths the new site owns; an old post slug matching one of these
// must not be redirected into the blog.
const RESERVED_ROOT_PATHS = new Set([
  "about", "api", "best-buy", "blog", "careers", "contact", "solutions",
  "target-preferred-merchandising-partner", "best-buy-approved-3pl-provider",
  "retail-execution", "training-enablement", "experiential-marketing",
]);

// On the old site every post lived at the root (channelpartners.com/<slug>/);
// the new site serves them at /blog/<slug>. Read the slugs from WordPress at
// build so each old URL gets a permanent redirect. If WordPress can't be
// reached the build carries on without them.
async function blogPostRedirects() {
  const slugs: string[] = [];
  try {
    for (let page = 1; ; page++) {
      const res = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=slug`);
      if (!res.ok) throw new Error(String(res.status));
      slugs.push(...((await res.json()) as { slug: string }[]).map((p) => p.slug));
      if (page >= Number(res.headers.get("x-wp-totalpages") ?? 1)) break;
    }
  } catch (error) {
    console.warn(`Skipping blog post redirects: couldn't list WordPress posts (${error})`);
    return [];
  }
  return slugs
    .filter((slug) => !RESERVED_ROOT_PATHS.has(slug))
    .map((slug) => ({ source: `/${slug}`, destination: `/blog/${slug}`, permanent: true }));
}

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
  images: {
    // Blog featured images stay in the WordPress media library.
    remotePatterns: [new URL(`${WORDPRESS_URL}/wp-content/uploads/**`)],
  },
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
      // The Best Buy page kept the old site's /best-buy URL; this placeholder
      // address was linked from the new site before that.
      { source: "/best-buy-approved-3pl-provider", destination: "/best-buy", permanent: true },
      // Old WordPress solution URLs on channelpartners.com.
      ...Object.entries({
        "audits-and-compliance-services": "audits-compliance",
        "assisted-sales-and-training": "assisted-sales-training",
        construction: "construction",
        merchandising: "merchandising",
        "break-fix-and-continuity": "break-fix",
        "warehousing-fulfillment-and-logistics": "warehousing-fulfillment-logistics",
      }).map(([oldSlug, slug]) => ({
        source: `/solutions/${oldSlug}`,
        destination: `/retail-execution/solutions/${slug}`,
        permanent: true,
      })),
      ...(await blogPostRedirects()),
    ];
  },
};

export default nextConfig;
