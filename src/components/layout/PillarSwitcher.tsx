import Link from "next/link";
import { pillars } from "@/lib/pillars";
import { CpIconMark } from "./CpIconMark";

// Top strip shown on every page. On gateway pages (no activeSlug) the CP icon
// is solid and every pillar is dimmed; inside a pillar, the CP icon dims and
// only the active pillar is solid.
export function PillarSwitcher({ activeSlug }: { activeSlug?: string }) {
  const onGateway = activeSlug === undefined;
  const dimmed = "opacity-50 hover:opacity-100";

  return (
    <div className="flex w-full items-center justify-center gap-4 bg-near-black py-2">
      <Link
        href="/"
        aria-label="Channel Partners home"
        className={`flex items-center text-white ${onGateway ? "opacity-100" : dimmed}`}
      >
        <CpIconMark className="h-[13px] w-[22px]" />
      </Link>
      {pillars.map((p) => {
        const active = p.slug === activeSlug;
        return (
          <span key={p.slug} className="flex items-center gap-4">
            <span className="h-3 w-px bg-white/40" />
            <Link
              href={`/${p.slug}`}
              aria-current={active ? "page" : undefined}
              className={`text-xs font-light tracking-[1.8px] text-white ${active ? "opacity-100" : dimmed}`}
            >
              {p.switchLabel}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
