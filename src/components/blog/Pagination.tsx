import Link from "next/link";
import { pageHref } from "@/lib/blog";

// previous 1 2 3 4 5 … 30 next — current page in cerulean with an underline.
// Shows the first and last page plus two either side of the current one.
export function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;

  const pages: (number | "gap")[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 2) pages.push(p);
    else if (pages[pages.length - 1] !== "gap") pages.push("gap");
  }

  const item = "font-heading text-lg font-black uppercase leading-[18px]";

  return (
    <nav aria-label="Blog pages" className="flex flex-wrap items-center justify-center gap-[17px]">
      {current > 1 && (
        <Link href={pageHref(current - 1)} className={`${item} text-black hover:text-cerulean`}>
          previous
        </Link>
      )}
      {pages.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className={`${item} text-black`} aria-hidden>
            …
          </span>
        ) : p === current ? (
          <span
            key={p}
            aria-current="page"
            className={`${item} border-b-2 border-cerulean pb-0.5 text-cerulean`}
          >
            {p}
          </span>
        ) : (
          <Link key={p} href={pageHref(p)} className={`${item} text-black hover:text-cerulean`}>
            {p}
          </Link>
        )
      )}
      {current < total && (
        <Link href={pageHref(current + 1)} className={`${item} text-black hover:text-cerulean`}>
          next
        </Link>
      )}
    </nav>
  );
}
