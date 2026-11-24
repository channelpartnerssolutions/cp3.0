"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

// YouTube Shorts from our people. Posters are each video's own vertical
// thumbnail, saved under public/images/careers/culture/<id>.jpg.
const VIDEOS = [
  { id: "CiVAbL7RCDg", title: "Channel Partners culture video 1" },
  { id: "9XSvrLZChOw", title: "Channel Partners culture video 2" },
  { id: "lAekUTzz4n0", title: "Channel Partners culture video 3" },
  { id: "BZUVifdD0L0", title: "Channel Partners culture video 4" },
];

// "A culture designed to empower and deliver" (Figma 11676:3165): heading
// and intro on white, then four vertical videos that sit across the top of
// a dark band. Below md the videos scroll sideways.
export function CultureVideos() {
  return (
    <section className="relative w-full bg-white pt-20">
      {/* The dark band behind the lower part of the videos. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[220px] bg-near-black md:h-[336px]" />

      <Container className="relative flex flex-col gap-6">
        <h2 className="header-2 max-w-[737px] text-black">a culture designed to empower and deliver</h2>
        <p className="max-w-[778px] text-lg leading-[1.46] text-black md:text-[21px]">
          Our culture is built on the belief that empowered teams deliver better results. Instead of
          describing it, we let our people show it through their work, their ownership, and their
          experience at Channel Partners.
        </p>
      </Container>

      <div className="relative mx-auto mt-[120px] w-full max-w-[1392px] pb-[90px] md:px-4">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--grid-margin)] [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {VIDEOS.map((video) => (
            <li key={video.id} className="w-[72vw] max-w-[332px] shrink-0 snap-center md:w-auto md:max-w-none">
              <ShortVideo {...video} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Poster and play button until clicked, then the YouTube player (privacy-
// enhanced domain), so the page doesn't load four players up front.
function ShortVideo({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[332/590] w-full overflow-hidden rounded-lg bg-near-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 cursor-pointer"
        >
          <Image
            src={`/images/careers/culture/${id}.jpg`}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 72vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-near-black/10 transition-colors group-hover:bg-near-black/25" />
          <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden className="ml-1 fill-near-black">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
