"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";

const MAP_ANCHOR = "open-positions";

// Closing CTA — same treatment as the experiential pillar's FinalCta.
export function CareersCta() {
  // Smooth-scroll back up to the job map (instant for reduced-motion users);
  // the plain #hash href still works without JavaScript.
  const scrollToMap = (event: MouseEvent<HTMLAnchorElement>) => {
    const map = document.getElementById(MAP_ANCHOR);
    if (!map) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    map.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", `#${MAP_ANCHOR}`);
  };

  return (
    <section className="w-full bg-medium-blue py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col items-center px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 max-w-[760px] text-white">Your next job could be down the street</h2>
        <Button href={`#${MAP_ANCHOR}`} onClick={scrollToMap} variant="outline-light" className="mt-8">
          Find jobs near me
        </Button>
      </div>
    </section>
  );
}
