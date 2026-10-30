// Experiential solution page content, one entry per page at
// /experiential-marketing/solutions/<slug>, rendered by
// components/experiential/solutions/ExperientialSolutionPage. The slug must
// match a solution in pillars.ts (that's where the nav label lives).
//
// Every page follows the same template (designed on Brand Activations in
// Claude Design): video hero, featured work, the problem, formats with a
// hover-swapped photo, a five-step process, proof stats and a case study,
// "Why Channel Partners", FAQs, and a closing CTA. Headlines are uppercased
// by the type styles, so write them in sentence case with no terminal
// punctuation. `accent` is the part of a headline set in the italic display
// face; it runs in after `title` and before `after`, and is title-cased
// automatically ("in Their Hands"). A "\n" in a section headline forces a
// line break there.
//
// Leave out an `image` and its slot renders as a labeled placeholder.

import type { LucideIcon } from "lucide-react";
import {
  Award,
  Building2,
  Hammer,
  HeartHandshake,
  Lightbulb,
  Route,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export type ExperientialImage = { src: string; alt: string };

// A headline whose `accent` is set in italic Superior Title.
export type AccentHeadline = { title: string; accent?: string; after?: string };

export type WorkItem = {
  client: string;
  title: string;
  // Headline result, e.g. "80M" over "Social impressions".
  value: string;
  label: string;
  image?: ExperientialImage;
  href?: string;
};

export type ExperientialSolutionContent = {
  pillar: string;
  slug: string;
  meta: { title: string; description: string };
  hero: AccentHeadline & { eyebrow: string; body: string; video?: string; ctaLabel: string };
  // The first item runs large; the next two sit side by side under it.
  work: { heading: string; items: WorkItem[] };
  problem: { heading: string; body: string[] };
  formats: {
    eyebrow: string;
    // `accent` is a second line in cerulean.
    heading: string;
    accent?: string;
    // `example` labels the photo shown while the format is active. `slug`
    // rides along to the contact form as ?format=, which pre-fills the message.
    items: { slug: string; title: string; body: string; example: string; image?: ExperientialImage }[];
  };
  // `icon` sits in the step's ring on the timeline.
  process: { heading: string; steps: { icon: LucideIcon; title: string; body: string }[] };
  proof: {
    // The strip only shows with three or more stats; with fewer, the case
    // study carries the proof alone.
    stats: { value: string; label: string }[];
    // Slug of an entry in case-studies.ts (same pillar); the panel previews
    // it and links to its page.
    caseStudy: string;
  };
  // `icon` is a lucide-react icon, shown large above each point.
  whyUs: AccentHeadline & { eyebrow: string; items: { icon: LucideIcon; title: string; body: string }[] };
  faqs: { question: string; answer: string }[];
  cta: AccentHeadline & { body: string; note?: string };
};

const CASE_STUDY_IMG = "/images/experiential/case-studies";

export const experientialSolutions: ExperientialSolutionContent[] = [
  {
    pillar: "experiential-marketing",
    slug: "brand-activations",
    meta: {
      title: "Brand Activations & Experiential Events",
      description:
        "Pop-ups, mobile tours, sampling programs and launch events for brands that need people to try it, share it and remember it. One team from first idea to final guest.",
    },
    hero: {
      eyebrow: "Brand activations",
      title: "Put your brand",
      accent: "in their hands",
      body: "Pop-ups, mobile tours, sampling programs and launch events for brands that need people to try it, share it and remember it. One team from first idea to final guest.",
      // TODO(content): swap for a 10–15s cut of cleared brand activation work
      // (Perrier, Adidas, Soundcore, Pinnacle).
      video: "/videos/experiential/hero-sizzle.mp4",
      ctaLabel: "Let’s make it real",
    },
    work: {
      heading: "See the work people lined up for",
      // TODO(content): Perrier and Pinnacle photos; link cards once their case
      // study pages exist.
      items: [
        { client: "Perrier", title: "The Flavor Studio", value: "80M", label: "Social impressions" },
        {
          client: "Adidas x Pharrell Williams",
          title: "No Quiet Please",
          value: "10M",
          label: "Social impressions",
          image: { src: `${CASE_STUDY_IMG}/no-quiet-please.png`, alt: "Adidas x Pharrell Williams No Quiet Please activation" },
        },
        { client: "Pinnacle Vodka", title: "x Cinnabon", value: "1.5M", label: "Social impressions in 24 hours" },
      ],
    },
    problem: {
      heading: "Your launch gets one shot at a first impression",
      body: [
        "You have a launch date, a budget to defend and an audience that scrolls past ads. What moves them is the product in their hands: a taste, a test, a moment worth posting.",
        "Getting there usually takes a creative shop, a fabricator, a staffing vendor and a logistics partner, each handing off to the next. Every handoff is a chance for the idea to get watered down or the date to slip.",
      ],
    },
    formats: {
      eyebrow: "Six formats, one team",
      heading: "Pick the format",
      accent: "We’ll make it unforgettable",
      // TODO(content): photos for every format but mobile tours and collabs.
      items: [
        {
          slug: "pop-ups",
          title: "Pop-ups and immersive experiences",
          body: "A space people want to step into, explore and share",
          example: "Perrier, The Flavor Studio",
        },
        {
          slug: "mobile-tours",
          title: "Mobile tours",
          body: "One idea carried across many markets on one timeline",
          example: "Soundcore, Aeroclip 2 & Aerofit tour",
          image: { src: `${CASE_STUDY_IMG}/aerofit-mobile-tour.png`, alt: "Soundcore Aerofit mobile tour" },
        },
        {
          slug: "sampling",
          title: "Sampling and trial programs",
          body: "Get the product into hands at the moment it counts",
          // TODO(content): Gatorade pending clearance.
          example: "A national sports drink’s college tour",
        },
        {
          slug: "brand-collaborations",
          title: "Brand collaborations and cultural moments",
          body: "Partnerships that give people a reason to talk",
          example: "Pinnacle Vodka x Cinnabon / Adidas x Pharrell",
          image: { src: `${CASE_STUDY_IMG}/no-quiet-please.png`, alt: "Adidas x Pharrell Williams No Quiet Please activation" },
        },
        {
          slug: "product-launches",
          title: "Product launches and demo experiences",
          body: "Show what’s new and let people try it for themselves",
          // TODO(content): needs an example (Lindsey to suggest).
          example: "Example to come",
        },
        { slug: "trade-show-booths", title: "Trade show booths", body: "A booth that pulls people in off the aisle", example: "Meta, HLM booth" },
      ],
    },
    process: {
      heading: "From ideation to execution",
      steps: [
        { icon: Target, title: "Strategy", body: "We start with who you need to reach and what has to change for them." },
        { icon: Lightbulb, title: "Creative & experience design", body: "The idea, the space and every moment a guest moves through." },
        // TODO(content): confirm in-house vs. partner-built.
        { icon: Hammer, title: "Production", body: "Design, build and logistics planned as one program, not handed off." },
        { icon: Sparkles, title: "Live", body: "A team trained on your brand runs every shift on site." },
        { icon: TrendingUp, title: "Results", body: "A recap of what the program drove: trials, samples, reach and content." },
      ],
    },
    proof: {
      stats: [
        { value: "22,000", label: "Samples handed out on a national sports drink’s college tour" },
        { value: "25+", label: "Global markets where we’ve produced experiences" },
        { value: "Award-winning", label: "Recognized by Clio, Event Marketer, The One Club, EventEx, BizBash and more" },
      ],
      caseStudy: "aerofit-mobile-tour",
    },
    whyUs: {
      eyebrow: "Why Channel Partners Experiential",
      title: "Agency thinking. Production muscle.",
      accent: "One team",
      items: [
        {
          icon: Award,
          title: "An agency since 2001",
          body: "We’ve spent more than 25 years building brand experiences, starting as Michael Alan Group (MAG). That isn’t a capability bolted onto a bigger company.",
        },
        {
          icon: Users,
          title: "One team, idea to last guest",
          body: "Strategy, creative, production and on-site staffing sit under one roof. You don’t have to piece together four partners.",
        },
        {
          icon: Route,
          title: "Built for programs that travel",
          body: "Channel Partners’ national field, warehousing and logistics network backs tours and multi-market launches.",
        },
      ],
    },
    faqs: [
      {
        question: "What kinds of brand activations do you produce?",
        answer:
          "Pop-ups and immersive spaces, mobile tours, sampling and trial programs, brand collaborations, product launches and trade show booths. Most programs mix more than one format, so tell us the goal and we’ll recommend the right one.",
      },
      {
        question: "Do you come up with the idea, or execute ours?",
        answer:
          "Either. Many clients bring us a business goal and we build the strategy and creative from there. Others bring a finished concept and we produce it. Either way, one team carries it through to the live experience.",
      },
      {
        question: "Can you run an activation in several markets at once?",
        answer:
          "Yes. Mobile tours and multi-city launches are a core part of what we do, and Channel Partners’ logistics network keeps materials moving between stops on schedule.",
      },
      {
        question: "Who staffs the activation?",
        // TODO(content): confirm W-2 brand ambassadors, a national talent
        // network, or both.
        answer: "Every staff member is trained on your brand before the first shift.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We agree on the measures before launch: trials, samples, leads, attendance, social reach or content. After the program you get a recap of what it delivered against those goals.",
      },
      {
        question: "How far ahead should we start planning?",
        // TODO(content): confirm lead times.
        answer: "[Typical lead times for a pop-up, a tour and a trade show booth.]",
      },
      {
        question: "Do you handle permits, venues and logistics?",
        // TODO(content): confirm scope (all in legacy scope).
        answer: "[Routing, permitting, venue coordination and equipment.]",
      },
      {
        question: "How is this different from your Employee Engagement work?",
        answer:
          "Brand Activations reach your customers and fans. Employee Engagement reaches your own people through rallies, recognition events and internal launches. The same team often runs both.",
      },
    ],
    cta: {
      title: "Tell us what you’re",
      accent: "launching",
      body: "Bring a date, an audience and a goal. You don’t need a finished brief.",
    },
  },
  {
    pillar: "experiential-marketing",
    slug: "employee-engagement",
    meta: {
      title: "Employee Engagement Events & Experiences",
      description:
        "All-employee rallies, leadership meetings, recognition events and internal launches, built around your mission, vision and values. One team from the first conversation to the final applause.",
    },
    hero: {
      eyebrow: "Employee engagement",
      // Alternates: "Bring your whole organization into the moment" ·
      // "Culture you can feel in the room".
      title: "Turn your people into",
      accent: "believers",
      body: "All-employee rallies, leadership meetings, recognition events and internal launches, built around your mission, vision and values. One team from the first conversation to the final applause.",
      // TODO(content): swap for a 10–15s cut of cleared Northwell work (The
      // Story of Us rally, Leadership Rally at MSG, President’s Award Gala).
      // Real employee faces, so confirm photo releases with client clearance.
      video: "/videos/experiential/hero-sizzle.mp4",
      ctaLabel: "Let’s make it real",
    },
    work: {
      heading: "Moments their people still talk about",
      // The Story of Us is left out on purpose: it's the case study below.
      // TODO(content): photos for all three, and link each to its case study
      // once it exists. Every tile is Northwell; swap a thumbnail for a
      // Microsoft or other corporate program once cleared.
      items: [
        { client: "Northwell Health", title: "Leadership Rally (MSG)", value: "91%", label: "Employee satisfaction" },
        {
          client: "Northwell Health",
          // TODO(content): cleared as Celebrate 2021; confirm it's the same program.
          title: "Northwell Celebrates",
          value: "25,000+",
          label: "Meals delivered to team members",
        },
        {
          client: "Northwell Health",
          title: "Kids & Families",
          value: "2,000+",
          label: "Employees and family members across five family days",
        },
      ],
    },
    problem: {
      heading: "Your people can tell when it’s just another meeting",
      // TODO(content): no stat yet. Gallup's State of the Global Workplace is
      // a lead if it passes the gap stat checks.
      body: [
        "You have a strategy to land, a culture to build and a workforce spread across shifts, sites and time zones. A stage and a slide deck won’t get it there. Employees need to see where the organization is going, hear it from leaders they trust and feel like part of it.",
        "That takes more than event logistics. It starts with understanding your organization and your people, then building the moment around them.",
      ],
    },
    formats: {
      eyebrow: "Six formats, one team",
      heading: "Every moment that matters",
      accent: "to your people",
      // TODO(content): a program photo for each format. Innovation Challenge
      // is cleared but unplaced; it could become a seventh format.
      items: [
        {
          slug: "rallies-town-halls",
          title: "All-employee rallies and town halls",
          body: "Bring the whole organization into one moment",
          example: "Northwell, The Story of Us; Stronger Together Tour",
        },
        {
          slug: "leadership-meetings",
          title: "Leadership meetings and summits",
          body: "Align leaders before they carry the message out",
          example: "Northwell, Leadership Rally (MSG)",
        },
        {
          slug: "recognition-awards",
          title: "Recognition and awards",
          body: "Celebrate the people behind the work",
          example: "Northwell, President’s Award Gala; Truly Awards",
        },
        {
          slug: "internal-launches",
          title: "Internal launches and change moments",
          body: "Introduce a new identity, strategy or EVP to the people who live it",
          // TODO(content): Made for This isn't on the cleared list yet.
          example: "Northwell, Made for This; Own the Moment",
        },
        {
          slug: "wellness-appreciation",
          title: "Wellness and appreciation programs",
          body: "Show employees they’re valued on every shift",
          example: "Northwell, Mobile Spa; Celebrate 2021",
        },
        {
          slug: "family-community",
          title: "Family and community experiences",
          body: "Make room for the people behind your people",
          example: "Northwell, Kids & Families",
        },
      ],
    },
    process: {
      heading: "We start with your people,\nnot the venue",
      steps: [
        { icon: Search, title: "Discovery", body: "We learn your organization, your people and what has to change for them." },
        {
          icon: Target,
          title: "Strategy",
          body: "We tie the experience to your mission, vision and values, and agree on how we’ll measure it.",
        },
        {
          icon: Lightbulb,
          title: "Creative & experience design",
          body: "The idea, the content and every moment an employee moves through, leaders on stage included.",
        },
        // TODO(content): confirm what's in-house vs. partner-built.
        {
          icon: Hammer,
          title: "Production",
          body: "Venue, build, show and logistics planned as one program, not handed off.",
        },
        {
          icon: TrendingUp,
          title: "Results",
          body: "A recap of attendance, satisfaction and feedback against the goals we set together.",
        },
      ],
    },
    proof: {
      // TODO(content): if Lenox Hill isn't cleared or the awards wait until
      // 2027, the strip drops below three and hides itself.
      stats: [
        {
          value: "13+ years",
          label: "As an experiential partner to Northwell Health, across recognition, culture, wellness and leadership",
        },
        {
          value: "Emmy Award-winning",
          label: "Series we supported with promotion and an employee engagement strategy",
        },
        { value: "Award-winning", label: "Recognized by Clio, Event Marketer, The One Club, EventEx, BizBash and more" },
      ],
      caseStudy: "story-of-us",
    },
    whyUs: {
      eyebrow: "Why Channel Partners Experiential",
      title: "Agency thinking. Production muscle.",
      accent: "One team",
      items: [
        {
          icon: Award,
          title: "An agency since 2001",
          body: "We’ve spent more than 25 years building experiences, starting as Michael Alan Group (MAG). That isn’t a capability bolted onto a bigger company.",
        },
        {
          icon: HeartHandshake,
          title: "Built around your people",
          body: "We learn your organization, your culture and what you’re trying to achieve before we design anything. The experience reflects your mission, vision and values, not a template.",
        },
        {
          icon: Building2,
          title: "Ready for the whole company",
          body: "From a leadership offsite to an arena rally, strategy, creative, production and on-site teams sit under one roof. Channel Partners’ national network backs programs that reach every site.",
        },
      ],
    },
    faqs: [
      {
        question: "What kinds of employee experiences do you produce?",
        answer:
          "All-employee rallies and town halls, leadership meetings, recognition and awards events, internal launches, wellness and appreciation programs, and family experiences. Many programs combine more than one, so tell us the goal and we’ll recommend the right format.",
      },
      {
        question: "How do you make sure the experience reflects our culture?",
        answer:
          "We start with discovery. We learn your organization, your people and what you’re trying to achieve, then build the experience around your mission, vision and values. Your Internal Comms, HR and leadership teams stay involved at every stage.",
      },
      {
        question: "How large a program can you handle?",
        answer:
          "Anything from a leadership offsite to an arena-scale all-employee rally, plus programs that run across many sites over weeks or months. One team plans and runs it whatever the size.",
      },
      {
        question: "Can you reach employees who can’t be in the room?",
        // TODO(content): confirm livestream, hybrid and multi-site formats.
        answer: "[Livestream, hybrid and multi-site formats for shift-based, remote and frontline employees.]",
      },
      {
        question: "How do you measure success?",
        answer:
          "We agree on the measures before launch: attendance, participation, satisfaction, sentiment or feedback tied to your goals. After the program you get a recap of what it delivered against them.",
      },
      {
        question: "Who do you work with inside our organization?",
        answer:
          "Usually more than one team. Internal Communications, Employee Experience, HR/People & Culture, Events and Marketing often share ownership of a company-wide moment, and we work with all of them as one program.",
      },
      {
        question: "How far ahead should we start planning?",
        // TODO(content): confirm lead times.
        answer: "[Typical lead times for a leadership meeting, an awards event and an all-employee rally.]",
      },
      {
        question: "Where does employee engagement end and training begin?",
        answer:
          "If the goal is connection, culture or a shared moment, it lives here, and learning can be part of it. If the goal is a formal curriculum or certification, our Training & Enablement team leads. Many programs use both.",
      },
      {
        question: "How is this different from your Brand Activations work?",
        answer:
          "Brand Activations reach your customers and fans. Employee Engagement reaches your own people. The same team often runs both, so an internal launch and a public one can share one idea.",
      },
    ],
    cta: {
      title: "Tell us about your next",
      accent: "company-wide moment",
      body: "Bring a date, an audience and what you want your people to walk away with. You don’t need a finished brief.",
    },
  },
];
// The label for a ?format= slug, if `source` ("<pillar>-<solution>") names a
// page that has that format. Unknown values return undefined, so the contact
// form only ever pre-fills with our own copy.
export function getFormatLabel(source: string, format: string): string | undefined {
  const solution = experientialSolutions.find((s) => `${s.pillar}-${s.slug}` === source);
  return solution?.formats.items.find((item) => item.slug === format)?.title;
}

export function getExperientialSolution(pillar: string, slug: string): ExperientialSolutionContent | undefined {
  return experientialSolutions.find((s) => s.pillar === pillar && s.slug === slug);
}
