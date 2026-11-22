import { notFound } from "next/navigation";
import { getPillar, pillars } from "@/lib/pillars";
import { SiteHeader } from "@/components/layout/SiteHeader";

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
  if (!getPillar(slug)) notFound();

  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
}
