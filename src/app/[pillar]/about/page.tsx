import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/pillars";
import { getTeam } from "@/lib/teams";
import { PillarTeamPage } from "@/components/team/PillarTeamPage";
import { StubPage } from "@/components/ui/StubPage";

// TODO(content): final page descriptions
export async function generateMetadata({ params }: PageProps<"/[pillar]/about">): Promise<Metadata> {
  const pillar = getPillar((await params).pillar);
  if (!pillar) return {};
  if (getTeam(pillar.slug)) {
    return { title: `Meet the ${pillar.label} Team`, description: `The ${pillar.label} team at Channel Partners.` };
  }
  return { title: `About ${pillar.label}`, description: `Meet the ${pillar.label} team at Channel Partners.` };
}

export default async function PillarAboutPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const team = getTeam(pillar.slug);
  if (team) return <PillarTeamPage team={team} pillar={pillar} />;

  return <StubPage title={`${pillar.label} — About`} description="Meet the team. Placeholder for this pass." />;
}
