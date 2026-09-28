import { CareersHero } from "@/components/careers/CareersHero";
import { JobMap } from "@/components/careers/JobMap";
import { SolutionsCarousel } from "@/components/careers/SolutionsCarousel";
import { FadeIn } from "@/components/ui/FadeIn";

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
