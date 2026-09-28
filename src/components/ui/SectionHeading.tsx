import type { ComponentPropsWithoutRef } from "react";

export function SectionHeading({ className = "", children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={`header-2 text-center ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
