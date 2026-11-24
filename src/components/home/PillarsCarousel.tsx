"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { pillars } from "@/lib/pillars";

// Time on each pillar before the carousel advances.
const SLIDE_MS = 6000;

// Stagger position for the .pillar-text-in entrance (globals.css).
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function PillarsCarousel() {
  const [activeSlug, setActiveSlug] = useState(pillars[0].slug);
  const [isPaused, setIsPaused] = useState(false);
  const active = pillars.find((p) => p.slug === activeSlug) ?? pillars[0];
  const [primaryLine, secondaryLine] = active.taglineLines;

  // The outgoing photo stays underneath while the new one wipes in over it
  // (adjusting state during render, so both update in the same pass).
  const [photos, setPhotos] = useState<{ current: string; previous: string | null }>({
    current: active.image,
    previous: null,
  });
  if (photos.current !== active.image) {
    setPhotos({ current: active.image, previous: photos.current });
  }

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlug((current) => {
        const currentIndex = pillars.findIndex((p) => p.slug === current);
        const nextIndex = (currentIndex + 1) % pillars.length;
        return pillars[nextIndex].slug;
      });
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, [isPaused]);

  useLayoutEffect(() => {
    const updatePill = () => {
      const activeIndex = pillars.findIndex((p) => p.slug === activeSlug);
      const activeButton = buttonRefs.current[activeIndex];
      if (activeButton) {
        setPillStyle({ left: activeButton.offsetLeft, width: activeButton.offsetWidth });
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeSlug]);

  return (
    <div
      className="flex w-full max-w-[1144px] flex-col items-center gap-8"
      onPointerDown={() => setIsPaused(true)}
    >
      <div className="relative flex flex-wrap items-center justify-center gap-2 rounded-[50px] border border-light-grey bg-[#fafafa] p-1">
        <div
          className="absolute inset-y-1 rounded-[50px] transition-all duration-300 ease-out"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
            background:
              "radial-gradient(107.81% 107.81% at 50% -7.81%, #0275B3 0%, #0E181C 100%)",
          }}
        />
        {pillars.map((pillar, index) => (
          <button
            key={pillar.slug}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            onClick={() => setActiveSlug(pillar.slug)}
            className={`relative z-10 rounded-[50px] px-3 py-2 text-xs font-bold uppercase tracking-[0.6px] transition-colors ${
              pillar.slug === activeSlug ? "text-white" : "text-black hover:text-cerulean"
            }`}
          >
            {pillar.navLabel}
          </button>
        ))}
      </div>

      <div
        key={active.slug}
        className="flex w-full flex-col items-start gap-8 md:flex-row"
      >
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
          <h3 className="header-3">
            <span className="pillar-text-in block" style={step(0)}>{primaryLine}</span>
            <span className="pillar-text-in block" style={step(1)}>{secondaryLine}</span>
          </h3>
          <p className="pillar-text-in text-base leading-6" style={step(2)}>{active.description}</p>
          <div className="flex flex-col gap-4 pt-4">
            <p className="pillar-text-in text-lg font-bold uppercase tracking-[3.24px]" style={step(3)}>{active.navLabel}</p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {active.solutions.map((solution, i) => (
                <div key={solution.slug} className="pillar-text-in flex items-center gap-3" style={step(4 + i)}>
                  {solution.icon ? (
                    <div className="relative size-[42px] shrink-0">
                      <Image src={solution.icon} alt="" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="size-[42px] shrink-0 rounded bg-light-grey" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-[0.24px]">
                    {solution.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href={`/${active.slug}`}
            className="pillar-text-in pt-4 text-base underline underline-offset-2 hover:text-cerulean"
            style={step(4 + active.solutions.length)}
          >
            Explore Our {active.label} Capabilities
          </Link>
        </div>
        <div className="relative h-[350px] w-full shrink-0 overflow-hidden rounded-lg bg-cerulean md:h-[491px] md:w-[448px]">
          {photos.previous && (
            <Image src={photos.previous} alt="" fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover" />
          )}
          <div className="pillar-photo-in absolute inset-0 overflow-hidden rounded-lg bg-cerulean">
            <div className="absolute inset-0">
              <Image src={active.image} alt="" fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
