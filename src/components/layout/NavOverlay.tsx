"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { pillars } from "@/lib/pillars";
import { connectLink, headerLinks } from "./SiteHeaderBar";

// Matches Tailwind's `lg`, where the inline header nav takes over.
const DESKTOP_QUERY = "(min-width: 1024px)";

const ROW =
  "flex w-full items-center justify-between border-b border-white/15 py-5 font-heading text-xl uppercase tracking-[3.6px]";

/**
 * Mobile menu (below lg): the header's items as a simple list under the
 * header bar. Solutions expands in place to each pillar and its solutions;
 * Connect With Us sits at the bottom. The footer carries the full site map.
 */
export function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsId = useId();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const onPillarPage = pillars.some((p) => isActive(`/${p.slug}`));

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // Widening to desktop hides this menu; close it so the page can scroll.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktop = () => {
      if (desktop.matches) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-near-black pt-[var(--header-height)] text-white lg:hidden">
      <nav aria-label="Main" className="mx-auto flex w-full max-w-[640px] flex-col px-[var(--grid-margin)] pb-12 md:px-[var(--grid-margin-md)]">
        <div>
          <button
            type="button"
            aria-expanded={solutionsOpen}
            aria-controls={solutionsId}
            onClick={() => setSolutionsOpen((v) => !v)}
            className={`${ROW} cursor-pointer ${onPillarPage ? "text-cerulean" : ""}`}
          >
            Solutions
            <ChevronDown
              aria-hidden
              strokeWidth={1.75}
              className={`size-6 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div id={solutionsId} hidden={!solutionsOpen} className="flex flex-col gap-6 border-b border-white/15 py-6">
            {pillars.map((pillar) => (
              <div key={pillar.slug} className="flex flex-col gap-2">
                <Link
                  href={`/${pillar.slug}`}
                  onClick={onClose}
                  className={`text-xs font-bold uppercase tracking-[0.6px] hover:text-cerulean ${
                    pathname === `/${pillar.slug}` ? "text-cerulean" : "text-white/60"
                  }`}
                >
                  {pillar.label}
                </Link>
                <ul className="flex flex-col gap-2">
                  {pillar.solutions.map((solution) => {
                    const href = `/${pillar.slug}/solutions/${solution.slug}`;
                    return (
                      <li key={solution.slug}>
                        <Link
                          href={href}
                          onClick={onClose}
                          aria-current={pathname === href ? "page" : undefined}
                          className={`text-base hover:text-cerulean ${pathname === href ? "text-cerulean" : ""}`}
                        >
                          {solution.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {headerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`${ROW} hover:text-cerulean ${isActive(link.href) ? "text-cerulean" : ""}`}
          >
            {link.label}
          </Link>
        ))}

        <Button href={connectLink.href} variant="primary" onClick={onClose} className="mt-10 w-full py-3">
          {connectLink.label}
        </Button>
      </nav>
    </div>
  );
}
