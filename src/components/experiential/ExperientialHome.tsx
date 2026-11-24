import { FadeIn } from "@/components/ui/FadeIn";
import { FeaturedWorkCarousel } from "@/components/pillar-home/FeaturedWorkCarousel";
import { featuredWorkItems } from "@/components/pillar-home/featured-work";
import { InsightCards } from "@/components/pillar-home/InsightCards";
import { LogoBand } from "@/components/pillar-home/LogoBand";
import { PillarFinalCta } from "@/components/pillar-home/PillarFinalCta";
import { PillarHero } from "@/components/pillar-home/PillarHero";
import { PillarIntro } from "@/components/pillar-home/PillarIntro";
import { SolutionTiles } from "@/components/pillar-home/SolutionTiles";
import { Watermark } from "@/components/pillar-home/Watermark";
import { PillarTeamSections } from "@/components/team/PillarTeamSections";
import {
  experientialCta,
  experientialHero,
  experientialInsights,
  experientialIntro,
  experientialLogos,
  experientialSolutions,
  experientialWork,
} from "@/lib/experiential-home";
import type { PillarConfig } from "@/lib/pillars";
import { getTeam } from "@/lib/teams";

// Bands alternate per the Figma homepage: dark intro and featured work, the
// team on white, the blue logo wall, the solution tiles on white, dark
// thought leadership, then the blue closing CTA. Copy lives in
// lib/experiential-home.ts; RetailHome uses the same layout.
export function ExperientialHome({ pillar }: { pillar: PillarConfig }) {
  const team = getTeam(pillar.slug);
  return (
    <div id="hero" className="relative bg-white">
      <PillarHero title={experientialHero.title} video={experientialHero.video} />
      {/* The dark band and watermark render straight away (no fade, so no
          white flash under the hero); only the intro text fades in. */}
      <div className="relative overflow-hidden">
        {/* The dark band stops 143px above the carousel's bottom edge (the
            Figma overlap), so the case study cards hang into the white
            team section below. */}
        <div aria-hidden className="absolute inset-x-0 top-0 bottom-[143px] bg-near-black" />
        <Watermark words={experientialIntro.watermark} />
        <FadeIn>
          <PillarIntro heading={experientialIntro.heading} body={experientialIntro.body} />
        </FadeIn>
        <FeaturedWorkCarousel items={featuredWorkItems(experientialWork)} />
      </div>
      {team && <PillarTeamSections team={team} pillar={pillar} />}
      <FadeIn>
        <LogoBand heading={experientialLogos.heading} logos={experientialLogos.logos} />
      </FadeIn>
      <FadeIn>
        <SolutionTiles
          heading={experientialSolutions.heading}
          tiles={pillar.solutions.map((s) => ({
            href: `/${pillar.slug}/solutions/${s.slug}`,
            label: s.label,
            image: experientialSolutions.images[s.slug],
          }))}
        />
      </FadeIn>
      <FadeIn>
        <InsightCards {...experientialInsights} />
      </FadeIn>
      <FadeIn>
        <PillarFinalCta
          overlap
          heading={experientialCta.heading}
          body={experientialCta.body}
          cta={{ href: `/contact?source=${pillar.slug}`, label: pillar.ctaLabel }}
        />
      </FadeIn>
    </div>
  );
}
