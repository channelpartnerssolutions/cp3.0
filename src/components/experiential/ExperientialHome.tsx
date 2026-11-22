import { FadeIn } from "@/components/ui/FadeIn";
import { PillarTeamSections } from "@/components/team/PillarTeamSections";
import type { PillarConfig } from "@/lib/pillars";
import { getTeam } from "@/lib/teams";
import { Hero } from "./Hero";
import { BrandStory } from "./BrandStory";
import { DarkIntroWatermark } from "./DarkIntroWatermark";
import { DarkLogoWall } from "./DarkLogoWall";
import { FeaturedWorkCarousel } from "./FeaturedWorkCarousel";
import { PersonaSplit } from "./PersonaSplit";
import { WeLoveWhatWeDo } from "./WeLoveWhatWeDo";
import { ThoughtLeadership } from "./ThoughtLeadership";
import { FinalCta } from "./FinalCta";
import { ScrollGradient } from "./ScrollGradient";

export function ExperientialHome({ pillar }: { pillar: PillarConfig }) {
  const team = getTeam(pillar.slug);
  return (
    // `clip-path` keeps the fixed gradient layer from painting over the
    // footer once this page's content has scrolled past.
    <div id="hero" className="relative bg-near-black [clip-path:inset(0)]">
      <ScrollGradient />
      <div className="relative z-10">
        <Hero pillar={pillar} />
        <FadeIn>
          <div className="relative overflow-hidden">
            <DarkIntroWatermark />
            <BrandStory />
            <FeaturedWorkCarousel />
          </div>
        </FadeIn>
        <FadeIn>
          <PersonaSplit />
        </FadeIn>
        <FadeIn>
          <DarkLogoWall />
        </FadeIn>
        {/* Not wrapped in FadeIn: its CSS transition/transform, even before
            the section becomes visible, can interfere with the
            `position: sticky` trap-scroll panel inside WeLoveWhatWeDo. */}
        <WeLoveWhatWeDo />
        <FadeIn>
          <ThoughtLeadership />
        </FadeIn>
        {team && <PillarTeamSections team={team} pillar={pillar} />}
        <FadeIn>
          <FinalCta pillar={pillar} />
        </FadeIn>
      </div>
    </div>
  );
}
