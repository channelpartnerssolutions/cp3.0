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
        src="/images/about/ceo-jim-2026.png"
        alt="Jim Fulk, CEO of Channel Partners"
        fill
        sizes="100vw"
        className="object-cover object-[0%_10%]"
      />
      {/* Jim sits on the left of the photo; the text goes on the darker right. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-l md:from-black/60 md:via-black/20" />
      <div className="absolute inset-0 flex flex-col justify-end px-8 py-12 md:items-end md:justify-center md:px-[150px] md:py-16">
        <div className="flex flex-col md:w-[400px]">
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
      </div>
      <LeaderModal leader={showBio ? CEO : null} onClose={() => setShowBio(false)} />
    </section>
  );
}
