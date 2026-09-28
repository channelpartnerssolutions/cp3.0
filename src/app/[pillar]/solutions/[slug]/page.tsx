import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/pillars";
import { StubPage } from "@/components/ui/StubPage";

// TODO(content): final page descriptions
export async function generateMetadata({
  params,
}: PageProps<"/[pillar]/solutions/[slug]">): Promise<Metadata> {
  const { pillar: pillarSlug, slug } = await params;
  const pillar = getPillar(pillarSlug);
  const solution = pillar?.solutions.find((s) => s.slug === slug);
  if (!pillar || !solution) return {};
  return { title: solution.label, description: `${solution.label} from Channel Partners ${pillar.label}.` };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar: pillarSlug, slug } = await params;
  const pillar = getPillar(pillarSlug);
  const solution = pillar?.solutions.find((s) => s.slug === slug);
  if (!pillar || !solution) notFound();

  return (
    <StubPage
      title={solution.label}
      description={`${pillar.label} solution page — placeholder for this pass.`}
    />
  );
}
