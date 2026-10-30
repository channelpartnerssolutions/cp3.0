import Image from "next/image";
import type { ExperientialImage } from "@/lib/experiential-solutions";

// Fills its (positioned) parent with a photo, or with a labeled placeholder
// until the photo exists. The placeholder is light grey with a dashed frame
// so it can't be mistaken for a dark section background.
export function Media({
  image,
  label,
  sizes,
  labelAtTop = false,
}: {
  image?: ExperientialImage;
  label: string;
  sizes: string;
  // For cards that overlay text on the bottom of the image.
  labelAtTop?: boolean;
}) {
  if (!image) {
    return (
      <div className="absolute inset-0 bg-placeholder-grey bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(255_255_255/0.35)_14px_28px)] p-3">
        <div className={`flex size-full flex-col items-center gap-3 ${labelAtTop ? "justify-start" : "justify-center"} border-2 border-dashed border-slate/40 p-6 text-center text-slate`}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m3 17 5-5 4 4 3-3 6 6" />
          </svg>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Photo needed</span>
          <span className="max-w-[320px] text-sm leading-5">{label}</span>
        </div>
      </div>
    );
  }
  return <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />;
}
