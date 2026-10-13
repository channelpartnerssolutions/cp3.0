import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { getPillar } from "@/lib/pillars";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ pillar: study.pillar, slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[pillar]/case-studies/[slug]">): Promise<Metadata> {
  const { pillar, slug } = await params;
  const study = getCaseStudy(pillar, slug);
  if (!study) return {};
  return { title: `${study.client} ${study.title}`, description: study.summary };
}

export default async function CaseStudyRoute({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar: pillarSlug, slug } = await params;
  const pillar = getPillar(pillarSlug);
  // Matches on pillar too, so a study only lives under its own pillar's URL.
  const study = getCaseStudy(pillarSlug, slug);
  if (!pillar || !study) notFound();

  return <CaseStudyPage study={study} pillar={pillar} />;
}
