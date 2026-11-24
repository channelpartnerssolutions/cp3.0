// The dark intro band's headline and paragraph (sits over the Watermark).
// The headline's second line is set in cerulean.
export function PillarIntro({ heading, body }: { heading: [string, string]; body: string }) {
  return (
    <section className="relative w-full pt-20 pb-16 md:pt-28">
      <div className="relative z-10 mx-auto flex w-full max-w-[var(--grid-max-width)] flex-col gap-8 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 max-w-[700px] text-white">
          {heading[0]} <span className="text-cerulean">{heading[1]}</span>
        </h2>
        <p className="max-w-[610px] text-base leading-relaxed text-white/80">{body}</p>
      </div>
    </section>
  );
}
