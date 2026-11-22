"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/lib/case-studies";
import { pillars } from "@/lib/pillars";
import { CaseStudyTile } from "./CaseStudyTile";

/**
 * The /case-studies list with its pillar filter. The chosen pillar lives in
 * the URL (?pillar=<slug>) so a filtered view can be linked to. Render inside
 * <Suspense>: useSearchParams needs a boundary on a prerendered page.
 */
export function CaseStudyList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pillar = pillars.find((p) => p.slug === searchParams.get("pillar"));
  const studies = pillar ? caseStudies.filter((s) => s.pillar === pillar.slug) : caseStudies;

  const choose = (slug?: string) => {
    router.replace(slug ? `${pathname}?pillar=${slug}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-12">
      <CaseStudyFilter active={pillar?.slug} onChoose={choose} />

      {studies.length > 0 ? (
        <ul className="flex flex-col gap-16 md:gap-20">
          {studies.map((study) => (
            <li key={study.slug}>
              <CaseStudyTile study={study} />
            </li>
          ))}
        </ul>
      ) : (
        pillar && (
          <div className="flex flex-col items-start gap-6">
            <p className="max-w-[560px] text-lg leading-7 text-black">
              {pillar.label} results are coming soon. In the meantime, tell us about your project
              and we&rsquo;ll share relevant work.
            </p>
            <Button href={`/contact?source=${pillar.slug}`} variant="primary">
              {pillar.ctaLabel}
            </Button>
          </div>
        )
      )}
    </div>
  );
}

/** Pillar filter buttons; also the Suspense fallback (unfiltered, inert). */
export function CaseStudyFilter({
  active,
  onChoose,
}: {
  active?: string;
  onChoose?: (slug?: string) => void;
}) {
  const options = [{ slug: undefined, label: "All" }, ...pillars.map((p) => ({ slug: p.slug, label: p.label }))];

  return (
    <div role="group" aria-label="Filter by solution" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const pressed = option.slug === active;
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChoose?.(option.slug)}
            className={`cursor-pointer rounded-[50px] border px-4 py-2 text-xs font-bold tracking-[0.6px] uppercase transition-colors ${
              pressed
                ? "border-near-black bg-near-black text-white"
                : "border-light-grey bg-white text-black hover:border-cerulean hover:text-cerulean"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
