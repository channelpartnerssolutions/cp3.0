import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThreePillars } from "./ThreePillars";

export function PillarsPreview() {
  return (
    <section className="w-full bg-white py-12">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading className="max-w-[1031px]">
          The Only Partner
          <br />
          <span className="text-cerulean">That Does It All</span>
        </SectionHeading>
        <ThreePillars />
      </Container>
    </section>
  );
}
