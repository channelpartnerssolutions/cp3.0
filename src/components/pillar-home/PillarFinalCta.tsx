import { Button } from "@/components/ui/Button";

// The blue closing CTA on a pillar home page. With `overlap`, it slides up
// under the cards that close the section above it.
export function PillarFinalCta({
  heading,
  body,
  cta,
  overlap = false,
}: {
  heading: string;
  body?: string;
  cta: { href: string; label: string };
  overlap?: boolean;
}) {
  return (
    <section
      className={`relative z-0 w-full bg-medium-blue ${
        overlap ? "-mt-32 py-24 md:-mt-48 md:py-32" : "pt-20 pb-24 md:pt-24 md:pb-28"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className={`header-2 max-w-[900px] text-white ${overlap ? "mt-[40px]" : ""}`}>{heading}</h2>
        {body && <p className="mt-4 max-w-[518px] text-base leading-relaxed text-white/80">{body}</p>}
        <Button href={cta.href} variant="outline-light" className="mt-8">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
