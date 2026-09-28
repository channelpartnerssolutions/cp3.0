import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { FadeIn } from "@/components/ui/FadeIn";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Channel Partners or find an office near you.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <FadeIn>
        <ContactLocations />
      </FadeIn>
    </>
  );
}
