import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { FadeIn } from "@/components/ui/FadeIn";
import { getFormatLabel } from "@/lib/experiential-solutions";
import { getRetailerPage } from "@/lib/retailers";
import { titleCase } from "@/lib/title-case";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Channel Partners or find an office near you.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Pillar pages link here with ?source=<pillar> or ?source=<pillar>-<solution>
  // so the form can skip the choices already made (see StartProjectForm).
  // Experiential solution pages can add &format=<slug>, which starts the
  // message with a sentence naming the format the visitor picked. Retailer
  // pages add &retailer=<slug> (kept in the page URL HubSpot records), which
  // does the same for the retailer.
  const { source, format, retailer } = await searchParams;
  const sourceValue = typeof source === "string" ? source : undefined;
  const formatLabel = sourceValue && typeof format === "string" ? getFormatLabel(sourceValue, format) : undefined;
  const retailerName = typeof retailer === "string" ? getRetailerPage(retailer)?.name : undefined;
  const initialMessage = formatLabel
    ? `I’m looking for more information on ${titleCase(formatLabel, { startsHeadline: false })}.`
    : retailerName && `I’m looking for more information on a ${retailerName} program.`;

  return (
    <>
      <ContactHero source={sourceValue} initialMessage={initialMessage} />
      <FadeIn>
        <ContactLocations />
      </FadeIn>
    </>
  );
}
