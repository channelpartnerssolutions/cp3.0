import Image from "next/image";
import { Container } from "@/components/ui/Container";

const partnerPhotos = [
  {
    name: "Best Buy",
    title: "Best Buy",
    caption: "Approved 3PL Provider",
    image: "/images/homepage/retailers/bestbuy.png",
    overlayOpacity: "opacity-50",
  },
  {
    name: "Target",
    title: "Target",
    caption: "Preferred Merchandising Partner",
    image: "/images/homepage/retailers/target.jpg",
    overlayOpacity: "opacity-33",
  },
];

const retailerLogos = [
  { file: "walmart-black.svg", w: 188, h: 35 },
  { file: "lowes-retailers.svg", w: 100, h: 100 },
  { file: "homedepot-retailers.svg", w: 73, h: 74 },
  { file: "costco.svg", w: 149, h: 53 },
  { file: "samsclub.svg", w: 156, h: 30 },
  { file: "rei.svg", w: 88, h: 56 },
];

export function Retailers() {
  return (
    <section className="w-full bg-white pt-[88px] pb-[110px]">
      <Container className="flex flex-col items-start gap-4">
        <h2 className="header-3 text-black">
          Your Trusted Partner Across Retailers Nationwide
        </h2>
        <p className="max-w-[747px] text-base leading-6 text-black">
          From big box to DIY retailers and everywhere in between our trained
          and certified reps ensure your brand story survives every step of
          the journey.
        </p>

        <div className="mt-6 flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4 md:flex-row">
            {partnerPhotos.map((partner) => (
              <div
                key={partner.name}
                className="relative flex h-[280px] flex-1 items-center justify-center overflow-hidden rounded-lg bg-near-black md:h-[360px]"
              >
                <Image
                  src={partner.image}
                  alt=""
                  fill
                  className={`object-cover ${partner.overlayOpacity}`}
                />
                <div className="relative flex flex-col items-center gap-1 px-4 text-center text-white">
                  <p className="header-3">
                    {partner.title}
                  </p>
                  <div className="h-px w-12 bg-white" />
                  <p className="text-base leading-6">{partner.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-8 px-0 md:px-10">
            {retailerLogos.map((logo) => (
              <div
                key={logo.file}
                className="relative flex shrink-0 items-center justify-center"
                style={{ width: logo.w, height: logo.h }}
              >
                <Image
                  src={`/images/homepage/brands/${logo.file}`}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
