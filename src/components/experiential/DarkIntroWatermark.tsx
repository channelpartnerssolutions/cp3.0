export function DarkIntroWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
    >
      <span className="absolute -left-4 -top-[6%] whitespace-nowrap font-heading text-[16.5vw] uppercase leading-none tracking-[0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        Experiential
      </span>
      <span className="absolute -left-4 top-[22%] whitespace-nowrap font-heading text-[16.5vw] uppercase leading-none tracking-[0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        Activations
      </span>
    </div>
  );
}
