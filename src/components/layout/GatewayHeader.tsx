"use client";

import { useState } from "react";
import { HeaderSpacer } from "./HeaderSpacer";
import { NavOverlay } from "./NavOverlay";
import { SiteHeaderBar } from "./SiteHeaderBar";
import { useHeaderTheme } from "./useHeaderTheme";
import { useMeasuredHeight } from "./useMeasuredHeight";
import { useScrollReveal } from "./useScrollReveal";

// SSR-only cosmetic floor for the spacer/CSS var before the real height is
// measured on mount — never used for scroll math, which always reads the
// live measured value.
const FALLBACK_HEIGHT = 62;

export function GatewayHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref: barRef, height } = useMeasuredHeight<HTMLDivElement>();
  const headerHeight = height || FALLBACK_HEIGHT;
  const theme = useHeaderTheme(headerHeight);
  const { pinned, pastHeader, animate } = useScrollReveal(headerHeight);
  const solidBg = theme === "dark" ? "bg-near-black" : "bg-white";
  const positionClasses = pastHeader
    ? `fixed top-0 ${animate ? "transition-transform duration-300" : ""} ${
        pinned
          ? `translate-y-0 ${menuOpen ? "bg-transparent" : `${solidBg} shadow-sm`}`
          : "-translate-y-full bg-transparent"
      }`
    : "absolute top-0 bg-transparent";

  return (
    <header>
      <div ref={barRef} className={`left-0 z-[60] w-full ${positionClasses}`}>
        <SiteHeaderBar theme={theme} menuOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      </div>
      <HeaderSpacer height={headerHeight} cssVar="--gateway-header-height" />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
