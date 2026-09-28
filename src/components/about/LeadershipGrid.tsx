"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LeaderModal } from "./LeaderModal";
import { LEADERS, type Leader } from "./leaders";

function LeaderCard({ leader, onOpen }: { leader: Leader; onOpen: (leader: Leader) => void }) {
  const firstName = leader.name.split(" ")[0];

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        type="button"
        onClick={() => onOpen(leader)}
        className="group relative aspect-[300/400] w-full cursor-pointer overflow-hidden rounded-lg text-left"
      >
        <Image src={leader.image} alt={leader.name} fill className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#103240] to-[#121e23] opacity-0 transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="rounded px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
            meet {firstName}
          </span>
        </div>
      </button>
      <div className="flex flex-col gap-1 text-black">
        <p className="header-4">{leader.name}</p>
        <p className="text-base leading-[1.46]">{leader.title}</p>
      </div>
    </div>
  );
}

export function LeadershipGrid() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);

  return (
    <section className="w-full bg-white py-[80px]">
      <Container className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start justify-center gap-4 text-black">
          <h2 className="header-3">meet the leadership team</h2>
          <p className="max-w-[316px] text-base leading-6">
            Our corporate leadership team is made up of experts from all walks of life to ensure
            we&rsquo;re bringing only the best to the top of our infrastructure.
          </p>
        </div>
        {LEADERS.map((leader) => (
          <LeaderCard key={leader.name} leader={leader} onOpen={setActiveLeader} />
        ))}
      </Container>
      <LeaderModal leader={activeLeader} onClose={() => setActiveLeader(null)} />
    </section>
  );
}
