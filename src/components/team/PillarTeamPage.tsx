import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Media } from "@/components/experiential/solutions/Media";
import { caseStudyHref, getCaseStudy } from "@/lib/case-studies";
import type { PillarConfig } from "@/lib/pillars";
import type { PillarTeam, TeamLeader } from "@/lib/teams";

// Body colors for each pillar `surface`, as on the case study pages.
const SURFACES = {
  light: { section: "bg-white text-black", muted: "text-slate", rule: "border-light-grey" },
  dark: { section: "bg-near-black text-white", muted: "text-white/75", rule: "border-white/15" },
} as const;

// Leader portraits match the corporate leadership grid's 3:4 headshots; team
// headshots are squares.
const PORTRAIT = "relative aspect-[3/4] w-full overflow-hidden rounded-lg";
const HEADSHOT = "relative aspect-square w-full overflow-hidden rounded-lg";

// A pillar's Meet the Team page, modeled on the corporate Who We Are
// leadership grid: a dark intro, editorial profiles for the leaders, then a
// grid of the rest of the team.
export function PillarTeamPage({ team, pillar }: { team: PillarTeam; pillar: PillarConfig }) {
  const surface = SURFACES[pillar.surface];
  // Leaders always sit on white, even on dark pillars.
  const leadersSurface = SURFACES.light;

  return (
    <>
      {/* Sits behind the transparent pillar header; id="hero" switches the
          header to its white theme over it. Same build as the case study
          hero: a full-bleed photo with the copy over a dark fade at the
          bottom. */}
      <section
        id="hero"
        className="relative -mt-[var(--pillar-header-height)] flex min-h-[520px] w-full items-end overflow-hidden bg-dark-blue text-white md:min-h-[640px]"
      >
        {team.heroImage ? (
          <Image src={team.heroImage.src} alt={team.heroImage.alt} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <p className="absolute top-[calc(var(--pillar-header-height)+24px)] right-[var(--grid-margin)] text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase md:right-[var(--grid-margin-md)]">
            Background photo needed
          </p>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/60 to-near-black/20"
        />
        <Container className="relative flex flex-col items-start gap-4 pt-[calc(var(--pillar-header-height)+48px)] pb-16 md:pb-20">
          <Eyebrow>Our people</Eyebrow>
          <h1 className="header-1 max-md:text-[34px]! max-md:leading-[42px]!">meet the team</h1>
          <p className="max-w-[690px] text-lg leading-7 text-white/80 md:text-2xl md:leading-8">{team.intro}</p>
        </Container>
      </section>

      <section className={`w-full ${leadersSurface.section} pt-20 pb-24 md:pt-28 md:pb-32`}>
        <Container className="flex flex-col gap-12 md:gap-16">
          {team.leadersHeading && (
            <div className="flex flex-col gap-4">
              <h2 className="header-2 max-md:text-[28px]! max-md:leading-9!">{team.leadersHeading}</h2>
              {team.leadersIntro && (
                <p className={`max-w-[760px] text-lg leading-7 md:text-xl md:leading-8 ${leadersSurface.muted}`}>
                  {team.leadersIntro}
                </p>
              )}
            </div>
          )}
          <FadeIn>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-3">
              {team.leaders.map((leader) => (
                <li key={leader.name}>
                  <LeaderProfile leader={leader} pillar={pillar.slug} surface={leadersSurface} />
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      {team.members.length > 0 && (
        <section
          className={`w-full ${surface.section} pt-20 pb-24 md:pt-24 md:pb-32 ${
            // Last section above the near-black footer.
            pillar.surface === "dark" ? `border-t border-b ${surface.rule}` : `border-t ${surface.rule}`
          }`}
        >
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="header-2 max-md:text-[28px]! max-md:leading-9!">{team.membersHeading ?? "The team"}</h2>
              {team.membersIntro && (
                <p className={`max-w-[760px] text-lg leading-7 md:text-xl md:leading-8 ${surface.muted}`}>
                  {team.membersIntro}
                </p>
              )}
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {team.members.map((member) => (
                <li key={member.name} className="flex flex-col gap-3">
                  <div className={HEADSHOT}>
                    <Media image={member.image} label={member.name} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm leading-5 font-bold tracking-[0.12em] uppercase">{member.name}</h3>
                    <p className={`text-sm leading-5 ${surface.muted}`}>{member.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}

// One column of three: portrait, name and title, their point of view, the
// projects they led and LinkedIn.
function LeaderProfile({
  leader,
  pillar,
  surface,
}: {
  leader: TeamLeader;
  pillar: string;
  surface: (typeof SURFACES)[keyof typeof SURFACES];
}) {
  const firstName = leader.name.split(" ")[0];

  return (
    <article className="flex flex-col items-start gap-6">
      <div className={PORTRAIT}>
        <Media image={leader.image} label={leader.name} sizes="(min-width: 768px) 33vw, 100vw" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="header-4 max-md:text-[20px]! max-md:leading-7!">{leader.name}</h3>
        <p className={`text-base leading-6 ${surface.muted}`}>{leader.title}</p>
      </div>
      <blockquote className="font-display text-[22px] leading-[1.35] font-light tracking-[-0.01em] italic md:text-2xl">
        &ldquo;{leader.pov}&rdquo;
      </blockquote>
      {leader.projects && leader.projects.length > 0 && (
        <div className={`flex w-full flex-col gap-3 border-t pt-6 ${surface.rule}`}>
          <p className="text-xs font-bold tracking-[0.6px] text-cerulean uppercase">Projects {firstName} led</p>
          <ul className="flex flex-col gap-2">
            {leader.projects.map((project) => {
              const study = project.caseStudy ? getCaseStudy(pillar, project.caseStudy) : undefined;
              return (
                <li key={project.label} className="text-base leading-6">
                  {study ? (
                    <Link href={caseStudyHref(study)} className="group font-bold transition-colors hover:text-cerulean">
                      {project.label}
                      <span aria-hidden className="ml-1.5 inline-block text-cerulean transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ) : (
                    project.label
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {leader.linkedIn && (
        <a
          href={leader.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="font-heading text-sm tracking-[0.18em] text-cerulean uppercase underline underline-offset-2"
        >
          {firstName}&rsquo;s linkedin
        </a>
      )}
    </article>
  );
}
