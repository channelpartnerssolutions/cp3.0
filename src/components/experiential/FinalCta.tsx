import { Button } from "@/components/ui/Button";
import type { PillarConfig } from "@/lib/pillars";

export function FinalCta({ pillar }: { pillar: PillarConfig }) {
  return (
    <section className="relative z-0 -mt-32 w-full bg-medium-blue py-24 md:-mt-48 md:py-32">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 mt-[40px] text-white">let&rsquo;s make it real</h2>
        <p className="mt-4 max-w-[518px] text-base leading-relaxed text-white/80">
          Tell us what you&rsquo;re building: a launch, a tour, a summit, a
          rally, and we&rsquo;ll tell you what it takes to make it real.
        </p>
        <Button
          href={`/contact?source=${pillar.slug}`}
          variant="outline-light"
          className="mt-8"
        >
          {pillar.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
