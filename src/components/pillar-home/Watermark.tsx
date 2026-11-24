// Two oversized outlined words behind a pillar home's dark intro band.
export function Watermark({ words }: { words: [string, string] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      <span className="absolute -top-[6%] -left-4 font-heading text-[16.5vw] leading-none tracking-[0.05em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        {words[0]}
      </span>
      <span className="absolute top-[22%] -left-4 font-heading text-[16.5vw] leading-none tracking-[0.05em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
        {words[1]}
      </span>
    </div>
  );
}
