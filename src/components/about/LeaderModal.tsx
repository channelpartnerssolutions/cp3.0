"use client";

import { useId } from "react";
import Image from "next/image";
import { CloseButton } from "@/components/ui/CloseButton";
import { useDialog } from "@/components/ui/useDialog";
import type { Leader } from "./leaders";

export function LeaderModal({ leader, onClose }: { leader: Leader | null; onClose: () => void }) {
  const panelRef = useDialog<HTMLDivElement>(leader !== null, onClose);
  const headingId = useId();

  if (!leader) return null;

  const firstName = leader.name.split(" ")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121e23]/80 p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="relative flex max-h-[90vh] w-full max-w-[910px] gap-8 overflow-y-auto rounded-lg bg-white p-8 outline-none max-md:flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} className="absolute right-3 top-3 z-10 bg-white/80" />
        <div className="flex flex-1 flex-col text-black">
          <div>
            <h2 id={headingId} className="header-4 pr-10">
              {leader.name}
            </h2>
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
