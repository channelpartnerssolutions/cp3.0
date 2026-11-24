import Link from "next/link";
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

// The "Meet the team" block on a pillar's home page (id="team", which the old
// /<pillar>/about URLs redirect to). Modeled on the corporate Who We Are
// leadership grid: editorial profiles for the leaders, then a grid of the
// rest of the team.
export function PillarTeamSections({ team, pillar }: { team: PillarTeam; pillar: PillarConfig }) {
  const surface = SURFACES[pillar.surface];
  // Leaders always sit on white, even on dark pillars.
  const leadersSurface = SURFACES.light;
  // Without its own heading, the team grid carries on from the leaders.
  const membersSurface = team.membersHeading ? surface : leadersSurface;

  return (
    <div id="team" className="scroll-mt-[var(--header-height)]">
      <section className={`w-full ${leadersSurface.section} pt-20 pb-24 md:pt-28 md:pb-32`}>
        <Container className="flex flex-col gap-12 md:gap-16">
          <h2 className="header-2 max-w-[940px] max-md:text-[28px]! max-md:leading-9!">{team.heading ?? "meet the team"}</h2>
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
          className={`w-full ${membersSurface.section} ${
            team.membersHeading
              ? `border-t pt-20 pb-24 md:pt-24 md:pb-32 ${membersSurface.rule}`
              : "-mt-8 pb-24 md:-mt-12 md:pb-32"
          }`}
        >
          <Container className="flex flex-col gap-12">
            {team.membersHeading && (
              <div className="flex flex-col gap-4">
                <h3 className="header-2 max-md:text-[28px]! max-md:leading-9!">{team.membersHeading}</h3>
                {team.membersIntro && (
                  <p className={`max-w-[760px] text-lg leading-7 md:text-xl md:leading-8 ${membersSurface.muted}`}>
                    {team.membersIntro}
                  </p>
                )}
              </div>
            )}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {team.members.map((member) => (
                <li key={member.name} className="flex flex-col gap-3">
                  <div className={HEADSHOT}>
                    <Media image={member.image} label={member.name} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm leading-5 font-bold tracking-[0.12em] uppercase">{member.name}</h4>
                    <p className={`text-sm leading-5 ${membersSurface.muted}`}>{member.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </div>
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
        <h4 className="header-4 max-md:text-[20px]! max-md:leading-7!">{leader.name}</h4>
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
