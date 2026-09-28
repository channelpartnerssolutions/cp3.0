import type { Metadata } from "next";
import { Intro } from "@/components/about/Intro";
import { Stats } from "@/components/about/Stats";
import { EmployeesSection } from "@/components/about/EmployeesSection";
import { MeetTheCeo } from "@/components/about/MeetTheCeo";
import { LeadershipGrid } from "@/components/about/LeadershipGrid";
import { FadeIn } from "@/components/ui/FadeIn";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: "Who We Are",
  description: "Meet the Channel Partners leadership team and the W-2 field workforce behind our retail programs.",
};

export default function AboutPage() {
  return (
    <>
      <Intro />
      <FadeIn>
        <Stats />
      </FadeIn>
      <FadeIn>
        <EmployeesSection />
      </FadeIn>
      <FadeIn>
        <MeetTheCeo />
      </FadeIn>
      <FadeIn>
        <LeadershipGrid />
      </FadeIn>
    </>
  );
}
