import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { caseStudiesFor } from "@/lib/case-studies";
import { getPillar } from "@/lib/pillars";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const pillar = getPillar((await params).pillar);
  if (!pillar) return {};
  return {
    title: `${pillar.label} Case Studies`,
    description: `${pillar.label} case studies from Channel Partners.`,
  };
}

// Lists the pillar's entries from src/lib/case-studies.ts; new entries show up
// here automatically.
export default async function CaseStudiesIndex({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const pillar = getPillar((await params).pillar);
  if (!pillar) notFound();
  const studies = caseStudiesFor(pillar.slug);

  return (
    <section className="w-full bg-white pt-16 pb-24 md:pt-24">
      <Container className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 flex flex-col gap-12 min-[1610px]:col-span-10 min-[1610px]:col-start-2">
          <div className="flex flex-col items-start gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.6px] text-middle-grey">
              {pillar.label}
            </p>
            <h1 className="header-1 text-black">case studies</h1>
          </div>

          {studies.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/${pillar.slug}/case-studies/${study.slug}`}
                    className="group flex flex-col gap-4"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                      <Image
                        src={study.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-bold uppercase tracking-[0.6px] text-middle-grey">
                        {study.client}
                      </p>
                      <h2 className="header-6 text-black group-hover:text-cerulean">{study.title}</h2>
                      <p className="text-base leading-6 text-black">{study.summary}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-[560px] text-lg leading-7 text-black">
                {pillar.label} case studies are coming soon. In the meantime, tell us about
                your project and we&rsquo;ll share relevant work.
              </p>
              <Button href={`/contact?source=${pillar.slug}`} variant="primary">
                {pillar.ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
