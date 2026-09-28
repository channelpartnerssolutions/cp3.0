"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pillars, type PillarConfig } from "@/lib/pillars";
import { CpIconMark } from "./CpIconMark";
import { HamburgerToggle } from "./HamburgerToggle";
import { HeaderSpacer } from "./HeaderSpacer";
import { NavOverlay } from "./NavOverlay";
import { useHeaderTheme } from "./useHeaderTheme";
import { useMeasuredHeight } from "./useMeasuredHeight";
import { useScrollReveal } from "./useScrollReveal";

// SSR-only cosmetic floor for the spacer/CSS var before the real height is
// measured on mount — never used for scroll math, which always reads the
// live measured value.
const FALLBACK_HEIGHT = 94;

export function PillarHeader({ pillar }: { pillar: PillarConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref: barRef, height } = useMeasuredHeight<HTMLDivElement>();
  const headerHeight = height || FALLBACK_HEIGHT;
  const theme = useHeaderTheme(headerHeight);
  const { pinned, pastHeader, animate } = useScrollReveal(headerHeight);
  const textColor = theme === "dark" ? "text-white" : "text-near-black";
  const dividerColor = theme === "dark" ? "bg-white/40" : "bg-near-black/30";
  const barColor = theme === "dark" ? "bg-white" : "bg-near-black";
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
        <div className="flex w-full items-center justify-center gap-4 bg-near-black py-2">
          <Link href="/" aria-label="Channel Partners home" className="flex items-center text-white">
            <CpIconMark className="h-[13px] w-[22px]" />
          </Link>
          {pillars.map((p) => (
            <span key={p.slug} className="flex items-center gap-4">
              <span className="h-3 w-px bg-white/40" />
              <Link
                href={`/${p.slug}`}
                className={`text-xs font-light tracking-[1.8px] text-white hover:opacity-100 ${
                  p.slug === pillar.slug ? "opacity-100" : "opacity-50"
                }`}
              >
                {p.switchLabel}
              </Link>
            </span>
          ))}
        </div>

        <Container className="flex items-center justify-between gap-8 py-[15px]">
          <Link href={`/${pillar.slug}`} className="flex items-center gap-3">
            <CpIconMark className={`h-[13px] w-[22px] ${menuOpen ? "text-white" : textColor}`} />
            <span className={`h-4 w-px ${menuOpen ? "bg-white/40" : dividerColor}`} />
            <span
              className={`font-heading text-sm uppercase tracking-[1.8px] ${
                menuOpen ? "text-white" : textColor
              }`}
            >
              {pillar.switchLabel}
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-8">
            <div
              className={`flex flex-wrap items-center gap-8 transition-opacity duration-300 ${
                menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <Link href={`/${pillar.slug}/solutions`} className={`text-base hover:text-cerulean ${textColor}`}>
                Solutions
              </Link>
              <Link href={`/${pillar.slug}/about`} className={`text-base hover:text-cerulean ${textColor}`}>
                Meet the Team
              </Link>
              <Button href={`/contact?source=${pillar.slug}`} variant={pillar.ctaVariant}>
                {pillar.ctaLabel}
              </Button>
            </div>
            <HamburgerToggle
              open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              barClassName={menuOpen ? "bg-white" : barColor}
            />
          </nav>
        </Container>
      </div>
      <HeaderSpacer height={headerHeight} cssVar="--pillar-header-height" />
      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
