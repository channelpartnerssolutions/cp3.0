import { notFound } from "next/navigation";
import { getPillar, pillars } from "@/lib/pillars";
import { PillarHeader } from "@/components/layout/PillarHeader";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export default async function PillarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <div>
      <PillarHeader pillar={pillar} />
      {children}
    </div>
  );
}
