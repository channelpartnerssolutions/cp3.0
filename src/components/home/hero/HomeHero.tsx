import { HeroVideo } from "@/components/ui/HeroVideo";
import { CursorGradientText } from "./CursorGradientText";

/**
 * Homepage hero: full-bleed background video under a dark wash, with the
 * positioning line on top. The section's own dark background shows until
 * the video has frames to paint.
 */
export function HomeHero() {
  return (
    <section
      id="hero"
      className="relative -mt-[var(--gateway-header-height)] flex h-[600px] flex-col items-center justify-center overflow-hidden bg-near-black md:h-screen md:min-h-[600px]"
    >
      <HeroVideo src="/videos/home/hero.mp4" />
      {/* Dark wash keeps the headline and overlaid nav legible over bright footage. */}
      <div className="absolute inset-0 bg-near-black/80" />

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h1 className="flex flex-col items-center gap-6 md:gap-10">
          <span className="header-2 text-white">One Partner</span>
          {/* The padding/negative-margin pair grows the gradient's paint box
              past the tight line box, so italic overhangs and ascenders don't
              get clipped to transparent. */}
          <CursorGradientText className="-mx-[0.1em] -my-[0.15em] px-[0.1em] py-[0.15em] font-display text-[clamp(56px,9.65vw,139px)] font-light italic leading-[0.9] tracking-[-0.02em]">
            Endless Potential
          </CursorGradientText>
        </h1>
      </div>
    </section>
  );
}
