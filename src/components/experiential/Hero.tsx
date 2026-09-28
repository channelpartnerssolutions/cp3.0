"use client";

import { useEffect, useRef, useState } from "react";
import type { PillarConfig } from "@/lib/pillars";

export function Hero({ pillar }: { pillar: PillarConfig }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section
      className="relative -mt-[var(--pillar-header-height)] flex h-[600px] flex-col items-center justify-end overflow-hidden bg-near-black md:h-screen md:min-h-[600px]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src="/videos/experiential/hero-sizzle.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/20 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-start gap-6 px-[var(--grid-margin)] pb-20 md:px-[var(--grid-margin-md)] md:pb-28">
        <h1 className="header-1 max-w-[700px] text-white">
          We Architect Experiences That Turn Consumers Into Believers
        </h1>
        <p className="max-w-[586px] text-lg leading-relaxed text-white/85">
          Your brand isn&rsquo;t created in your brief, it&rsquo;s born the
          moment it connects in the mind of your audience. We make sure those
          moments land.
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-2 md:bottom-10 md:right-10">
        <span className="text-xs uppercase tracking-[0.24em] text-white">
          Scroll
        </span>
        <span className="block animate-scroll-bounce">
          <i className="block size-4 -rotate-45 border-b-[1.5px] border-l-[1.5px] border-white/85" />
        </span>
      </div>
      <span className="sr-only">{pillar.label}</span>
    </section>
  );
}
