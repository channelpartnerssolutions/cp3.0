// Copy for the Retail Execution home page (/retail-execution), from the
// "Retail Execution Homepage: Draft Copy" doc (Nov 23, 2026). Rendered by
// components/retail/RetailHome in the plain shared layout
// (SimplePillarHome). Headlines are uppercased by the type styles,
// so they're written in sentence case with no terminal punctuation.
//
// Open items from the doc are marked TODO(content): the H1 choice, the
// years figure, the Samsung result, Canon clearance, the leaders, logo
// clearance and the Insights authors.

import type { FeaturedWorkItem } from "@/components/pillar-home/FeaturedWorkCarousel";
import type { InsightPost } from "@/components/pillar-home/InsightCards";
import type { BandLogo } from "@/components/pillar-home/LogoBand";
import type { ExperientialImage } from "@/lib/experiential-solutions";

const IMG = "/images/retail/solutions";

export const retailHero = {
  // TODO(content): pick the H1. Alternates: "Every Door Set to Spec. Every
  // Visit Reported Live." / "Your Retail Program, Owned End to End by One
  // Field Team".
  title: "We Run Retail Programs That Turn Shelf Space Into Sell-Through",
  // TODO(content): swap for the Samsung Assisted Selling Program footage
  // (cleared for hero use) once it's delivered.
  image: { src: `${IMG}/assisted-sales-hero.png`, alt: "A Channel Partners specialist helping a shopper on the sales floor" },
};

export const retailIntro = {
  heading: ["The Reach of a National Field Team", "The Accountability of One Partner"] as [string, string],
  // TODO(content): set the years figure (35+ legacy merchandising copy, or
  // 40+ per the Best Buy one-sheet).
  body: "Your merchandising, audits, break fix, and in-store sales programs run on one W-2 field team, with one point of contact and a live view of every door in OpenSky™. When a display falls out of spec, you know before the specialist leaves the store, and the same specialist fixes it. That’s how 40+ years in retail execution shows up in your sell-through, on-shelf availability, and uptime.",
  // From the live channelpartners.com homepage and its FAQs.
  stats: [
    { value: "40+", label: "Years in retail execution" },
    { value: "7500+", label: "W-2 field representatives" },
    { value: "2000+", label: "Stores in a single full-chain rollout" },
    { value: "100%", label: "W-2 employees, no gig labor" },
  ],
};

// TODO(content): link the two audit cards once their case studies are
// written; the Samsung result; Canon POG Compliance (46% better device
// uptime) replaces the Target card once Canon is cleared.
export const retailWork: FeaturedWorkItem[] = [
  {
    slug: "beverage-inventory-audit",
    title: "Beverage Inventory Audit",
    image: `${IMG}/case-study-placeholder.jpg`,
    stat: { value: "7.2X", label: "Lift, with 48.9% less void and phantom inventory" },
  },
  {
    slug: "health-beauty-audit-program",
    title: "Health & Beauty Audit Program",
    image: `${IMG}/audits-hero.jpg`,
    stat: { value: "7%", label: "Category increase after audit-led store prioritization" },
  },
  {
    slug: "best-buy-approved-3pl",
    title: "Best Buy Approved 3PL Provider",
    image: "/images/retailers/best-buy-sales.jpg",
    stat: { value: "100%", label: "Of Best Buy service levels approved, US and Canada" },
    href: "/best-buy",
  },
  {
    slug: "samsung-assisted-selling",
    title: "Samsung Assisted Selling Program",
    image: `${IMG}/assisted-sales-hero.png`,
  },
  {
    slug: "target-preferred-merchandising-partner",
    title: "Target Preferred Merchandising Partner",
    image: "/images/retailers/target-hero.jpg",
    href: "/target-preferred-merchandising-partner",
  },
];

// The doors: retailers the corporate homepage already shows. The brands:
// TODO(content): Epson, NYX and Canon appear in the briefs but aren't
// cleared yet; Samsung is.
const BRANDS = "/images/homepage/brands";
export const retailLogos: {
  heading: string;
  retailers: BandLogo[];
  brands: BandLogo[];
  credentials: { href: string; retailer: string; label: string; image: ExperientialImage }[];
} = {
  heading: "trusted in the doors of the biggest retailers, by the brands that sell there",
  retailers: [
    { src: `${BRANDS}/walmart-black.svg`, name: "Walmart", w: 150, h: 28 },
    { src: `${BRANDS}/lowes-retailers.svg`, name: "Lowe’s", w: 64, h: 64 },
    { src: `${BRANDS}/homedepot-retailers.svg`, name: "The Home Depot", w: 56, h: 56 },
    { src: `${BRANDS}/costco.svg`, name: "Costco", w: 120, h: 42 },
    { src: `${BRANDS}/samsclub.svg`, name: "Sam’s Club", w: 130, h: 25 },
    { src: `${BRANDS}/rei.svg`, name: "REI", w: 70, h: 44 },
  ],
  brands: [{ src: `${BRANDS}/samsung.svg`, name: "Samsung", w: 150, h: 24 }],
  credentials: [
    {
      href: "/best-buy",
      retailer: "Best Buy",
      label: "Approved 3PL Provider",
      image: { src: "/images/homepage/retailers/bestbuy.png", alt: "Channel Partners merchandiser at a Best Buy store" },
    },
    {
      href: "/target-preferred-merchandising-partner",
      retailer: "Target",
      label: "Preferred Merchandising Partner",
      image: { src: "/images/homepage/retailers/target.jpg", alt: "Channel Partners merchandiser at a Target store" },
    },
  ],
};

// One photo per solution (pillars.ts slug).
// Card lines from the live channelpartners.com homepage.
export const retailSolutions = {
  heading: ["four services on one field team", "reporting to one view of every door"] as [string, string],
  lines: {
    "audits-compliance": "Trusted oversight that keeps every store accurate and aligned.",
    "assisted-sales-training": "Human expertise that transforms engagement into advocacy.",
    merchandising: "Precision presentation that turns compliance into conversion.",
    "break-fix": "Rapid response that keeps retail performance unbroken.",
  } as Record<string, string>,
  images: {
    "audits-compliance": { src: `${IMG}/audits-hero.jpg`, alt: "A specialist checking a display against spec" },
    "assisted-sales-training": { src: `${IMG}/assisted-sales-hero.png`, alt: "A specialist with a shopper" },
    merchandising: { src: `${IMG}/merchandising-hero.jpg`, alt: "A consumer electronics reset in progress" },
    "break-fix": { src: `${IMG}/break-fix-hero.png`, alt: "A display repair on the sales floor" },
  } as Record<string, ExperientialImage>,
};

// TODO(content): no Retail Execution posts exist yet; suggested titles,
// authors to assign.
export const retailInsights: { heading: string; intro: string; posts: InsightPost[] } = {
  heading: "more than work, retail is where we live",
  intro: "Our specialists are in stores every day. Here’s what they’re seeing.",
  posts: [
    {
      slug: "display-out-of-spec-is-a-lost-sale",
      title: "A display out of spec is a lost sale, not a ticket",
      date: "[Date]",
      author: "[Audits & Compliance lead]",
      image: `${IMG}/audits-hero.jpg`,
    },
    {
      slug: "one-live-view-of-every-door",
      title: "What one live view of every door changes for your sell-through",
      date: "[Date]",
      author: "[Retail Execution leader]",
      image: `${IMG}/merchandising-approach.png`,
    },
  ],
};

export const retailCta = {
  heading: "bring us the challenge",
  body: "Tell us what’s riding on your doors: a launch window, a chain-wide reset, a compliance problem, or a vendor stack that’s grown too big. We’ll show you what it looks like with one accountable team running it.",
  ctaLabel: "Plan Your Program",
};
