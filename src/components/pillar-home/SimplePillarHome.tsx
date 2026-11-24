import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Media } from "@/components/experiential/solutions/Media";
import { PillarFinalCta } from "@/components/pillar-home/PillarFinalCta";
import { PillarHero } from "@/components/pillar-home/PillarHero";
import { PillarTeamSections } from "@/components/team/PillarTeamSections";
import { Container } from "@/components/ui/Container";
import { WithPlaceholders } from "@/components/ui/ContentPlaceholder";
import { CountUp } from "@/components/ui/CountUp";
import { FadeIn } from "@/components/ui/FadeIn";
import type { ExperientialImage } from "@/lib/experiential-solutions";
import type { PillarConfig } from "@/lib/pillars";
import { getTeam } from "@/lib/teams";

export type SimplePillarContent = {
  hero: { title: string; image: ExperientialImage };
  intro: { heading: [string, string]; body: string; stats?: { value: string; label: string }[] };
  work: { title: string; image: string; value?: string; label?: string; href?: string }[];
  clients: {
    heading: string;
    logos: { name: string; src?: string; w: number; h: number }[];
    credentials?: { href: string; retailer: string; label: string; image: ExperientialImage }[];
  };
  solutions: {
    heading: [string, string];
    lines?: Record<string, string>;
    images: Record<string, ExperientialImage>;
    note?: ReactNode;
  };
  insights: { heading: string; intro: string; posts: { slug: string; title: string; author: string; image: string }[] };
  cta: { heading: string; body: string; ctaLabel: string };
};

const SECTION = "w-full pt-20 pb-24 md:pt-24 md:pb-28";
const H2 = "header-2 max-w-[900px] text-black";

// A plain, stacked pillar home (hero, intro and stats, featured work, team,
// clients, solutions, insights, CTA): one column of headings over simple
// grids. A neutral starting point for Retail Execution and Construction &
// Logistics, to be designed further in Figma.
export function SimplePillarHome({ pillar, content }: { pillar: PillarConfig; content: SimplePillarContent }) {
  const team = getTeam(pillar.slug);
  const { hero, intro, work, clients, solutions, insights, cta } = content;

  return (
    <div className="relative bg-white">
      <PillarHero id="hero" title={hero.title} image={hero.image} />

      {/* Intro and stats */}
      <section className={`${SECTION} bg-white`}>
        <Container className="flex flex-col items-center gap-16 text-center">
          <FadeIn>
            <div className="flex flex-col items-center gap-8">
              <h2 className={H2}>
                <span className="block">{intro.heading[0]}</span>
                <span className="block text-cerulean">{intro.heading[1]}</span>
              </h2>
              <p className="max-w-[720px] text-lg leading-relaxed text-slate">
                <WithPlaceholders text={intro.body} />
              </p>
            </div>
          </FadeIn>
          {intro.stats && (
            <dl className="grid w-full grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {intro.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-3">
                  <dt className="order-last text-base leading-6 text-slate">{stat.label}</dt>
                  <dd className="font-display text-5xl text-black italic md:text-6xl">
                    {stat.value.includes("[") ? <WithPlaceholders text={stat.value} /> : <CountUp value={stat.value} />}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </section>

      {/* Featured work */}
      <section className={`${SECTION} bg-off-white`}>
        <Container className="flex flex-col gap-10">
          <h2 className={H2}>Featured work</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {work.map((item) => {
              const card = (
                <>
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <h3 className="header-5 text-black">{item.title}</h3>
                  {item.value && <p className="font-display text-5xl leading-none text-cerulean italic">{item.value}</p>}
                  {/* TODO(content): results for the cards without one. */}
                  {item.label && <p className="text-base leading-relaxed text-slate">{item.label}</p>}
                </>
              );
              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href} className="flex flex-col gap-4 hover:opacity-90">
                      {card}
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-4">{card}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {team && <PillarTeamSections team={team} pillar={pillar} />}

      {/* Clients */}
      <section className={`${SECTION} border-t border-mist bg-white`}>
        <Container className="flex flex-col gap-12">
          <h2 className={H2}>{clients.heading}</h2>
          <ul className="flex flex-wrap items-center gap-x-14 gap-y-8">
            {clients.logos.map((logo) => (
              <li key={logo.name}>
                {logo.src ? (
                  <span className="relative block" style={{ width: logo.w, height: logo.h }}>
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" />
                  </span>
                ) : (
                  // TODO(content): logo file.
                  <span className="text-lg font-bold tracking-[0.06em] text-middle-grey uppercase">{logo.name}</span>
                )}
              </li>
            ))}
          </ul>
          {clients.credentials && (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {clients.credentials.map((credential) => (
                <li key={credential.href}>
                  <Link href={credential.href} className="flex flex-col gap-4 hover:opacity-90">
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                      <Image src={credential.image.src} alt={credential.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <h3 className="header-5 text-black">
                      {credential.retailer} {credential.label}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Solutions */}
      <section className={`${SECTION} bg-off-white`}>
        <Container className="flex flex-col gap-12">
          <h2 className={H2}>
            <span className="block">{solutions.heading[0]}</span>
            <span className="block text-cerulean">{solutions.heading[1]}</span>
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillar.solutions.map((solution) => (
              <li key={solution.slug}>
                <Link href={`/${pillar.slug}/solutions/${solution.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Media image={solutions.images[solution.slug]} label={solution.label} sizes="(min-width: 1024px) 25vw, 50vw" />
                  </div>
                  <h3 className="header-6 text-black group-hover:text-cerulean">{solution.label}</h3>
                  {solutions.lines?.[solution.slug] && (
                    <p className="text-base leading-relaxed text-slate">{solutions.lines[solution.slug]}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          {solutions.note && <p className="max-w-[760px] text-base leading-relaxed text-slate">{solutions.note}</p>}
        </Container>
      </section>

      {/* Insights */}
      <section className={`${SECTION} bg-white`}>
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className={H2}>{insights.heading}</h2>
            <p className="max-w-[640px] text-lg leading-relaxed text-slate">{insights.intro}</p>
          </div>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {insights.posts.map((post) => (
              <li key={post.slug} className="flex flex-col gap-4">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                  <Image src={post.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <h3 className="header-5 text-black">{post.title}</h3>
                <p className="text-sm text-slate italic">
                  By <WithPlaceholders text={post.author} />
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PillarFinalCta heading={cta.heading} body={cta.body} cta={{ href: `/contact?source=${pillar.slug}`, label: cta.ctaLabel }} />
    </div>
  );
}
