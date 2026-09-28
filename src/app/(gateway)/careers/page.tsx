import type { Metadata } from "next";
import { CareersHero } from "@/components/careers/CareersHero";
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
        <JobMap />
      </FadeIn>
      <FadeIn>
        <SolutionsCarousel />
      </FadeIn>
    </>
  );
}
