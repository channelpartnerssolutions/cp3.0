import { Container } from "@/components/ui/Container";

export function BrandStory() {
  return (
    <section className="bg-white pb-[110px] pt-[100px]">
      <Container className="flex flex-col gap-4">
        <h2 className="header-2 max-w-[860px]">
          <span className="text-cerulean">More Than Just Retail</span>
          <br />
          We Own Every Touchpoint in the Consumer Journey
        </h2>
        <div className="max-w-[860px] text-2xl leading-8">
          <p className="mb-4">
            From retail environments and field operations to experiential marketing and
            workforce solutions, Channel Partners connects the capabilities that move business
            forward.
          </p>
          <p className="font-bold">One partner. Zero handoffs.</p>
        </div>
      </Container>
    </section>
  );
}
