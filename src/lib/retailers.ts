// Retailer credential pages (/best-buy, /target-preferred-merchandising-partner).
// Each sells one retailer rather than one service, so it has its own layout
// (RetailerPage) and content shape; optional sections are skipped when an
// entry leaves them out. Copy rules match the solution pages: one H1, no em
// dashes, no terminal punctuation on headlines.

import type { Metadata } from "next";

export type RetailerImage = { src: string; alt: string };

// Icon keys for department lists and feature points; RetailerPage maps each
// to a Lucide icon.
export type RetailerIcon =
  | "baby" | "toys" | "home" | "beauty" | "electronics" | "sports"
  | "floorcare" | "pet" | "garden" | "gift-cards" | "clothing"
  | "coverage" | "certified" | "receiving"
  | "continuity" | "pop" | "replenishment" | "audits" | "break-fix" | "install"
  | "on-shelf" | "signage" | "launch" | "events" | "planogram" | "cut-in"
  | "remodel" | "reporting"
  | "reset" | "construction" | "light-merch" | "secret-shopper" | "sales"
  | "pos" | "virtual";

// A service shows a cerulean dot unless it names its own icon.
export type ServiceItem = string | { label: string; icon: RetailerIcon };

export type RetailerPageContent = {
  slug: string;
  // Name used in the contact form's prefilled message (?retailer=<slug>).
  name: string;
  meta: Metadata;
  hero: { eyebrow: string; title: string; body: string; image: RetailerImage };
  intro: {
    eyebrow?: string;
    heading: string;
    body: string[];
    image?: RetailerImage;
  };
  // Own dark section; `accent` is the italic cerulean tail of the headline.
  departments?: {
    eyebrow: string;
    title: string;
    accent?: string;
    items: { label: string; icon: RetailerIcon }[];
  };
  callout?: { eyebrow: string; text: string; body?: string };
  feature?: { eyebrow: string; heading: string; body: string; points: { label: string; icon: RetailerIcon }[] };
  services: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    groups: { title?: string; lead?: string; items: ServiceItem[] }[];
  };
  engagementModels?: {
    heading: string;
    models: { name: string; whatItIs: string; whenToChoose: string }[];
  };
  process?: { eyebrow: string; heading: string; steps: { title: string; body: string }[] };
  proof?: {
    // `accent` stacks under `title` as the italic cerulean line.
    callout: { title: string; accent: string };
    stats: { value: string; label: string }[];
  };
  whyUs: { heading: string; points: { title: string; body: string }[] };
  faqs: { question: string; answer: string }[];
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
    // Rendered under the button only when `hidden` is false.
    contact?: { name: string; title: string; email: string; phone: string; hidden?: boolean };
  };
};

const contactHref = (slug: string) => `/contact?source=retail-execution&retailer=${slug}`;

export const retailerPages: RetailerPageContent[] = [
  {
    slug: "best-buy",
    name: "Best Buy",
    meta: {
      title: "Best Buy Approved 3PL Provider",
      description:
        "Approved at every Best Buy service level in the US and Canada. Certified W-2 specialists, photo-verified visits, one accountable partner.",
    },
    hero: {
      eyebrow: "Best Buy Approved 3PL Provider · US and Canada",
      title: "Approved at every Best Buy service level",
      body: "Displays installed, resets finished, and products sold on the floor by certified specialists, with photo proof from every visit. One partner accountable for how your brand shows up in Best Buy.",
      image: {
        src: "/images/retailers/best-buy-hero.jpg",
        alt: "Channel Partners specialist demonstrating an espresso machine to shoppers at Best Buy",
      },
    },
    intro: {
      heading: "Best Buy doesn't give you a second launch date",
      body: [
        "Peak-season resets. New product drops. High-volume doors where a display that doesn't work is a missed sale, not a service ticket.",
        "The consumer electronics floor punishes every gap between a rep showing up and the work getting done: ghost visits, half-finished resets, demo units that are dark before the shopper arrives. You usually find out when sell-through drops or the store calls. By then the launch window has closed.",
      ],
      image: {
        src: "/images/retailers/best-buy-sales.jpg",
        alt: "Channel Partners specialist helping a shopper at a computer display in Best Buy",
      },
    },
    services: {
      eyebrow: "What we run",
      heading: "Every service level Best Buy offers, from one approved partner",
      intro:
        "Best Buy approves 3PL providers service by service. We're approved at every level, so your installs, merchandising, and sales programs can all run through one partner and one field team.",
      groups: [
        {
          title: "Display installation and setup",
          lead: "The work most brands bring us first. New fixtures and displays built, installed, and set to spec, ready to sell on day one.",
          items: [
            { label: "New display and fixture installation", icon: "install" },
            { label: "Reset and remodel", icon: "reset" },
            { label: "Light construction", icon: "construction" },
            { label: "Brand shops and dedicated floor presence", icon: "remodel" },
          ],
        },
        {
          title: "Merchandising and continuity",
          lead: "Displays that stay working and on planogram between launches, not just on install day.",
          items: [
            { label: "Merchandising Level 1 and Level 2", icon: "planogram" },
            { label: "Continuity Level 1 and Level 2", icon: "continuity" },
            { label: "Light merchandising and continuity programs", icon: "light-merch" },
            { label: "Break fix for demo units and display hardware", icon: "break-fix" },
          ],
        },
        {
          title: "Audits",
          lead: "A clear read on what shoppers are actually seeing in your stores.",
          items: [
            { label: "Merchandising Compliance Audits", icon: "audits" },
            { label: "Customer Experience Audits (secret shopper)", icon: "secret-shopper" },
          ],
        },
        {
          title: "Sales floor execution",
          lead: "Specialists who explain, demo, and sell your product next to Best Buy's own team.",
          items: [
            { label: "Assisted sales and conversion", icon: "sales" },
            { label: "Product training and live demos", icon: "events" },
            { label: "Brand advocacy and competitive positioning", icon: "pop" },
            { label: "POS Certified Sales Specialists for programs that ring transactions", icon: "pos" },
            { label: "Virtual training for Best Buy associates", icon: "virtual" },
          ],
        },
      ],
    },
    engagementModels: {
      heading: "Three ways to run a Best Buy program",
      models: [
        {
          name: "Launch and project work",
          whatItIs: "A fixed scope on a fixed date.",
          whenToChoose: "New product launches, peak-season resets, and chain-wide display rollouts.",
        },
        {
          name: "Continuity programs",
          whatItIs: "Scheduled visits that keep displays working and on spec.",
          whenToChoose: "When a brand's in-store presence has to hold up between launches.",
        },
        {
          name: "Sales programs",
          whatItIs: "Dedicated floor specialists in priority doors.",
          whenToChoose: "When a product needs explaining before it sells.",
        },
      ],
    },
    process: {
      eyebrow: "How a program runs",
      heading: "From door list to verified visit",
      steps: [
        {
          title: "Scope",
          body: "We map your doors, timeline, and service levels against Best Buy's requirements before anything is scheduled.",
        },
        {
          title: "Staff and certify",
          body: "W-2 specialists are trained in person on your product, your brand standards, and Best Buy's store procedures.",
        },
        {
          title: "Deploy",
          body: "Teams are scheduled in your launch window, with surge capacity for peak season and new product drops.",
        },
        {
          title: "Execute and verify",
          body: "Every visit is captured with photos and checked against spec before the specialist leaves the store.",
        },
        {
          title: "Report",
          body: "You see completion, compliance, and open issues live in OpenSky™, door by door, as each visit closes.",
        },
      ],
    },
    proof: {
      callout: { title: "We don't sell hours", accent: "We sell performance" },
      stats: [
        { value: "40+", label: "Years in retail execution" },
        { value: "100%", label: "Of Best Buy service levels approved" },
        { value: "US & Canada", label: "Approved provider in both countries" },
        { value: "W-2 & T4", label: "Certified specialists, not gig labor" },
      ],
    },
    whyUs: {
      heading: "Why brands move their Best Buy program to us",
      points: [
        {
          title: "A W-2 team, not gig labor",
          body: "Every specialist in your stores is our employee, trained and certified in person before their first visit. W-2 in the US, T4 in Canada. Same standards in every door.",
        },
        {
          title: "One partner, start to finish",
          body: "Install, merchandising, continuity, audits, and sales on one team, one schedule, and one live view of every door. No piecing reports together from four vendors.",
        },
        {
          title: "Accountable for outcomes, not visits",
          body: "Compliance is our floor. Performance is our ceiling. If a display isn't set to spec, we know before we leave the store, not when you call. Issues get fixed before they cost you sales.",
        },
      ],
    },
    faqs: [
      {
        question: "What does \"approved at every Best Buy service level\" mean?",
        answer:
          "Best Buy approves third-party providers separately for each type of in-store work, from merchandising and continuity to light construction and sales programs. Channel Partners is approved for all of them. You can run installs, resets, ongoing maintenance, audits, and floor sales through one partner instead of hiring a different approved vendor for each.",
      },
      {
        question: "Do you install displays, or just maintain them?",
        answer:
          "Both. Display and fixture installation is most of our Best Buy work. We install, set, and verify new displays to spec, handle resets and remodels, and then keep those displays working through continuity visits so they still look right months after launch.",
      },
      {
        question: "Do you work in Best Buy Canada?",
        answer:
          "Yes. Channel Partners is an approved provider for Best Buy in both the US and Canada. Our Canadian specialists are T4 employees, trained and certified to the same standards as our US team.",
      },
      {
        question: "Are your specialists employees or contractors?",
        answer:
          "Employees. Every specialist is W-2 in the US or T4 in Canada, hired, trained, and certified by us in person. We don't use gig or 1099 labor, so the person in your store is accountable to us and to your program.",
      },
      {
        question: "What is a POS Certified Sales Specialist?",
        answer:
          "A specialist certified to ring transactions on Best Buy's point-of-sale system. It applies only to our sales programs, where specialists sell your product and close the purchase on the floor. Our install, merchandising, and continuity teams carry their own certifications for that work.",
      },
      {
        question: "How do I know the work was actually done?",
        answer:
          "Every visit is captured with photos and checked against spec before the specialist leaves the store. AI-enabled verification flags anything that doesn't match, so an incomplete set gets fixed on the spot. You see completion, compliance, and open issues by door in a live dashboard as visits close, not in an end-of-week report.",
      },
      {
        question: "We already work with another 3PL in Best Buy. How hard is it to switch?",
        answer:
          "We plan the switch around your calendar so coverage doesn't drop. We start by mapping your current doors, service levels, and upcoming launches, then certify and schedule our team before your current program ends. Many brands start with one service level or one launch and add from there.",
      },
      {
        question: "Can you scale up for a product launch or peak season?",
        answer:
          "Yes. Launch and peak-season work is built into how we staff Best Buy programs. We bring in additional certified specialists for the launch window and scale back once it closes, so you aren't paying for peak coverage all year.",
      },
      {
        question: "How fast can a program start?",
        answer:
          "It depends on door count, service level, and certification needs. Tell us your launch date and we'll tell you honestly whether we can hit it.",
      },
      {
        question: "Can one program cover install, merchandising, and sales together?",
        answer:
          "Yes, and it's usually how brands get the most out of Best Buy. The team that installs your display can keep it working through continuity visits, and sales specialists can work the same doors. It's one schedule and one point of contact, with every service reported in the same dashboard.",
      },
      {
        question: "Do you only work with established brands?",
        answer:
          "No. We support emerging brands going into Best Buy for the first time as well as established brands expanding or improving existing programs. For new brands, we can help work out which service levels a launch actually needs.",
      },
      {
        question: "Who do I talk to about a Best Buy program?",
        answer:
          "Start with the contact form and tell us about your Best Buy program. Our team will follow up within one business day.",
      },
    ],
    cta: {
      heading: "Get your Best Buy launch right the first time",
      body: "Bring your door list, launch dates, and the service levels you think you need. No finished scope required.",
      buttonLabel: "Bring us the challenge",
      // TODO(content): confirm Rita is OK with her direct line on the public
      // page, then set hidden: false (and mention her in the last FAQ).
      contact: {
        name: "Rita Sams",
        title: "Director of Retail Operations",
        email: "Rita.Sams@ChannelPartners.com",
        phone: "(419) 357-7763",
        hidden: true,
      },
    },
  },
  {
    slug: "target",
    name: "Target",
    meta: {
      title: "Target Preferred Merchandising Partner",
      description:
        "Channel Partners is a Preferred Merchandising 3PL provider for Target across all departments, and Target's exclusive Consumer Electronics 3PL partner.",
    },
    hero: {
      eyebrow: "A Target Preferred Merchandising 3PL Partner",
      title: "Own the aisle at Target with Channel Partners",
      body: "Need a merchandising partner who shows up, delivers, and makes your brand stand out in every Target store nationwide?",
      image: {
        src: "/images/retailers/target-hero.jpg",
        alt: "Channel Partners merchandiser shaking hands with a Target team member in the electronics aisle",
      },
    },
    intro: {
      heading: "Stocked, seen, and shoppable in every department",
      body: [
        "Channel Partners is proud to be a Preferred Merchandising Third-Party Labor (3PL) provider for Target across all departments, delivering relentless execution and real-time insights at scale. From bold end caps to seamless resets, we make sure your products are stocked, seen and shoppable.",
      ],
    },
    departments: {
      eyebrow: "Experience across all departments",
      title: "Every department.",
      accent: "One partner",
      items: [
        { label: "Pet", icon: "pet" },
        { label: "Baby", icon: "baby" },
        { label: "Toys", icon: "toys" },
        { label: "Floorcare", icon: "floorcare" },
        { label: "Home & Décor", icon: "home" },
        { label: "Sports & Outdoors", icon: "sports" },
        { label: "POSA & Gift Cards", icon: "gift-cards" },
        { label: "Beauty & Personal Care", icon: "beauty" },
        { label: "Outdoor Living & Garden", icon: "garden" },
        { label: "Clothing, Shoes & Accessories", icon: "clothing" },
        { label: "Consumer Electronics & Video Games", icon: "electronics" },
      ],
    },
    callout: {
      eyebrow: "Target's exclusive Consumer Electronics 3PL partner",
      text: "Channel Partners is Target's exclusive 3PL partner within Consumer Electronics for merchandising, break-fix, and installation.",
      body: "With over 10 years of experience, we've built a proven track record of consistent execution, deep store knowledge, and long-term partnership with Target teams.",
    },
    feature: {
      eyebrow: "Retail solutions that go beyond the shelf",
      heading: "Powering brands that win",
      body: "Whether you're launching a new product or leveling up your current retail footprint, Channel Partners builds custom programs that move fast, hit hard, and scale efficiently, all backed by a team that knows the Target floor inside and out.",
      points: [
        { label: "Weekly national coverage", icon: "coverage" },
        { label: "Backroom & MyDevice Certified", icon: "certified" },
        { label: "Dedicated Backroom Channel Partners Space for Receiving", icon: "receiving" },
      ],
    },
    services: {
      heading: "Our Target retail services",
      groups: [
        {
          items: [
            { label: "Project and Continuity Programs", icon: "continuity" },
            { label: "POP & Visual Merchandising", icon: "pop" },
            { label: "Inventory Replenishment", icon: "replenishment" },
            { label: "In-Store Retail Audits", icon: "audits" },
            { label: "Break-fix & Display Maintenance", icon: "break-fix" },
            { label: "End Cap & Display Installations", icon: "install" },
            { label: "On-Shelf Availability & Replenishment", icon: "on-shelf" },
            { label: "Signage Audits, Installation, and Maintenance", icon: "signage" },
            { label: "New Product and Brand Launches", icon: "launch" },
            { label: "In-Store Events & Training", icon: "events" },
            { label: "Planogram Execution & Retail Resets", icon: "planogram" },
            { label: "New Product Cut-Ins", icon: "cut-in" },
            { label: "New Store & Remodel Support", icon: "remodel" },
            { label: "Customizable Reporting", icon: "reporting" },
          ],
        },
      ],
    },
    whyUs: {
      heading: "Why brands choose Channel Partners at Target",
      points: [
        {
          title: "Unmatched nationwide coverage",
          body: "Consistent support, full visibility, and flawless execution coast to coast.",
        },
        {
          title: "Expert merchandisers, trained and certified",
          body: "Our W-2 merchandisers are Target backroom-certified professionals with real retail experience and access to the systems and spaces that matter.",
        },
        {
          title: "Real-time visibility",
          body: "Our proprietary reporting platform delivers instant proof of execution through photos, data, and performance insights from every visit.",
        },
        {
          title: "Stronger in-store relationships. Better results",
          body: "We go beyond store visits to build real relationships, driving smoother execution, stronger compliance, and better alignment with retail teams.",
        },
        {
          title: "One partner. One point of contact. Zero confusion",
          body: "Your dedicated Channel Partners program lead keeps everything running smoothly. No layers. No red tape. Just clear communication and reliable execution.",
        },
      ],
    },
    faqs: [
      {
        question: "Is Channel Partners an approved merchandising provider for Target?",
        answer:
          "Yes. Channel Partners is a Preferred Merchandising 3PL Partner for Target, supporting brands across every department nationwide. We deploy trained, W-2 Merchandising Specialists credentialed to work in Target backrooms and on the sales floor. Every program runs on OpenSky (our proprietary field intelligence platform), giving brands real-time proof of what was executed in each store, every visit.",
      },
      {
        question: "How do I choose a merchandising partner for my brand at Target?",
        answer:
          "Choosing a Target merchandising partner comes down to four things: nationwide coverage that matches your store footprint, a trained and accountable labor model, real-time reporting you can act on, and field teams already credentialed to work inside Target. A partner missing any one of these leaves gaps in execution. Channel Partners covers all four as a Preferred Merchandising 3PL Partner for Target across every department.",
      },
      {
        question: "Can a single partner cover all of my brand's Target stores nationwide?",
        answer:
          "Yes. A merchandising partner with national field coverage can execute across your entire Target footprint, coast to coast, rather than leaving you to manage regional gaps. Consistency across markets is what protects on-shelf availability and sell-through. Channel Partners provides weekly national coverage at Target with the same trained W-2 team and reporting standard in every market, so execution does not vary by region.",
      },
      {
        question: "How fast can a brand launch a new product across Target stores?",
        answer:
          "A new product can be set across Target stores within the launch window when a dedicated field team is scheduled against Target's reset calendar in advance, with materials staged to arrive before the crew. Delays usually come from late materials or unstaffed stores, not the work itself. Channel Partners executes launches and cut-ins nationwide and coordinates materials so products are shoppable on schedule.",
      },
      {
        question: "How do I make sure my brand's shelf is actually maintained between Target visits?",
        answer:
          "Shelf maintenance between Target visits depends on visit frequency and proof that each visit happened as scheduled. Without documentation, a brand cannot tell a missed visit from a completed one until sell-through drops. Channel Partners runs continuity programs at Target and reports every visit through OpenSky, our proprietary field intelligence platform: timestamped photos, completion status, and compliance data, store by store, the day it happens.",
      },
      {
        question: "How do I prove my Target merchandising program is working?",
        answer:
          "You prove a Target merchandising program is working with real-time execution data tied to outcomes: visit completion, planogram compliance, on-shelf availability, and photo proof from every store, then connected to sell-through. Activity reports alone do not show impact. Channel Partners delivers this through OpenSky, our proprietary field intelligence platform, and can connect field execution to sell-through through a dedicated strategy and analytics engagement.",
      },
      {
        question: "Should I use W-2 merchandisers or gig workers for my Target program?",
        answer:
          "W-2 merchandisers produce more consistent Target execution than gig or 1099 labor because they are trained before deployment and accountable to a program and a manager, not a per-task app. Gig labor has no stake in whether your shelf is right. Channel Partners staffs every Target program with W-2 Merchandising Specialists, trained in person and certified before they enter a store.",
      },
      {
        question: "Can one partner handle merchandising, break fix, and installation at Target?",
        answer:
          "Yes. One partner can cover merchandising, break fix, and installation across Target, which spares your team from coordinating separate vendors for shelf work, repairs, and display setup. One team, one schedule, and one reporting standard close the gaps where execution usually fails. Channel Partners is Target's exclusive Consumer Electronics 3PL partner for all three and supports brands across every other Target department.",
      },
      {
        question: "How do brands fix broken displays or demo units at Target?",
        answer:
          "Broken displays and dark demo units at Target are resolved through break fix programs: a technician documents the issue, sources or orders the part, and repairs it on-site, often during a scheduled merchandising visit. A dead demo unit quietly costs sales every day it stays down. Channel Partners runs break fix and display maintenance at Target alongside merchandising, so one team keeps displays set and functional.",
      },
      {
        question: "What does it take for my field team to get access to Target backrooms and systems?",
        answer:
          "Accessing Target backrooms and retailer systems requires credentialing through Target's programs before a merchandiser can work in those areas, which can delay a program if a partner's team is not already cleared. Brands avoid that delay by choosing a partner whose people are pre-certified. Channel Partners' W-2 Specialists are Target backroom and MyDevice certified, with dedicated backroom receiving space in every market.",
      },
    ],
    cta: {
      heading: "Ready to win in every aisle",
      body: "Please reach out and let's discuss how Channel Partners can support your brand across retail.",
      buttonLabel: "Contact us today",
    },
  },
];

export function getRetailerPage(slug: string): RetailerPageContent | undefined {
  return retailerPages.find((page) => page.slug === slug);
}

export function retailerContactHref(page: RetailerPageContent): string {
  return contactHref(page.slug);
}
