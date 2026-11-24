import Link from "next/link";
import { SimplePillarHome } from "@/components/pillar-home/SimplePillarHome";
import {
  constructionClients,
  constructionCta,
  constructionHero,
  constructionInsights,
  constructionIntro,
  constructionSolutions,
  constructionWork,
} from "@/lib/construction-home";
import type { PillarConfig } from "@/lib/pillars";

// Construction & Logistics home: the plain shared layout (SimplePillarHome)
// with this pillar's copy from lib/construction-home.ts.
export function ConstructionHome({ pillar }: { pillar: PillarConfig }) {
  return (
    <SimplePillarHome
      pillar={pillar}
      content={{
        hero: constructionHero,
        intro: { ...constructionIntro, stats: constructionClients.scale },
        work: constructionWork.map((item) => ({ ...item, image: item.image.src })),
        clients: constructionClients,
        solutions: {
          ...constructionSolutions,
          note: (
            <>
              Once the store is built and stocked,{" "}
              <Link href="/retail-execution" className="font-bold text-black underline underline-offset-4 hover:text-cerulean">
                Retail Execution
              </Link>{" "}
              keeps it set to spec with merchandising, audits, and break fix on the same program.
            </>
          ),
        },
        insights: {
          ...constructionInsights,
          posts: constructionInsights.posts.map((post) => ({ ...post, image: post.image.src })),
        },
        cta: constructionCta,
      }}
    />
  );
}
