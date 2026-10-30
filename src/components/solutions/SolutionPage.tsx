import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import type { PillarConfig } from "@/lib/pillars";
import type { BulletIcon, SolutionContent, SolutionImage } from "@/lib/solutions";
import { SolutionFaqs } from "./SolutionFaqs";

// The layout every solution page uses (Figma: "Warehousing, Fulfillment, &
// Logistics"). Content lives in src/lib/solutions.ts; optional sections are
// skipped when an entry leaves them out.
export function SolutionPage({ content, pillar }: { content: SolutionContent; pillar: PillarConfig }) {
  const { hero, stat, intro, capabilities, engagementModels, process, caseStudies, whyUs, worksWith, faqs, cta } =
    content;

  return (
    <>
      {/* Sits behind the transparent pillar header; id="hero" switches the
          header to its white theme over it. */}
      <section
        id="hero"
        className="relative -mt-[var(--pillar-header-height)] flex min-h-[560px] w-full items-end bg-near-black md:min-h-[720px]"
      >
        <Container className="pt-[calc(var(--pillar-header-height)+48px)] pb-16 md:pb-20">
          <div className="flex max-w-[900px] flex-col items-start gap-4">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="header-1 max-w-[720px] text-white max-md:text-[34px]! max-md:leading-[42px]!">
              {hero.title}
            </h1>
            <p className="max-w-[690px] text-lg leading-7 text-white/80 md:text-2xl md:leading-8">{hero.body}</p>
          </div>
        </Container>
      </section>

      <section className="w-full bg-cerulean py-12 md:py-16">
        <Container className="flex flex-col gap-4">
          <p className="header-4 font-normal! text-white max-md:text-[18px]! max-md:leading-7!">
            <strong className="font-bold">{stat.lead}</strong> {stat.text}
          </p>
          <p className="text-base leading-6 text-white/75">Source: {stat.source}</p>
        </Container>
      </section>

      <section className="w-full bg-white py-20 md:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_554px] lg:gap-[72px]">
          <div className="flex flex-col gap-4">
            <Heading heading={intro.heading} accent={intro.accent} />
            {intro.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-6 text-black">
                {paragraph}
              </p>
            ))}
          </div>
          <Photo image={intro.image} sizes="(min-width: 1024px) 554px, 100vw" className="aspect-[554/515]" />
        </Container>
      </section>

      <section className="w-full border-y border-light-grey bg-off-white py-20">
        <Container className="flex flex-col items-center gap-16 md:gap-20">
          <h2 className="header-2 max-w-[990px] text-center text-black max-md:text-[28px]! max-md:leading-9!">
            {capabilities.heading}
          </h2>
          <div className="flex w-full flex-col gap-16 md:gap-20 lg:px-7">
            {capabilities.items.map((item, i) => (
              <FadeIn key={item.title}>
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  {/* Photo left on the 1st, 3rd… rows, right on the others;
                      always above the text on mobile. */}
                  <Photo
                    image={item.image}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`aspect-[587/515] ${i % 2 === 1 ? "md:order-2" : ""}`}
                  />
                  <div className="flex flex-col gap-6">
                    <h3 className="header-3 text-black max-md:text-[24px]! max-md:leading-8!">{item.title}</h3>
                    <div className="flex flex-col gap-4">
                      <p className="text-xl leading-8 text-black md:text-2xl">{item.lead}</p>
                      <ul className="flex flex-col gap-4">
                        {item.bullets.map((bullet) => (
                          <li key={bullet.text} className="flex items-start gap-4 text-base leading-6 text-black">
                            <BulletIconImage icon={bullet.icon} />
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {capabilities.note && (
            <p className="max-w-[760px] text-center text-base leading-6 text-slate">{capabilities.note}</p>
          )}
        </Container>
      </section>

      {engagementModels && (
        <section className="w-full bg-near-black pt-20 pb-[102px]">
          <Container className="flex flex-col gap-12">
            <h2 className="header-2 text-white max-md:text-[28px]! max-md:leading-9!">{engagementModels.heading}</h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {engagementModels.models.map((model) => (
                <li
                  key={model.name}
                  className="flex flex-col gap-6 rounded-lg border border-mist bg-off-white px-6 py-7"
                >
                  <h3 className="header-5 text-black">{model.name}</h3>
                  <dl className="flex flex-col gap-4 text-base leading-6 text-black/80">
                    <dt className="font-bold uppercase">What it is</dt>
                    <dd>{model.whatItIs}</dd>
                    <dt className="font-bold uppercase">When a brand chooses it</dt>
                    <dd>{model.whenToChoose}</dd>
                    {model.example && (
                      <>
                        <dt className="font-bold uppercase">Example</dt>
                        <dd>{model.example}</dd>
                      </>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
            {engagementModels.tags && (
              <div className="flex flex-col gap-3">
                <p className="header-6 text-white/60">{engagementModels.tags.label}</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-2 text-base leading-6 text-white">
                  {engagementModels.tags.items.map((tag) => (
                    <li
                      key={tag}
                      className="after:ml-3 after:text-cerulean after:content-['·'] last:after:content-none"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </section>
      )}

      <section className={`w-full bg-white pt-20 ${caseStudies ? "pb-6" : "pb-20"}`}>
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <Heading heading={process.heading} accent={process.accent} className="text-near-black" />
          </div>
          <div className="flex flex-col gap-6">
            <div aria-hidden className="h-px w-full bg-mist" />
            <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {process.steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-4">
                  <span className="font-display text-[64px] leading-[60px] font-light tracking-[-0.02em] text-cerulean italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="header-5 text-near-black">{step.title}</h3>
                  <p className="text-base leading-6 text-slate">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {caseStudies && (
        <section className="w-full bg-white py-20">
          <Container className="flex flex-col gap-12">
            <h2 className="header-2 max-w-[840px] text-black max-md:text-[28px]! max-md:leading-9!">
              {caseStudies.heading}
            </h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {caseStudies.items.map((item) => (
                <li key={item.title}>
                  <CaseStudyCard item={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {whyUs && (
        <section className="w-full border-y border-light-grey bg-off-white py-20">
          <Container className="flex flex-col gap-12">
            <h2 className="header-2 text-black max-md:text-[28px]! max-md:leading-9!">Why Channel Partners</h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
              {whyUs.map((point) => (
                <li key={point.title} className="flex flex-col gap-4 border-t-2 border-cerulean pt-6">
                  <h3 className="header-5 text-near-black">{point.title}</h3>
                  <p className="text-base leading-6 text-slate">{point.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {worksWith && (
        <section className="w-full bg-white pt-20">
          <Container className="flex flex-col gap-8">
            <Eyebrow>Works with</Eyebrow>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {worksWith.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group flex h-full flex-col gap-3 rounded-lg border border-mist p-6 transition-colors hover:border-cerulean"
                  >
                    <span className="header-5 flex items-start justify-between gap-4 text-near-black">
                      {service.label}
                      <span aria-hidden className="text-cerulean transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                    <span className="text-base leading-6 text-slate">{service.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {faqs.length > 0 && <SolutionFaqs faqs={faqs} />}

      <section className="w-full bg-medium-blue py-24">
        <Container className="flex flex-col items-center text-center">
          <h2 className="header-1 max-w-[1000px] text-white max-md:text-[30px]! max-md:leading-[38px]!">
            {cta.heading}
          </h2>
          {cta.body && (
            <p className="mt-6 max-w-[640px] text-lg leading-7 text-white md:text-2xl md:leading-8">{cta.body}</p>
          )}
          <Button
            href={`/contact?source=${pillar.slug}-${content.slug}`}
            variant="outline-light"
            className="mt-8"
          >
            {pillar.ctaLabel}
          </Button>
        </Container>
      </section>
    </>
  );
}

// Section headline with an optional cerulean tail, run in on the same line.
function Heading({
  heading,
  accent,
  className = "text-black",
}: {
  heading: string;
  accent?: string;
  className?: string;
}) {
  return (
    <h2 className={`header-2 max-md:text-[28px]! max-md:leading-9! ${className}`}>
      {heading}
      {accent && <span className="text-cerulean"> {accent}</span>}
    </h2>
  );
}

function Photo({ image, sizes, className }: { image: SolutionImage; sizes: string; className: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-lg bg-placeholder-grey ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

// Native size of each icon's artwork; it's centered in a 24px box, matching
// the Feather-style icon frames in Figma.
const BULLET_ICONS: Record<BulletIcon, [width: number, height: number]> = {
  box: [18, 18],
  layers: [18, 18],
  "map-pin": [16, 20],
  package: [24, 24],
  "package-outline": [24, 24],
  receipt: [24, 24],
  "rotate-ccw": [18, 18],
  search: [24, 24],
  tag: [18, 18],
  "trash-2": [20, 19],
  truck: [24, 24],
  "truck-outline": [24, 24],
  warehouse: [24, 24],
};

function BulletIconImage({ icon }: { icon?: BulletIcon }) {
  if (!icon) {
    return (
      <span aria-hidden className="flex size-6 shrink-0 items-center justify-center">
        <span className="size-2 rounded-full bg-cerulean" />
      </span>
    );
  }
  const [width, height] = BULLET_ICONS[icon];
  return (
    <span aria-hidden className="flex size-6 shrink-0 items-center justify-center">
      <Image src={`/images/retail/solutions/icons/${icon}.svg`} alt="" width={width} height={height} />
    </span>
  );
}

function CaseStudyCard({ item }: { item: NonNullable<SolutionContent["caseStudies"]>["items"][number] }) {
  const card = (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
      <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 flex flex-col justify-between bg-near-black/80 p-6 md:p-8">
        <p className="header-6 max-w-[460px] text-white max-md:text-[15px]! max-md:leading-5!">{item.title}</p>
        <div className="flex flex-col gap-2.5">
          <p className="font-display text-[72px] leading-[64px] font-light tracking-[-0.02em] text-cerulean italic lg:text-[128px] lg:leading-[100px]">
            {item.value}
          </p>
          <p className="header-6 text-white max-md:text-[14px]! max-md:leading-5!">{item.label}</p>
        </div>
      </div>
    </div>
  );

  return item.href ? (
    <Link href={item.href} className="block transition-opacity hover:opacity-90">
      {card}
    </Link>
  ) : (
    card
  );
}
