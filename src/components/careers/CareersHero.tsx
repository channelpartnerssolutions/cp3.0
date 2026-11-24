import Image from "next/image";
import { HeroVideo } from "@/components/ui/HeroVideo";

export function CareersHero() {
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden text-center text-white">
      <Image
        src="/images/careers/hero-bg.png"
        alt=""
        fill
        priority
        unoptimized
        className="object-cover"
      />
      {/* The still shows until the video loads (and for reduced motion). */}
      <HeroVideo src="/videos/careers/hero.mp4" />
      <div className="absolute inset-0 bg-near-black/50" aria-hidden />

      <div className="relative flex flex-col items-center gap-4 px-[var(--grid-margin)]">
        <h1 className="header-1 text-white">
          channel your
          <br />
          potential
        </h1>
        <p className="max-w-[560px] text-xl leading-[30.66px] text-white">
          From infrastructure to sales execution we&rsquo;ve got the right job to fit your
          skillset.
        </p>
      </div>
    </section>
  );
}
