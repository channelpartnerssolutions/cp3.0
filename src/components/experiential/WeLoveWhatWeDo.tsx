"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type Slot = {
  slug: string;
  eyebrow: string;
  description: string;
  capabilities: string;
  ctaLabel: string;
};

const SLOTS: Slot[] = [
  {
    slug: "brand-activations",
    eyebrow: "Activations & Launches",
    description:
      "Pop-up shops, immersive brand activations, mobile tours, publicity stunts, and product launches, built to turn a strategy into something people can walk into, touch, and talk about.",
    capabilities:
      "Location strategy · custom fabrication · AV & technology · onsite operations",
    ctaLabel: "Plan Your Launch",
  },
  {
    slug: "conferences-b2b-events",
    eyebrow: "Conferences & B2B Experiences",
    description:
      "From exhibit and booth design to full-scale conference production, we build the environments where business happens: trade shows, corporate award shows, and incentive trips that make recognition feel earned.",
    capabilities:
      "Venue strategy · attendee journey · show calling · sponsorship integration",
    ctaLabel: "Plan Your Event",
  },
  {
    slug: "virtual-hybrid-experiences",
    eyebrow: "Virtual & Hybrid Experiences",
    description:
      "Global conferences, interactive trainings, and custom event sites that extend a live moment beyond the room, built for scale, not just streamed.",
    capabilities:
      "Livestream production · gamification · multilingual delivery · digital hubs",
    ctaLabel: "Plan Your Experience",
  },
  {
    slug: "employee-engagement",
    eyebrow: "Employee Engagement",
    description:
      "Rallies, town halls, offsites, onboarding, and culture initiatives designed around the moments that shape how people feel about the organizations they work for.",
    capabilities:
      "Recognition programs · new-hire orientation · EVP communications · culture activations",
    ctaLabel: "Plan Your Activity",
  },
  {
    slug: "product-launches",
    eyebrow: "Product Launches",
    description:
      "Reveal events, press days, and retail-ready launch moments that carry a product's story from the boardroom onto the floor.",
    capabilities:
      "Launch strategy · press & influencer relations · retail rollout · demo staging",
    ctaLabel: "Plan Your Reveal",
  },
  {
    slug: "culture-recognition",
    eyebrow: "Culture & Recognition",
    description:
      "Award shows, milestone celebrations, and recognition programs built to make people feel seen by the organizations they help build.",
    capabilities:
      "Awards production · storytelling & video · talent & staging · guest experience",
    ctaLabel: "Plan Your Celebration",
  },
];

export function WeLoveWhatWeDo() {
  const videoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = videoRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) setActiveIndex(index);
        });
      },
      // A near-zero-height "line" pinned at the vertical center of the
      // viewport — threshold: 0 fires as soon as a video crosses it,
      // regardless of the video's own height (a fixed 50% overlap
      // threshold could never be satisfied by a tall video against a
      // shrunk root band).
      { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );

    videoRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = SLOTS[activeIndex];

  return (
    <section className="w-full py-20 md:py-28">
      <div className="mx-auto mb-16 w-full max-w-[var(--grid-max-width)] px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className="header-2">
          <span className="block text-white">we love what we do</span>
          <span className="block text-cerulean">and we think it shows</span>
        </h2>
      </div>

      <div className="mx-auto grid w-full max-w-[var(--grid-max-width)] grid-cols-12 gap-x-6 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        {/* Inset one grid column on each side (col 2–11 of 12), matching
            the persona section above. */}
        {/* Deliberately not `items-center`: the right column has no
            explicit height, so it relies on the default `stretch` to
            match the left column's full stacked-video height — that
            extra height is what keeps the sticky text panel locked
            through all 6 videos instead of unsticking after the first. */}
        <div className="col-span-12 flex flex-col gap-16 md:col-span-10 md:col-start-2 md:flex-row">
          <div className="flex w-full max-w-[559px] shrink-0 flex-col gap-20">
            {SLOTS.map((slot, i) => (
              <div
                key={slot.slug}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="relative aspect-[559/699] w-full overflow-hidden rounded"
              >
                <video
                  className="size-full object-cover"
                  src="/videos/experiential/persona-vertical.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            ))}
          </div>

          <div className="relative w-full">
            {/* Height matches the video's own rendered height (559x699,
                same aspect the video cards use), not the viewport, so the
                text sits centered across the same vertical span as the
                active video. `top-[15vh]` (rather than `top-0`) locks it
                partway down the viewport instead of flush under the
                header. */}
            <div className="sticky top-[15vh] flex h-[699px] flex-col items-start justify-center gap-[45px]">
              <div className="flex flex-col gap-4">
                <h3 className="header-3 text-white">{active.eyebrow}</h3>
                <p className="text-base leading-relaxed text-white/70">
                  {active.description}
                </p>
              </div>
              <p className="text-base leading-relaxed text-white/70">
                {active.capabilities}
              </p>
              <Button
                href={`/contact?source=experiential-marketing-${active.slug}`}
                variant="outline-light"
              >
                {active.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
