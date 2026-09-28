type Persona = {
  slug: string;
  title: string;
  intro: string;
  bullets: string[];
  reversed?: boolean;
};

const PERSONAS: Persona[] = [
  {
    slug: "launch",
    title: "For the Launch That Can't Slip",
    intro:
      "If you're a brand or marketing leader planning a launch, pop-up, or mobile tour, you're working against a hard date and a budget to defend.",
    bullets: [
      "Creative caliber. The idea has to be worth walking into.",
      "Flawless on-site execution. No cutting corners once the doors open.",
      "One team, start to finish. Concept through staffing, owned by us, not handed off to a subcontractor.",
    ],
  },
  {
    slug: "moment",
    title: "For the Moment Everyone Has to Feel",
    intro:
      "If you're a people or culture leader planning a company-wide meeting, leadership summit, or culture initiative, it has to land with an entire organization, not just the room.",
    bullets: [
      "Reach at real scale. Every employee, not just who's in the room.",
      "Logistics that hold at scale. Built for ten thousand attendees without cracking.",
      "Measurable impact. Engagement data, not just a memorable stage.",
    ],
    reversed: true,
  },
];

export function PersonaSplit() {
  return (
    <section className="w-full py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[var(--grid-max-width)] grid-cols-12 gap-x-6 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        {/* Inset one grid column on each side (col 2–11 of 12), so the
            content is narrower than the full container width, per design. */}
        <div className="col-span-12 flex flex-col gap-20 md:col-span-10 md:col-start-2 md:gap-28">
          {PERSONAS.map((persona) => (
            <div
              key={persona.slug}
              className={`flex flex-col items-start gap-10 md:items-center md:gap-16 ${
                persona.reversed ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="relative w-full max-w-[559px] shrink-0">
                <div
                  aria-hidden
                  className="absolute -bottom-6 -left-6 h-full w-full rounded bg-near-black"
                />
                <div className="relative aspect-[559/699] w-full overflow-hidden rounded">
                  <video
                    className="size-full object-cover"
                    src="/videos/experiential/persona-vertical.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-6">
                <h2 className="header-3 text-white">{persona.title}</h2>
                <p className="text-base leading-relaxed text-white/70">
                  {persona.intro}
                </p>
                <p className="text-base font-bold text-white">
                  What matters for you:
                </p>
                <ul className="flex flex-col gap-2 pl-5">
                  {persona.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="list-disc text-base leading-relaxed text-white/70 marker:text-cerulean"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
