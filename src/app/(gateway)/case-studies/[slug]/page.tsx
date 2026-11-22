import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { getPillar } from "@/lib/pillars";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const study = getCaseStudyBySlug((await params).slug);
  if (!study) return {};
  return { title: `${study.client} ${study.title}`, description: study.summary };
}

export default async function CaseStudyRoute({ params }: PageProps<"/case-studies/[slug]">) {
  const study = getCaseStudyBySlug((await params).slug);
  const pillar = study && getPillar(study.pillar);
  if (!study || !pillar) notFound();

  return <CaseStudyPage study={study} pillar={pillar} />;
}
