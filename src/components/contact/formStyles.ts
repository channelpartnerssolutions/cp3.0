// Shared by the contact page's forms so they look and validate the same.
export const inputClasses =
  "w-full rounded border border-middle-grey bg-white p-4 text-base text-black focus:border-cerulean focus:outline-none";
export const labelClasses =
  "flex items-center text-[11px] font-semibold uppercase tracking-[0.15em] text-middle-grey";
export const errorClasses = "text-sm text-red-600";
export const primaryButtonClasses =
  "inline-flex w-fit cursor-pointer items-center justify-center rounded bg-cerulean px-4 py-2 text-xs font-bold uppercase tracking-[0.6px] text-white transition-colors hover:bg-cerulean-dark disabled:cursor-not-allowed disabled:opacity-60";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
