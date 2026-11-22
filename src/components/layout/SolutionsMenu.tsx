"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { pillars } from "@/lib/pillars";

// Delay before a hover-opened menu closes, so the pointer can cross the gap
// between the trigger and the panel without it snapping shut.
const HOVER_CLOSE_MS = 150;

/**
 * "Solutions" mega-menu in the site header: one column per pillar, the
 * pillar name linking to its home page and its solutions listed below. The
 * trigger is a button, not a link, since there's no overview page to go to.
 * Opens on click (or hover with a mouse), closes on Escape, an outside click,
 * focus leaving it, or picking a link. The panel follows the trigger in the
 * DOM, so Tab moves straight into it.
 *
 * The wrapper isn't positioned, so the panel anchors to the header bar's
 * Container (which is) and spans its full width.
 */
export function SolutionsMenu({ textColor }: { textColor: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const onPillarPage = pillars.some(
    (p) => pathname === `/${p.slug}` || pathname.startsWith(`/${p.slug}/`),
  );

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  const linkClasses = (current: boolean) =>
    `transition-colors hover:text-cerulean focus-visible:text-cerulean focus-visible:outline-none ${
      current ? "text-cerulean" : "text-near-black"
    }`;

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
      }}
      onBlur={(e) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`flex cursor-pointer items-center gap-1 text-base hover:text-cerulean ${
          onPillarPage ? "text-cerulean" : textColor
        }`}
      >
        Solutions
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-[var(--grid-margin)] top-full z-10 md:inset-x-[var(--grid-margin-md)]"
      >
        <div className="grid grid-cols-4 gap-8 rounded-lg border border-light-grey bg-white p-8 shadow-lg">
          {pillars.map((pillar) => {
            const pillarHref = `/${pillar.slug}`;
            return (
              <div key={pillar.slug} className="flex flex-col gap-4">
                <Link
                  href={pillarHref}
                  aria-current={pathname === pillarHref ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`border-b border-light-grey pb-3 text-xs font-bold uppercase tracking-[0.6px] ${linkClasses(
                    pathname === pillarHref,
                  )}`}
                >
                  {pillar.label}
                </Link>
                <ul className="flex flex-col gap-1">
                  {pillar.solutions.map((solution) => {
                    const href = `${pillarHref}/solutions/${solution.slug}`;
                    const current = pathname === href;
                    return (
                      <li key={solution.slug}>
                        <Link
                          href={href}
                          aria-current={current ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 py-1.5 text-sm ${linkClasses(current)}`}
                        >
                          {solution.icon && (
                            <span className="relative size-6 shrink-0">
                              <Image src={solution.icon} alt="" fill sizes="24px" className="object-contain" />
                            </span>
                          )}
                          {solution.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
