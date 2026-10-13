import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { FadeIn } from "@/components/ui/FadeIn";

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
  const { source } = await searchParams;

  return (
    <>
      <ContactHero source={typeof source === "string" ? source : undefined} />
      <FadeIn>
        <ContactLocations />
      </FadeIn>
    </>
  );
}
