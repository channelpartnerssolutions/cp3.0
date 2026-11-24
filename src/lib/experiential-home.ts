// Copy for the Experiential Marketing home page (/experiential-marketing),
// rendered by components/experiential/ExperientialHome with the shared
// pillar-home sections. Headlines are uppercased by the type styles, so
// they're written in sentence case with no terminal punctuation.

import type { FeaturedWorkItem } from "@/components/pillar-home/FeaturedWorkCarousel";
import type { InsightPost } from "@/components/pillar-home/InsightCards";
import type { BandLogo } from "@/components/pillar-home/LogoBand";
import type { ExperientialImage } from "@/lib/experiential-solutions";

const CASE_IMG = "/images/experiential/case-studies";
const BRANDS = "/images/experiential/brands";

export const experientialHero = {
  title: "We Create Experiences That Turn Consumers Into Believers",
  video: "/videos/experiential/hero-sizzle.mp4",
};

export const experientialIntro = {
  watermark: ["Experiential", "Activate"] as [string, string],
  heading: ["The Scale of an Enterprise", "The Speed of a Boutique"] as [string, string],
  body: "We’ve been designing and producing live brand experiences and employee engagement programs for more than 25 years. We bring the scale of a full-service organization and the speed of a boutique agency to every activation, launch, conference, and company-wide moment we build.",
};

// Cards with an entry in case-studies.ts take their title, image and result
// from it (see featuredWorkItems); the copy here is the fallback.
export const experientialWork: FeaturedWorkItem[] = [
  { slug: "story-of-us", title: "The Story of Us", image: `${CASE_IMG}/story-of-us.png`, stat: { value: "One", label: "Guinness World Record" } },
  { slug: "go2022", title: "Go2022", image: `${CASE_IMG}/go2022.png`, stat: { value: "800+", label: "Attendees" } },
  {
    slug: "global-executive-partner-summit",
    title: "Global Executive Partner Summit",
    image: `${CASE_IMG}/global-executive-partner-summit.jpeg`,
    stat: { value: "4", label: "Day global summit" },
  },
  { slug: "no-quiet-please", title: "No Quiet Please", image: `${CASE_IMG}/no-quiet-please.png`, stat: { value: "One", label: "Clio Award" } },
  { slug: "aerofit-mobile-tour", title: "Aerofit Mobile Tour", image: `${CASE_IMG}/aerofit-mobile-tour.png`, stat: { value: "13,811", label: "Total product trials" } },
];

export const experientialLogos: { heading: string; logos: BandLogo[] } = {
  heading: "creating experiences for the biggest names across industries",
  logos: [
    { src: `${BRANDS}/visa.svg`, name: "Visa", w: 68, h: 22 },
    { src: `${BRANDS}/verizon.svg`, name: "Verizon", w: 103, h: 23 },
    { src: `${BRANDS}/qualcomm.svg`, name: "Qualcomm", w: 132, h: 24 },
    { src: `${BRANDS}/oracle.svg`, name: "Oracle", w: 146, h: 19 },
    { src: `${BRANDS}/microsoft.svg`, name: "Microsoft", w: 119, h: 25 },
    { src: `${BRANDS}/motorola.svg`, name: "Motorola", w: 143, h: 33 },
    { src: `${BRANDS}/northwell.svg`, name: "Northwell Health", w: 95, h: 52 },
    { src: `${BRANDS}/nbc.svg`, name: "NBC", w: 97, h: 24 },
    { src: `${BRANDS}/meta.svg`, name: "Meta", w: 93, h: 19 },
    // The source asset is stored upside-down in Figma; flipped to match.
    { src: `${BRANDS}/lufthansa.svg`, name: "Lufthansa", w: 124, h: 22, flipY: true },
    { src: `${BRANDS}/dyson.svg`, name: "Dyson", w: 73, h: 28 },
    { src: `${BRANDS}/google.svg`, name: "Google", w: 97, h: 30 },
    { src: `${BRANDS}/anker.svg`, name: "Anker", w: 106, h: 25 },
    { src: `${BRANDS}/amd.svg`, name: "AMD", w: 97, h: 23 },
    { src: `${BRANDS}/adidas.svg`, name: "Adidas", w: 56, h: 33 },
  ],
};

// One photo per solution (pillars.ts slug).
// TODO(content): final photography for each tile (Figma shows placeholders).
export const experientialSolutions = {
  heading: ["we love what we do", "and we think it shows"] as [string, string],
  images: {
    "brand-activations": { src: `${CASE_IMG}/no-quiet-please.png`, alt: "Adidas x Pharrell Williams No Quiet Please activation" },
    "conferences-b2b-events": { src: `${CASE_IMG}/global-executive-partner-summit.jpeg`, alt: "Global Executive Partner Summit" },
    "employee-engagement": { src: `${CASE_IMG}/story-of-us.png`, alt: "Northwell Health The Story of Us" },
  } as Record<string, ExperientialImage>,
};

// TODO(content): placeholder posts until the blog has Experiential articles.
export const experientialInsights: { heading: string; intro: string; posts: InsightPost[] } = {
  heading: "more than work, creating experiences is our passion",
  intro: "When you put this many experts together in one room, you’re going to get a lot of opinions. We thought we’d share ours.",
  posts: [
    {
      slug: "experiential-isnt-an-event",
      title: "Experiential isn't an event. It's a business strategy.",
      date: "09/10/2026",
      author: "Elizabeth Jones, SVP, Client Service, Experiential",
      image: "/images/experiential/blog/post-photo.png",
    },
    {
      slug: "what-makes-a-launch-worth-walking-into",
      title: "What makes a launch worth walking into",
      date: "08/22/2026",
      author: "Elizabeth Jones, SVP, Client Service, Experiential",
      image: "/images/experiential/blog/post-photo.png",
    },
  ],
};

export const experientialCta = {
  heading: "let’s create something",
  body: "Tell us what you’re building: a launch, a tour, a summit, a rally, and we’ll tell you what it takes to make it real.",
};
