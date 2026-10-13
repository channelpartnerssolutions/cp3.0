// Solution page content, one entry per page at /<pillar>/solutions/<slug>,
// rendered by components/solutions/SolutionPage. The slug must match a
// solution in pillars.ts (that's where the nav label and icon live).
//
// Every page follows the same template (designed on Warehousing, Fulfillment &
// Logistics): hero, stat banner, intro with photo, capability rows that
// alternate image sides, optional engagement models, a numbered process,
// optional case study stats, optional "Why Channel Partners" points and
// "Works with" links, FAQs, and a closing CTA. Headlines are
// uppercased by the type styles, so write them in sentence case with no
// terminal punctuation. `accent` is the tail of a headline set in cerulean.
//
// Images live in /public/images/retail/solutions/.

export type SolutionImage = { src: string; alt: string };

// Bullet icons, from /public/images/retail/solutions/icons/. Add new ones to
// BULLET_ICONS in SolutionPage too.
export type BulletIcon =
  | "box"
  | "layers"
  | "map-pin"
  | "package"
  | "package-outline"
  | "receipt"
  | "rotate-ccw"
  | "search"
  | "tag"
  | "trash-2"
  | "truck"
  | "truck-outline"
  | "warehouse";

export type SolutionContent = {
  pillar: string;
  slug: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; body: string };
  // `lead` is set in bold ahead of `text`.
  stat: { lead: string; text: string; source: string };
  intro: { heading: string; accent?: string; body: string[]; image: SolutionImage };
  capabilities: {
    heading: string;
    items: {
      title: string;
      lead: string;
      // Without an icon a bullet gets a plain cerulean dot.
      bullets: { icon?: BulletIcon; text: string }[];
      image: SolutionImage;
    }[];
    // Closing line under the rows.
    note?: string;
  };
  engagementModels?: {
    heading: string;
    models: { name: string; whatItIs: string; whenToChoose: string; example?: string }[];
    // Row of names under the cards, e.g. product categories served.
    tags?: { label: string; items: string[] };
  };
  process: {
    eyebrow: string;
    heading: string;
    accent?: string;
    steps: { title: string; body: string }[];
  };
  caseStudies?: {
    heading: string;
    // `value` is the big number; `href` links the card once there's a page.
    items: { title: string; value: string; label: string; image: SolutionImage; href?: string }[];
  };
  whyUs?: { title: string; body: string }[];
  // Sibling services, each linking to its page.
  worksWith?: { label: string; href: string; body: string }[];
  faqs: { question: string; answer: string }[];
  cta: { heading: string; body?: string };
};

const IMG = "/images/retail/solutions";
const SOLUTIONS = "/retail-execution/solutions";

export const solutions: SolutionContent[] = [
  {
    pillar: "retail-execution",
    slug: "warehousing-fulfillment-logistics",
    meta: {
      title: "Warehousing, Fulfillment & Logistics",
      description:
        "For brand and retail teams rolling out fixtures, displays, and remodels: one partner manages your materials from the manufacturer’s dock to the shelf, so install dates hold.",
    },
    hero: {
      eyebrow: "Warehousing, fulfillment, & logistics",
      title: "Every part at the store before the crew arrives",
      body: "For brand and retail teams rolling out fixtures, displays, and remodels: one partner manages your materials from the manufacturer’s dock to the shelf, so install dates hold.",
    },
    stat: {
      lead: "29% of brand displays",
      text: "shipped to stores never made it to the sales floor. Displays that arrived too early or on a weekend were less likely to be set.",
      // TODO(content): this source carried over from the old stat; confirm it
      // covers the 29% figure.
      source: "McKinsey Global Institute, Risk, Resilience, and Rebalancing in Global Value Chains",
    },
    intro: {
      heading: "Your install date is only as good",
      accent: "as the last part to arrive",
      body: [
        "We build a dedicated, parallel supply chain, managed separately from your product supply chain and run to the installation schedule instead of the retailer’s receiving calendar. One team owns it from the factory dock to the shelf, so there is a single point of accountability for every part, every store, every date.",
      ],
      // TODO(content): placeholder photo.
      image: { src: `${IMG}/warehousing-network.jpg`, alt: "Racked inventory in a Channel Partners warehouse" },
    },
    capabilities: {
      heading: "Fixture and display logistics, from the dock to the shelf",
      // TODO(content): all four photos are placeholders.
      items: [
        {
          title: "Receiving and inventory",
          lead: "Every part is counted against your purchase order before it’s promised to a store.",
          bullets: [
            { icon: "receipt", text: "Inbound receiving and documentation against POs" },
            { icon: "search", text: "Cycle counts and inventory accuracy reporting" },
            { icon: "warehouse", text: "Short- and long-term storage in asset-backed facilities" },
            { icon: "package", text: "Component-level inventory for replenishment programs" },
            { icon: "truck", text: "Integration with your vendor order system for next-day ship" },
          ],
          image: { src: `${IMG}/warehousing-hero.png`, alt: "Inside a Channel Partners warehouse" },
        },
        {
          title: "Store-specific kitting",
          lead: "Each store gets its own assortment, built and checked before it leaves.",
          bullets: [
            { icon: "box", text: "Kits assembled from multi-part, multi-vendor assortments" },
            { icon: "layers", text: "Pallets built in-house or received ship-ready" },
            { icon: "package-outline", text: "POP and collateral fulfillment to stores and field teams" },
            { icon: "tag", text: "Retailer-compliant labeling and routing" },
          ],
          image: { src: `${IMG}/merchandising-hero.jpg`, alt: "A Channel Partners specialist setting a retail display" },
        },
        {
          title: "Date-definite delivery",
          lead: "Shipments land on the install date, not the receiving calendar.",
          bullets: [
            { icon: "truck-outline", text: "Full truckload, LTL and pallet, ground to store, and overnight" },
            { icon: "search", text: "Carrier management and route planning" },
            { icon: "warehouse", text: "Delivery to contractors on site, including after hours" },
            { icon: "package", text: "Tracking and exception management to the door" },
          ],
          image: { src: `${IMG}/construction-hero.png`, alt: "A Channel Partners crew on a retail remodel" },
        },
        {
          title: "Redeployment and end-of-life",
          lead: "Old fixtures leave on the same program the new ones arrive on.",
          bullets: [
            { icon: "map-pin", text: "Fixture redeployment to new locations" },
            { icon: "rotate-ccw", text: "Returns and reverse logistics" },
            { icon: "trash-2", text: "Fixture recovery, recycling, and disposal" },
          ],
          image: { src: `${IMG}/break-fix-hero.png`, alt: "A Channel Partners technician in a store" },
        },
      ],
    },
    engagementModels: {
      heading: "Engagement models",
      models: [
        {
          name: "Project",
          whatItIs:
            "A defined rollout, such as a remodel, launch, reset, or new store opening, with a fixed store list and install calendar",
          whenToChoose: "Many stores need complete kits on fixed dates, from several manufacturers",
          example:
            "Ahold USA center store remodels: 40,000 parts per remodel, kitted by store and delivered to the install schedule",
        },
        {
          name: "Continuity",
          whatItIs: "Inventory held in our warehouses and replenished to stores on a standing program",
          whenToChoose: "Stores need a steady supply of materials without pulling from sellable stock",
          example:
            "A national pharmacy chain’s cosmetics tester program, where store managers order testers directly instead of opening product from the backroom",
        },
        {
          name: "Ad hoc",
          whatItIs: "Single parts or kits shipped when a store orders them",
          whenToChoose: "A display breaks or a store is missing a component before a promo",
          example:
            "A national retailer’s break fix program: components held in inventory, kitted by store, and shipped the day after the order",
        },
      ],
    },
    process: {
      eyebrow: "How it works",
      heading: "One supply chain for your materials,",
      accent: "built around the install",
      steps: [
        {
          title: "Scope",
          body: "Share your store list, assortment, and the dates that can’t move; we build the shipment profile and budget from them.",
        },
        {
          title: "Plan",
          body: "We assign warehouses closest to your stores and line up manufacturer production with your install calendar.",
        },
        {
          title: "Receive and kit",
          body: "Parts are checked against the PO at intake, then kitted and staged by store.",
        },
        {
          title: "Deliver",
          body: "Each store’s kit ships to land on its date, with exceptions caught and fixed before the crew arrives.",
        },
        {
          title: "Reporting",
          body: "See inventory, shipment status, and delivery confirmation by store.",
        },
      ],
    },
    caseStudies: {
      heading: "Remodels and rollouts at national scale",
      // TODO(content): placeholder photo on both cards; link each to its case
      // study page with `href` once they exist.
      items: [
        {
          title: "Rebuilding center store, one store-ready kit at a time",
          value: "40,000",
          label: "Parts per remodel",
          image: { src: `${IMG}/case-study-placeholder.jpg`, alt: "" },
        },
        {
          title: "New walls in, old walls out of the landfill",
          value: "800K lbs",
          label: "Of fixtures diverted from landfill",
          image: { src: `${IMG}/case-study-placeholder.jpg`, alt: "" },
        },
      ],
    },
    worksWith: [
      {
        label: "Construction",
        href: `${SOLUTIONS}/construction`,
        body: "Fixtures delivered to the build schedule, not the receiving calendar.",
      },
      {
        label: "Merchandising",
        href: `${SOLUTIONS}/merchandising`,
        body: "Reset materials land on the reset date, complete.",
      },
      {
        label: "Break Fix & Continuity",
        href: `${SOLUTIONS}/break-fix`,
        body: "Component inventory held for next-day dispatch when a display goes down.",
      },
    ],
    faqs: [
      {
        question: "How is this different from using a regular 3PL or freight company?",
        answer:
          "A standard 3PL moves freight from one point to another and measures success in trucks dispatched. We build a dedicated supply chain around your installation schedule and measure success in installations that happened on time. The work is owned end to end, from the factory dock to the shelf, with store-specific kitting and date-definite delivery instead of bulk drop-off at the back room.",
      },
      {
        question: "Do you offer general warehousing and fulfillment, or only for installations?",
        answer:
          "Every program is tied to an installation, reset, break fix, or construction effort. This is not general fulfillment and not a standalone warehousing service. The reason is accountability: when logistics is built around a specific install schedule, we can guarantee materials land complete and on time so the crew is never waiting on a part. That focus is what makes the model reliable.",
      },
      {
        question: "Do you handle e-commerce or direct-to-consumer fulfillment?",
        answer:
          "No. The network is built for retail and field program delivery, not consumer-level shipping. We deliver store-specific kits and equipment to retail locations on a schedule tied to installation and execution work. If your need is shipping individual orders to end consumers, that falls outside what this solution is designed to do, and we would tell you so rather than force a fit.",
      },
      {
        question: "Where are your warehouses, and how fast can you reach stores?",
        answer:
          "We operate six asset-backed facilities across five states totaling 500,000 square feet, positioned within two-day transit of 87% of U.S. shoppers. Reach runs from one-day in the regions immediately around each hub out to four-day for select northern-tier states. Warehouse assignment is scoped to your store footprint and program geography, so inventory sits close to where it needs to land.",
      },
      {
        question: "How do you make sure materials arrive before the crew?",
        answer:
          "We align with manufacturer production schedules, fixture availability, and transit times, then deliver on a date, time, and location-definite basis coordinated to the installation calendar. Store-specific kits are assembled and staged to land with minimal back-room dwell time. The goal is simple and measurable: zero installation date changes caused by late, shorted, or incorrect materials on site.",
      },
      {
        question: "What happens if something arrives damaged or missing?",
        answer:
          "There are only two ways a shipment misses: a missing kit, part, or shipment, or damage. When damage is our fault, we own it. The reorder and the redelivery are our responsibility, not a cost or a delay we pass to you. Exceptions are tracked and managed in real time through delivery, so a problem surfaces while there is still time to fix it.",
      },
      {
        question: "We currently ship direct from the manufacturer. Why route through Channel Partners?",
        answer:
          "Manufacturers know production, but their expertise ends at the factory wall, and they rarely want to manage fluid delivery across hundreds of store locations. We design a project-level supply chain around the install schedule, align production timing and transit, and deliver to the shelf with the least back-room dwell time. Navigating the handoff from the manufacturer is part of the work, and we do it routinely.",
      },
      {
        question: "How is cost determined?",
        answer:
          "Logistics comes down to time, distance, and volume. Cost is built from your store list and geography, the shipment profile (dimensions and weights per store), the assortment of parts per store, the required delivery method (full truckload, LTL or pallet, ground to store, or overnight express), and the timeline. Send those inputs and we can scope a program budget against your actual footprint.",
      },
      {
        question: "Can you handle complex, high-part-count programs?",
        answer:
          "Yes. Component-level precision is the core of the model. We routinely manage programs with large, multi-part assortments, including center-store remodels involving tens of thousands of parts across multiple full truckloads per deployment. Store-specific kitting, staging, and exception management keep the right parts together for the right store, which is exactly where bulk fulfillment tends to break down.",
      },
      {
        question: "Do you handle returns, redeployment, and disposal of old fixtures?",
        answer:
          "Yes. We manage the full lifecycle, not just the outbound leg. That includes fixture and equipment redeployment to new locations, returns processing and reverse logistics, and end-of-life recovery, recycling, and disposal. On remodel programs this often runs as one coordinated effort: the new system goes in and the old system comes out on the same schedule, under the same point of contact.",
      },
      {
        question: "What can’t you store or ship?",
        answer:
          "We are not set up for FDA-regulated or food-grade inventory, large-scale hazardous materials, or high-value items with complex warranty factors such as heavy machinery and oversized cooling units. We manage client-owned equipment rather than buying inventory for resale, and we do not ship on third-party accounts. If a program edges into one of these, we will say so early rather than take on something the network isn’t built for.",
      },
    ],
    cta: {
      heading: "Lock in the install date before your parts ship",
      body: "Bring your store list, assortment, and the dates that can’t move. No finished scope needed.",
    },
  },

  // Source: "Assisted Sales & Training - Solutions Page Content" (draft, Oct 12 2026).
  {
    pillar: "retail-execution",
    slug: "assisted-sales-training",
    meta: {
      title: "Assisted Sales & Training",
      description:
        "Trained W-2 specialists who explain and sell your CE and mobile products on the retail floor, with live reporting from every door. Bring us the challenge.",
    },
    hero: {
      eyebrow: "Assisted Sales & Training",
      title: "Trained specialists who sell your product on the floor",
      body: "For CE and mobile brands whose products need explaining: W-2 specialists and trained store associates who turn shopper questions into sales at your priority doors.",
    },
    stat: {
      lead: "68% of shoppers",
      text: "are seeking expert advice on high-value purchases.",
      // TODO(content): global, all-category, and the full report doesn't show
      // the 68%; replace with a CE-specific or client sell-through stat.
      source: "EY Future Consumer Index, July 2024",
    },
    intro: {
      heading: "If no one on the floor can explain it,",
      accent: "it doesn’t sell",
      body: [
        "Your product does more than the last one, and that’s the problem at the shelf. Shoppers arrive with questions about features, compatibility, and why yours beats the model next to it. If the associate on shift covers six categories and was never trained on your launch, the answer is a shrug, and the sale goes to the brand that’s easier to explain or to a retailer’s website. You see it later as soft sell-through at doors where the display was set and the stock was there.",
      ],
      // TODO(content): placeholder; the doc calls for a Samsung Assisted
      // Selling Program field photo (cleared for hero use).
      image: { src: `${IMG}/assisted-sales-hero.png`, alt: "A Channel Partners specialist with a shopper at a display" },
    },
    capabilities: {
      heading: "People on the floor who know your product, and associates who can sell it",
      // TODO(content): all four photos are placeholders.
      items: [
        {
          title: "Dedicated in-store specialists",
          lead: "Your own brand specialists at priority doors, demoing, guiding, and closing.",
          bullets: [
            { text: "Guided selling and live demos at your display" },
            { text: "Competitive positioning against the models next to yours" },
            { text: "Attach and upsell: accessories, protection, and services" },
            { text: "Shopper questions and objections logged every shift" },
          ],
          image: { src: `${IMG}/assisted-sales-hero.png`, alt: "A Channel Partners specialist on the sales floor" },
        },
        {
          title: "Retail associate training",
          lead: "The store’s own associates, ready to explain and recommend your product when your specialist isn’t there.",
          bullets: [
            { text: "Product knowledge and selling skills, built on your line" },
            { text: "In person first, with virtual and hybrid options" },
            { text: "Certification and refresher programs" },
            { text: "Onboarding for new launches and line refreshes" },
          ],
          image: { src: `${IMG}/merchandising-approach.png`, alt: "A Channel Partners specialist at a retail display" },
        },
        {
          title: "Launch support",
          lead: "Coverage built around the sell-in window, when floor knowledge matters most.",
          bullets: [
            { text: "Associate training before launch day" },
            { text: "Specialists at high-volume doors through the launch window" },
            { text: "Display and demo readiness checked on every visit" },
            { text: "Early floor signals on what shoppers ask and what stalls the sale" },
          ],
          image: { src: `${IMG}/merchandising-hero.jpg`, alt: "A Channel Partners specialist setting a launch display" },
        },
        {
          title: "Recruiting and program management",
          lead: "We find, train, schedule, and manage the team so you don’t.",
          bullets: [
            { text: "Staffing profile built to your brand and category" },
            { text: "Recruiting screened for retail selling experience and category familiarity" },
            { text: "Scheduling, attendance, and door coverage managed centrally" },
          ],
          image: { src: `${IMG}/audits-hero.jpg`, alt: "A Channel Partners field manager in a store" },
        },
      ],
    },
    engagementModels: {
      heading: "Engagement models",
      // Project (launch) and training-rollout cards are held until there's a
      // real example for each.
      models: [
        {
          name: "Continuity",
          whatItIs: "Dedicated specialists at priority doors on a set weekly schedule",
          whenToChoose: "Shopper advocacy at key accounts drives share, and the product needs a person to explain it",
          // TODO(content): confirm clearance for this use and that this is
          // the program's model.
          example: "Samsung Assisted Selling Program",
        },
      ],
    },
    process: {
      eyebrow: "How it works",
      heading: "From priority doors",
      accent: "to trained specialists on the floor",
      steps: [
        { title: "Design", body: "We agree on your priority doors, objectives, and how success gets measured." },
        { title: "Recruit", body: "We hire W-2 specialists against a profile built for your category and retailer." },
        {
          title: "Train and certify",
          body: "Every specialist passes certification on your product, your competitive story, and the retailer’s rules before working a shift.",
        },
        {
          title: "Deploy",
          body: "Specialists work assigned doors on the program schedule, with coverage managed centrally.",
        },
        {
          title: "Reporting",
          body: "In OpenSky™ you see attendance, shopper interactions, associate trainings completed, and floor observations as each shift is logged.",
        },
      ],
    },
    // TODO(content): proof section ("Floor programs for the brands shoppers
    // ask about") is held until the Samsung card has a cleared title, a
    // verified result stat, and case study clearance.
    whyUs: [
      {
        title: "A W-2 team, not gig labor",
        body: "Every specialist on your floor is a Channel Partners employee, recruited to your profile, certified on your product, and managed by our team. No one is booked shift to shift from an app.",
      },
      {
        title: "One partner, start to finish",
        body: "The team that staffs your floor can also set the shelf and keep the demo working, with one point of contact and one live view of every door.",
      },
      {
        title: "What the floor is telling you",
        body: "Every shift, specialists log what shoppers ask, what stalls the sale, and what competitors are doing, so you hear it while you can still act.",
      },
    ],
    worksWith: [
      {
        label: "Merchandising",
        href: `${SOLUTIONS}/merchandising`,
        body: "Product on the shelf and set right where the specialist sells it.",
      },
      {
        label: "Audits & Compliance",
        href: `${SOLUTIONS}/audits-compliance`,
        body: "Customer Experience Audits pinpoint the gaps training closes.",
      },
      {
        label: "Training & Enablement",
        href: "/training-enablement",
        body: "Partner and enterprise enablement beyond the store floor.",
      },
    ],
    faqs: [
      {
        question: "What does Assisted Sales & Training include?",
        answer:
          "It covers any program where your brand needs trained people on the retail floor. That includes dedicated in-store specialists who demo and sell your product, training for the retailer’s own associates, launch coverage at high-volume doors, and the recruiting, scheduling, and management behind all of it. Every program includes live reporting on attendance, shopper interactions, and training completion, with deeper analytics available through our Strategy & Analytics team.",
      },
      {
        question: "What isn’t included?",
        answer:
          "Shelf work, resets, and display sets run under Merchandising, and display repairs under Break Fix & Continuity; both can run alongside a floor program. High-production brand events and activations belong to our Experiential Marketing team. Enterprise and partner enablement, such as training a dealer network or an internal workforce, sits in our Training & Enablement pillar. In-person training is the core here, with virtual as a supplement.",
      },
      {
        question: "How is this different from your Training & Enablement services?",
        answer:
          "Assisted Sales & Training is about the store floor: your specialists and the retailer’s associates, selling your product to shoppers. Our Training & Enablement pillar serves a different need: enablement for partner and dealer networks and internal workforce learning at large enterprises, often across many countries. If your goal is sell-through at retail doors, start here. If it’s partner certification or global workforce readiness, start with Training & Enablement.",
      },
      {
        question: "Are your specialists employees or contractors?",
        answer:
          "Employees. Every specialist on an Assisted Sales & Training program is a W-2 Channel Partners employee, recruited, trained, and managed by our team. We don’t use gig platforms or independent contractors to staff your floor. That’s how we hold specialists to your brand standards and the retailer’s rules, keep the same faces at your doors, and coach performance over the life of the program.",
      },
      {
        question: "How are specialists recruited and trained?",
        // TODO(content): confirm process details with the brief.
        answer:
          "We build a staffing profile with you, then recruit against it, screening for retail selling experience, category familiarity, and brand fit. Every specialist completes brand-specific training on product knowledge, competitive positioning, selling approach, and retailer guidelines, and must pass certification before working a shift. Refresher training runs as your line changes.",
      },
      {
        question: "How fast can a program start?",
        // TODO(content): confirm the typical launch timeline before
        // publishing any figure.
        answer:
          "Timing depends on door count, how many specialists the program needs, and how long your certification takes to build. Tell us your launch date and priority doors and we’ll give you a realistic plan to have certified specialists on the floor in time, including what can start first if the date is close.",
      },
      {
        question: "Where can you staff specialists?",
        // TODO(content): confirm coverage footprint with the brief.
        answer:
          "We staff programs at retail doors across the U.S., scaled to the doors that matter most to your brand rather than a fixed footprint. Coverage is planned around your priority accounts and markets, and managed centrally so scheduling and attendance stay visible at every door.",
      },
      {
        question: "How does reporting work?",
        // TODO(content): confirm daily call reports are still current.
        answer:
          "Every program runs on live reporting. You see specialist attendance, visit pacing, shopper interactions, and training completion as shifts are logged. Specialists complete a structured call report every day covering store readiness, associate behavior, and shopper activity, and targeted surveys can be added for specific issues. You see what happened on your floor without having to ask for it.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We agree on success metrics before launch, tied to your goals: sell-through at covered doors, attach rate, associates certified, or shopper sentiment. Live reporting confirms the work happened. For brands that need to prove ROI internally, our Strategy & Analytics team connects specialist coverage to sales performance by door and time period, and summarizes what shoppers and associates are saying across every location.",
      },
      {
        question: "Can you train the retailer’s associates without placing specialists?",
        // TODO(content): confirm with the brief.
        answer:
          "Yes. Some brands need the store’s own associates to explain and recommend their product, especially across a large footprint where dedicated specialists at every door aren’t practical. We run product knowledge and selling skills training in person, with virtual and hybrid options, plus certification and refreshers. Programs can also combine both: specialists at top doors, trained associates everywhere else.",
      },
      {
        question: "Can Assisted Sales & Training run alongside Merchandising?",
        answer:
          "Yes. The same program can set your shelf and staff the floor at the same doors, on one schedule, with one point of contact and one view of results. Your specialist sells from a display that’s already stocked and set to plan. Customer Experience Audits from our Audits & Compliance team can also show where associate training is falling short.",
      },
      {
        question: "Do you support product launches?",
        answer:
          "Yes. Launch programs combine associate training ahead of launch day with specialists at high-volume doors through the sell-in window, when shopper questions are highest and floor knowledge matters most. Reporting shows early signals from the floor: what shoppers ask, where demos are converting, and where something is getting in the way, so you can adjust before the window closes.",
      },
      {
        question: "Which product categories do you support?",
        // TODO(content): confirm category scope with the brief.
        answer:
          "Our focus is consumer electronics and mobile, where products are complex and the sale often depends on someone explaining features, compatibility, and why one model beats another. We also support other consumer brands whose products need explaining on the floor. Tell us what you sell and where, and we’ll tell you how a program would work.",
      },
    ],
    cta: {
      heading: "Put trained specialists where your product needs explaining",
      body: "Bring your priority doors and launch timing. No finished scope needed.",
    },
  },

  // Source: "Audits & Compliance - Solutions Page Content" (draft, Oct 12 2026).
  {
    pillar: "retail-execution",
    slug: "audits-compliance",
    meta: {
      title: "Retail Audits & Compliance",
      description:
        "Retail audits that find display, planogram, and associate gaps across your stores and fix them on the visit. Bring us the challenge.",
    },
    hero: {
      eyebrow: "Audits & Compliance",
      title: "Audits that find execution gaps and fix them",
      body: "For brand sales, merchandising, and channel marketing teams who need to know what’s really on the floor in every store, and fix what’s costing sales before the numbers drop.",
    },
    stat: {
      lead: "61% of consumer goods manufacturers",
      text: "report difficulty executing planned promotions.",
      // TODO(content): figure and sample confirmed only in POI's release;
      // open the gated report to confirm before launch.
      source: "Promotion Optimization Institute, 2026 State of the Industry Report, February 2026",
    },
    intro: {
      heading: "You planned the promotion",
      accent: "Did the stores run it",
      body: [
        "Most brands find out a display missed its window when the sell-through report comes back soft. By then the promotion is over. The endcap never went up, the POP sat in the back room, the demo unit went dark, or launch product never left the stockroom. Store teams are stretched, retailer reporting arrives late, and a photo from one store tells you nothing about the rest of the chain. Every week a display isn’t set to plan is a week of sales you paid for and didn’t get.",
      ],
      // TODO(content): placeholder; the doc calls for a rep auditing a display
      // with a device in hand (cleared client or unbranded fixture).
      image: { src: `${IMG}/audits-hero.jpg`, alt: "A Channel Partners representative auditing a retail display" },
    },
    capabilities: {
      heading: "Two audit tracks, one job: protect the sale",
      // TODO(content): all four photos are placeholders.
      items: [
        {
          title: "Merchandising Compliance Audit",
          lead: "Proof that your displays, planograms, and launches are set the way you planned, in every store.",
          bullets: [
            { text: "Display and planogram presence against spec" },
            { text: "Demo units, screens, and interactive components working" },
            { text: "POP, signage, and promotional pricing accuracy" },
            { text: "New product placement: in the store and on the floor by launch date" },
            { text: "Cleanliness and presentation to your brand standard" },
            { text: "Entry and exit compliance scores, with issues fixed on the visit where possible" },
          ],
          image: { src: `${IMG}/merchandising-approach.png`, alt: "A Channel Partners representative checking a display" },
        },
        {
          title: "Customer Experience Audit",
          lead: "Secret shopper visits that score what your shopper hears, not just what they see.",
          bullets: [
            { text: "Greeting and approach" },
            { text: "Key “why to buy” messaging" },
            { text: "Competitive positioning, without knocking the competitor" },
            { text: "Dress code and brand presentation" },
            { text: "Register walk and close-out" },
            { text: "Scored against a model of expectations you set with us" },
          ],
          image: { src: `${IMG}/assisted-sales-hero.png`, alt: "A shopper talking with a store associate" },
        },
        {
          title: "Retailer compliance audits",
          lead: "Independent checks that retailer teams set your program right.",
          bullets: [
            { text: "Retailer-installed displays verified against spec" },
            { text: "Launches, resets, and installs confirmed on time and as designed" },
            { text: "Photo documentation at every audit point" },
            { text: "Tracking across retailers when standards differ by channel" },
          ],
          image: { src: `${IMG}/merchandising-hero.jpg`, alt: "A retail display set to plan" },
        },
        {
          title: "AI-powered smart peripherals",
          // TODO(content): confirm description with Deidra.
          lead: "Integrated, AI-powered smart peripherals help our teams capture more of each store, more consistently, on every audit.",
          bullets: [
            { text: "Consistent image capture at each audit point" },
            // TODO(content): confirm.
            { text: "Gaps surfaced to the rep while still in the store" },
            { text: "Cleaner, comparable data across every store in the program" },
          ],
          image: { src: `${IMG}/audits-hero.jpg`, alt: "A Channel Partners representative capturing store data" },
        },
      ],
    },
    engagementModels: {
      heading: "Engagement models",
      // No Ad hoc card: there's no real ad hoc audit example yet.
      models: [
        {
          name: "Project",
          whatItIs: "A defined audit wave across a set store list, with a clear start and end",
          whenToChoose:
            "Baselining a launch, a holiday window, or a new retailer before committing to an ongoing program",
          // TODO(content): confirm Best Buy clearance is current.
          example:
            "Best Buy: an unannounced Customer Experience Audit across a defined set of locations during the December selling season",
        },
        {
          name: "Continuity",
          whatItIs: "Recurring audits on a set cadence, often built into visits already on the calendar",
          whenToChoose: "Holding standards between launches and catching drift before it shows up in sales",
          // TODO(content): confirm descriptor.
          example: "Merchandising Compliance Audits run inside an ongoing break fix program for a national CE brand",
        },
      ],
    },
    process: {
      eyebrow: "How it works",
      heading: "From standard",
      accent: "to scorecard in five steps",
      steps: [
        {
          title: "Set the standard",
          body: "We agree on what right looks like for your displays, planograms, and associates, plus stores, scoring, and cadence.",
        },
        {
          title: "Visit the stores",
          body: "Our W-2 field teams run scheduled or unannounced audits, with photos at every audit point.",
        },
        {
          title: "Fix it on the spot",
          body: "When an issue can be corrected on the visit, the team corrects it and records the before and after.",
        },
        {
          title: "Escalate the rest",
          body: "Gaps that need parts, the retailer, or a sibling team are flagged and routed right away.",
        },
        {
          title: "Reporting",
          body: "Completed visits, compliance scores, and photos appear in OpenSky™ as they come in, and Customer Experience Audit results arrive as a scored walkthrough.",
        },
      ],
    },
    caseStudies: {
      heading: "Audits that moved the numbers",
      // TODO(content): confirm rights to both results (rmservicing.com);
      // placeholder photos; add `href` once the full case studies exist.
      items: [
        {
          title: "Phantom inventory, found and fixed",
          value: "7.2X",
          label: "Unit lift",
          image: { src: `${IMG}/case-study-placeholder.jpg`, alt: "" },
        },
        {
          title: "Priority items, priority stores",
          value: "7%",
          label: "Category sales increase",
          image: { src: `${IMG}/case-study-placeholder.jpg`, alt: "" },
        },
      ],
    },
    whyUs: [
      {
        title: "A W-2 team, not gig labor",
        body: "The people auditing your stores are our employees, trained on your standards and accountable to them, so the data you act on comes from people you can trust.",
      },
      {
        title: "One partner, start to finish",
        body: "Audits, fixes, merchandising, and reporting run under one program and one point of contact, with live results instead of an end-of-cycle deck.",
      },
      {
        title: "We fix what we find",
        body: "Most audits end with a list of problems. Ours end with fewer of them, because the team that finds the gap fixes it on the same visit where it can, and shows you the before and after.",
      },
    ],
    worksWith: [
      {
        label: "Merchandising",
        href: `${SOLUTIONS}/merchandising`,
        body: "The team that finds the gap fixes it on the same visit.",
      },
      {
        label: "Assisted Sales & Training",
        href: `${SOLUTIONS}/assisted-sales-training`,
        body: "Customer Experience Audit scores set training priorities.",
      },
      {
        label: "Break Fix & Continuity",
        href: `${SOLUTIONS}/break-fix`,
        body: "Audits built into the continuity visit schedule, so compliance checks ride along with visits you already have.",
      },
    ],
    faqs: [
      {
        question: "What’s included in an Audits & Compliance program?",
        answer:
          "Two audit tracks plus retailer compliance checks. Merchandising Compliance Audits cover displays, planograms, demo units, POP and signage, promotional pricing, new product placement, and presentation. Customer Experience Audits score associate behavior against the model you define. Retailer compliance audits confirm that retailer teams set your displays, resets, and installs as designed. Every program includes photo documentation, compliance scoring, and escalation of issues that can’t be fixed on the visit.",
      },
      {
        question: "What’s out of scope?",
        answer:
          "Customer Experience Audits observe and score; they don’t include coaching or training on the spot. That work sits with Assisted Sales & Training. We aren’t a market research or consumer panel firm, and we don’t do IT, cybersecurity, financial, or regulatory audits. We also don’t replace your internal standards team. You set the standard; we’re the field team that checks it in every store and fixes what we can.",
      },
      {
        question: "What is a Customer Experience Audit?",
        answer:
          "It’s our secret shopper program. A trained auditor visits the store as a regular shopper and scores the interaction against a structured checklist built with you: greeting and approach, product knowledge and “why to buy” messaging, how associates position you against competitors, brand presentation, and the register walk and close-out. Visits can be unannounced. Results come back as a scored walkthrough with charts, so you can see patterns by store, region, or retailer.",
      },
      {
        question: "How is a secret shopper audit different from a Merchandising Compliance Audit?",
        answer:
          "A Merchandising Compliance Audit looks at the physical store: is the display there, set to plan, working, priced right, and clean. A Customer Experience Audit looks at people: what an associate says and does when a shopper asks about your product. Many brands run both, because a perfect display still loses the sale if the associate steers the shopper elsewhere. The two tracks can run on the same store list and report side by side.",
      },
      {
        question: "Do you fix problems or just report them?",
        answer:
          "Both. On Merchandising Compliance Audits, our team fixes what it can on the same visit, whether that’s resetting a display to plan, replacing missing signage, correcting a price tag, or getting a demo unit running. The report shows the before and after, so you see the compliance score at entry and at exit. Anything that needs parts, retailer action, or another team is flagged and escalated right away.",
      },
      {
        question: "Are your auditors employees or contractors?",
        answer:
          "Employees. Every Channel Partners auditor is a W-2 team member, recruited, trained, and managed by us. That matters for audits in particular: consistent scoring depends on consistent people, trained on your standards and accountable to the same managers from the first visit to the last. You aren’t relying on whoever picked up a gig that morning.",
      },
      {
        question: "How does reporting work?",
        answer:
          "For Merchandising Compliance Audits, you see completed visits, compliance scores, photos, and flagged issues as they come in, rather than waiting for an end-of-cycle summary. You can view results by store, region, retailer, or program. Customer Experience Audit results are delivered as a scored walkthrough with charts and graphs. Both are built to tell you what to do next, not just what happened.",
      },
      {
        question: "What do the AI-powered smart peripherals do?",
        // TODO(content): confirm description and capabilities with Deidra.
        answer:
          "They’re integrated devices our field teams use during audits and merchandising visits. They help capture each audit point more consistently and turn what the rep sees into cleaner data you can compare across hundreds of stores. The result is fewer judgment calls, faster flagging of gaps, and more confidence that a score in one store means the same thing in the next.",
      },
      {
        question: "How many stores should we audit, and how often?",
        // TODO(content): confirm typical sample sizes and cadences.
        answer:
          "It depends on the question you’re answering. To check a launch or a promotion, a single wave across the stores that matter most is often enough. To hold standards over time, recurring audits on a weekly, monthly, or launch-driven cadence work better. We help you size the sample so results are reliable without auditing more stores than you need, and we can start with a few stores to prove the model.",
      },
      {
        question: "How fast can a program start?",
        // TODO(content): confirm typical time to first audit with Deidra.
        answer:
          "Once we agree on the standard, the store list, and the scoring, we can schedule the first wave. Programs added to visits we already run start fastest, because the team is already in your stores. For a new program, the setup work is defining what right looks like and building the checklist, not finding people. Tell us your launch or promotion date and we’ll work back from it.",
      },
      {
        question: "Can audits run alongside merchandising or break fix?",
        answer:
          "Yes, and that’s where they deliver the most. Merchandising Compliance Audits can be built into merchandising visits, so the team that finds a gap fixes it on the spot. They can also be added to a continuity schedule under Break Fix & Continuity. Customer Experience Audit scores can set training priorities for Assisted Sales & Training. Same field team, same schedule, one point of contact.",
      },
      {
        question: "Can you audit how a retailer executed our program?",
        answer:
          "Yes. Brands use our retailer compliance audits to confirm that a retailer-installed display was set to spec, that a reset happened on schedule, or that launch product reached the floor by the launch date. We document each audit point with photos and score it against your standard, so you have evidence to take to the retailer and a clear list of what still needs fixing.",
      },
      {
        question: "Which retailers and categories do you audit?",
        // TODO(content): confirm retailer and category list.
        answer:
          "We audit wherever your product is sold in physical retail, with deep experience in consumer electronics and big-box environments, including Best Buy. Programs can span multiple retailers with different standards for each, and reporting lets you compare execution across them. Tell us where your product lives and what it should look like there, and we’ll build the checklist around it.",
      },
    ],
    cta: {
      heading: "Find out what’s really happening in your stores",
      body: "Bring a few stores and the standard they should hold. No finished scope needed.",
    },
  },

  // Source: "Break Fix & Continuity - Solutions Page Content" (draft, Oct 12 2026).
  {
    pillar: "retail-execution",
    slug: "break-fix",
    meta: {
      title: "Break Fix & Continuity Services",
      description:
        "Keep displays and demo units working and new product sets live on launch day, with one W-2 field team for repairs, installs, and continuity.",
    },
    hero: {
      eyebrow: "Break Fix & Continuity",
      title: "Every display working, every launch on time",
      body: "For brand in-store and retail merchandising teams who need demo units live, new product sets in on launch day, and every fix owned by one W-2 field team.",
    },
    stat: {
      lead: "63% of U.S. in-store shoppers",
      text: "say a brand’s display has influenced their choice between similar products.",
      // TODO(content): indirect fit and a display-maker sponsor; replace if a
      // study on broken demo units turns up.
      source: "Frank Mayer and Associates, 2026 In-Store Retail Display Influence Report, January 2026",
    },
    intro: {
      heading: "A dark display",
      accent: "hands the sale to the brand next to you",
      body: [
        "Shoppers make the call at the fixture. When the demo unit won’t power on, the screen is frozen, or the new product set is still in the box on launch day, they compare what works, and that’s usually your competitor’s display. Every day it stays down costs sell-through you planned for and launch momentum you can’t get back. Store staff rarely have the time, parts, or training to fix it, and an issue that waits for the next scheduled visit can leave a display dark for weeks.",
      ],
      // TODO(content): placeholder; the doc calls for a technician testing a
      // live demo unit at a CE fixture, no visible retailer or brand marks.
      image: { src: `${IMG}/break-fix-hero.png`, alt: "A Channel Partners technician repairing an in-store display" },
    },
    capabilities: {
      heading: "Repairs, launches, and upkeep across your whole display footprint",
      // TODO(content): all four photos are placeholders.
      items: [
        {
          title: "Break fix",
          lead: "On-site repair when a display, fixture, or demo device fails.",
          bullets: [
            { text: "Diagnosis and repair of demo devices, interactive displays, and fixtures" },
            { text: "Component and part replacement at the store" },
            { text: "Before and after photos on every repair" },
          ],
          image: { src: `${IMG}/break-fix-hero.png`, alt: "A Channel Partners technician at a display" },
        },
        {
          title: "New product introductions",
          lead: "NPI sets installed, powered, and verified by launch day.",
          bullets: [
            { text: "NPI sets and display refreshes across the chain" },
            { text: "Demo device swaps for new models" },
            { text: "Launch-day verification, store by store" },
          ],
          image: { src: `${IMG}/merchandising-hero.jpg`, alt: "A new product display being set" },
        },
        {
          title: "Continuity",
          lead: "Scheduled visits that keep displays selling between launches.",
          bullets: [
            { text: "Recurring visits on the cadence your program needs" },
            { text: "Functionality checks and preventive maintenance" },
            { text: "Merchandising Compliance Audit captured on the same visit" },
          ],
          image: { src: `${IMG}/audits-hero.jpg`, alt: "A Channel Partners representative checking a display" },
        },
        {
          title: "Installs and inventory blitzes",
          lead: "Short, high-volume pushes when the date can’t move.",
          bullets: [
            { text: "Display and fixture installs, moves, and removals" },
            // TODO(content): confirm blitz scope with Lauren.
            { text: "Inventory blitzes: demo device counts and reconciliation" },
            { text: "Pre-promo sweeps before a sales event" },
          ],
          image: { src: `${IMG}/warehousing-hero.png`, alt: "Display fixtures staged for install" },
        },
      ],
    },
    engagementModels: {
      heading: "Engagement models",
      // TODO(content): each example needs a real program behind it, or its
      // card comes off.
      models: [
        {
          name: "Project",
          whatItIs: "A defined rollout with a fixed store list and date",
          whenToChoose: "A launch or install date can’t move",
          example: "NPI sets installed across a national electronics chain by a fixed launch date",
        },
        {
          name: "Continuity",
          whatItIs: "Recurring visits, with repairs made on the visit",
          whenToChoose: "Displays must work all year, not just at launch",
          example: "Monthly visits that keep demo units working",
        },
        {
          name: "Ad hoc",
          whatItIs: "On-demand dispatch to one store or a short list",
          whenToChoose: "Something breaks between visits",
          example: "Same-week dispatch when a display goes dark before a promo",
        },
      ],
    },
    process: {
      eyebrow: "How it works",
      heading: "From footprint map to fixed display,",
      accent: "with proof at every stop",
      steps: [
        {
          title: "Map the footprint",
          body: "We document every door, display, and device, and set response priorities before go-live.",
        },
        {
          title: "Staff and train",
          body: "W-2 technicians are assigned by geography and trained on your displays and each retailer’s rules.",
        },
        {
          title: "Stage the parts",
          // TODO(content): confirm.
          body: "Replacement components are held in inventory and shipped to the store ahead of the visit.",
        },
        {
          title: "Fix and verify",
          body: "Technicians repair on site, confirm the display works, and photograph it before they leave.",
        },
        {
          title: "Reporting",
          body: "You see every visit, fix, and open issue in OpenSky™ as it happens, with photo proof.",
        },
      ],
    },
    // TODO(content): proof section ("Displays back on, launches in on time")
    // is held until Lauren supplies both case studies. Planned cards:
    //   1. "Every new product set live on launch day": [x]% of stores set and
    //      verified by launch date (a top-5 CE brand at a national electronics
    //      retailer)
    //   2. "A year of demo units that stayed on": [x]% display functionality,
    //      entry vs. exit (a mobile device brand across [x] big-box doors)
    whyUs: [
      {
        title: "A W-2 team, not gig labor",
        body: "The technician who fixes your display is our employee, trained on your fixtures and accountable to your program, not a stranger picking up a job from an app.",
      },
      {
        title: "One partner, start to finish",
        body: "One team plans the work, stages the parts, dispatches the technician, fixes the display, and reports it, with one point of contact who owns the result.",
      },
      {
        title: "Launch and repair under one roof",
        body: "The same field team that installs your NPI set keeps it working through the year, so no one has to relearn your displays between launch and repair.",
      },
    ],
    worksWith: [
      {
        label: "Assisted Sales & Training",
        href: `${SOLUTIONS}/assisted-sales-training`,
        body: "Break fix and assisted sales teams co-support the same doors, so the specialist always has a working display to sell from.",
      },
      {
        label: "Warehousing, Fulfillment & Logistics",
        href: `${SOLUTIONS}/warehousing-fulfillment-logistics`,
        body: "Replacement parts held in inventory and shipped next day, so repairs aren’t waiting on a part.",
      },
      {
        label: "Construction",
        href: `${SOLUTIONS}/construction`,
        body: "Permanent fixture replacement when repair isn’t enough.",
      },
    ],
    faqs: [
      {
        question: "What does Break Fix & Continuity cover?",
        answer:
          "It covers keeping your in-store displays, fixtures, and demo devices working, plus the installs and launches that put them there. That includes on-site repair, part and component replacement, NPI sets, device swaps, graphic changes, inventory blitzes, preventive maintenance, and scheduled continuity visits. Programs run as a project with a fixed date, as ongoing continuity, or as ad hoc dispatch when something breaks between visits.",
      },
      {
        question: "What’s out of scope?",
        answer:
          "Permanent fixture replacement, remodels, and any work that needs permits or electrical and plumbing trades fall under Construction. Planogram resets and shelf stocking sit with Merchandising, though both can run on the same visit. We don’t manage retailer IT networks or store infrastructure. If a request sits on the line, tell us what’s broken and we’ll route it to the right team under the same point of contact.",
      },
      {
        question: "Are your technicians employees or contractors?",
        answer:
          "They’re employees. Every technician on a Channel Partners program is a W-2 employee, recruited, trained, and managed by us. That means the person in your store has been trained on your displays and your retailer’s rules, carries our accountability, and reports through the same system as the rest of your program. It’s the difference between a team that knows your fixtures and a rotating cast picking up one-off jobs.",
      },
      {
        question: "How does reporting work?",
        answer:
          "Every visit is logged in our reporting platform as it happens. You see which stores were visited, what was found, what was fixed, and what’s still open, with before and after photos on every repair. Issues that can’t be fixed on the visit are flagged with the reason and the next step. Dashboards are set up around your program before launch, so you see the metrics you report on.",
      },
      {
        question: "How fast can a program start?",
        // TODO(content): confirm ad hoc lead time and typical ramp.
        answer:
          "Ad hoc dispatch can start as soon as we have the store, the display, and the issue. Project and continuity programs usually need time to map the footprint, train technicians on your displays, and stage parts. The timeline depends on store count and how much of that work is already done. Bring the launch date or the problem, and our team will tell you what’s realistic on the first call.",
      },
      {
        question: "How quickly do you respond when a display goes down?",
        // TODO(content): confirm standard SLA tiers.
        answer:
          "Response times are set per program based on store priority, so a flagship door before a launch can get a faster window than a low-traffic location. The target and escalation path are agreed before go-live and tracked in your reporting, so you can see whether each response window was met.",
      },
      {
        question: "Can you handle new product introductions?",
        answer:
          "Yes. NPI is one of the most common reasons brands bring us in. We install the set, swap demo devices, update graphics, power and test every unit, and verify each store against the launch spec with photos. Where a set can’t be completed, you know which store, why, and when it will be fixed, before the launch date rather than after.",
      },
      {
        question: "What is an inventory blitz?",
        // TODO(content): confirm scope with Lauren.
        answer:
          "It’s a short, concentrated push across many stores at once, usually to count and reconcile demo devices, capture serial numbers, or pull and replace outdated units ahead of a launch. Blitzes are staffed and scheduled like a project, so the work lands in a tight window and the results arrive as one clean data set rather than store-by-store updates.",
      },
      {
        question: "Do you stock replacement parts?",
        // TODO(content): confirm standard practice for BFC programs.
        answer:
          "Yes, through our Warehousing, Fulfillment & Logistics team. Components for your displays can be held in inventory and shipped next day, so a repair isn’t stalled waiting on a part. Parts usage is tracked by store and component, which helps flag a fixture or device that fails more often than it should.",
      },
      {
        question: "Can break fix run alongside Assisted Sales & Training?",
        answer:
          "Yes. Break fix and assisted sales teams can co-support the same doors under one program and one point of contact. Specialists on the floor flag a dead display the moment it fails, and technicians fix it so the specialist always has something working to demonstrate. The same pairing works with Merchandising, where shelf and display upkeep run on one visit.",
      },
      {
        question: "Can you add audits to continuity visits?",
        answer:
          "Yes. A Merchandising Compliance Audit can be captured on the same continuity visit, scoring display presence, functionality, pricing, and signage against your standard. Where an issue can be fixed on the spot, the technician fixes it and the report shows the store before and after, so you get a compliance baseline without paying for a separate visit.",
      },
      {
        question: "What kinds of displays do you service?",
        // TODO(content): confirm whether millwork and fixture repair are in scope.
        answer:
          "Most of our work is on consumer electronics and mobile displays: interactive demo fixtures, live devices, screens, and the security and power hardware around them. We also service static and graphic displays, endcaps, and brand fixtures. If a fixture can’t be repaired in the store, Construction handles permanent replacement under the same program.",
      },
      {
        question: "Where do you work?",
        // TODO(content): confirm coverage statement.
        answer:
          "We run programs across the U.S., with W-2 technicians assigned by geography so coverage matches your store list rather than a fixed territory. Programs span big-box, specialty, and carrier retail. Send your door list and we’ll show you how our coverage maps to it before you commit.",
      },
      {
        question: "Do you work with display fabricators?",
        // TODO(content): confirm current fabricator programs.
        answer:
          "Yes. Fabricators can bring us in to install their displays in the field, verify them at launch, and handle repairs after, so the brand gets one consistent team from rollout through upkeep. We work to the fabricator’s specs and report back to both the fabricator and the brand.",
      },
    ],
    cta: {
      heading: "Keep every display working through every launch",
      body: "Bring your display footprint and your upcoming launches. No finished scope needed.",
    },
  },

  // Source: "Construction - Solutions Page Content" (draft, Oct 12 2026). No
  // SME brief yet; a Construction SME needs to check every operational claim.
  {
    pillar: "retail-execution",
    slug: "construction",
    meta: {
      title: "Retail Construction & Remodels",
      description:
        "Store remodels and TI fitouts with general trades and MEP under one contract, phased so your store stays open. Bring us the challenge.",
    },
    hero: {
      eyebrow: "Construction",
      title: "Remodels delivered while your store stays open",
      body: "For store operations and facilities teams: general trades and MEP under one contract, phased around your trading hours so shoppers keep shopping and the turnover date holds.",
    },
    stat: {
      lead: "78% of construction firms",
      text: "had at least one project delayed in the past twelve months.",
      // TODO(content): borderline on problem and audience; Dodge's gated
      // "Not By Design" report may fit better.
      source: "AGC of America and NCCER, 2025 Workforce Survey, August 2025",
    },
    intro: {
      heading: "Every week the remodel runs long,",
      accent: "the store pays for it",
      body: [
        "Most remodels are split across a general contractor and separate mechanical, electrical, and plumbing contracts. Each one runs its own schedule, so one late trade holds up the next, and your team becomes the coordinator. Meanwhile the store is fenced off, closed early, or dark. That’s lost transactions, frustrated regulars, and a reopening date you’ve already promised the region. The longer the job, the more it costs in sales you don’t get back.",
      ],
      // TODO(content): placeholder; the doc calls for a phased remodel in an
      // open store (crew behind containment, shoppers in open aisles).
      image: { src: `${IMG}/construction-handoffs.png`, alt: "A Channel Partners crew working in an open convenience store" },
    },
    capabilities: {
      heading: "Interior remodels and fitouts, from estimate to closeout binder",
      // TODO(content): all four photos are placeholders.
      items: [
        {
          title: "General trades",
          lead: "The build work, done in phases so the floor stays shoppable.",
          bullets: [
            { text: "Demolition" },
            { text: "Framing, drywall, and paint" },
            { text: "Flooring, acoustical ceilings, and hard lid ceilings" },
            { text: "Doors and hardware" },
            { text: "Restroom accessories, grab bars, and toilet partitions" },
          ],
          image: { src: `${IMG}/construction-hero.png`, alt: "A Channel Partners crew on a retail remodel" },
        },
        {
          title: "MEP",
          // TODO(content): confirm employment model for MEP trades.
          lead: "Mechanical, electrical, and plumbing on the same schedule as the build.",
          bullets: [
            { text: "HVAC, ductwork, and refrigeration" },
            { text: "Power, panels, and lighting" },
            { text: "Plumbing" },
            { text: "Fire protection and fire alarm installation" },
          ],
          image: { src: `${IMG}/break-fix-hero.png`, alt: "A technician working on store systems" },
        },
        {
          title: "Pre-construction and permitting",
          lead: "The paperwork that decides whether the job starts on time.",
          bullets: [
            { text: "Estimating and bid preparation" },
            { text: "Scoping and phased scheduling around trading hours" },
            { text: "Permitting and inspections, handled in market" },
            { text: "Licensed architect or engineer engaged on your behalf when you need drawings" },
          ],
          image: { src: `${IMG}/construction-project-center.png`, alt: "Project tracking on a phone" },
        },
        {
          title: "Fitouts and finish work",
          lead: "The details that get a space ready to open or reopen.",
          bullets: [
            { text: "Tenant improvement fitouts from grey box or white box" },
            { text: "Millwork relocation, cabinets, and countertops" },
            { text: "Minor exterior work" },
          ],
          image: { src: `${IMG}/warehousing-hero.png`, alt: "A finished retail interior" },
        },
      ],
    },
    engagementModels: {
      heading: "Engagement models",
      // Only Project can be backed today.
      models: [
        {
          name: "Project",
          whatItIs:
            "A scoped remodel or TI fitout with a fixed turnover date, one project manager, and one contract from estimate to closeout",
          whenToChoose:
            "A remodel program across a chain, a single complex site, or a new space that has to open on a set date",
          // TODO(content): SME to supply a real example, e.g. a c-store
          // remodel kept shoppable throughout the work.
        },
      ],
      tags: {
        label: "Environments",
        items: [
          "Convenience stores",
          "Grocery",
          "Big box and large-format retail",
          "Medical and healthcare",
          "Commercial spaces",
        ],
      },
    },
    process: {
      eyebrow: "How it works",
      heading: "One project manager",
      accent: "from first drawing to final inspection",
      steps: [
        {
          title: "Scope",
          body: "Send drawings and a scope, an RFP, or just a layout of today’s space and the space you want.",
        },
        {
          title: "Estimate and plan",
          body: "Our pre-construction team prices the work and builds a phased schedule around your trading hours.",
        },
        {
          title: "Mobilize",
          body: "General trades crews deploy nationally, and MEP work is handled by teams who know local codes and inspectors.",
        },
        {
          title: "Build and punch",
          body: "Work runs in phases, then a punch walk with your team logs and closes every deficiency.",
        },
        {
          title: "Reporting",
          body: "Progress and photos post from the field in OpenSky™, so you see completion status live and catch issues before punch list.",
        },
      ],
    },
    // TODO(content): proof section ("Built for sites that can't close") is
    // held until there's one cleared case study with an outcome stat. Next in
    // the slot: a medical or healthcare fitout.
    whyUs: [
      {
        title: "A W-2 team, not gig labor",
        // TODO(content): confirm wording once the MEP employment model is known.
        body: "The crew in your store works for us, answers to your project manager, and follows the same site rules from demo to punch.",
      },
      {
        title: "One partner, start to finish",
        body: "One project manager owns your remodel from estimate through permits, build, punch list, and closeout, with live progress you can check any day.",
      },
      {
        title: "One contract, open doors",
        body: "General trades and MEP run on one schedule under one contract, phased so your store keeps trading while the work gets done.",
      },
    ],
    worksWith: [
      {
        label: "Warehousing, Fulfillment & Logistics",
        href: `${SOLUTIONS}/warehousing-fulfillment-logistics`,
        body: "Fixtures and materials staged to each phase of the remodel.",
      },
      {
        label: "Merchandising",
        href: `${SOLUTIONS}/merchandising`,
        body: "The store reset and set as soon as the remodel closes out.",
      },
      {
        label: "Break Fix & Continuity",
        href: `${SOLUTIONS}/break-fix`,
        body: "Permanent replacement for fixtures that are past repair.",
      },
    ],
    faqs: [
      {
        question: "What does your construction service cover?",
        answer:
          "Interior remodels and tenant improvement fitouts inside existing buildings. That includes general trades (demolition, framing, drywall, paint, flooring, ceilings, doors and hardware, restroom accessories), MEP work (HVAC, refrigeration, electrical, lighting, plumbing), fire protection and fire alarms, millwork relocation, and minor exterior work. We also handle pre-construction: estimating, scoping, scheduling, and permitting.",
      },
      {
        question: "What’s out of scope?",
        answer:
          "Ground-up construction. Everything we build is a remodel or a fitout inside an existing structure. Gondola swaps and simple fixture moves aren’t construction either; those run through Merchandising. We’re also not an architecture or design firm. When you need drawings and haven’t engaged an architect or engineer, we can engage a licensed one on your behalf, but design isn’t our default role.",
      },
      {
        question: "Can my store stay open during the remodel?",
        // TODO(content): confirm the 75%+ shoppable figure with an SME before
        // adding it here.
        answer:
          "In most cases, yes, and that’s how we plan the work. We phase the schedule around your trading hours, contain each work zone, and keep the rest of the floor shoppable. For convenience stores, the goal is to keep most of the store open and operating throughout. The phasing plan is part of the estimate, so you see it before work starts.",
      },
      {
        question: "Do you handle both general contracting and MEP?",
        answer:
          "Yes. General trades and mechanical, electrical, and plumbing work run under one contract and one schedule, with one project manager coordinating every trade. That removes the handoffs between separate contractors that usually push a remodel past its date, and it gives you one point of contact instead of three or four.",
      },
      // TODO(content): "Is your crew made up of employees or contractors?" is
      // held per the doc ("Do not publish until an SME confirms how licensed
      // MEP trades are employed in each market"). Draft answer: "Our field
      // team is W-2, not gig labor. Your project manager and site
      // superintendent are our people, and they own the schedule, the site,
      // and the punch list. The team in your store is trained, accountable to
      // one company, and consistent from the first day of demo to the final
      // walk."
      {
        question: "Do I need drawings before I contact you?",
        answer:
          "No. Projects start in a few ways: drawings and a scope of work, an RFI, a formal RFP with drawing sets and bid forms, or, for an existing relationship, a simple layout showing the space today and the space you want. If your project needs permitted drawings and you don’t have an architect or engineer yet, we can engage one for you.",
      },
      {
        question: "Which projects need permits?",
        answer:
          "Projects that move walls or touch electrical or plumbing usually need permits, and the drawings typically come from your architect or engineer. Like-for-like replacements and cosmetic remodels often don’t need permits and can move faster with fewer drawings. We confirm the permit path during scoping so the schedule reflects it from the start.",
      },
      {
        question: "What’s the difference between grey box and white box?",
        answer:
          "A grey box has electrical present but not distributed, tempered air, mainline plumbing only, and usually no finished floor. A white box has drywall, duct distribution, labeled egress, and a finished floor, so it’s ready for a tenant improvement buildout. We take fitouts from either starting point and scope the work to match.",
      },
      {
        question: "How does pricing and estimating work?",
        answer:
          "Your drawings, scope, or RFP go to our pre-construction team, who estimate the work and prepare the bid. Once the project is awarded, a dedicated project manager takes ownership from mobilization through closeout. You get one estimate covering general trades and MEP rather than separate bids to reconcile, and the phasing plan is built into it.",
      },
      {
        question: "Where do you work?",
        // TODO(content): confirm regions are current.
        answer:
          "Nationwide. General trades crews travel and deploy coast to coast. MEP work is handled in market, because local codes, inspectors, and permitting rules vary, and local knowledge keeps inspections and sign-offs on schedule. We have established teams on the West Coast (California, Arizona, Nevada), in the Midwest, the Southeast, and Texas.",
      },
      {
        question: "How does reporting work?",
        // TODO(content): confirm OpenSky™ has replaced Project Center for
        // construction projects.
        answer:
          "Crews log progress and photos from the field in real time, from a phone on site, at no added cost. You and our team see the same completion status live, so issues surface and get fixed before they reach the punch list. You don’t wait for a weekly call to know where your remodel stands.",
      },
      {
        question: "What happens at the end of the project?",
        answer:
          "We schedule a punch list walk with the trades, the site superintendent, and your representatives. Every deficiency is logged, assigned, and corrected. On larger MEP scopes, your architect or engineer walks the punch list as the independent check. You then receive a closeout package with final inspections, permit closures, warranties, and an as-built binder.",
      },
      {
        question: "Do you work in medical and healthcare facilities?",
        // TODO(content): confirm HCC status is current.
        answer:
          "Yes, and it’s a particular strength. We hold Health Care Constructor (HCC) accreditation, which qualifies us for more complex, regulated medical environments where infection control, life safety, and continuous operation matter. Medical work follows the same model as retail: phased scheduling around patient care, one project manager, and live progress reporting.",
      },
      {
        question: "How fast can a project start?",
        // TODO(content): SME to supply typical lead times from award to
        // mobilization.
        answer:
          "It depends on drawings and permits more than on crews. Non-permitted work, like cosmetic remodels and like-for-like replacements, can start soon after the estimate is approved. Permitted work starts once permits are issued, and we build that timeline into the schedule during scoping, so the date you plan around already accounts for permits and inspections.",
      },
      {
        question: "Can construction run alongside your other services?",
        answer:
          "Yes. Our Warehousing, Fulfillment & Logistics team can store and stage fixtures and materials so they arrive for each phase of the remodel instead of crowding your back room. When the build closes out, our Merchandising team can reset and set the store so it’s ready to sell. One partner, one schedule, one point of contact.",
      },
      {
        question: "Do you replace fixtures that can’t be repaired?",
        answer:
          "Yes. When a fixture is past repair, our Break Fix & Continuity team hands it to construction for permanent replacement, so the fix fits into the store’s broader remodel plan instead of becoming a one-off job. The same project manager scopes the replacement, schedules it around trading hours, and closes it out with the same reporting you see on any remodel.",
      },
    ],
    cta: {
      heading: "Plan your remodel around staying open",
      body: "Bring drawings, an RFP, or just a layout. No finished scope needed.",
    },
  },

  // Source: "Merchandising - Solutions Page Content" (draft, Oct 12 2026).
  {
    pillar: "retail-execution",
    slug: "merchandising",
    meta: {
      title: "Retail Merchandising Services",
      description:
        "Shelves set to planogram, stocked, and priced right in every door. W-2 merchandising teams for consumer brands. Bring us the challenge.",
    },
    hero: {
      eyebrow: "Merchandising",
      title: "Every shelf set, stocked, and ready to sell",
      body: "For consumer brands selling through big-box, specialty, and grocery doors: W-2 merchandising teams who keep your shelves on planogram, priced right, and full between visits.",
    },
    stat: {
      lead: "50% of North American shoppers",
      text: "left a store in the past three months without all the items they came in to buy.",
      // TODO(content): Zebra's own survey; Profitero's gated 2026 report may
      // fit the brand buyer better.
      source: "Zebra Technologies, 18th Annual Global Shopper Study, 2025",
    },
    intro: {
      heading: "When the shelf is empty,",
      accent: "the sale walks out",
      body: [
        "Shoppers who don’t find your product rarely ask for it. They buy a competitor’s, try another store, or leave, and an out-of-stock item is the reason they give most often. Your sell-through plan assumes every door is stocked, set to planogram, and priced right. Store staff are stretched across every brand in the aisle, so your launch sits in the back room, facings drift, and tags go missing. You find out weeks later in the sales data, after the window has closed.",
      ],
      // TODO(content): placeholder; the doc calls for a specialist mid-reset
      // in a CE aisle with no client or retailer branding.
      image: { src: `${IMG}/merchandising-hero.jpg`, alt: "A Channel Partners specialist setting a retail shelf" },
    },
    capabilities: {
      heading: "Shelf execution from the first reset to the next visit",
      // TODO(content): all four photos are placeholders.
      items: [
        {
          title: "Shelf and planogram execution",
          lead: "Your products set where the planogram says, every visit.",
          bullets: [
            { text: "POG compliance checks and corrections" },
            { text: "Stocking and replenishment from the back room" },
            { text: "Facings, positioning, and adjacency fixes" },
          ],
          image: { src: `${IMG}/merchandising-approach.png`, alt: "A Channel Partners specialist stocking a display" },
        },
        {
          title: "Resets and launches",
          lead: "New sets in place before the shopper arrives.",
          bullets: [
            { text: "New product launch sets" },
            { text: "Seasonal and promotional resets" },
            { text: "Full-chain and regional rollouts" },
            { text: "Display fixture installation and part identification" },
          ],
          image: { src: `${IMG}/merchandising-hero.jpg`, alt: "A retail reset in progress" },
        },
        {
          title: "Pricing, signage, and displays",
          lead: "The details that close the sale at the shelf.",
          bullets: [
            { text: "Price tag placement and accuracy checks" },
            { text: "Graphic and digital signage placement" },
            { text: "Display setup, maintenance, and restocking" },
          ],
          image: { src: `${IMG}/audits-hero.jpg`, alt: "A Channel Partners specialist checking pricing" },
        },
        {
          title: "Visit documentation",
          lead: "Proof of every visit, not a summary at month end.",
          bullets: [
            { text: "Before and after photos at every location" },
            { text: "POG compliance verified and scored" },
            { text: "Issues escalated as they’re found" },
          ],
          image: { src: `${IMG}/assisted-sales-hero.png`, alt: "A Channel Partners specialist in a store aisle" },
        },
      ],
      note: "Integrated, AI-powered smart peripherals aid our merchandising programs, so shelf conditions are captured the same way in every store.",
    },
    engagementModels: {
      heading: "Engagement models",
      // No Ad hoc card: there's no real ad hoc merchandising example on file.
      models: [
        {
          name: "Project",
          whatItIs: "A reset, launch, or rollout with a fixed start and end",
          whenToChoose: "A new product, a planogram change, or a seasonal set has a date that can’t move",
          // TODO(content): confirm with Nikki.
          example: "A health and beauty launch piloted across a big-box chain, then approved for full-chain rollout",
        },
        {
          name: "Continuity",
          whatItIs: "Recurring visits on a weekly, biweekly, or monthly cadence",
          whenToChoose: "Store teams can’t hold POG compliance, stock levels, or pricing between resets",
          // TODO(content): confirm with Nikki.
          example:
            "Weekly visits for a mobile brand across a national footprint, holding on-shelf availability and price accuracy",
        },
      ],
      tags: {
        label: "Categories",
        items: [
          "Consumer Electronics",
          "Mobile and Connected Home",
          "Gaming",
          "Convenience & Grocery",
          "Health & Beauty",
          "Health & Wellness",
          "Home Improvement",
          "Home Appliances",
          "Office Supplies",
          "Toys",
          "Pets",
          "Sporting Goods and Outdoor",
          "Apparel",
          "Baby",
        ],
      },
    },
    process: {
      eyebrow: "How it works",
      heading: "From store list to shelf",
      accent: "in five steps",
      steps: [
        {
          title: "Scope",
          body: "We agree on store list, categories, visit cadence, and the measures you report on internally.",
        },
        {
          title: "Staff and train",
          // TODO(content): Nikki to confirm in-person training for every program.
          body: "W-2 Merchandising Specialists are matched by geography and category and trained in person on your brand and retailer standards.",
        },
        {
          title: "Set the shelf",
          body: "Specialists reset, stock, price, and place signage on schedule, store by store.",
        },
        {
          title: "Fix and flag",
          body: "Issues are fixed on the visit where possible; what can’t be fixed is flagged with photos and escalated to your Client Service Manager.",
        },
        {
          title: "Reporting",
          body: "In OpenSky™ you see completion, compliance, and photos from every store as visits close.",
        },
      ],
    },
    caseStudies: {
      heading: "Trusted on the shelf by the retailers you sell through",
      // TODO(content): confirm both cards with Nikki (client, retailer,
      // figures, clearance); both stay anonymized until cleared. Placeholder
      // photos; add `href` once the full case studies exist.
      items: [
        {
          title: "Pilot to full chain, in a single launch window",
          value: "100%",
          label: "Of pilot stores completed",
          image: { src: `${IMG}/case-study-placeholder.jpg`, alt: "" },
        },
        {
          title: "Shelves held between visits, across a national footprint",
          value: "11%+",
          label: "Lift in on-shelf availability",
          image: { src: `${IMG}/case-study-placeholder.jpg`, alt: "" },
        },
      ],
    },
    whyUs: [
      {
        title: "A W-2 team, not gig labor",
        body: "Our W-2 Merchandising Specialists are retail pros, too. They’re employees, trained in person on your brand standards, and they’re accountable for every visit on the schedule.",
      },
      {
        title: "One partner, start to finish",
        body: "One Client Service Manager owns your program across brand, retailer, and supply chain partners, and you see every visit in live reporting. The team that sets the shelf also captures compliance and receives the reset materials, so nothing falls between vendors.",
      },
      {
        title: "Category depth",
        body: "From consumer electronics planograms with dense pricing and promotional signage to fast-turn convenience and grocery sets, specialists are matched to the category they’ll merchandise.",
      },
    ],
    worksWith: [
      {
        label: "Audits & Compliance",
        href: `${SOLUTIONS}/audits-compliance`,
        body: "Compliance checks captured on the same merchandising visit, by the same specialist.",
      },
      {
        label: "Warehousing, Fulfillment & Logistics",
        href: `${SOLUTIONS}/warehousing-fulfillment-logistics`,
        body: "Reset materials kitted per store and on site before your specialist arrives.",
      },
      {
        label: "Assisted Sales & Training",
        href: `${SOLUTIONS}/assisted-sales-training`,
        body: "Floor specialists at the doors where the shelf is already set.",
      },
    ],
    faqs: [
      {
        question: "What do your merchandising services include?",
        answer:
          "Merchandising covers everything that keeps your product on the shelf, set right, and ready to sell. That includes planogram resets and compliance checks, stocking and replenishment, price tag placement and accuracy, graphic and digital signage placement, display setup and maintenance, and new product launch sets. Every visit is photo documented, and issues are fixed on the spot or escalated. Programs run as projects with a fixed end date or as continuity visits on a recurring schedule.",
      },
      {
        question: "What’s outside the scope of merchandising?",
        answer:
          "Merchandising doesn’t include work that needs permits, MEP trades, or structural changes, such as gondola builds or heavy fixture moves; those belong to Construction. Product warehousing and kitting run under Warehousing, Fulfillment & Logistics, and selling on the floor runs under Assisted Sales & Training. Because all of these sit with one partner, we can scope them together when a program needs more than one.",
      },
      {
        question: "Are your merchandisers employees or contractors?",
        answer:
          "Employees. Every Merchandising Specialist is a W-2 Channel Partners employee, not gig labor. They’re recruited for retail experience, trained in person on your brand standards and each retailer’s requirements before their first visit, and managed to your program’s schedule. That means consistent coverage, the same standards in every door, and a team that’s accountable to you for every visit.",
      },
      {
        question: "How does reporting work?",
        answer:
          "Every visit is logged in your live reporting with completion status, POG compliance, before and after photos, and any issues the specialist flagged. You see results as each visit closes, not in an end-of-week summary. Dashboards and KPIs are set up around your program before it launches. Brands that want to connect shelf execution to sell-through can add a Strategy & Analytics engagement with a dedicated analyst.",
      },
      {
        question: "How fast can a merchandising program start?",
        // TODO(content): confirm typical lead time with Nikki.
        answer:
          "It depends on store count, category, and training needs. For a straightforward program, a scope of work and a store list can be enough to begin planning, and specialists are trained in person before the first visit. Tell us your launch or reset date when you reach out, and we’ll build the schedule backward from it.",
      },
      {
        question: "What’s the difference between project and continuity merchandising?",
        answer:
          "A project has a defined start and end: a new product launch, a seasonal reset, or a full-chain rollout tied to a planogram change. Continuity is a recurring visit on a weekly, biweekly, or monthly cadence that keeps the shelf stocked, priced, and compliant between resets. Many brands run both, with a launch project followed by continuity visits that protect the set.",
      },
      {
        question: "Can merchandising run alongside your other Retail Execution services?",
        answer:
          "Yes. Merchandising Compliance Audits can be captured on the same visit by the same specialist, so you get compliance data without paying for a second trip. Reset materials can be kitted and delivered by our Warehousing, Fulfillment & Logistics team, and Assisted Sales & Training specialists can work the same doors. Combined programs share one schedule, one point of contact, and one view of your stores.",
      },
      {
        question: "Which product categories do you merchandise?",
        answer:
          "We lead with Consumer Electronics, including mobile, connected home, and gaming, where planograms, pricing, and promotional signage change often. We also merchandise Convenience & Grocery, Health & Beauty, Health & Wellness, Home Improvement, Home Appliances, Office Supplies, Toys, Pets, Sporting Goods and Outdoor, Apparel, and Baby. Specialists are matched to programs by category experience as well as geography.",
      },
      {
        question: "Can you handle a full-chain reset or rollout?",
        answer:
          "Yes. Full-chain and regional rollouts are a core part of our project work, from a pilot group of stores through the full chain on a fixed schedule. Specialists are scheduled by geography so every store is set inside the window, and you see completion store by store as it happens. When reset materials need to arrive first, Warehousing, Fulfillment & Logistics can kit and ship them to each store ahead of the visit.",
      },
      {
        question: "What happens when a specialist finds a problem they can’t fix?",
        answer:
          "It’s flagged during the visit, with photos, and escalated to your Client Service Manager. Common examples are missing product that hasn’t shipped to the store, damaged fixtures, or a planogram conflict that needs a retailer decision. Your Client Service Manager works the issue with you and the retailer, and the resolution shows up in your reporting so nothing is left open without an owner.",
      },
      {
        question: "Do you merchandise nationwide?",
        // TODO(content): confirm geographic coverage and any limits with Nikki.
        answer:
          "Our W-2 Merchandising Specialists cover stores across the U.S., scheduled by geography so visits stay on cadence. If your program includes specific regions, store formats, or rural and hard-to-reach doors, share the store list and we’ll confirm coverage for every location before you commit.",
      },
      {
        question: "Do you work with brands or retailers?",
        // TODO(content): confirm retailer-side programs with Nikki.
        answer:
          "Both, though most merchandising programs are run on behalf of consumer brands that need their products set and maintained inside retailer stores. We work to each retailer’s standards and requirements, and our status as a Preferred Target Merchandising Partner reflects that. If you’re a retailer with a reset or compliance need, the conversation starts the same way.",
      },
    ],
    cta: {
      heading: "Tell us which shelves are costing you sales",
      body: "Bring your store list, categories, and timing. No finished scope needed.",
    },
  },
];

export function getSolutionContent(pillar: string, slug: string): SolutionContent | undefined {
  return solutions.find((s) => s.pillar === pillar && s.slug === slug);
}
