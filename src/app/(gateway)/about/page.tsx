import { Intro } from "@/components/about/Intro";
import { Stats } from "@/components/about/Stats";
import { EmployeesSection } from "@/components/about/EmployeesSection";
import { MeetTheCeo } from "@/components/about/MeetTheCeo";
import { LeadershipGrid } from "@/components/about/LeadershipGrid";
import { FadeIn } from "@/components/ui/FadeIn";

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
