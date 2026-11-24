import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PillarFinalCta } from "@/components/pillar-home/PillarFinalCta";
import { PillarHero } from "@/components/pillar-home/PillarHero";
import { SolutionFaqs } from "@/components/solutions/SolutionFaqs";
import { PillarTeamSections } from "@/components/team/PillarTeamSections";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { caseStudyHref, getCaseStudyBySlug, headlineResult, type CaseStudy } from "@/lib/case-studies";
import type { PillarConfig } from "@/lib/pillars";
import { getTeam } from "@/lib/teams";
import { titleCase } from "@/lib/title-case";
import {
  trainingAudiences,
  trainingCapabilities,
  trainingCta,
  trainingFaqs,
  trainingGovernance,
  trainingHero,
  trainingIntro,
  trainingPrograms,
} from "@/lib/training-home";

// Italic Superior Title accent inside an uppercase headline.
const ACCENT = "font-display text-[1.3em] leading-[0.8] font-light tracking-[-0.02em] text-cerulean normal-case italic";

// Same content flow as the other pillar homes (hero, intro, featured work,
// team, clients, solutions, insights, CTA) in its own light, structured
// look: intro with the big stats, the programs (full case studies), the
// team, who we work with and client logos, capabilities, the dark
// instructor governance band in the point-of-view slot, FAQs and the blue
// closing CTA. Copy lives in lib/training-home.ts.
export function TrainingHome({ pillar }: { pillar: PillarConfig }) {
  const team = getTeam(pillar.slug);
  const contact = `/contact?source=${pillar.slug}`;
  const programs = trainingPrograms.slugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((study): study is CaseStudy => Boolean(study));

  return (
    <div className="relative bg-white">
      <PillarHero id="hero" title={trainingHero.title} image={trainingHero.image} />

      {/* Intro and the big stats, laid out like the About and Careers stats. */}
      <section className="w-full bg-white pt-20 pb-16 md:pt-28 md:pb-20">
        <Container className="flex flex-col items-center gap-16 text-center md:gap-20">
          <FadeIn>
            <div className="flex flex-col items-center gap-8">
              <h2 className="header-2 max-w-[900px] text-black">
                {trainingIntro.heading} <span className={ACCENT}>{titleCase(trainingIntro.accent)}</span>
              </h2>
              <p className="max-w-[680px] text-lg leading-relaxed text-slate">{trainingIntro.body}</p>
            </div>
          </FadeIn>
          <dl className="flex w-full flex-wrap items-start justify-center gap-x-16 gap-y-10">
            {trainingIntro.stats.map((stat) => (
              <div key={stat.label} className="flex w-[240px] flex-col items-center gap-6">
                <dt className="order-last text-2xl leading-7 text-black">{stat.label}</dt>
                <dd>
                  <CountUp value={stat.value} className="font-display text-6xl text-black italic md:text-8xl" />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Programs: previews of the full case studies */}
      <FadeIn>
        <section className="w-full bg-medium-blue pt-20 pb-24 md:pt-24 md:pb-28">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="header-6 text-white/70 max-md:text-[14px]! max-md:leading-5!">{trainingPrograms.eyebrow}</p>
              <h2 className="header-2 max-w-[900px] text-white">{trainingPrograms.heading}</h2>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
              {programs.map((study) => (
                <li key={study.slug}>
                  <ProgramCard study={study} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </FadeIn>

      {team && <PillarTeamSections team={team} pillar={pillar} />}

      {/* Who we work with */}
      <FadeIn>
        <section className="w-full border-t border-light-grey bg-white pt-20 pb-24 md:pt-24 md:pb-28">
          <Container className="flex flex-col gap-12">
            <h2 className="header-3 mx-auto max-w-[900px] text-center text-black max-md:text-[24px]! max-md:leading-8!">
              {trainingAudiences.heading}
            </h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
              {trainingAudiences.logos.map((logo) => (
                <li key={logo.src} className="relative shrink-0" style={{ width: logo.w, height: logo.h }}>
                  <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {trainingAudiences.items.map((audience, i) => (
                <li key={audience.title} className="flex flex-col gap-5">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src={audience.image.src}
                      alt={audience.image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="font-display text-2xl text-cerulean italic">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="header-6 text-black">{audience.title}</h3>
                    <p className="text-base leading-relaxed text-slate">{audience.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </FadeIn>

      {/* Capabilities, after the live page: a label column per track and
          three dark cards, with a fading rule between tracks. */}
      <FadeIn>
        <section className="w-full bg-white pt-20 pb-28">
          <Container className="flex flex-col gap-14 md:gap-16">
            <div className="flex flex-col items-center gap-2 text-center">
              <Eyebrow>{trainingCapabilities.eyebrow}</Eyebrow>
              <h2 className="header-2 max-w-[900px] text-black">
                {trainingCapabilities.heading}{" "}
                <span className={`${ACCENT} block`}>{titleCase(trainingCapabilities.accent)}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-[26px] lg:grid-cols-4">
              {trainingCapabilities.items.map((track, i) => (
                <Fragment key={track.accent}>
                  {i > 0 && (
                    <div
                      aria-hidden
                      className="my-4 h-px bg-[linear-gradient(90deg,transparent_0%,var(--color-dark-blue)_14%,var(--color-dark-blue)_86%,transparent_100%)] lg:col-span-4 lg:mt-[26px] lg:mb-[34px]"
                    />
                  )}
                  <div className="relative flex flex-col pt-10 pb-2 lg:pt-1 lg:pr-[30px] lg:pb-[30px]">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -top-2.5 -left-1.5 font-display text-[90px] leading-none text-cerulean/16 italic lg:-top-[30px] lg:text-[120px]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="header-3 relative mb-5 lg:mt-[61px]">
                      {track.title}
                      <br />
                      <span className={ACCENT}>{track.accent}</span>
                    </h3>
                    <p className="text-[17px] leading-[1.65] text-slate">{track.body}</p>
                  </div>
                  {track.services.map(({ icon: Icon, title, body }) => (
                    <div
                      key={title}
                      className="flex min-h-[260px] flex-col rounded-lg bg-near-black px-[26px] pt-[26px] pb-[30px] text-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(0,73,144,0.24)]"
                    >
                      <Icon aria-hidden strokeWidth={1.6} className="mb-auto size-7 text-white/70" />
                      <h4 className="mt-[22px] mb-[11px] text-lg leading-[1.34] font-bold">{title}</h4>
                      <p className="text-[14.5px] leading-[1.62] text-white/78">{body}</p>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </Container>
        </section>
      </FadeIn>

      {/* Instructor quality and governance */}
      <FadeIn>
        <section className="w-full bg-near-black pt-20 pb-24 md:pt-28 md:pb-32">
          <Container className="flex flex-col gap-14">
            <div className="flex flex-col gap-4">
              <Eyebrow>{trainingGovernance.eyebrow}</Eyebrow>
              <h2 className="header-2 max-w-[860px] text-white">{trainingGovernance.heading}</h2>
              <p className="max-w-[640px] text-lg leading-relaxed text-white/75">{trainingGovernance.body}</p>
            </div>
            <ol className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {trainingGovernance.steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-3 border-t border-white/15 pt-6">
                  <span className="font-display text-2xl text-cerulean italic">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="header-5 text-white">{step.title}</h3>
                  <p className="text-base leading-relaxed text-white/70">{step.body}</p>
                </li>
              ))}
            </ol>
            <Link
              href={`/${pillar.slug}/solutions/${trainingGovernance.solution}`}
              className="group self-start font-heading text-sm tracking-[0.18em] text-cerulean uppercase underline underline-offset-4"
            >
              Instructor sourcing &amp; certification
              <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Container>
        </section>
      </FadeIn>

      <SolutionFaqs faqs={trainingFaqs.items} heading={trainingFaqs.heading} />

      <PillarFinalCta heading={trainingCta.heading} cta={{ href: contact, label: trainingCta.ctaLabel }} />
    </div>
  );
}

// A program teaser on the blue band: photo, client and title, the headline
// result, and a link through to the full case study.
function ProgramCard({ study }: { study: CaseStudy }) {
  const result = headlineResult(study);
  return (
    <Link href={caseStudyHref(study)} className="group flex h-full flex-col gap-6 text-white">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-near-black">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="header-6 text-white/70 max-md:text-[14px]! max-md:leading-5!">{study.client}</p>
        <h3 className="header-5 text-white">{study.title}</h3>
      </div>
      <p className="text-base leading-relaxed text-white/80">{study.summary}</p>
      {result && (
        <div className="flex flex-col gap-1 border-t border-white/25 pt-5">
          <p className="font-display text-[56px] leading-none font-light tracking-[-0.02em] italic">{result.value}</p>
          <p className="header-6 text-[14px]! leading-5! text-white">{result.label}</p>
        </div>
      )}
      <span className="mt-auto text-xs font-bold tracking-[0.6px] uppercase">
        Read the case study
        <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
