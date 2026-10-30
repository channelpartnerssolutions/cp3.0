"use client";

import Link from "next/link";
import { useState } from "react";
import type { ExperientialSolutionContent } from "@/lib/experiential-solutions";
import { Media } from "./Media";

type Format = ExperientialSolutionContent["formats"]["items"][number];

// Numbered format list; hovering, focusing or tapping a row swaps the photo
// beside it (sticky on desktop, above the list on mobile). Styled like the
// solution pages' process steps: italic cerulean numbers, header-5 titles.
// Each row's "Plan this" link opens the contact form with the format passed
// as ?format=, so tapping a row on mobile still just swaps the photo.
export function FormatShowcase({ items, contactHref }: { items: Format[]; contactHref: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-[72px]">
      <ul className="flex flex-col border-t border-white/15 max-lg:order-2">
        {items.map((item, i) => {
          const isActive = active === i;
          return (
            <li
              key={item.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex flex-col gap-3 border-b border-white/15 pt-7 pb-7"
            >
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(i)}
                className="grid w-full cursor-default grid-cols-[64px_1fr] items-start gap-4 text-left md:grid-cols-[88px_1fr] md:gap-6"
              >
                <span
                  className={`font-display text-[48px] leading-[44px] font-light tracking-[-0.02em] italic transition-colors duration-300 md:text-[64px] md:leading-[60px] ${
                    isActive ? "text-cerulean" : "text-white/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-2">
                  <span
                    className={`header-5 transition-colors duration-300 max-md:text-[17px]! max-md:leading-6! ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="text-base leading-6 text-white/70">{item.body}</span>
                </span>
              </button>
              <Link
                href={`${contactHref}&format=${item.slug}`}
                className="group ml-20 self-start text-xs font-bold tracking-[0.6px] text-cerulean uppercase transition-colors hover:text-white md:ml-28"
              >
                Plan this
                <span className="sr-only">: {item.title}</span>
                <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <figure className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--pillar-header-height)+32px)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-dark-blue">
          {items.map((item, i) => (
            <div
              key={item.title}
              aria-hidden={active !== i}
              className={`absolute inset-0 transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
            >
              <Media image={item.image} label={item.example} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          ))}
        </div>
        <figcaption className="text-base leading-6 text-white/70">
          <span className="font-bold text-white">{items[active].title}:</span> {items[active].example}
        </figcaption>
      </figure>
    </div>
  );
}
