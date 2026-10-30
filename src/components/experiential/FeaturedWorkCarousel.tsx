"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudyHref, getCaseStudy, headlineResult } from "@/lib/case-studies";

type CaseStudy = {
  slug: string;
  title: string;
  image: string;
  // Headline result shown over the card while it's active. Cards without
  // one fall back to the title overlay.
  stat?: {
    // Line shown at the top of the card; defaults to the case study title.
    eyebrow?: string;
    value: string;
    label: string;
  };
};

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "story-of-us",
    title: "The Story of Us",
    image: "/images/experiential/case-studies/story-of-us.png",
    stat: {
      value: "One",
      label: "Guinness World Record",
    },
  },
  {
    slug: "go2022",
    title: "Go2022",
    image: "/images/experiential/case-studies/go2022.png",
    stat: {
      value: "800+",
      label: "Attendees",
    },
  },
  {
    slug: "global-executive-partner-summit",
    title: "Global Executive Partner Summit",
    image: "/images/experiential/case-studies/global-executive-partner-summit.jpeg",
    stat: {
      value: "4",
      label: "Day global summit",
    },
  },
  {
    slug: "no-quiet-please",
    title: "No Quiet Please",
    image: "/images/experiential/case-studies/no-quiet-please.png",
    stat: {
      value: "One",
      label: "Clio Award",
    },
  },
  {
    slug: "aerofit-mobile-tour",
    title: "Aerofit Mobile Tour",
    image: "/images/experiential/case-studies/aerofit-mobile-tour.png",
    stat: {
      value: "13,811",
      label: "Total product trials",
    },
  },
];

const ITEM_WIDTH = 442;
const ITEM_HEIGHT = 294;
// Enlarged size (676x451, ~3:2) matches the Figma reference card exactly
// and keeps the same aspect ratio as the base size.
const ENLARGED_WIDTH = 676;
const ENLARGED_HEIGHT = 451;
const ITEM_GAP = 24;
const STEP = ITEM_WIDTH + ITEM_GAP;
const EDGE_ZONE = 0.25;
const MAX_SPEED = 480; // px/sec
// Fixed horizontal anchor (as a fraction of the section's width) — cards
// grow as they approach this point, so the "active" slot stays put on
// screen while cards scroll through it.
const FOCAL_RATIO = 0.58;
// How quickly the track eases the nearest card onto the focal point once
// scrolling stops (higher = faster), so one card always settles at full size.
const SNAP_RATE = 8;

// Render the case study list 3x so the track can be nudged in either
// direction indefinitely; the offset wraps by one set's width once it
// drifts past the middle copy, so the loop never visibly resets.
// Cards with an entry in case-studies.ts take their title, image and first
// result from it and link to its page; the rest show the fallback copy above
// and don't link until their case study is written.
const ITEMS: (CaseStudy & { href?: string })[] = CASE_STUDIES.map((item) => {
  const study = getCaseStudy("experiential-marketing", item.slug);
  if (!study) return item;
  const result = headlineResult(study);
  return {
    slug: item.slug,
    title: study.title,
    image: study.image.src,
    stat: result ? { value: result.value, label: result.label } : undefined,
    href: caseStudyHref(study),
  };
});

const TRACK_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];
const SET_WIDTH = CASE_STUDIES.length * STEP;
const EXTRA_WIDTH = ENLARGED_WIDTH - ITEM_WIDTH;
// Fallback section width for the server render, before it can be measured.
const DEFAULT_SECTION_WIDTH = 1440;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

type CardLayout = { x: number; y: number; width: number; height: number; weight: number };

// Every card's size is a continuous function of how close its center sits
// to the focal point, so cards grow and shrink smoothly as they scroll
// through it instead of snapping between two sizes. The weights of the two
// cards straddling the focal point always sum to 1 (smoothstep is
// symmetric), so the total extra width in the row stays constant and cards
// away from the focal point never drift.
function computeLayout(offset: number, focalX: number): CardLayout[] {
  const weights = TRACK_ITEMS.map((_, i) => {
    const center = offset + i * STEP + ITEM_WIDTH / 2;
    const t = Math.max(0, 1 - Math.abs(center - focalX) / STEP);
    return smoothstep(t);
  });

  // Center the growth on the focal card: cards to its left shift left by
  // half the extra width, cards to its right shift right by the other half.
  let shift = -EXTRA_WIDTH / 2;
  return weights.map((weight, i) => {
    const width = ITEM_WIDTH + EXTRA_WIDTH * weight;
    const height = ITEM_HEIGHT + (ENLARGED_HEIGHT - ITEM_HEIGHT) * weight;
    const x = offset + i * STEP + shift;
    shift += EXTRA_WIDTH * weight;
    return { x, y: (ENLARGED_HEIGHT - height) / 2, width, height, weight };
  });
}

// Distance the track must move to center the nearest card on the focal point.
function snapDelta(offset: number, focalX: number) {
  const d = (focalX - (offset + ITEM_WIDTH / 2)) % STEP;
  const wrapped = d < 0 ? d + STEP : d;
  return wrapped > STEP / 2 ? wrapped - STEP : wrapped;
}

const INITIAL_OFFSET =
  -SET_WIDTH + snapDelta(-SET_WIDTH, DEFAULT_SECTION_WIDTH * FOCAL_RATIO);
const INITIAL_LAYOUT = computeLayout(INITIAL_OFFSET, DEFAULT_SECTION_WIDTH * FOCAL_RATIO);

type CursorMode = "idle" | "left" | "right" | "view";
type Point = { x: number; y: number };

// Edge zones keep priority so scrolling always works; otherwise the cursor
// reads "view" while it sits over the active (mostly enlarged) card, if that
// card links to a case study.
function cursorModeFor(speed: number, pointer: Point | null, layout: CardLayout[]): CursorMode {
  if (speed < 0) return "left";
  if (speed > 0) return "right";
  if (!pointer) return "idle";
  const overActive = layout.some(
    (card, i) =>
      TRACK_ITEMS[i]?.href !== undefined &&
      card.weight > 0.5 &&
      pointer.x >= card.x &&
      pointer.x <= card.x + card.width &&
      pointer.y >= card.y &&
      pointer.y <= card.y + card.height
  );
  return overActive ? "view" : "idle";
}

export function FeaturedWorkCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(INITIAL_OFFSET);
  const speedRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [cursorMode, setCursorMode] = useState<CursorMode>("idle");
  const [cursorActive, setCursorActive] = useState(false);
  // Card position/size and title opacity are written straight to the DOM
  // every frame (see computeLayout) rather than through React state.
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statRefs = useRef<Array<HTMLDivElement | null>>([]);
  const layoutRef = useRef<CardLayout[]>(INITIAL_LAYOUT);
  // Pointer position relative to the section, or null when outside it.
  const pointerRef = useRef<Point | null>(null);
  const cursorModeRef = useRef<CursorMode>("idle");

  // Cards move under a stationary pointer (scrolling, snapping), so this is
  // re-checked every frame as well as on pointer move.
  const syncCursorMode = useCallback(() => {
    const next = cursorModeFor(speedRef.current, pointerRef.current, layoutRef.current);
    if (next === cursorModeRef.current) return;
    cursorModeRef.current = next;
    setCursorMode(next);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const focalX = () => section.clientWidth * FOCAL_RATIO;

    const applyLayout = () => {
      const layout = computeLayout(offsetRef.current, focalX());
      layoutRef.current = layout;
      layout.forEach((card, i) => {
        const el = itemRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${card.x}px, ${card.y}px, 0)`;
          el.style.width = `${card.width}px`;
          el.style.height = `${card.height}px`;
          el.style.zIndex = card.weight > 0.5 ? "20" : card.weight > 0 ? "10" : "";
        }
        const overlay = overlayRefs.current[i];
        if (overlay) overlay.style.opacity = String(card.weight);
        // The stat is laid out at the enlarged size and scaled with the
        // card, so its text never reflows mid-transition.
        const stat = statRefs.current[i];
        if (stat) stat.style.transform = `scale(${card.width / ENLARGED_WIDTH})`;
      });
    };

    if (reducedMotion) {
      const snapAndLayout = () => {
        offsetRef.current += snapDelta(offsetRef.current, focalX());
        applyLayout();
      };
      snapAndLayout();
      const observer = new ResizeObserver(snapAndLayout);
      observer.observe(section);
      return () => observer.disconnect();
    }

    const tick = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = (ts - last) / 1000;
      lastTsRef.current = ts;

      if (speedRef.current !== 0) {
        offsetRef.current -= speedRef.current * dt;
        if (offsetRef.current <= -2 * SET_WIDTH) offsetRef.current += SET_WIDTH;
        if (offsetRef.current >= 0) offsetRef.current -= SET_WIDTH;
      } else {
        const delta = snapDelta(offsetRef.current, focalX());
        offsetRef.current += delta * (1 - Math.exp(-SNAP_RATE * dt));
      }

      applyLayout();
      syncCursorMode();

      frameRef.current = requestAnimationFrame(tick);
    };

    applyLayout();
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      lastTsRef.current = null;
    };
  }, [reducedMotion, syncCursorMode]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ratio = x / rect.width;

    if (ratio < EDGE_ZONE) {
      const intensity = 1 - ratio / EDGE_ZONE;
      speedRef.current = -MAX_SPEED * intensity;
    } else if (ratio > 1 - EDGE_ZONE) {
      const intensity = (ratio - (1 - EDGE_ZONE)) / EDGE_ZONE;
      speedRef.current = MAX_SPEED * intensity;
    } else {
      speedRef.current = 0;
    }
    pointerRef.current = { x, y };
    syncCursorMode();

    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    }
  };

  const handlePointerEnter = () => setCursorActive(true);

  const handlePointerLeave = () => {
    speedRef.current = 0;
    pointerRef.current = null;
    syncCursorMode();
    setCursorActive(false);
  };

  return (
    <section className="relative w-full py-20 md:py-28">
      <div className="relative z-10 mb-10 flex w-full items-center gap-6 pl-[var(--grid-margin)] md:pl-[var(--grid-margin-md)]">
        <h5 className="header-5 shrink-0 text-white">Featured Work</h5>
        <span className="h-px flex-1 bg-white/30" />
      </div>

      <div
        ref={sectionRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="no-scrollbar relative z-10 -mt-[60px] w-full cursor-none overflow-x-hidden"
      >
        {/* Fixed to the enlarged card's height, so the section never grows
            or shrinks. Cards are absolutely positioned and vertically
            centered within it, and the negative margin above pulls the
            whole row up so the enlarged card overlaps the divider line
            while the smaller cards stay clear of it. */}
        <div className="relative" style={{ height: ENLARGED_HEIGHT }}>
          {TRACK_ITEMS.map((item, i) => {
            const initial = INITIAL_LAYOUT[i];

            return (
              <div
                key={`${item.slug}-${i}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 overflow-hidden rounded-lg"
                style={{
                  transform: `translate3d(${initial.x}px, ${initial.y}px, 0)`,
                  width: initial.width,
                  height: initial.height,
                  willChange: "transform, width, height",
                }}
              >
                <CardLink href={item.href}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 676px, 442px"
                    className="object-cover"
                  />
                  {item.stat ? (
                    <div
                      ref={(el) => {
                        overlayRefs.current[i] = el;
                      }}
                      className="pointer-events-none absolute inset-0 bg-black/80"
                      style={{ opacity: initial.weight }}
                    >
                      <div
                        ref={(el) => {
                          statRefs.current[i] = el;
                        }}
                        className="flex origin-top-left flex-col justify-between p-8"
                        style={{
                          width: ENLARGED_WIDTH,
                          height: ENLARGED_HEIGHT,
                          transform: `scale(${initial.width / ENLARGED_WIDTH})`,
                        }}
                      >
                        <p className="header-6 max-w-[314px] font-medium text-white">
                          {item.stat.eyebrow ?? item.title}
                        </p>
                        <div className="flex flex-col gap-2.5">
                          <p className="font-display text-[128px] italic leading-[60px] tracking-[-0.02em] text-cerulean">
                            {item.stat.value}
                          </p>
                          <p className="header-6 font-medium text-white">{item.stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={(el) => {
                        overlayRefs.current[i] = el;
                      }}
                      className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-near-black/70 via-transparent to-transparent"
                      style={{ opacity: initial.weight }}
                    >
                      <span className="p-5 text-sm uppercase tracking-[0.08em] text-white">
                        {item.title}
                      </span>
                    </div>
                  )}
                </CardLink>
              </div>
            );
          })}
        </div>

        <div
          ref={cursorRef}
          className={`pointer-events-none absolute left-0 top-0 z-30 flex items-center justify-center rounded-full border border-white/70 backdrop-blur-[1px] transition-[width,height,opacity] duration-200 ease-out ${
            cursorMode === "view" ? "size-24" : "size-14"
          } ${cursorActive ? "opacity-100" : "opacity-0"}`}
        >
          {cursorMode === "view" && (
            <span className="font-heading text-xs font-medium uppercase tracking-[0.18em] text-white">
              View
            </span>
          )}
          {cursorMode === "idle" && <span className="block size-1.5 rounded-full bg-white" />}
          {cursorMode === "left" && (
            <svg viewBox="0 0 24 24" className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          )}
          {cursorMode === "right" && (
            <svg viewBox="0 0 24 24" className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}

// The card's link to its case study, or a plain block until one exists.
function CardLink({ href, children }: { href?: string; children: React.ReactNode }) {
  const className = "relative block size-full cursor-none";
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}
