import Link from "next/link";
import { featuredWorkItems } from "@/components/pillar-home/featured-work";
import { SimplePillarHome } from "@/components/pillar-home/SimplePillarHome";
import type { PillarConfig } from "@/lib/pillars";
import { retailCta, retailHero, retailInsights, retailIntro, retailLogos, retailSolutions, retailWork } from "@/lib/retail-home";

const LINK = "font-bold text-black underline underline-offset-4 hover:text-cerulean";

// Retail Execution home: the plain shared layout (SimplePillarHome) with
// this pillar's copy from lib/retail-home.ts.
export function RetailHome({ pillar }: { pillar: PillarConfig }) {
  return (
    <SimplePillarHome
      pillar={pillar}
      content={{
        hero: retailHero,
        intro: retailIntro,
        work: featuredWorkItems(retailWork).map((item) => ({
          title: item.title,
          image: item.image,
          value: item.stat?.value,
          label: item.stat?.label,
          href: item.href,
        })),
        clients: {
          heading: retailLogos.heading,
          logos: [...retailLogos.retailers, ...retailLogos.brands],
          credentials: retailLogos.credentials,
        },
        solutions: {
          ...retailSolutions,
          note: (
            <>
              Need fixtures staged, installed, or built before the reset?{" "}
              <Link href="/construction-logistics" className={LINK}>
                Construction &amp; Logistics
              </Link>{" "}
              handles it on the same program. Training partners and associates beyond the floor? See{" "}
              <Link href="/training-enablement" className={LINK}>
                Training &amp; Enablement
              </Link>
              .
            </>
          ),
        },
        insights: retailInsights,
        cta: retailCta,
      }}
    />
  );
}
