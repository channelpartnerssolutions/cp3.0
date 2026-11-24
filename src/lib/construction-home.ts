// Copy for the Construction & Logistics home page (/construction-logistics),
// from the "Construction & Logistics Homepage: Draft Copy" doc (Nov 23,
// 2026). Rendered by components/construction/ConstructionHome. Headlines
// are uppercased by the type styles, so they're written in sentence case
// with no terminal punctuation. [Bracketed] text is still to fill and is
// highlighted on the page (WithPlaceholders).
//
// Open items from the doc are marked TODO(content): the H1 choice, one
// canonical warehouse footprint and the 87% reach, the years figure, the
// Primark and Walgreens numbers, logo clearance, the leaders and the
// Insights authors.

import type { ExperientialImage } from "@/lib/experiential-solutions";

const IMG = "/images/retail/solutions";
const BRANDS = "/images/homepage/brands";

export const constructionHero = {
  // TODO(content): pick the H1. Alternates: "Every Part on Site. Every
  // Install Date Held." / "From the Factory Dock to the Finished Floor, One
  // Partner Owns It".
  title: "We Build and Deliver the Stores Your Programs Run On",
  // TODO(content): ULTA prestige remodel or warehouse-to-store footage
  // (Baltimore walkthrough planned).
  image: { src: `${IMG}/construction-hero.png`, alt: "A store remodel in progress" },
};

export const constructionIntro = {
  heading: ["The Network of a National Builder", "The Precision of One Program Manager"] as [string, string],
  // TODO(content): confirm the 87% two-day reach with Ops.
  body: "Most remodels and rollouts fail on the parts. A shipment comes in 80% complete, a crew waits on Part B, and the install date moves. We run your project as one program: scan the space, build it out, deliver every store-specific kit on a date-definite schedule, and install it with one project manager accountable from first scan to closeout binder. Our warehouse network sits within two days of [87%] of U.S. shoppers, so materials land before the crew does.",
};

export type ConstructionWork = {
  title: string;
  value: string;
  label: string;
  image: ExperientialImage;
  href?: string;
};

// TODO(content): link each card once its case study is written. Primark
// Store Fixtures (cleared, number needed) and Walgreens Tester Replenishment
// (to confirm) join once their numbers come through; until then the doc
// says run three.
export const constructionWork: ConstructionWork[] = [
  {
    title: "Ahold USA Center Store Remodels",
    value: "40,000",
    label: "Parts managed and delivered to remodel crews",
    image: { src: `${IMG}/warehousing-hero.png`, alt: "Store-specific kits staged in the warehouse" },
  },
  {
    title: "L’Oréal Wall Conversion at ULTA",
    value: "1,500",
    label: "Walls converted, with 800,000 lbs of old fixtures diverted from landfill",
    image: { src: `${IMG}/construction-handoffs.png`, alt: "A crew setting a new wall system" },
  },
  {
    title: "ULTA Prestige Remodels",
    value: "700",
    label: "Stores remodeled with 24/7 precision delivery to contractors",
    image: { src: `${IMG}/construction-project-center.png`, alt: "An ULTA store remodel" },
  },
];

// `src` is optional: a client without a cleared logo file shows its name.
// TODO(content): Ahold USA and Primark logo files; Samsung is TBD for
// fixture work; the legacy list (Kroger, 7-Eleven, Dollar Tree, Circle K,
// Amazon…) needs clearance first.
export const constructionClients: {
  heading: string;
  logos: { name: string; src?: string; w: number; h: number }[];
  scale: { value: string; label: string }[];
} = {
  heading: "building and delivering for the biggest names in retail",
  logos: [
    { name: "Ahold USA", w: 120, h: 30 },
    { name: "ULTA Beauty", src: `${BRANDS}/ulta-1.svg`, w: 110, h: 40 },
    { name: "L’Oréal", src: `${BRANDS}/loreal.svg`, w: 132, h: 24 },
    { name: "Primark", w: 120, h: 30 },
  ],
  // TODO(content): nothing publishes until Ops issues one canonical
  // warehouse count (the current site shows two conflicting sets).
  scale: [
    { value: "[#]", label: "Warehouses" },
    { value: "[#]", label: "States" },
    { value: "[#]", label: "Square feet" },
    { value: "[87%]", label: "Of U.S. shoppers within two days" },
  ],
};

// One photo per solution slug (pillars.ts); 3D Mapping has none yet.
export const constructionSolutions = {
  heading: ["one program from first scan", "to the last fixture in place"] as [string, string],
  images: {
    construction: { src: `${IMG}/construction-hero.png`, alt: "A remodel in progress in an open store" },
    installation: { src: `${IMG}/construction-handoffs.png`, alt: "A crew setting a new wall system" },
    "warehousing-fulfillment-logistics": { src: `${IMG}/warehousing-network.jpg`, alt: "Store-specific kits staged in the warehouse" },
  } as Record<string, ExperientialImage>,
  // TODO(content): Matterport store scan photo for 3D Mapping.
};

// TODO(content): no posts exist yet for this pillar; suggested titles,
// authors to assign.
export const constructionInsights = {
  heading: "more than work, building stores is what we know",
  intro: "From the warehouse floor to the job site, here’s what we’re seeing.",
  posts: [
    {
      slug: "rollout-slips-on-the-parts",
      title: "The number one reason a retail rollout slips is the parts",
      author: "[Warehousing, Fulfillment, & Logistics lead]",
      image: { src: `${IMG}/warehousing-hero.png`, alt: "" },
    },
    {
      slug: "remodel-without-closing",
      title: "How to remodel a store without closing it",
      author: "[Construction lead]",
      image: { src: `${IMG}/construction-hero.png`, alt: "" },
    },
  ],
};

export const constructionCta = {
  heading: "let’s build it",
  body: "Send us your store list, your drawings, or just the date it all has to be done: a chain-wide remodel, a new fixture rollout, a wall conversion. We’ll show you how one team gets every part and every crew there on time.",
  ctaLabel: "Scope Your Project",
};
