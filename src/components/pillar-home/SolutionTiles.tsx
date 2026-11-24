import Link from "next/link";
import type { ReactNode } from "react";
import { Media } from "@/components/experiential/solutions/Media";
import type { ExperientialImage } from "@/lib/experiential-solutions";

export type SolutionTile = { href: string; label: string; image?: ExperientialImage };

// A pillar's solutions as photo tiles, each linking to its page. A tile
// without a photo renders a labeled placeholder. `note` sits under the row.
export function SolutionTiles({
  heading,
  tiles,
  note,
}: {
  heading: [string, string];
  tiles: SolutionTile[];
  note?: ReactNode;
}) {
  const columns = tiles.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <section className="w-full bg-white pt-20 pb-24 md:pt-24 md:pb-28">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-12 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 text-center text-black">
          <span className="block">{heading[0]}</span>
          <span className="block">{heading[1]}</span>
        </h2>

        <ul className={`grid grid-cols-1 gap-x-6 gap-y-10 ${columns}`}>
          {tiles.map((tile) => (
            <li key={tile.href}>
              <Link href={tile.href} className="group flex flex-col items-center gap-5">
                <div className="relative aspect-[443/271] w-full overflow-hidden rounded-lg">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                    <Media image={tile.image} label={tile.label} sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                </div>
                <h3 className="header-6 max-w-[260px] text-center text-black transition-colors group-hover:text-cerulean">
                  {tile.label}
                </h3>
              </Link>
            </li>
          ))}
        </ul>

        {note && <div className="mx-auto max-w-[760px] text-center text-base leading-relaxed text-slate">{note}</div>}
      </div>
    </section>
  );
}
