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
    slug: "retail-execution",
    label: "Retail Execution",
    navLabel: "retail execution",
    switchLabel: "RETAIL",
    ctaLabel: "Start Your Project",
    ctaVariant: "primary",
    taglineLines: ["Where Strategy", "Meets Shopper"],
    description:
      "Whether you're an established brand or trying to find your audience the sales floor is the frontlines of imprinting your story in the minds of your customer.",
    accentColor: "var(--color-cerulean)",
    surface: "light",
    image: "/images/homepage/pillar-photo-retail.png",
    solutions: [
      { slug: "audits-compliance", label: "Audits & Compliance", icon: "/images/homepage/icon-audits-compliance.png" },
      { slug: "assisted-sales-training", label: "Assisted Sales & Training", icon: "/images/homepage/icon-assisted-sales.png" },
      { slug: "construction", label: "Construction", icon: "/images/homepage/icon-construction.png" },
      { slug: "merchandising", label: "Merchandising", icon: "/images/homepage/icon-merchandising.png" },
      { slug: "break-fix", label: "Break Fix & Continuity", icon: "/images/homepage/icon-break-fix.png" },
      { slug: "warehousing-fulfillment-logistics", label: "Warehousing, Fulfillment, & Logistics", icon: "/images/homepage/icon-warehousing.png" },
    ],
  },
  {
    slug: "training-enablement",
    label: "Training & Enablement",
    navLabel: "training & enablement",
    switchLabel: "TRAINING",
    ctaLabel: "Schedule a Consult",
    ctaVariant: "solid-medium-blue",
    taglineLines: ["Where Playbook", "Meets Practice"],
    description:
      "Your brand strategy is only as good as the weakest point in the delivery chain, we turn your brand knowledge into a scalable system of learning, turning employees into brand champions.",
    accentColor: "var(--color-cerulean)",
    surface: "light",
    image: "/images/homepage/pillar-photo-training.png",
    solutions: [
      { slug: "curriculum-program-design", label: "Curriculum & Program Design", icon: "/images/homepage/icon-curriculum-program-design.png" },
      { slug: "instructor-sourcing-certification", label: "Instructor Sourcing & Certification", icon: "/images/homepage/icon-instructor-sourcing.png" },
      { slug: "training-delivery", label: "Training Delivery", icon: "/images/homepage/icon-training-delivery.png" },
      { slug: "audience-enablement-program", label: "Audience Enablement Program", icon: "/images/homepage/icon-audience-enablement.png" },
    ],
  },
  {
    slug: "experiential-marketing",
    label: "Experiential Marketing",
    navLabel: "experiential marketing",
    switchLabel: "EXPERIENTIAL",
    ctaLabel: "Plan Your Activation",
    ctaVariant: "outline-light",
    taglineLines: ["Where Ideation", "Meets Activation"],
    description:
      "We take your message direct to your audience, from employee and corporate brand experiences to creative, in-person brand takeovers, we take your brand from the boardroom to the street.",
    accentColor: "var(--color-cerulean)",
    surface: "dark",
    image: "/images/homepage/pillar-photo-experiential.png",
    solutions: [
      { slug: "brand-activations", label: "Brand Activations", icon: "/images/homepage/icon-experiential-marketing.png" },
      { slug: "conferences-b2b-events", label: "Conferences & B2B Events", icon: "/images/homepage/icon-conferences-b2b.png" },
      { slug: "employee-engagement", label: "Employee Engagement", icon: "/images/homepage/icon-employee-engagement.png" },
    ],
  },
];

export function getPillar(slug: string): PillarConfig | undefined {
  return pillars.find((p) => p.slug === slug);
}
