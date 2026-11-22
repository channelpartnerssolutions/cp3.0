export type Solution = {
  slug: string;
  label: string;
  icon?: string;
};

export type PillarConfig = {
  slug: string;
  label: string;
  navLabel: string;
  switchLabel: string;
  ctaLabel: string;
  ctaVariant: "primary" | "outline-light" | "solid-medium-blue";
  taglineLines: [string, string];
  description: string;
  accentColor: string;
  // Light or dark body sections on the pillar's case study pages.
  surface: "light" | "dark";
  image: string;
  solutions: Solution[];
};

export const pillars: PillarConfig[] = [
  {
    slug: "construction-logistics",
    label: "Construction & Logistics",
    navLabel: "construction & logistics",
    switchLabel: "CONSTRUCTION",
    ctaLabel: "Start Your Project",
    ctaVariant: "primary",
    // TODO(content): placeholder headline and description.
    taglineLines: ["From Blueprint", "to Grand Opening"],
    description:
      "Before a single product hits the shelf, the space has to be ready. We map, build, install and stock your footprint so every location opens on time and on brand.",
    accentColor: "var(--color-cerulean)",
    surface: "light",
    image: "/images/homepage/pillar-photo-construction-logistics.png",
    solutions: [
      { slug: "3d-mapping", label: "3D Mapping", icon: "/images/solution-icons/3d-mapping.svg" },
      { slug: "construction", label: "Construction", icon: "/images/solution-icons/construction.svg" },
      { slug: "installation", label: "Installation", icon: "/images/solution-icons/installation.svg" },
      { slug: "warehousing-fulfillment-logistics", label: "Warehousing, Fulfillment, & Logistics", icon: "/images/solution-icons/warehousing-fulfillment-logistics.svg" },
    ],
  },
  {
    slug: "retail-execution",
    label: "Retail Execution",
    navLabel: "retail execution",
    switchLabel: "RETAIL",
    ctaLabel: "Start Your Project",
    ctaVariant: "primary",
    // TODO(content): replaces "From the Warehouse / to the Sales Floor" now that
    // warehousing lives under Construction & Logistics.
    taglineLines: ["From the Shelf", "to the Shopper"],
    description:
      "Whether you're an established brand or trying to find your audience the sales floor is the frontlines of imprinting your story in the minds of your customer.",
    accentColor: "var(--color-cerulean)",
    surface: "light",
    image: "/images/homepage/pillar-photo-retail.png",
    solutions: [
      { slug: "audits-compliance", label: "Audits & Compliance", icon: "/images/solution-icons/audits-compliance.svg" },
      { slug: "assisted-sales-training", label: "Assisted Sales & Training", icon: "/images/solution-icons/assisted-sales-training.svg" },
      { slug: "merchandising", label: "Merchandising", icon: "/images/solution-icons/merchandising.svg" },
      { slug: "break-fix", label: "Break Fix & Continuity", icon: "/images/solution-icons/break-fix.svg" },
    ],
  },
  {
    slug: "training-enablement",
    label: "Training & Enablement",
    navLabel: "training & enablement",
    switchLabel: "TRAINING",
    ctaLabel: "Schedule a Consult",
    ctaVariant: "solid-medium-blue",
    taglineLines: ["From Curriculum", "to Confidence"],
    description:
      "Your brand strategy is only as good as the weakest point in the delivery chain, we turn your brand knowledge into a scalable system of learning, turning employees into brand champions.",
    accentColor: "var(--color-cerulean)",
    surface: "light",
    image: "/images/homepage/pillar-photo-training.png",
    solutions: [
      { slug: "curriculum-program-design", label: "Curriculum & Program Design", icon: "/images/solution-icons/curriculum-program-design.svg" },
      { slug: "instructor-sourcing-certification", label: "Instructor Sourcing & Certification", icon: "/images/solution-icons/instructor-sourcing-certification.svg" },
      { slug: "training-delivery", label: "Training Delivery", icon: "/images/solution-icons/training-delivery.svg" },
      { slug: "audience-enablement-program", label: "Audience Enablement Program", icon: "/images/solution-icons/audience-enablement-program.svg" },
    ],
  },
  {
    slug: "experiential-marketing",
    label: "Experiential Marketing",
    navLabel: "experiential marketing",
    switchLabel: "EXPERIENTIAL",
    ctaLabel: "Plan Your Activation",
    ctaVariant: "outline-light",
    taglineLines: ["From the Sketchpad", "to Center Stage"],
    description:
      "We take your message direct to your audience, from employee and corporate brand experiences to creative, in-person brand takeovers, we take your brand from the boardroom to the street.",
    accentColor: "var(--color-cerulean)",
    surface: "dark",
    image: "/images/homepage/pillar-photo-experiential.png",
    solutions: [
      { slug: "brand-activations", label: "Brand Activations", icon: "/images/solution-icons/brand-activations.svg" },
      { slug: "conferences-b2b-events", label: "Conferences & B2B Events", icon: "/images/solution-icons/conferences-b2b-events.svg" },
      { slug: "employee-engagement", label: "Employee Engagement", icon: "/images/solution-icons/employee-engagement.svg" },
    ],
  },
];

export function getPillar(slug: string): PillarConfig | undefined {
  return pillars.find((p) => p.slug === slug);
}
