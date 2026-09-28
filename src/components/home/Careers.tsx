"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const ICIMS_BASE =
  "https://careers-channelpartners.icims.com/jobs/search?ss=1&searchRelation=keyword_all";

type Job = {
  slug: string;
  title: string;
  image: string;
  categoryId: string;
  bullets: string[];
};

const JOBS: Job[] = [
  {
    slug: "display-maintenance",
    title: "Display Maintenance",
    image: "/images/careers/career_display-maintenance.png",
    categoryId: "46922",
    bullets: [
      "Enjoy hands-on, technical work and troubleshooting",
      "Are comfortable working independently in the field",
      "Take pride in fixing problems correctly the first time",
      "Stay calm and resourceful when plans change",
      "Like seeing immediate results from their work",
    ],
  },
  {
    slug: "corporate-employees",
    title: "Corporate Employees",
    image: "/images/careers/career_corporate-employees.png",
    categoryId: "25261",
    bullets: [
      "Prefer impact and accountability over bureaucracy",
      "Enjoy building systems that support field execution",
      "Communicate clearly and work cross-functionally",
      "Take ownership of outcomes, not just tasks",
      "Value clarity, structure, and follow-through",
    ],
  },
  {
    slug: "retail-merchandisers",
    title: "Retail Merchandisers",
    image: "/images/careers/career_retail-merchandising.png",
    categoryId: "46924",
    bullets: [
      "Are detail-oriented and follow standards closely",
      "Take pride in visual presentation and accuracy",
      "Like structured work with clear expectations",
      "Enjoy working independently in retail environments",
      "Appreciate seeing tangible results on the store floor",
    ],
  },
  {
    slug: "installation-assembly",
    title: "Installation & Assembly",
    image: "/images/careers/career_installation-and-assembly.png",
    categoryId: "46925",
    bullets: [
      "Enjoy hands-on, physical work",
      "Take pride in precision and craftsmanship",
      "Work well independently and on teams",
      "Like seeing immediate results from their work",
      "Show up dependable and ready to execute",
    ],
  },
  {
    slug: "retail-associates",
    title: "Retail Associates",
    image: "/images/careers/career_retail-associates.png",
    categoryId: "8721",
    bullets: [
      "Enjoy interacting with customers and store teams",
      "Learn products quickly and communicate clearly",
      "Thrive in fast-paced retail environments",
      "Show up reliably and take responsibility seriously",
      "Like being the face of a brand in-store",
    ],
  },
  {
    slug: "training-market-development-managers",
    title: "Training & Market Development Managers",
    image: "/images/careers/career_training-and-market-development-managers.png",
    categoryId: "46923",
    bullets: [
      "Enjoy coaching, training, and influencing others",
      "Are confident communicators in front of groups",
      "Like owning a territory or market",
      "Balance relationship-building with performance goals",
      "Are comfortable traveling and adapting day to day",
    ],
  },
  {
    slug: "field-team-management",
    title: "Field Team Management",
    image: "/images/careers/career_field-management-team.png",
    categoryId: "25259",
    bullets: [
      "Lead with clarity, trust, and accountability",
      "Stay organized while managing multiple priorities",
      "Support teams without micromanaging",
      "Make decisions quickly and responsibly",
      "Take pride in helping others perform at a high level",
    ],
  },
  {
    slug: "experiential-events",
    title: "Experiential & Events",
    image: "/images/careers/career_experiential-and-events.png",
    categoryId: "46921",
    bullets: [
      "Thrive in dynamic, fast-moving environments",
      "Enjoy turning ideas into real-world experiences",
      "Collaborate well across creative and operational teams",
      "Stay calm under tight timelines and live execution",
      "Take ownership from planning through execution",
    ],
  },
  {
    slug: "assisted-selling",
    title: "Assisted Selling",
    image: "/images/careers/career_assisted-selling.png",
    categoryId: "25264",
    bullets: [
      "Enjoy educating and influencing customers",
      "Are confident, approachable, and professional",
      "Like working toward measurable performance goals",
      "Learn products quickly and explain them clearly",
      "Want direct impact on sales outcomes",
    ],
  },
];

function CareerCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative flex h-[405px] w-[326px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-lg"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(true)}
    >
      <Image src={job.image} alt="" fill unoptimized className="object-cover" />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 transition-opacity duration-[500ms] ease-out ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 bg-[rgba(1,1,1,0.8)] transition-opacity duration-[500ms] ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative flex flex-col p-8">
        <p className="header-6 text-white text-shadow-[0px_0px_6.2px_rgba(0,0,0,0.75)]">
          {job.title}
        </p>
        <div
          className={`grid transition-[grid-template-rows] duration-[500ms] ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div
            aria-hidden={!open}
            className={`flex min-h-0 flex-col gap-[10px] overflow-hidden pt-[10px] transition-opacity duration-[500ms] ease-out ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <p className="text-base font-bold leading-6 text-white">
              Perfect for people who:
            </p>
            <ul className="list-disc pl-[18px] text-xs leading-4 text-white">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="mb-2 last:mb-0">
                  {bullet}
                </li>
              ))}
            </ul>
            <Button
              href={`${ICIMS_BASE}&searchCategory=${job.categoryId}`}
              variant="primary"
              className="mt-2 self-start"
              tabIndex={open ? 0 : -1}
            >
              View Open Positions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Careers() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 350, behavior: "smooth" });
  };

  return (
    <section className="w-full overflow-x-hidden bg-white py-[110px]">
      <div className="flex flex-col gap-12 pl-[var(--grid-margin)] md:flex-row md:items-center md:pl-[var(--grid-margin-md)]">
        <div className="flex shrink-0 flex-col items-start gap-6 pr-[var(--grid-margin)] md:w-[443px] md:pr-0">
          <div className="flex flex-col">
            <h2 className="header-3 text-black">channel your</h2>
            <p className="font-display text-[48px] italic leading-[60px] tracking-[-0.02em] text-cerulean">
              Potential
            </p>
            <p className="mt-3 text-base leading-6 text-black">
              We don&rsquo;t just hire talent, we hire perspective. Every person on our team
              brings something the next one couldn&rsquo;t, and that&rsquo;s what makes our
              work impossible to copy.
            </p>
          </div>
          <Button href={ICIMS_BASE} variant="primary">
            Browse Job Openings
          </Button>
        </div>

        <div className="relative min-w-0 flex-1">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
          >
            {JOBS.map((job) => (
              <CareerCard key={job.slug} job={job} />
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2 pr-[var(--grid-margin)] md:pr-[var(--grid-margin-md)]">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByCard(-1)}
              className="flex size-9 items-center justify-center rounded-full border border-middle-grey text-black hover:border-cerulean hover:text-cerulean"
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByCard(1)}
              className="flex size-9 items-center justify-center rounded-full border border-middle-grey text-black hover:border-cerulean hover:text-cerulean"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
