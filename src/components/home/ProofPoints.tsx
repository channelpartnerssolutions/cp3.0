import { CountUp } from "@/components/ui/CountUp";

type Stat = { value: string; label: string; hidden?: boolean };

const stats: Stat[] = [
  // TODO(content): real number — left visible on purpose as a reminder
  { value: "00", label: "Years experience in the field" },
  { value: "100%", label: "W-2 employees utilized" },
  { value: "53", label: "Countries reached globally" },
  // TODO(content): real number — left visible on purpose as a reminder
  { value: "00", label: "Positions filled annually" },
];

export function ProofPoints() {
  return (
    <section className="flex w-full flex-wrap items-start justify-center gap-x-16 gap-y-8 bg-dark-blue px-8 py-12 text-center text-white">
      {stats
        .filter((stat) => !stat.hidden)
        .map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <CountUp value={stat.value} className="font-display text-6xl italic md:text-8xl" />
            <p className="max-w-[190px] text-base leading-8">{stat.label}</p>
          </div>
        ))}
    </section>
  );
}
