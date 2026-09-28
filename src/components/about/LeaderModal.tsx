"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Leader } from "./leaders";

export function LeaderModal({ leader, onClose }: { leader: Leader | null; onClose: () => void }) {
  useEffect(() => {
    if (!leader) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [leader, onClose]);

  if (!leader) return null;

  const firstName = leader.name.split(" ")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121e23]/80 p-6"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[910px] gap-8 rounded-lg bg-white p-8 max-md:flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 flex-col text-black">
          <div>
            <p className="header-4">{leader.name}</p>
            <p className="mt-0.5 text-base leading-[1.46]">{leader.title}</p>
          </div>
          <p className="mt-6 text-base leading-6">{leader.bio}</p>
          <a
            href={leader.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="font-heading mt-auto pt-6 text-lg uppercase tracking-[0.18em] text-cerulean underline underline-offset-2"
          >
            {firstName}&rsquo;s linkedin
          </a>
        </div>
        <div className="relative aspect-[300/400] w-full shrink-0 overflow-hidden rounded-lg md:w-[350px]">
          <Image src={leader.image} alt={leader.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
