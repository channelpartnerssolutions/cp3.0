import type { ReactNode } from "react";

// The small cerulean label above a page or section headline, the same
// everywhere: header-6 type, a step smaller on mobile.
export function Eyebrow({ className = "", children }: { className?: string; children: ReactNode }) {
  return <p className={`header-6 text-cerulean max-md:text-[14px]! max-md:leading-5! ${className}`}>{children}</p>;
}
