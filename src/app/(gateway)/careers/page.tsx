import type { Metadata } from "next";
import { Benefits } from "@/components/careers/Benefits";
import { CareersCta } from "@/components/careers/CareersCta";
import { CareersHero } from "@/components/careers/CareersHero";
import { CareersStats } from "@/components/careers/CareersStats";
import { JobMap } from "@/components/careers/JobMap";
import { SolutionsCarousel } from "@/components/careers/SolutionsCarousel";
import { FadeIn } from "@/components/ui/FadeIn";
import { getJobs } from "@/lib/jobs-feed";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: "Careers",
  description: "Find open retail merchandising, installation and field team jobs with Channel Partners near you.",
};

// Rebuild with fresh jobs at most every 30 minutes (matches JOBS_REVALIDATE_SECONDS).
export const revalidate = 1800;

export default async function CareersPage() {
  // Loaded here rather than in the browser so the jobs arrive with the page.
  const { jobs } = await getJobs();

  return (
    <>
      <CareersHero />
      <FadeIn>
        <CareersStats jobs={jobs} />
      </FadeIn>
      <FadeIn>
        <JobMap jobs={jobs} />
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
