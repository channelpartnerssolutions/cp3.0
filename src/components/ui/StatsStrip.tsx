import { CountUp } from "@/components/ui/CountUp";

// A stat with a `footnote` gets an asterisk after its label and the note
// printed under the row.
export type Stat = { value: string; label: string; hidden?: boolean; footnote?: string };

// Dark-blue row of count-up numbers, used by the homepage proof points and
// case study pages.
export function StatsStrip({ stats }: { stats: Stat[] }) {
  const visible = stats.filter((stat) => !stat.hidden);
  const footnotes = visible.filter((stat) => stat.footnote);

  return (
    <section className="flex w-full flex-col items-center gap-8 bg-dark-blue px-8 py-12 text-center text-white">
      <div className="flex w-full flex-wrap items-start justify-center gap-x-16 gap-y-8">
        {visible.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <CountUp value={stat.value} className="font-display text-6xl italic md:text-8xl" />
            <p className="max-w-[190px] text-base leading-8">
              {stat.label}
              {stat.footnote && "*"}
            </p>
          </div>
        ))}
      </div>
      {footnotes.map((stat) => (
        <p key={stat.label} className="text-xs text-white/60">
          *{stat.footnote}
        </p>
      ))}
    </section>
  );
}
