import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatsStrip } from "@/components/ui/StatsStrip";
import type { CaseStudy } from "@/lib/case-studies";
import type { PillarConfig } from "@/lib/pillars";

// The one layout every case study uses: photo header, The Ask / What We Did,
// headline stats, optional gallery, and a CTA into the contact form preset to
// the case study's pillar.
export function CaseStudyPage({ study, pillar }: { study: CaseStudy; pillar: PillarConfig }) {
  return (
    <>
      {/* Sits behind the transparent pillar header, like the Experiential
          hero; id="hero" switches the header to its white theme over it. */}
      <section
        id="hero"
        className="relative -mt-[var(--pillar-header-height)] flex min-h-[520px] w-full items-end overflow-hidden bg-near-black md:min-h-[640px]"
      >
        <Image
          src={study.image.src}
          alt={study.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/60 to-near-black/20"
        />
        <Container className="relative grid grid-cols-12 gap-x-6 pt-[calc(var(--pillar-header-height)+48px)] pb-16 md:pb-20">
          <div className="col-span-12 flex flex-col items-start gap-4 min-[1610px]:col-span-10 min-[1610px]:col-start-2">
            <p className="text-xs font-bold uppercase tracking-[0.6px] text-white/70">
              {pillar.label} · Case Study
            </p>
            <h1 className="header-1 max-w-[900px] text-white">
              {study.client} {study.title}
            </h1>
            <p className="max-w-[640px] text-lg leading-7 text-white/80">{study.summary}</p>
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-20 md:py-24">
        <Container className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 min-[1610px]:col-span-10 min-[1610px]:col-start-2">
            <div className="flex flex-col items-start gap-4">
              <h2 className="header-3 text-black">the ask</h2>
              <p className="text-lg leading-7 text-black">{study.ask}</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h2 className="header-3 text-black">what we did</h2>
              {study.whatWeDid.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-black">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <StatsStrip stats={study.stats} />

      {study.gallery && study.gallery.length > 0 && (
        <section className="w-full bg-white py-20 md:py-24">
          <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {study.gallery.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </Container>
        </section>
      )}

      <section className="w-full bg-medium-blue py-24">
        <Container className="flex flex-col items-center text-center">
          <h2 className="header-2 text-white">let&rsquo;s talk</h2>
          <p className="mt-4 max-w-[518px] text-base leading-relaxed text-white/80">
            Tell us what you&rsquo;re planning, and we&rsquo;ll show you what it takes to deliver
            results like these.
          </p>
          <Button href={`/contact?source=${pillar.slug}`} variant="outline-light" className="mt-8">
            {pillar.ctaLabel}
          </Button>
        </Container>
      </section>
    </>
  );
}
