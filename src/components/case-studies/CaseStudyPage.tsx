import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { CountUp } from "@/components/ui/CountUp";
import type { CaseStudy } from "@/lib/case-studies";
import type { PillarConfig } from "@/lib/pillars";

// Sections sit inside the 10-of-12 column frame the case study pages share.
const FRAME = "col-span-12 min-[1610px]:col-span-10 min-[1610px]:col-start-2";
const SECTION_PADDING = "pt-20 pb-24 md:pt-24 md:pb-28";
const SECTION_HEADING = "header-3 max-md:text-[24px]! max-md:leading-8!";
// One part of the story: its heading in a narrow left column, the copy in
// the wide one beside it (stacked on mobile).
const STORY_ROW = "grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]";

// The one layout every case study uses, light on every pillar: hero, The
// Problem, Our Approach, The Outcome (three headline results), then the
// optional details, quote and gallery, and a CTA into the contact form preset
// to the study's pillar and solution.
export function CaseStudyPage({ study, pillar }: { study: CaseStudy; pillar: PillarConfig }) {
  const source = study.solution ? `${pillar.slug}-${study.solution}` : pillar.slug;

  return (
    <>
      {/* Sits behind the transparent pillar header, like the Experiential
          hero; id="hero" switches the header to its white theme over it. */}
      <section
        id="hero"
        className="relative -mt-[var(--pillar-header-height)] flex min-h-[520px] w-full items-end overflow-hidden bg-near-black md:min-h-[640px]"
      >
        <Image src={study.image.src} alt={study.image.alt} fill priority sizes="100vw" className="object-cover" />
        {study.video && <HeroVideo src={study.video} />}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/60 to-near-black/20"
        />
        <Container className="relative grid grid-cols-12 gap-x-6 pt-[calc(var(--pillar-header-height)+48px)] pb-16 md:pb-20">
          <div className={`${FRAME} flex flex-col items-start gap-4`}>
            <Eyebrow>Case study</Eyebrow>
            <h1 className="header-1 max-w-[900px] text-white max-md:text-[34px]! max-md:leading-[42px]!">
              {study.client} {study.title}
            </h1>
            <p className="max-w-[640px] text-lg leading-7 text-white/80">{study.summary}</p>
          </div>
        </Container>
      </section>

      <section className={`w-full bg-white text-black ${SECTION_PADDING}`}>
        <Container className="grid grid-cols-12 gap-x-6">
          <div className={`${FRAME} flex flex-col gap-14`}>
            <div className={STORY_ROW}>
              <h2 className={SECTION_HEADING}>the problem</h2>
              <p className="max-w-[820px] text-xl leading-8 md:text-2xl md:leading-9">{study.problem}</p>
            </div>
            <div className={`${STORY_ROW} border-t border-light-grey pt-14`}>
              <h2 className={SECTION_HEADING}>our approach</h2>
              <div className="flex max-w-[820px] flex-col gap-4">
                {study.approach.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {study.results.length > 0 && (
        <section className={`w-full bg-off-white text-black ${SECTION_PADDING}`}>
          <Container className="grid grid-cols-12 gap-x-6">
            <div className={`${FRAME} flex flex-col gap-10 md:gap-12`}>
              <h2 className={SECTION_HEADING}>the outcome</h2>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
                {study.results.map((result) => (
                  <li key={result.label} className="flex flex-col gap-3 border-t-2 border-cerulean pt-6">
                    <CountUp
                      value={result.value}
                      className="font-display text-[64px] leading-none font-light tracking-[-0.02em] text-cerulean italic md:text-[88px]"
                    />
                    <p className="max-w-[280px] text-base leading-6 text-slate">{result.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {(study.details || study.quote) && (
        <section className={`w-full bg-white text-black ${SECTION_PADDING}`}>
          <Container className="grid grid-cols-12 gap-x-6">
            <div className={`${FRAME} flex flex-col gap-16`}>
              {study.details && (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-light-grey py-8 md:grid-cols-4">
                  {study.details.map((detail) => (
                    <div key={detail.label} className="flex flex-col gap-1">
                      <dt className="text-xs font-bold tracking-[0.6px] text-slate uppercase">
                        {detail.label}
                      </dt>
                      <dd className="text-lg leading-7 font-bold">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {study.quote && (
                <figure className="flex max-w-[1000px] flex-col gap-6">
                  <blockquote className="font-display text-[32px] leading-[1.2] font-light tracking-[-0.01em] italic md:text-[44px]">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="text-base leading-6 text-slate">
                    <span className="font-bold">{study.quote.name}</span>, {study.quote.role}
                  </figcaption>
                </figure>
              )}
            </div>
          </Container>
        </section>
      )}

      {study.gallery && study.gallery.length > 0 && (
        <section className={`w-full bg-white text-black ${SECTION_PADDING}`}>
          <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {study.gallery.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </Container>
        </section>
      )}

      <section className="w-full bg-medium-blue pt-20 pb-24 md:pt-24 md:pb-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="header-2 text-white max-md:text-[28px]! max-md:leading-9!">let&rsquo;s talk</h2>
          <p className="mt-4 max-w-[518px] text-base leading-relaxed text-white/80">
            Tell us what you&rsquo;re planning, and we&rsquo;ll show you what it takes to deliver
            results like these.
          </p>
          <Button href={`/contact?source=${source}`} variant="outline-light" className="mt-8">
            {pillar.ctaLabel}
          </Button>
        </Container>
      </section>
    </>
  );
}
