import Image from "next/image";
import {
  Baby,
  BadgeCheck,
  Bike,
  Boxes,
  BrushCleaning,
  CalendarSync,
  ChartColumn,
  ClipboardCheck,
  Gamepad2,
  Gift,
  Hammer,
  Handshake,
  HardHat,
  LayoutGrid,
  MapPinned,
  Megaphone,
  MonitorPlay,
  PackageCheck,
  PackagePlus,
  PawPrint,
  Presentation,
  RefreshCcw,
  Rocket,
  ScanBarcode,
  Shirt,
  Signpost,
  Sofa,
  Sparkles,
  Sprout,
  SquarePlus,
  Store,
  ToyBrick,
  UserSearch,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SolutionFaqs } from "@/components/solutions/SolutionFaqs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/FadeIn";
import { titleCase } from "@/lib/title-case";
import { retailerContactHref, type RetailerIcon, type RetailerPageContent, type ServiceItem as ServiceItemContent } from "@/lib/retailers";

const ICONS: Record<RetailerIcon, LucideIcon> = {
  baby: Baby,
  toys: ToyBrick,
  home: Sofa,
  beauty: Sparkles,
  electronics: Gamepad2,
  sports: Bike,
  floorcare: BrushCleaning,
  pet: PawPrint,
  garden: Sprout,
  "gift-cards": Gift,
  clothing: Shirt,
  coverage: MapPinned,
  certified: BadgeCheck,
  receiving: Warehouse,
  continuity: CalendarSync,
  pop: Megaphone,
  replenishment: PackagePlus,
  audits: ClipboardCheck,
  "break-fix": Wrench,
  install: Hammer,
  "on-shelf": Boxes,
  signage: Signpost,
  launch: Rocket,
  events: Presentation,
  planogram: LayoutGrid,
  "cut-in": SquarePlus,
  remodel: Store,
  reporting: ChartColumn,
  reset: RefreshCcw,
  construction: HardHat,
  "light-merch": PackageCheck,
  "secret-shopper": UserSearch,
  sales: Handshake,
  pos: ScanBarcode,
  virtual: MonitorPlay,
};

const H2 = "header-2 max-md:text-[28px]! max-md:leading-9!";

// Retailer credential page layout, shared by Best Buy and Target. Borrows the
// solution page's section styles; content lives in src/lib/retailers.ts and
// optional sections are skipped when an entry leaves them out.
export function RetailerPage({ content }: { content: RetailerPageContent }) {
  const { hero, intro, departments, callout, feature, services, engagementModels, process, proof, whyUs, faqs, cta } =
    content;
  const contactHref = retailerContactHref(content);

  return (
    <>
      {/* Pulled up under the transparent gateway header (its spacer would
          otherwise leave a white band); id="hero" switches the header to its
          white theme over it. */}
      <section
        id="hero"
        className="relative -mt-[var(--gateway-header-height)] flex min-h-[600px] w-full items-end bg-near-black md:min-h-[760px]">
        <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-near-black/75" />
        <Container className="relative pt-[calc(var(--gateway-header-height)+48px)] pb-16 md:pb-24">
          <div className="flex max-w-[900px] flex-col items-start gap-4">
            <Eyebrow className="text-white!">{hero.eyebrow}</Eyebrow>
            <h1 className="header-1 max-w-[820px] text-white max-md:text-[34px]! max-md:leading-[42px]!">
              {hero.title}
            </h1>
            <p className="max-w-[690px] text-lg leading-7 text-white/80 md:text-2xl md:leading-8">{hero.body}</p>
            <Button href={contactHref} variant="outline-light" className="mt-4">
              {cta.buttonLabel}
            </Button>
          </div>
        </Container>
      </section>

      <section className="w-full bg-white pt-20 pb-24 md:pt-24 md:pb-28">
        <Container
          className={`grid grid-cols-1 items-center gap-12 ${intro.image ? "lg:grid-cols-[1fr_554px] lg:gap-[72px]" : ""}`}
        >
          <div className="flex flex-col gap-4">
            {intro.eyebrow && <Eyebrow>{intro.eyebrow}</Eyebrow>}
            <h2 className={`${H2} max-w-[840px] text-black`}>{intro.heading}</h2>
            {intro.body.map((paragraph) => (
              <p key={paragraph} className="max-w-[840px] text-base leading-7 text-black md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          {intro.image && (
            <div className="relative aspect-[554/515] w-full overflow-hidden rounded-lg bg-placeholder-grey">
              <Image
                src={intro.image.src}
                alt={intro.image.alt}
                fill
                sizes="(min-width: 1024px) 554px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </Container>
      </section>

      {departments && (
        <section className="w-full bg-[#0e181c] pt-20 pb-24 text-white md:pt-28 md:pb-36">
          <Container>
            <Eyebrow className="mb-4">{departments.eyebrow}</Eyebrow>
            <h2 className={`${H2} mb-12 max-w-[1100px] md:mb-16`}>
              {departments.title}
              {departments.accent && (
                <>
                  {" "}
                  <span className="font-display text-[1.3em] leading-[0.8] font-light tracking-[-0.02em] text-cerulean normal-case italic">
                    {titleCase(departments.accent)}
                  </span>
                </>
              )}
            </h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {departments.items.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.label} className="flex flex-col gap-4">
                    <Icon aria-hidden strokeWidth={1.25} className="mb-2 size-14 text-cerulean" />
                    <h3 className="header-5 text-white">{item.label}</h3>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      {callout && (
        <section className="w-full bg-cerulean pt-14 pb-16 md:pt-16 md:pb-20">
          <Container className="flex flex-col gap-4">
            <p className="header-6 text-white/75">{callout.eyebrow}</p>
            <p className="header-3 max-w-[1100px] text-white max-md:text-[22px]! max-md:leading-8!">
              {callout.text}
            </p>
            {callout.body && <p className="max-w-[760px] text-base leading-7 text-white/85">{callout.body}</p>}
          </Container>
        </section>
      )}

      {feature && (
        <section className="w-full bg-near-black pt-20 pb-24">
          <Container className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>{feature.eyebrow}</Eyebrow>
              <h2 className={`${H2} text-white`}>{feature.heading}</h2>
              <p className="max-w-[760px] text-base leading-7 text-white/80 md:text-lg">{feature.body}</p>
            </div>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {feature.points.map(({ label, icon }) => {
                const Icon = ICONS[icon];
                return (
                  <li key={label} className="flex flex-col gap-4">
                    <Icon aria-hidden strokeWidth={1.25} className="mb-2 size-14 text-cerulean" />
                    <h3 className="header-5 text-white">{label}</h3>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      <section className="w-full border-y border-light-grey bg-off-white pt-20 pb-24">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            {services.eyebrow && <Eyebrow>{services.eyebrow}</Eyebrow>}
            <h2 className={`${H2} max-w-[990px] text-black`}>{services.heading}</h2>
            {services.intro && <p className="max-w-[760px] text-base leading-7 text-black md:text-lg">{services.intro}</p>}
          </div>
          {services.groups.length === 1 && !services.groups[0].title ? (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.groups[0].items.map((item) => (
                <ServiceItem key={typeof item === "string" ? item : item.label} item={item} />
              ))}
            </ul>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {services.groups.map((group) => (
                <FadeIn key={group.title}>
                  <div className="flex h-full flex-col gap-4 rounded-lg border border-mist bg-white p-6 md:p-8">
                    <h3 className="header-5 text-near-black">{group.title}</h3>
                    {group.lead && <p className="text-base leading-6 text-slate">{group.lead}</p>}
                    <ul className="flex flex-col gap-4">
                      {group.items.map((item) => (
                        <ServiceItem key={typeof item === "string" ? item : item.label} item={item} />
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>

      {engagementModels && (
        <section className="w-full bg-near-black pt-20 pb-[102px]">
          <Container className="flex flex-col gap-12">
            <h2 className={`${H2} text-white`}>{engagementModels.heading}</h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {engagementModels.models.map((model) => (
                <li key={model.name} className="flex flex-col gap-6 rounded-lg border border-mist bg-off-white px-6 py-7">
                  <h3 className="header-5 text-black">{model.name}</h3>
                  <dl className="flex flex-col gap-4 text-base leading-6 text-black/80">
                    <dt className="font-bold uppercase">What it is</dt>
                    <dd>{model.whatItIs}</dd>
                    <dt className="font-bold uppercase">When a brand chooses it</dt>
                    <dd>{model.whenToChoose}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {process && (
        <section className="w-full bg-white pt-20 pb-24">
          <Container className="flex flex-col gap-14">
            <div className="flex flex-col gap-4">
              <Eyebrow>{process.eyebrow}</Eyebrow>
              <h2 className={`${H2} text-near-black`}>{process.heading}</h2>
            </div>
            <div className="flex flex-col gap-6">
              <div aria-hidden className="h-px w-full bg-mist" />
              <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
                {process.steps.map((step, i) => (
                  <li key={step.title} className="flex flex-col gap-4">
                    <span className="font-display text-[64px] leading-[60px] font-light tracking-[-0.02em] text-cerulean italic">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="header-5 text-near-black">{step.title}</h3>
                    <p className="text-base leading-6 text-slate">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>
      )}

      {proof && (
        <section className="w-full bg-[#0e181c] pt-20 pb-24 text-white">
          <Container className="flex flex-col items-center gap-14 text-center">
            <h2 className={`${H2} flex flex-col items-center gap-2 text-white`}>
              {proof.callout.title}
              <span className="font-display text-[1.3em] leading-[1] font-light tracking-[-0.02em] text-cerulean normal-case italic">
                {titleCase(proof.callout.accent)}
              </span>
            </h2>
            <ul className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {proof.stats.map((stat) => (
                <li key={stat.label} className="flex flex-col items-center gap-3">
                  {/* Only pure numbers count up; "W-2 & T4" would animate its 2. */}
                  {/^\d/.test(stat.value) ? (
                    <CountUp value={stat.value} className="font-display text-5xl italic md:text-6xl" />
                  ) : (
                    <span className="font-display text-4xl italic md:text-5xl">{stat.value}</span>
                  )}
                  <p className="max-w-[220px] text-base leading-6 text-white/80">{stat.label}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="w-full border-b border-light-grey bg-off-white pt-20 pb-24">
        <Container className="flex flex-col gap-12">
          <h2 className={`${H2} max-w-[990px] text-black`}>{whyUs.heading}</h2>
          <ul className={`grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 ${whyUs.points.length === 3 ? "lg:grid-cols-3" : ""}`}>
            {whyUs.points.map((point) => (
              <li key={point.title} className="flex flex-col gap-4 border-t-2 border-cerulean pt-6">
                <h3 className="header-5 text-near-black">{point.title}</h3>
                <p className="text-base leading-6 text-slate">{point.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>



      {faqs.length > 0 && <SolutionFaqs faqs={faqs} />}

      <section className="w-full bg-medium-blue pt-24 pb-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className={`${H2} max-w-[900px] text-white`}>{cta.heading}</h2>
          <p className="mt-6 max-w-[640px] text-lg leading-7 text-white md:text-2xl md:leading-8">{cta.body}</p>
          <Button href={contactHref} variant="outline-light" className="mt-8">
            {cta.buttonLabel}
          </Button>
          {cta.contact && !cta.contact.hidden && (
            <p className="mt-8 text-base leading-6 text-white/85">
              Or reach {cta.contact.name}, {cta.contact.title}, at{" "}
              <a href={`mailto:${cta.contact.email}`} className="underline underline-offset-2 hover:text-white">
                {cta.contact.email}
              </a>{" "}
              or{" "}
              <a href={`tel:${cta.contact.phone.replace(/\D/g, "")}`} className="underline underline-offset-2 hover:text-white">
                {cta.contact.phone}
              </a>
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

function ServiceItem({ item }: { item: ServiceItemContent }) {
  if (typeof item !== "string") {
    const Icon = ICONS[item.icon];
    return (
      <li className="flex items-center gap-4 text-base leading-6 text-black md:text-lg">
        <Icon aria-hidden strokeWidth={1.5} className="size-8 shrink-0 text-cerulean" />
        {item.label}
      </li>
    );
  }
  return (
    <li className="flex items-start gap-4 text-base leading-6 text-black">
      <span aria-hidden className="flex size-6 shrink-0 items-center justify-center">
        <span className="size-2 rounded-full bg-cerulean" />
      </span>
      {item}
    </li>
  );
}
