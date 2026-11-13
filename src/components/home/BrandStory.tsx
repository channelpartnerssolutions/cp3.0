import { Container } from "@/components/ui/Container";

export function BrandStory() {
  return (
    <section className="bg-white pb-[110px] pt-[100px]">
      <Container className="flex flex-col gap-4">
        <h2 className="header-2 max-w-[830px]">
          <span className="text-cerulean">More Than Just Retail</span>
          <br />
          We Own Every Touchpoint in the Consumer Journey
        </h2>
        <div className="max-w-[830px] text-2xl leading-8">
          <p className="mb-4">
            We are the only consumer activation solution partner that truly does it all. From
            the first floor plan to the final sale, we&rsquo;re there for all of it. We get
            your products into the store, keep them looking right, train the people selling
            them, and bring your brand to customers wherever they are.
          </p>
          <p className="font-bold">One partner. Zero handoffs.</p>
        </div>
      </Container>
    </section>
  );
}
