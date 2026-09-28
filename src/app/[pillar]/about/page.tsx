import { notFound } from "next/navigation";
import { getPillar } from "@/lib/pillars";
import { StubPage } from "@/components/ui/StubPage";

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
