import { Container } from "@/components/ui/Container";

export function BrandStory() {
  return (
    <section className="bg-white py-[100px]">
      <Container className="flex flex-col gap-4">
        <h2 className="header-2">
          Your brand isn&rsquo;t
          <br />
          <span className="text-cerulean">the strategy</span>
        </h2>
        <div className="max-w-[715px] text-2xl leading-8">
          <p className="mb-4">
            Your brand is what the public believes it is. It&rsquo;s the result of every
            encounter across every touchpoint: in the aisle, on the street, in the room.
            Deciding what the brand should be is the easy part. Somebody has to be there to
            see it through.
          </p>
          <p className="font-bold">That&rsquo;s where we come in.</p>
        </div>
      </Container>
    </section>
  );
}
