import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillar } from "@/lib/pillars";
import { StubPage } from "@/components/ui/StubPage";
import { ExperientialHome } from "@/components/experiential/ExperientialHome";

// TODO(content): final page descriptions
export async function generateMetadata({ params }: PageProps<"/[pillar]">): Promise<Metadata> {
  const pillar = getPillar((await params).pillar);
  if (!pillar) return {};
  return { title: pillar.label, description: `${pillar.label} from Channel Partners.` };
}

export default async function PillarHomePage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  if (pillar.slug === "experiential-marketing") {
    return <ExperientialHome pillar={pillar} />;
  }

  return (
    <StubPage
      title={pillar.label}
      description="Pillar homepage — intro, capabilities, and inline case studies section. Placeholder for this pass."
    />
  );
}
