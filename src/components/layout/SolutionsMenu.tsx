"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { PillarConfig } from "@/lib/pillars";

// Delay before a hover-opened menu closes, so the pointer can cross the gap
// between the trigger and the panel without it snapping shut.
const HOVER_CLOSE_MS = 150;

/**
 * "Solutions" dropdown for the pillar header. The trigger is a button, not a
 * link, since there's no overview page to go to. Opens on click (or hover with
 * a mouse), closes on Escape, an outside click, focus leaving it, or picking a
 * solution. The panel follows the trigger in the DOM, so Tab moves straight
 * into it.
 */
export function SolutionsMenu({ pillar, textColor }: { pillar: PillarConfig; textColor: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const onSolutionPage = pathname.startsWith(`/${pillar.slug}/solutions/`);

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

  return (
    <div
      ref={wrapperRef}
      className="relative"
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
          onSolutionPage ? "text-cerulean" : textColor
        }`}
      >
        Solutions
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* pt-3 (not a margin) keeps the hover area continuous down to the panel. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3"
      >
        <ul className="w-[320px] overflow-hidden rounded-lg border border-light-grey bg-white py-2 shadow-lg">
          {pillar.solutions.map((solution) => {
            const href = `/${pillar.slug}/solutions/${solution.slug}`;
            const current = pathname === href;
            return (
              <li key={solution.slug}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-base text-near-black transition-colors hover:bg-cerulean/5 hover:text-cerulean focus-visible:bg-cerulean/5 focus-visible:text-cerulean focus-visible:outline-none ${
                    current ? "text-cerulean" : ""
                  }`}
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
    </div>
  );
}
