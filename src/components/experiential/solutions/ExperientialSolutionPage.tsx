import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import type { AccentHeadline, ExperientialSolutionContent, WorkItem } from "@/lib/experiential-solutions";
import { caseStudyHref, getCaseStudy, headlineResult } from "@/lib/case-studies";
import type { PillarConfig } from "@/lib/pillars";
import { titleCase } from "@/lib/title-case";
import { SolutionFaqs } from "@/components/solutions/SolutionFaqs";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { FormatShowcase } from "./FormatShowcase";
import { Media } from "./Media";

// Headlines use the site's header-* type styles, with the same mobile
// overrides as the retail solution pages.
const H1 = "header-1 max-md:text-[34px]! max-md:leading-[42px]!";
// pre-line honors a "\n" in content as a deliberate line break.
const H2 = "header-2 whitespace-pre-line max-md:text-[28px]! max-md:leading-9!";
const CARD_LABEL = "header-6 max-md:text-[14px]! max-md:leading-5!";
const BIG_NUMBER = "font-display font-light italic tracking-[-0.02em] leading-none";

// The layout every experiential solution page uses (Claude Design: "Brand
// Activations"). Content lives in src/lib/experiential-solutions.ts.
export function ExperientialSolutionPage({
  content,
  pillar,
}: {
  content: ExperientialSolutionContent;
  pillar: PillarConfig;
}) {
  const { hero, work, problem, formats, process, proof, whyUs, faqs, cta } = content;
  const contactHref = `/contact?source=${pillar.slug}-${content.slug}`;
  const [featured, ...moreWork] = work.items;

  return (
    <>
      {/* Sits behind the transparent pillar header; id="hero" switches the
          header to its white theme over it. */}
      <section
        id="hero"
        className="relative -mt-[var(--pillar-header-height)] flex min-h-[640px] flex-col overflow-hidden bg-near-black text-white md:min-h-screen"
      >
        {hero.video && <HeroVideo src={hero.video} />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(18_30_35/0.6)_0%,rgb(18_30_35/0.4)_40%,rgb(18_30_35/0.92)_100%)]" />
        <Container className="relative z-10 flex flex-1 flex-col justify-end pt-[calc(var(--pillar-header-height)+48px)] pb-12 md:pb-24">
          <Eyebrow className="mb-4">{hero.eyebrow}</Eyebrow>
          <h1 className={`${H1} max-w-[900px]`}>
            <Accented headline={hero} accentClassName="text-cerulean" />
          </h1>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-10">
            <p className="max-w-[690px] text-lg leading-7 text-white/80 md:text-2xl md:leading-8">{hero.body}</p>
            <div className="flex flex-wrap items-center gap-8">
              <Button href={contactHref} className="px-7! py-4! text-sm!">
                {hero.ctaLabel}
              </Button>
              <a
                href="#work"
                className="flex items-center gap-3 text-sm font-bold tracking-[0.05em] text-white uppercase transition-opacity hover:opacity-75"
              >
                <span aria-hidden className="grid size-11 place-items-center rounded-full border-2 border-white">
                  ↓
                </span>
                See the work
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="work" className="scroll-mt-[var(--pillar-header-height)] bg-near-black pt-16 pb-20 text-white md:pt-24 md:pb-32">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${H2} max-w-[840px]`}>{work.heading}</h2>
            <Link
              href={`/${pillar.slug}/case-studies`}
              className="border-b border-cerulean pb-1.5 text-sm font-bold tracking-[0.05em] text-white uppercase transition-colors hover:text-cerulean"
            >
              See all work →
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            {featured && (
              <WorkCard item={featured} className="lg:w-[73%]" featured />
            )}
            {moreWork.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:pl-[17%]">
                {moreWork.map((item) => (
                  <WorkCard key={item.title} item={item} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white pt-20 pb-24 md:pt-32 md:pb-40">
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-10 lg:w-2/3">
              <h2 className={`${H2} text-black`}>{problem.heading}</h2>
              <div className="flex flex-col gap-6">
                {problem.body.map((paragraph) => (
                  <p key={paragraph} className="text-[17px] leading-[1.6] text-black md:text-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-near-black pt-20 pb-24 text-white md:pt-24 md:pb-32">
        <Container>
          <div className="mb-14 flex flex-col gap-4 md:mb-16">
            <Eyebrow>{formats.eyebrow}</Eyebrow>
            <h2 className={`${H2} text-white`}>
              <span className="block">{formats.heading}</span>
              {formats.accent && <span className="block text-cerulean">{formats.accent}</span>}
            </h2>
          </div>
          <FormatShowcase items={formats.items} contactHref={contactHref} />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-light-grey pt-16 pb-20 md:pt-24 md:pb-32">
        {/* Outlined background words, like the experiential home page's
            "Experiential / Activations" watermark. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <span className="absolute -top-[2%] -left-4 font-heading text-[16.5vw] leading-none tracking-[0.05em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgb(18_30_35/0.1)]">
            Ideation
          </span>
          <span className="absolute -right-4 -bottom-[4%] font-heading text-[16.5vw] leading-none tracking-[0.05em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgb(18_30_35/0.1)]">
            Execution
          </span>
        </div>
        <Container className="relative">
          <h2 className={`${H2} mb-14 text-black`}>{process.heading}</h2>
          {/* A timeline rather than photos: solid numerals over a cerulean
              rail with an icon ring per step, across on desktop and down the
              left on mobile. On desktop each step is a subgrid row set, so
              titles of any length still leave every paragraph starting on
              the same line. */}
          <ol className="grid grid-cols-1 gap-y-12 lg:grid-cols-5 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-6 lg:gap-y-0">
            {process.steps.map(({ icon: Icon, ...step }, i) => {
              const last = i === process.steps.length - 1;
              return (
                <li key={step.title} className="relative pl-[72px] lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:pl-0">
                  {!last && (
                    <span aria-hidden className="absolute top-12 -bottom-12 left-[23px] w-px bg-cerulean/30 lg:hidden" />
                  )}
                  <span className="block font-display text-[64px] leading-[60px] font-light tracking-[-0.02em] text-cerulean italic lg:text-[88px] lg:leading-[80px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="absolute top-0 left-0 flex items-center lg:relative lg:my-8">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cerulean bg-light-grey text-cerulean">
                      <Icon strokeWidth={1.5} className="size-[22px]" />
                    </span>
                    {!last && <span className="-mr-6 hidden h-px flex-1 bg-cerulean/30 lg:block" />}
                  </span>
                  <h3 className="header-5 mt-4 text-near-black lg:mt-0 lg:pb-4">{step.title}</h3>
                  <p className="mt-3 text-base leading-6 text-slate lg:mt-0">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="bg-near-black pt-20 pb-24 text-white md:pt-28 md:pb-36">
        <Container>
          {proof.stats.length >= 3 && (
            <ul className="mb-16 grid grid-cols-1 border-y border-white/20 md:mb-28 md:grid-cols-3">
              {proof.stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-col gap-3.5 py-10 max-md:not-first:border-t md:px-8 md:not-first:border-l md:first:pl-0 border-white/20"
                >
                  {/* One size for every value, small enough that wordy ones
                      ("Award-winning") still fit a third of the row. */}
                  <p className={`${BIG_NUMBER} text-[48px] leading-[1.05] xl:text-[64px]`}>{stat.value}</p>
                  <p className="max-w-[320px] text-base leading-6 text-white/85">{stat.label}</p>
                </li>
              ))}
            </ul>
          )}
          <CaseStudyPanel pillar={content.pillar} slug={proof.caseStudy} />
        </Container>
      </section>

      <section className="bg-[#0e181c] pt-20 pb-24 text-white md:pt-28 md:pb-36">
        <Container>
          <Eyebrow className="mb-4">{whyUs.eyebrow}</Eyebrow>
          <h2 className={`${H2} mb-12 max-w-[1100px]`}>
            <Accented headline={whyUs} accentClassName="text-cerulean" />
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3">
            {whyUs.items.map(({ icon: Icon, ...item }) => (
              <li key={item.title} className="flex flex-col gap-4">
                <Icon aria-hidden strokeWidth={1.25} className="mb-2 size-14 text-cerulean" />
                <h3 className="header-5 text-white">{item.title}</h3>
                <p className="text-base leading-6 text-white/80">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {faqs.length > 0 && <SolutionFaqs faqs={faqs} />}

      {/* Same near-black as the footer below, so a rule separates the two. */}
      <section className="border-b border-white/15 bg-near-black pt-20 pb-24 text-white md:pt-36 md:pb-44">
        <Container className="flex flex-col gap-9">
          <h2 className={`${H1} max-w-[1000px]`}>
            <Accented headline={cta} accentClassName="text-cerulean" />
          </h2>
          <p className="max-w-[640px] text-lg leading-7 text-white md:text-2xl md:leading-8">{cta.body}</p>
          <div className="flex flex-wrap items-center gap-7">
            <Button href={contactHref} className="px-7! py-4! text-sm!">
              {hero.ctaLabel}
            </Button>
            {cta.note && <p className="text-sm text-white/80">{cta.note}</p>}
          </div>
        </Container>
      </section>
    </>
  );
}

// Headline with its `accent` set in italic Superior Title, a size up. The
// accent is always title-cased (minor words lowercase), whatever the content says.
function Accented({ headline, accentClassName = "" }: { headline: AccentHeadline; accentClassName?: string }) {
  return (
    <>
      {headline.title}
      {headline.accent && (
        <>
          {" "}
          <span
            className={`font-display text-[1.3em] leading-[0.8] font-light tracking-[-0.02em] normal-case italic ${accentClassName}`}
          >
            {titleCase(headline.accent, { startsHeadline: !headline.title })}
          </span>
        </>
      )}
      {headline.after && ` ${headline.after}`}
    </>
  );
}

function WorkCard({ item, className = "", featured = false }: { item: WorkItem; className?: string; featured?: boolean }) {
  const card = (
    <>
      <Media image={item.image} label={`${item.client}, ${item.title}`} labelAtTop sizes={featured ? "(min-width: 1024px) 73vw, 100vw" : "(min-width: 768px) 40vw, 100vw"} />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-near-black/0 to-near-black/90 ${
          featured ? "top-[40%]" : "top-[30%]"
        }`}
      />
      {featured ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:gap-6 md:p-11">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <p className={`${CARD_LABEL} text-white/70 max-md:text-[12px]! max-md:leading-4!`}>{item.client}</p>
            <h3 className="header-4 text-white max-md:text-[16px]! max-md:leading-6!">{item.title}</h3>
          </div>
          <div className="text-right">
            <p className={`${BIG_NUMBER} text-[44px] text-cerulean md:text-[112px]`}>{item.value}</p>
            <p className={`${CARD_LABEL} mt-2 text-white max-md:text-[12px]! max-md:leading-4!`}>{item.label}</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className={`${BIG_NUMBER} text-[52px] text-cerulean`}>{item.value}</p>
          <p className={`${CARD_LABEL} mt-2 mb-4 text-white max-md:text-[12px]! max-md:leading-4!`}>{item.label}</p>
          <p className="text-sm font-bold tracking-[0.1em] text-white/70 uppercase">{item.client}</p>
          <h3 className="header-5 mt-1 text-white max-md:text-[16px]! max-md:leading-6!">{item.title}</h3>
        </div>
      )}
    </>
  );

  // 3:2, like every case study tile on the site.
  const classes = `relative block aspect-[3/2] w-full overflow-hidden rounded-lg text-white ${className}`;
  return item.href ? (
    <Link href={item.href} className={`${classes} transition-opacity hover:opacity-90`}>
      {card}
    </Link>
  ) : (
    <div className={classes}>{card}</div>
  );
}

// Preview of a case-studies.ts entry: the first paragraph of each part of the
// story and its headline result, linking through to the full page.
function CaseStudyPanel({ pillar, slug }: { pillar: string; slug: string }) {
  const study = getCaseStudy(pillar, slug);
  if (!study) return null;
  const href = caseStudyHref(study);
  const rows = [
    { label: "The problem", text: study.problem },
    { label: "Our approach", text: study.approach[0] },
  ];
  const result = headlineResult(study);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-lg bg-dark-blue lg:grid-cols-2">
      {/* 3:2 when stacked; beside the text it fills the panel's full height. */}
      <div className="relative aspect-[3/2] lg:aspect-auto">
        <Media image={study.image} label={study.title} sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
      <div className="flex flex-col gap-7 p-8 md:p-16">
        <div>
          <Eyebrow className="mb-3">Case study · {study.client}</Eyebrow>
          <h3 className="header-3 max-md:text-[24px]! max-md:leading-8!">
            <Link href={href} className="transition-colors hover:text-cerulean">
              {study.title}
            </Link>
          </h3>
        </div>
        <dl>
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-2 border-t border-white/20 py-4 sm:grid-cols-[140px_1fr] sm:gap-5">
              <dt className="pt-[3px] text-xs font-semibold tracking-[0.15em] text-white/75 uppercase">{row.label}</dt>
              <dd className="text-[15px] leading-[1.55] text-white/90">{row.text}</dd>
            </div>
          ))}
          {result && (
            <div className="grid grid-cols-1 gap-2 border-t border-cerulean pt-5 sm:grid-cols-[140px_1fr] sm:gap-5">
              <dt className="pt-2 text-xs font-semibold tracking-[0.15em] text-cerulean uppercase">The outcome</dt>
              <dd className="flex flex-col gap-1.5">
                <span className={`${BIG_NUMBER} text-[52px] md:text-[80px]`}>{result.value}</span>
                <span className="text-[15px] text-white/90">{result.label}</span>
              </dd>
            </div>
          )}
        </dl>
        <Link
          href={href}
          className="group self-start text-xs font-bold tracking-[0.6px] text-cerulean uppercase transition-colors hover:text-white"
        >
          Read the case study
          <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
