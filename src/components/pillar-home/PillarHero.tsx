import Image from "next/image";
import { HeroVideo } from "@/components/ui/HeroVideo";

// Full-screen pillar home hero: a looping video or a photo under a dark
// wash, with the headline centered.
export function PillarHero({
  id,
  title,
  video,
  image,
}: {
  // "hero" keeps the site header in its light-on-dark style while the
  // hero is in view (see useHeaderTheme).
  id?: string;
  title: string;
  video?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section
      id={id}
      className="relative -mt-[var(--header-height)] flex h-[600px] flex-col items-center justify-center overflow-hidden bg-near-black pt-[var(--header-height)] md:h-[95vh] md:min-h-[600px]"
    >
      {video && <HeroVideo src={video} />}
      {image && <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />}
      {/* Full dark wash so the overlaid nav stays legible over bright footage. */}
      <div className="absolute inset-0 bg-near-black/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h1 className="header-1 max-w-[1040px] text-white">{title}</h1>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10">
        <span className="text-xs tracking-[0.24em] text-white uppercase">Scroll</span>
        <span className="block animate-scroll-bounce">
          <i className="block size-4 -rotate-45 border-b-[1.5px] border-l-[1.5px] border-white/85" />
        </span>
      </div>
    </section>
  );
}
