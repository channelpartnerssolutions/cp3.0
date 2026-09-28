import type { Metadata } from "next";
import { Benefits } from "@/components/careers/Benefits";
import { CareersCta } from "@/components/careers/CareersCta";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersStats } from "@/components/careers/CareersStats";
import { JobMap } from "@/components/careers/JobMap";
import { SolutionsCarousel } from "@/components/careers/SolutionsCarousel";
import { FadeIn } from "@/components/ui/FadeIn";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: "Careers",
  description: "Find open retail merchandising, installation and field team jobs with Channel Partners near you.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <FadeIn>
        <CareersStats />
      </FadeIn>
      <FadeIn>
        <JobMap />
      </FadeIn>
      <FadeIn>
        <SolutionsCarousel />
      </FadeIn>
      <FadeIn>
        <Benefits />
      </FadeIn>
      <FadeIn>
        <CareersCta />
      </FadeIn>
    </>
  );
}
