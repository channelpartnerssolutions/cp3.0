"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { PillarConfig } from "@/lib/pillars";
import { CpIconMark } from "./CpIconMark";
import { HamburgerToggle } from "./HamburgerToggle";
import { HeaderSpacer } from "./HeaderSpacer";
import { NavOverlay } from "./NavOverlay";
import { PillarSwitcher } from "./PillarSwitcher";
import { SolutionsMenu } from "./SolutionsMenu";
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
  const pathname = usePathname();
  const textColor = theme === "dark" ? "text-white" : "text-near-black";
  // Solutions is a dropdown (SolutionsMenu); these follow it, then the
  // pillar's CTA button.
  const navLinks = [
    { href: `/${pillar.slug}/case-studies`, label: "Case Studies" },
    { href: `/${pillar.slug}/about`, label: "Meet the Team" },
    { href: "/careers", label: "Careers" },
  ];
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // Experiential's white-outline button only works over a dark hero; on a
  // light header it would be white on white, so use the solid blue button.
  const ctaVariant =
    theme === "light" && pillar.ctaVariant === "outline-light" ? "primary" : pillar.ctaVariant;
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
        <PillarSwitcher activeSlug={pillar.slug} />

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
          <nav className="flex items-center gap-8">
            {/* Below lg the inline links collapse into the hamburger menu (NavOverlay). */}
            <div
              className={`hidden items-center gap-8 transition-opacity duration-300 lg:flex ${
                menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <SolutionsMenu pillar={pillar} textColor={textColor} />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={`text-base hover:text-cerulean ${
                    isCurrent(link.href) ? "text-cerulean" : textColor
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button href={`/contact?source=${pillar.slug}`} variant={ctaVariant}>
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
      <NavOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sectionLinks={{
          title: pillar.label,
          solutions: pillar.solutions.map((solution) => ({
            href: `/${pillar.slug}/solutions/${solution.slug}`,
            label: solution.label,
          })),
          links: [...navLinks, { href: `/contact?source=${pillar.slug}`, label: pillar.ctaLabel }],
        }}
      />
    </header>
  );
}
