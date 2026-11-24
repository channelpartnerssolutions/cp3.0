import Image from "next/image";
import type { ReactNode } from "react";

export type BandLogo = {
  src: string;
  name: string;
  w: number;
  h: number;
  // For a source asset stored upside-down.
  flipY?: boolean;
  // Renders a dark logo in white, for logos without a white version.
  whiten?: boolean;
};

// Blue band with a headline over a centered, wrapping row of client logos.
// `children` render under the logos (e.g. retailer credentials).
export function LogoBand({ heading, logos, children }: { heading: string; logos: BandLogo[]; children?: ReactNode }) {
  return (
    <section className="relative w-full bg-medium-blue pt-12 pb-14">
      <h2 className="header-3 mx-auto mb-10 max-w-[1000px] px-[var(--grid-margin)] text-center text-white">{heading}</h2>
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-wrap items-center justify-center gap-x-12 gap-y-8 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        {logos.map((logo) => (
          <div
            key={logo.src}
            className="relative flex shrink-0 items-center justify-center"
            style={{ width: logo.w, height: logo.h }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              className={`object-contain ${logo.whiten ? "brightness-0 invert" : ""}`}
              style={logo.flipY ? { transform: "scaleY(-1)" } : undefined}
            />
          </div>
        ))}
      </div>
      {children}
    </section>
  );
}
