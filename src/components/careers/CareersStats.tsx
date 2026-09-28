"use client";

import { CountUp } from "@/components/ui/CountUp";
import { useJobs } from "./useJobs";

const VALUE_CLASS = "font-display text-6xl italic md:text-8xl";

type Stat = { value: string; label: string; animate?: boolean };

export function CareersStats() {
  const jobs = useJobs();

  const stats: Stat[] = [
    { value: "100%", label: "W-2 employees. No gig work" },
    { value: "52", label: "Paydays a year with weekly pay" },
    // Not a count, so it doesn't animate ("Day 0" → "Day 1" would read oddly).
    { value: "Day 1", label: "Paid training before your first shift starts", animate: false },
    // Live count of the positions on the job map; a dash holds the space while loading.
    { value: jobs ? String(jobs.length) : "–", label: "Open jobs hiring right now" },
  ];

  return (
    <section className="flex w-full flex-wrap items-start justify-center gap-x-6 gap-y-8 bg-white px-8 py-12 text-center text-black">
      {stats.map((stat) => (
        <div key={stat.label} className="flex w-[240px] flex-col items-center gap-6">
          {stat.animate === false ? (
            <span className={VALUE_CLASS}>{stat.value}</span>
          ) : (
            <CountUp value={stat.value} className={VALUE_CLASS} />
          )}
          <p className="text-2xl leading-8">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
