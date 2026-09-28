import { notFound } from "next/navigation";
import Link from "next/link";
import { getPillar } from "@/lib/pillars";
import { Container } from "@/components/ui/Container";

export default async function PillarSolutionsPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <Container className="pb-24">
      <h1 className="header-1">{pillar.label} — Solutions</h1>
      <ul className="mt-8 flex flex-col gap-2">
        {pillar.solutions.map((solution) => (
          <li key={solution.slug}>
            <Link
              href={`/${pillar.slug}/solutions/${solution.slug}`}
              className="text-cerulean hover:underline"
            >
              {solution.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
