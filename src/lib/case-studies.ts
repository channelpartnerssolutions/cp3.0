// Case studies, one entry per page at /<pillar>/case-studies/<slug>.
//
// To add one: append an entry below. Every case study follows the same
// formula: The Ask (one paragraph), What We Did (one or more paragraphs), and
// a row of headline stats. Put images in /public/images/case-studies/ (or
// reuse an existing one). `gallery` is optional and only renders when set.
// Stat values may include text ("3 days"); the number part counts up.

export type CaseStudy = {
  slug: string;
  pillar: string;
  client: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  ask: string;
  whatWeDid: string[];
  stats: { value: string; label: string }[];
  gallery?: { src: string; alt: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "meta-global-training-event",
    pillar: "training-enablement",
    client: "Meta",
    title: "Global Training Event",
    summary:
      "A three-day global training event that prepared Meta’s field teams to launch five new products across eight global regions.",
    image: {
      src: "/images/hero/state-training.jpg",
      // TODO(content): swap in a photo from the Meta event (and describe it here).
      alt: "Attendees at a Channel Partners training session",
    },
    ask: "Deliver a three-day global training event that equipped Meta’s field teams with the knowledge, confidence, and connections to successfully launch five new products and drive customer conversations across eight global regions.",
    whatWeDid: [
      "Provided end-to-end strategy, production, and event management, including attendee logistics, travel, registration, venue management, environmental branding, scenic fabrication, content production, executive presentations, immersive product demonstrations, networking experiences, food and beverage, and onsite operations.",
      "Across 15 action-packed training sessions, hands-on product labs, and collaborative workshops, we created a polished learning experience that empowered field teams to return to market ready to educate customers and close deals.",
    ],
    stats: [
      { value: "3 days", label: "Global training experience" },
      { value: "134", label: "Field trailblazers" },
      { value: "8", label: "Global regions represented" },
      { value: "15", label: "Training sessions" },
    ],
  },
];

export function getCaseStudy(pillar: string, slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.pillar === pillar && c.slug === slug);
}

export function caseStudiesFor(pillar: string): CaseStudy[] {
  return caseStudies.filter((c) => c.pillar === pillar);
}
