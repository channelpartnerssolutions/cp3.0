import { WithPlaceholders } from "@/components/ui/ContentPlaceholder";

// TODO(content) {x} and the [VERIFY: IT…] note are visible placeholders until
// IT's tap-count audit (K-12) gives the real application time.
const STEPS = [
  {
    lead: "Pick a job and tap View & Apply.",
    detail: "It takes about {x} minutes. [VERIFY: IT, tap-count audit K-12]",
  },
  {
    lead: "Tell us what you’ve done.",
    detail:
      "No polished resume? Send what you have. Retail, stocking, warehouse, assembly, handyman, electrical and customer service experience all count.",
  },
  {
    lead: "Give us a phone number and email you check.",
    detail: "We reach out by text and email.",
  },
  {
    lead: "Reply when we reach out.",
    detail: "The fastest responses get scheduled first.",
  },
];

export function HiringSteps() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto grid w-full max-w-[var(--grid-max-width)] grid-cols-12 gap-x-6 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        <div className="col-span-12 flex flex-col gap-12 xl:col-span-10 xl:col-start-2">
          <h2 className="header-2 text-black">How to get hired faster</h2>

          <ol className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.lead} className="flex flex-col gap-4 border-t-2 border-cerulean pt-6">
                <span aria-hidden className="font-display text-6xl italic leading-none text-cerulean">
                  {i + 1}
                </span>
                <p className="text-lg font-bold leading-7 text-black">{step.lead}</p>
                <p className="text-base leading-6 text-black">
                  <WithPlaceholders text={step.detail} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
