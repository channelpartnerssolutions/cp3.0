import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Intro() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-start gap-4 pt-[100px] pb-[140px]">
        <p className="header-6 text-black">who we are</p>
        <h1 className="header-1 max-w-[840px] text-black">
          we&rsquo;re on a mission to make every brand interaction matter
        </h1>
        <p className="max-w-[910px] text-2xl leading-8 text-black">
          We understand a plan is only as good as its execution, that&rsquo;s why we staff our
          organization with hands-on experts with a track record of doing the work.
        </p>
      </Container>
      <Container>
        <div className="relative aspect-[1376/588] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/about/hero.jpg"
            alt="Channel Partners team members collaborating in a retail environment"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
