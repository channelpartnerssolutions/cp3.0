// Each pillar's "Meet the team" block, shown on the pillar's home page by
// components/team/PillarTeamSections (old /<pillar>/about URLs redirect to
// it). A pillar without an entry here shows no team section.
//
// Two tiers: `leaders` get editorial profiles (large portrait, their own
// point of view, the projects they led, LinkedIn), then `members` fill a grid
// of headshots with name and title. List both in order of seniority. Leave
// out an `image` and the portrait renders as a labeled placeholder; leave out
// `linkedIn` or `projects` and that line doesn't render.

import type { ExperientialImage } from "@/lib/experiential-solutions";

export type TeamLeader = {
  name: string;
  title: string;
  image?: ExperientialImage;
  // A short point of view on the work, in their own words.
  pov: string;
  // 2–3 projects they led; `caseStudy` is a slug in case-studies.ts (same
  // pillar) and links the project to its page.
  projects?: { label: string; caseStudy?: string }[];
  linkedIn?: string;
};

export type TeamMember = { name: string; title: string; image?: ExperientialImage };

export type PillarTeam = {
  pillar: string;
  // The block's heading; defaults to "meet the team".
  heading?: string;
  leaders: TeamLeader[];
  // Heading and intro over the team grid. Without a heading the grid
  // continues straight on from the leaders, on the same white background.
  membersHeading?: string;
  membersIntro?: string;
  members: TeamMember[];
};

export const teams: PillarTeam[] = [
  {
    pillar: "experiential-marketing",
    heading: "we know experiences because we’ve been crafting them for more than 25 years",
    // TODO(content): Zhane Parker's headshot, each leader's point of view in
    // their own words, the 2–3 projects they led, and LinkedIn links once
    // cleared.
    leaders: [
      {
        // TODO(content): confirm display name (brief lists "Elizabeth (Beth) Jones").
        name: "Beth Jones",
        title: "SVP, Experiential",
        image: { src: "/images/experiential/team/beth-jones-portrait.jpg", alt: "Beth Jones" },
        pov: "[A short point of view on the work, in Beth’s words]",
      },
      {
        name: "Heather Manson",
        title: "AVP, Global Events",
        image: { src: "/images/experiential/team/heather-manson-portrait.jpg", alt: "Heather Manson" },
        pov: "[A short point of view on the work, in Heather’s words]",
      },
      {
        name: "Lindsey Van Nuil",
        title: "AVP, Brand Activations",
        image: { src: "/images/experiential/team/lindsey-van-nuil-portrait.jpg", alt: "Lindsey Van Nuil" },
        pov: "[A short point of view on the work, in Lindsey’s words]",
      },
    ],
    members: [
      { name: "Kiersten Walker", title: "Director, Global Events", image: { src: "/images/experiential/team/kiersten-walker.jpg", alt: "Kiersten Walker" } },
      { name: "Blair Lenz", title: "Sr. Manager, Brand Activations", image: { src: "/images/experiential/team/blair-lenz.jpg", alt: "Blair Lenz" } },
      { name: "Morgan Wilson", title: "Sr. Manager, Experiential", image: { src: "/images/experiential/team/morgan-wilson.jpg", alt: "Morgan Wilson" } },
      { name: "Maggie Giannini", title: "Associate Producer, Brand Activations", image: { src: "/images/experiential/team/maggie-giannini.jpg", alt: "Maggie Giannini" } },
      { name: "Zhane Parker", title: "Associate Producer, Global Events" },
      { name: "Sabrina Zander", title: "Senior Designer", image: { src: "/images/experiential/team/sabrina-zander.jpg", alt: "Sabrina Zander" } },
    ],
  },
  {
    pillar: "training-enablement",
    // TODO(content): confirm the headline.
    heading: "we know readiness because we’ve built it in 53 countries",
    // TODO(content): the other two leaders (name, title, portrait, point of
    // view, LinkedIn).
    leaders: [
      {
        name: "Mai Zazueta",
        title: "EVP",
        image: { src: "/images/training/team/mai-zazueta.jpg", alt: "Mai Zazueta" },
        pov: "Don’t be afraid to fail, be afraid not to try.",
        linkedIn: "https://www.linkedin.com/in/mai-zazueta-b7580b3/",
      },
      { name: "[Team member 2]", title: "[Title]", pov: "[A short point of view on the work, in their words]" },
      { name: "[Team member 3]", title: "[Title]", pov: "[A short point of view on the work, in their words]" },
    ],
    members: [],
  },
  {
    pillar: "retail-execution",
    // TODO(content): confirm the years figure (35+ or 40+).
    heading: "we know retail because we’ve been in the aisle for 40+ years",
    // TODO(content): name the three leaders (candidates: Tammy Alemazkour,
    // Rita Sams, and the Merchandising, Audits and Break Fix leads) and
    // collect quotes naming what each is accountable for; then the team
    // grid of program and field leads.
    leaders: [
      { name: "[Merchandising leader]", title: "[Title]", pov: "[What “set to spec in every door” takes across a full-chain reset]" },
      { name: "[Audits & Compliance leader]", title: "[Title]", pov: "[Why an audit that only reports a gap still costs you the sale]" },
      { name: "[Break Fix & Continuity leader]", title: "[Title]", pov: "[What it means to own a display from launch day through the next refresh]" },
    ],
    members: [],
  },
  {
    pillar: "construction-logistics",
    // TODO(content): confirm the years figure (35+ or 40+).
    heading: "we know stores because we’ve built, stocked, and shipped to them for 40+ years",
    // TODO(content): name the three leaders (candidates: Pat for
    // Warehousing, Fulfillment, & Logistics and Tammy Alemazkour; the
    // Construction, 3D Mapping and Installation leads) and collect quotes on
    // what each is accountable for; then the team grid of project managers,
    // PreCon and warehouse operations leads.
    leaders: [
      { name: "[Construction leader]", title: "[Title]", pov: "[Keeping a store open and selling while it’s being remodeled]" },
      { name: "[Warehousing, Fulfillment, & Logistics leader]", title: "[Title]", pov: "[Why “one neck to squeeze” is the point, from factory dock to shelf]" },
      { name: "[3D Mapping or Installation leader]", title: "[Title]", pov: "[What changes when every crew works from the same scan of the space]" },
    ],
    members: [],
  },
];

export function getTeam(pillar: string): PillarTeam | undefined {
  return teams.find((t) => t.pillar === pillar);
}
