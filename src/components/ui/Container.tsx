import type { ComponentPropsWithoutRef } from "react";

export function Container({ className = "", children, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--grid-margin)] md:px-[var(--grid-margin-md)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
