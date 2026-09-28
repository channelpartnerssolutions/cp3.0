"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

export function FadeIn({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`fade-in-section ${inView ? "is-visible" : ""}`}>
      {children}
    </div>
  );
}
