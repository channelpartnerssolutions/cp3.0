// Pillar "Meet the Team" pages at /<pillar>/about, rendered by
// components/team/PillarTeamPage. A pillar without an entry here keeps the
// placeholder page.
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
  intro: string;
  // Full-bleed photo behind the page's hero; without one, the hero is a
  // plain dark band marked "Background photo needed".
  heroImage?: ExperientialImage;
  // Heading and intro over the leaders' profiles.
  leadersHeading?: string;
  leadersIntro?: string;
  leaders: TeamLeader[];
  // Heading and intro over the team grid; the heading defaults to "The team".
  membersHeading?: string;
  membersIntro?: string;
  members: TeamMember[];
};

export const teams: PillarTeam[] = [
  {
    pillar: "experiential-marketing",
    // TODO(content): placeholder intro.
    intro:
      "Strategists, producers and designers who have spent more than 25 years turning ideas into experiences people remember.",
    // TODO(content): hero background photo (the team on site works well).
    leadersHeading: "Leaders who stay in the work",
    leadersIntro:
      "You won’t meet these three at the pitch and then never again. They shape the strategy, sit in the creative reviews and are on site when the doors open.",
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
    membersHeading: "The team that builds it",
    membersIntro:
      "Producers, managers and designers who turn the idea into the real thing. They’re on your weekly calls and on the floor at load-in.",
    members: [
      { name: "Kiersten Walker", title: "Director, Global Events", image: { src: "/images/experiential/team/kiersten-walker.jpg", alt: "Kiersten Walker" } },
      { name: "Blair Lenz", title: "Sr. Manager, Brand Activations", image: { src: "/images/experiential/team/blair-lenz.jpg", alt: "Blair Lenz" } },
      { name: "Morgan Wilson", title: "Sr. Manager, Experiential", image: { src: "/images/experiential/team/morgan-wilson.jpg", alt: "Morgan Wilson" } },
      { name: "Maggie Giannini", title: "Associate Producer, Brand Activations", image: { src: "/images/experiential/team/maggie-giannini.jpg", alt: "Maggie Giannini" } },
      { name: "Zhane Parker", title: "Associate Producer, Global Events" },
      { name: "Sabrina Zander", title: "Senior Designer", image: { src: "/images/experiential/team/sabrina-zander.jpg", alt: "Sabrina Zander" } },
    ],
  },
];

export function getTeam(pillar: string): PillarTeam | undefined {
  return teams.find((t) => t.pillar === pillar);
}
