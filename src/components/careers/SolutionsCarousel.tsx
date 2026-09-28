"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ICIMS_SEARCH_URL as ICIMS_BASE } from "@/lib/jobs";

const ICON_DIR = "/images/careers/icons";

const ICON_ORDER = [1, 2, 3, 9, 4, 5, 6, 7, 8] as const;

const ICON_SIZE: Record<number, { width: number; height: number }> = {
  1: { width: 54, height: 44 },
  2: { width: 42, height: 36 },
  3: { width: 40, height: 40 },
  4: { width: 45, height: 36 },
  5: { width: 49, height: 30 },
  6: { width: 32, height: 35 },
  7: { width: 42, height: 36 },
  8: { width: 32, height: 35 },
  9: { width: 43, height: 43 },
};

type Solution = {
  slug: string;
  title: string;
  image: string;
  categoryId: string;
  iconNumber: number;
  description: string;
  bullets: string[];
  ctaLabel: string;
};

const SOLUTIONS: Solution[] = [
  {
    slug: "display-maintenance",
    title: "Display Maintenance",
    image: "/images/careers/career_display-maintenance.png",
    categoryId: "46922",
    iconNumber: 1,
    description:
      "Keep retail environments operational by diagnosing, repairing, and restoring fixtures, displays, and technology in the field.",
    bullets: [
      "Enjoy hands-on, technical work and troubleshooting",
      "Are comfortable working independently in the field",
      "Take pride in fixing problems correctly the first time",
      "Stay calm and resourceful when plans change",
      "Like seeing immediate results from their work",
    ],
    ctaLabel: "Display Maintenance Openings",
  },
  {
    slug: "corporate-employees",
    title: "Corporate Employees",
    image: "/images/careers/career_corporate-employees.png",
    categoryId: "25261",
    iconNumber: 2,
    description:
      "Support and scale the business by driving strategy, operations, finance, technology, and program leadership.",
    bullets: [
      "Prefer impact and accountability over bureaucracy",
      "Enjoy building systems that support field execution",
      "Communicate clearly and work cross-functionally",
      "Take ownership of outcomes, not just tasks",
      "Value clarity, structure, and follow-through",
    ],
    ctaLabel: "Corporate Openings",
  },
  {
    slug: "retail-merchandisers",
    title: "Retail Merchandisers",
    image: "/images/careers/career_retail-merchandising.png",
    categoryId: "46924",
    iconNumber: 3,
    description:
      "Execute planograms, resets, and in-store merchandising to ensure products are placed correctly and consistently.",
    bullets: [
      "Are detail-oriented and follow standards closely",
      "Take pride in visual presentation and accuracy",
      "Like structured work with clear expectations",
      "Enjoy working independently in retail environments",
      "Appreciate seeing tangible results on the store floor",
    ],
    ctaLabel: "Merchandising Openings",
  },
  {
    slug: "installation-assembly",
    title: "Installation & Assembly",
    image: "/images/careers/career_installation-and-assembly.png",
    categoryId: "46925",
    iconNumber: 9,
    description:
      "Turn plans into reality by installing fixtures, displays, and retail environments with precision and pride.",
    bullets: [
      "Enjoy hands-on, physical work",
      "Take pride in precision and craftsmanship",
      "Work well independently and on teams",
      "Like seeing immediate results from their work",
      "Show up dependable and ready to execute",
    ],
    ctaLabel: "Installation Openings",
  },
  {
    slug: "retail-associates",
    title: "Retail Associates",
    image: "/images/careers/career_retail-associates.png",
    categoryId: "8721",
    iconNumber: 4,
    description:
      "Represent brands on the retail floor by engaging customers, supporting store teams, and driving in-store execution.",
    bullets: [
      "Enjoy interacting with customers and store teams",
      "Learn products quickly and communicate clearly",
      "Thrive in fast-paced retail environments",
      "Show up reliably and take responsibility seriously",
      "Like being the face of a brand in-store",
    ],
    ctaLabel: "Retail Openings",
  },
  {
    slug: "training-market-development-managers",
    title: "Training & Market Development Managers",
    image: "/images/careers/career_training-and-market-development-managers.png",
    categoryId: "46923",
    iconNumber: 5,
    description:
      "Build brand presence and performance by training associates, developing markets, and driving in-store engagement.",
    bullets: [
      "Enjoy coaching, training, and influencing others",
      "Are confident communicators in front of groups",
      "Like owning a territory or market",
      "Balance relationship-building with performance goals",
      "Are comfortable traveling and adapting day to day",
    ],
    ctaLabel: "Training & MDM Openings",
  },
  {
    slug: "field-team-management",
    title: "Field Team Management",
    image: "/images/careers/career_field-management-team.png",
    categoryId: "25259",
    iconNumber: 6,
    description:
      "Lead, support, and coordinate field teams to ensure projects are executed on time and to standard.",
    bullets: [
      "Lead with clarity, trust, and accountability",
      "Stay organized while managing multiple priorities",
      "Support teams without micromanaging",
      "Make decisions quickly and responsibly",
      "Take pride in helping others perform at a high level",
    ],
    ctaLabel: "Field Team Management Openings",
  },
  {
    slug: "experiential-events",
    title: "Experiential & Events",
    image: "/images/careers/career_experiential-and-events.png",
    categoryId: "46921",
    iconNumber: 7,
    description:
      "Bring brands to life through live events, activations, pop-ups, and immersive consumer experiences.",
    bullets: [
      "Thrive in dynamic, fast-moving environments",
      "Enjoy turning ideas into real-world experiences",
      "Collaborate well across creative and operational teams",
      "Stay calm under tight timelines and live execution",
      "Take ownership from planning through execution",
    ],
    ctaLabel: "Experiential Openings",
  },
  {
    slug: "assisted-selling",
    title: "Assisted Selling",
    image: "/images/careers/career_assisted-selling.png",
    categoryId: "25264",
    iconNumber: 8,
    description:
      "Drive sales by educating customers, demonstrating products, and supporting purchase decisions at the point of sale.",
    bullets: [
      "Enjoy educating and influencing customers",
      "Are confident, approachable, and professional",
      "Like working toward measurable performance goals",
      "Learn products quickly and explain them clearly",
      "Want direct impact on sales outcomes",
    ],
    ctaLabel: "Assisted Selling Openings",
  },
];

export function SolutionsCarousel() {
  const [index, setIndex] = useState(0);
  const solution = SOLUTIONS[index];

  const go = (direction: 1 | -1) => {
    setIndex((current) => (current + direction + SOLUTIONS.length) % SOLUTIONS.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-[91px]">
      <div className="relative mx-auto flex max-w-[1440px] items-center px-[70px]">
        <button
          type="button"
          aria-label="Previous solution"
          onClick={() => go(-1)}
          className="absolute left-[20px] top-1/2 hidden -translate-y-1/2 opacity-35 transition-opacity hover:opacity-100 md:block"
        >
          <Image
            src={`${ICON_DIR}/swiper-arrow-prev.svg`}
            alt=""
            width={23}
            height={44}
            unoptimized
          />
        </button>

        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-[139px]">
          <div className="relative w-full max-w-[558px] shrink-0">
            <div className="absolute -left-6 -top-6 h-full w-full rounded bg-cerulean" aria-hidden />
            <div className="relative aspect-[558/685] w-full overflow-hidden rounded">
              <Image
                src={solution.image}
                alt={`${solution.title} at Channel Partners`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex w-full max-w-[571px] flex-col items-start gap-7">
            <div className="flex items-center gap-6">
              {ICON_ORDER.map((num) => {
                const size = ICON_SIZE[num];
                const isActive = num === solution.iconNumber;
                const target = SOLUTIONS.find((s) => s.iconNumber === num);
                if (!target) return null;
                return (
                  <button
                    key={num}
                    type="button"
                    aria-label={target.title}
                    onClick={() => setIndex(SOLUTIONS.indexOf(target))}
                    className="group relative cursor-pointer"
                  >
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-near-black px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      {target.title}
                    </span>
                    <Image
                      src={`${ICON_DIR}/cu-icon-${isActive ? "g" : "n"}${num}.svg`}
                      alt=""
                      width={size.width}
                      height={size.height}
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>

            <h2 className="header-1 text-black">{solution.title}</h2>

            <p className="text-xl leading-[30.66px] text-black">{solution.description}</p>

            <div className="flex flex-col items-start gap-3">
              <h5 className="header-6 text-black">Perfect for people who:</h5>
              <ul className="flex flex-col gap-1 pl-5">
                {solution.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="list-disc text-xl leading-[30.66px] text-black marker:text-cerulean"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={`${ICIMS_BASE}&searchCategory=${solution.categoryId}`}
              variant="primary"
            >
              {solution.ctaLabel}
            </Button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Next solution"
          onClick={() => go(1)}
          className="absolute right-[20px] top-1/2 hidden -translate-y-1/2 opacity-35 transition-opacity hover:opacity-100 md:block"
        >
          <Image
            src={`${ICON_DIR}/swiper-arrow-next.svg`}
            alt=""
            width={23}
            height={44}
            unoptimized
          />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2 md:hidden">
        <button
          type="button"
          aria-label="Previous solution"
          onClick={() => go(-1)}
          className="flex size-9 items-center justify-center rounded-full border border-middle-grey text-black"
        >
          &larr;
        </button>
        <button
          type="button"
          aria-label="Next solution"
          onClick={() => go(1)}
          className="flex size-9 items-center justify-center rounded-full border border-middle-grey text-black"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
