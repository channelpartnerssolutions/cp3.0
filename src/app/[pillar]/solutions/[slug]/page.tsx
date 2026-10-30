import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar, pillars } from "@/lib/pillars";
import { getExperientialSolution } from "@/lib/experiential-solutions";
import { getSolutionContent } from "@/lib/solutions";
import { ExperientialSolutionPage } from "@/components/experiential/solutions/ExperientialSolutionPage";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { StubPage } from "@/components/ui/StubPage";

export function generateStaticParams() {
  return pillars.flatMap((p) => p.solutions.map((s) => ({ pillar: p.slug, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[pillar]/solutions/[slug]">): Promise<Metadata> {
  const { pillar: pillarSlug, slug } = await params;
  const pillar = getPillar(pillarSlug);
  const solution = pillar?.solutions.find((s) => s.slug === slug);
  if (!pillar || !solution) return {};
  const content = getExperientialSolution(pillar.slug, slug) ?? getSolutionContent(pillar.slug, slug);
  if (content) return content.meta;
  // TODO(content): final page descriptions for solutions without content yet
  return { title: solution.label, description: `${solution.label} from Channel Partners ${pillar.label}.` };
}

export default async function SolutionRoute({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar: pillarSlug, slug } = await params;
  const pillar = getPillar(pillarSlug);
  const solution = pillar?.solutions.find((s) => s.slug === slug);
  if (!pillar || !solution) notFound();

  const experiential = getExperientialSolution(pillar.slug, slug);
  if (experiential) return <ExperientialSolutionPage content={experiential} pillar={pillar} />;

  const content = getSolutionContent(pillar.slug, slug);
  if (content) return <SolutionPage content={content} pillar={pillar} />;

  return (
    <StubPage
      title={solution.label}
      description={`${pillar.label} solution page — placeholder for this pass.`}
    />
  );
}
