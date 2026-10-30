// Case studies, one entry per page at /<pillar>/case-studies/<slug>. This is
// the only place a case study's story lives: the case study pages, each
// pillar's index, the solution pages' case study panels and the Experiential
// home carousel all read from here.
//
// To add one: append an entry below. Every case study follows the same
// formula: The Problem (a short statement of the problem or the client's
// ask), Our Approach (what we did, one or more paragraphs) and The Outcome
// (three headline results: a big number and a line of supporting copy). The
// optional fields add proof a pillar's buyer looks for (a hero video, a
// client quote, program details like markets or stores) without changing the
// layout; leave them out and their sections don't render. The page is light
// on every pillar.
//
// The first entry in `results` is the study's headline stat: every teaser of
// the study (index tiles, solution page panels, the Experiential home
// carousel) leads with it to pull readers into the full page, so put the
// most striking result first.
//
// Put images in /public/images/case-studies/ (or reuse an existing one).
// Result values may include text ("3 days"); the number part counts up.

export type CaseStudy = {
  slug: string;
  pillar: string;
  // The solution slug (pillars.ts) the work belongs to; presets the contact
  // form and ties the study to its solution page.
  solution?: string;
  client: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  // Muted, looping hero video; `image` is still used for tiles and as the
  // video's backdrop.
  video?: string;
  // One or two sentences: the problem, or what the client asked for.
  problem: string;
  approach: string[];
  // The Outcome: plan for three, ideally numbers (`value`) with a short line
  // of supporting copy (`label`).
  results: { value: string; label: string }[];
  quote?: { text: string; name: string; role: string };
  // Short facts about the program, e.g. { label: "Markets", value: "12" }.
  details?: { label: string; value: string }[];
  gallery?: { src: string; alt: string }[];
};

const EXPERIENTIAL_IMG = "/images/experiential/case-studies";

export const caseStudies: CaseStudy[] = [
  {
    slug: "meta-global-training-event",
    pillar: "training-enablement",
    // TODO(content): confirm the solution.
    solution: "training-delivery",
    client: "Meta",
    title: "Global Training Event",
    summary:
      "A three-day global training event that prepared Meta’s field teams to launch five new products across eight global regions.",
    image: {
      src: "/images/hero/state-training.jpg",
      // TODO(content): swap in a photo from the Meta event (and describe it here).
      alt: "Attendees at a Channel Partners training session",
    },
    problem:
      "Deliver a three-day global training event that equipped Meta’s field teams with the knowledge, confidence, and connections to successfully launch five new products and drive customer conversations across eight global regions.",
    approach: [
      "Provided end-to-end strategy, production, and event management, including attendee logistics, travel, registration, venue management, environmental branding, scenic fabrication, content production, executive presentations, immersive product demonstrations, networking experiences, food and beverage, and onsite operations.",
      "Across 15 action-packed training sessions, hands-on product labs, and collaborative workshops, we created a polished learning experience that empowered field teams to return to market ready to educate customers and close deals.",
    ],
    results: [
      { value: "3 days", label: "Global training experience" },
      { value: "134", label: "Field trailblazers" },
      { value: "8", label: "Global regions represented" },
    ],
  },
  {
    slug: "aerofit-mobile-tour",
    pillar: "experiential-marketing",
    solution: "brand-activations",
    client: "Soundcore",
    title: "Aeroclip 2 & Aerofit Tour",
    // TODO(content): placeholder summary; confirm markets and dates.
    summary: "A mobile tour that put Soundcore’s Aeroclip 2 and Aerofit earbuds in people’s hands, market by market.",
    image: { src: `${EXPERIENTIAL_IMG}/aerofit-mobile-tour.png`, alt: "Soundcore Aerofit mobile tour" },
    // TODO(content): both are placeholders.
    problem: "[What launching Aeroclip 2 and Aerofit had to achieve]",
    approach: ["[The idea behind the tour and why a mobile format; what guests did at each stop; markets covered]"],
    // TODO(content): two more outcome stats. The experiential home carousel
    // said 13,811 total trials; confirm which figure to use.
    results: [{ value: "14,000", label: "Product trials in four weeks" }],
  },
  {
    slug: "story-of-us",
    pillar: "experiential-marketing",
    solution: "employee-engagement",
    client: "Northwell Health",
    // TODO(content): confirm the program name. The EE brief says "Northwell
    // Kids: The Story of Us"; the Experiential brief says "Story of Us
    // All-Employee Rally".
    title: "The Story of Us",
    // TODO(content): placeholder summary.
    summary: "An all-employee rally that brought more than 10,000 Northwell Health team members into one experience.",
    image: { src: `${EXPERIENTIAL_IMG}/story-of-us.png`, alt: "Northwell Health’s The Story of Us rally" },
    // TODO(content): both are placeholders; pull from the case study.
    problem: "[What Northwell needed employees to feel or understand]",
    approach: ["[The idea behind the rally and how it reflected Northwell’s mission and values; what employees did; venue and format]"],
    // TODO(content): a third outcome stat, e.g. a sentiment or feedback
    // result if there is one.
    results: [
      { value: "10,000+", label: "Employees engaged through a single experience" },
      { value: "One", label: "Guinness World Record" },
    ],
  },
];

export function getCaseStudy(pillar: string, slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.pillar === pillar && c.slug === slug);
}

export function caseStudiesFor(pillar: string): CaseStudy[] {
  return caseStudies.filter((c) => c.pillar === pillar);
}

// The stat teasers lead with: the first result.
export function headlineResult(study: CaseStudy): CaseStudy["results"][number] | undefined {
  return study.results[0];
}

export function caseStudyHref(study: CaseStudy): string {
  return `/${study.pillar}/case-studies/${study.slug}`;
}
