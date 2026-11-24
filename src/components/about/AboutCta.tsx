import { Button } from "@/components/ui/Button";

// Closing CTA on /about: dark blue, pointing to the careers job map.
export function AboutCta() {
  return (
    <section className="w-full bg-dark-blue pt-20 pb-24 md:pt-24 md:pb-28">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 max-w-[760px] text-white">Channel Your Potential</h2>
        {/* TODO(content): confirm the body copy. */}
        <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-white/80">
          From the sales floor to the job site, our people do the work that makes brands
          matter. Find a role near you and grow with a team that leads by example.
        </p>
        <Button href="/careers#open-positions" variant="outline-light" className="mt-8">
          Browse Open Positions
        </Button>
      </div>
    </section>
  );
}
