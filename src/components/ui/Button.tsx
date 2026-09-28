import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "outline-light" | "solid-medium-blue" | "text-underline";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cerulean border border-cerulean text-white hover:bg-cerulean-dark px-4 py-2 rounded",
  "outline-light":
    "bg-transparent border border-white text-white hover:bg-white hover:text-near-black px-4 py-2 rounded",
  "solid-medium-blue":
    "bg-medium-blue border border-medium-blue text-white hover:opacity-90 px-4 py-2 rounded",
  "text-underline": "text-black underline underline-offset-2 hover:text-cerulean",
};

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: ButtonVariant;
};

export function Button({ href, variant = "primary", className = "", children, ...props }: ButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = [
    "inline-flex items-center justify-center font-bold uppercase text-xs tracking-[0.6px] transition-colors whitespace-nowrap",
    variantClasses[variant],
    className,
  ].join(" ");

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
