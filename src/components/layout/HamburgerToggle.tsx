export function HamburgerToggle({
  open,
  onClick,
  className = "",
  barClassName = "bg-white",
  "aria-label": ariaLabel,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
  barClassName?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? (open ? "Close menu" : "Open menu")}
      aria-expanded={open}
      className={`relative flex size-6 items-center justify-center cursor-pointer ${className}`}
    >
      <span
        className={`absolute h-[2px] w-full transition-all duration-300 ease-in-out ${barClassName} ${
          open ? "translate-y-0 rotate-45" : "-translate-y-[7px]"
        }`}
      />
      <span
        className={`absolute h-[2px] w-full transition-all duration-300 ease-in-out ${barClassName} ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-[2px] w-full transition-all duration-300 ease-in-out ${barClassName} ${
          open ? "translate-y-0 -rotate-45" : "translate-y-[7px]"
        }`}
      />
    </button>
  );
}
