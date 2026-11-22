import type { Metadata } from "next";
import { Suspense } from "react";
import { CaseStudyFilter, CaseStudyList } from "@/components/case-studies/CaseStudyList";
import { CaseStudyTile } from "@/components/case-studies/CaseStudyTile";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { caseStudies } from "@/lib/case-studies";

// TODO(content): final page description
export const metadata: Metadata = {
  title: "Results",
  description: "Case studies from Channel Partners across construction, retail, training and experiential work.",
};

// Every entry in src/lib/case-studies.ts, filterable by pillar
// (?pillar=<slug>); new entries show up here automatically.
export default function CaseStudiesIndex() {
  return (
    <section className="w-full bg-white pt-16 pb-24 md:pt-24">
      <Container className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 flex flex-col gap-12 min-[1610px]:col-span-10 min-[1610px]:col-start-2">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>Our work</Eyebrow>
            <h1 className="header-1 text-black">results</h1>
          </div>

          {/* Prerendered unfiltered; the filter applies once the URL is read. */}
          <Suspense
            fallback={
              <div className="flex flex-col gap-12">
                <CaseStudyFilter />
                <ul className="flex flex-col gap-16 md:gap-20">
                  {caseStudies.map((study) => (
                    <li key={study.slug}>
                      <CaseStudyTile study={study} />
                    </li>
                  ))}
                </ul>
              </div>
            }
          >
            <CaseStudyList />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
