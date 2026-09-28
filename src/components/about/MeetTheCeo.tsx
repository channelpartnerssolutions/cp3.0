"use client";

import { useState } from "react";
import Image from "next/image";
import { LeaderModal } from "./LeaderModal";
import { CEO } from "./leaders";

export function MeetTheCeo() {
  const [showBio, setShowBio] = useState(false);

  return (
    <section className="relative h-[500px] w-full overflow-hidden md:h-[652px]">
      <Image
        src="/images/about/ceo-jim.jpg"
        alt="Jim Fulk, CEO of Channel Partners"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-8 py-16 md:px-[150px]">
        <p className="header-6 text-white">meet our ceo</p>
        <h2 className="header-1 text-white">jim fulk</h2>
        <p className="mt-4 max-w-[400px] text-base leading-6 text-white">
          With over 20 years in retail merchandising and executive leadership Jim is the
          definition of &ldquo;walks the walk&rdquo;. Far from leading from the boardroom Jim
          still thrives on showing up on the job site, getting his hands dirty, and leading by
          example.
        </p>
        <button
          type="button"
          onClick={() => setShowBio(true)}
          className="inline-flex cursor-pointer items-center justify-center self-start whitespace-nowrap rounded border border-white bg-transparent px-4 py-2 mt-8 font-bold uppercase text-xs tracking-[0.6px] text-white transition-colors hover:bg-white hover:text-near-black"
        >
          learn more about jim
        </button>
      </div>
      <LeaderModal leader={showBio ? CEO : null} onClose={() => setShowBio(false)} />
    </section>
  );
}
