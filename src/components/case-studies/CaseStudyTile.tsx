import Image from "next/image";
import Link from "next/link";
import { caseStudyHref, headlineResult, type CaseStudy } from "@/lib/case-studies";

// One row on a case studies index: the 3:2 photo across two thirds, and in
// the last third the title, the study's headline stat and a link to the full
// study. Stacks photo-first on mobile.
export function CaseStudyTile({ study }: { study: CaseStudy }) {
  const result = headlineResult(study);

  return (
    <Link href={caseStudyHref(study)} className="group grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-6">
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-near-black lg:col-span-2">
        <Image
          src={study.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-start gap-6 lg:justify-between lg:border-t lg:border-light-grey lg:pt-6">
        <h2 className="header-4 text-black transition-colors group-hover:text-cerulean max-md:text-[20px]! max-md:leading-7!">
          {study.client} {study.title}
        </h2>
        <div className="flex flex-col items-start gap-6">
          {result && (
            <div className="flex flex-col gap-2">
              <p className="font-display text-[72px] leading-[64px] font-light tracking-[-0.02em] text-cerulean italic lg:text-[96px] lg:leading-[84px]">
                {result.value}
              </p>
              <p className="header-6 text-[14px]! leading-5! text-black">{result.label}</p>
            </div>
          )}
          <span className="text-xs font-bold uppercase tracking-[0.6px] text-cerulean">
            Read the case study
            <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
