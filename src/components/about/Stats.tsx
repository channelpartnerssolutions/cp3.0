import { CountUp } from "@/components/ui/CountUp";

type Stat = { value: string; label: string; hidden?: boolean };

const stats: Stat[] = [
  { value: "40+", label: "Years Experience in the Industry" },
  { value: "6", label: "Offices Across the United States" },
  { value: "7", label: "Warehouses Servicing the Globe" },
  { value: "560+", label: "Corporate Employees" },
];

export function Stats() {
  return (
    <section className="flex w-full flex-wrap items-start justify-center gap-x-16 gap-y-8 bg-white px-8 pt-[68px] pb-[80px] text-center text-black">
      {stats
        .filter((stat) => !stat.hidden)
        .map((stat) => (
          <div key={stat.label} className="flex w-[240px] flex-col items-center gap-6">
            <CountUp value={stat.value} className="font-display text-6xl italic md:text-8xl" />
            <p className="text-2xl leading-8">{stat.label}</p>
          </div>
        ))}
    </section>
  );
}
