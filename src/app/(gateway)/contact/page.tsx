import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { FadeIn } from "@/components/ui/FadeIn";

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
