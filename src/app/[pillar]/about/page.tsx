import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/pillars";
import { StubPage } from "@/components/ui/StubPage";

// TODO(content): final page descriptions
export async function generateMetadata({ params }: PageProps<"/[pillar]/about">): Promise<Metadata> {
  const pillar = getPillar((await params).pillar);
  if (!pillar) return {};
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

  return <StubPage title={`${pillar.label} — About`} description="Meet the team. Placeholder for this pass." />;
}
