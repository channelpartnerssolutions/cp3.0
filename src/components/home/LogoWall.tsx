import Image from "next/image";

const logos = [
  { name: "Microsoft", file: "microsoft.svg", w: 140, h: 30 },
  { name: "The Home Depot", file: "homedepot.svg", w: 64, h: 64 },
  { name: "AT&T", file: "att.svg", w: 97, h: 40 },
  { name: "Samsung", file: "samsung.svg", w: 130, h: 29 },
  { name: "7-Eleven", file: "7eleven.svg", w: 38, h: 50 },
  { name: "AMD", file: "amd.svg", w: 126, h: 30 },
  { name: "Bose", file: "bose.svg", w: 170, h: 20 },
  { name: "Canon", file: "canon.svg", w: 118, h: 24 },
  { name: "Circle K", file: "circlek.svg", w: 134, h: 36 },
  { name: "CVS", file: "cvs.svg", w: 120, h: 30 },
  { name: "De'Longhi", file: "delonghi.svg", w: 126, h: 44 },
  { name: "DJI", file: "dji.svg", w: 69, h: 40 },
  { name: "Fitbit", file: "fitbit.svg", w: 109, h: 30 },
  { name: "Fossil", file: "fossil.svg", w: 101, h: 36 },
  { name: "iRobot", file: "irobot.svg", w: 118, h: 30 },
  { name: "LG", file: "lg.svg", w: 92, h: 44 },
  { name: "L'Oréal", file: "loreal.svg", w: 132, h: 24 },
  { name: "Lowe's", file: "lowes.svg", w: 87, h: 40 },
  { name: "Luxottica", file: "luxottica.svg", w: 185, h: 20 },
  { name: "Motorola", file: "motorola.svg", w: 157, h: 36 },
  { name: "Northwell Health", file: "northwell.svg", w: 234, h: 24 },
  { name: "Patagonia", file: "patagonia.svg", w: 153, h: 30 },
  { name: "Qualcomm", file: "qualcomm.svg", w: 163, h: 30 },
  { name: "Tractor Supply Co.", file: "tractorsupply.svg", w: 123, h: 30 },
  { name: "Ring", file: "ring.svg", w: 68, h: 44 },
  { name: "Roku", file: "roku.svg", w: 101, h: 30 },
  { name: "Walgreens", file: "walgreens.svg", w: 174, h: 30 },
  { name: "Walmart", file: "walmart.svg", w: 146, h: 27 },
];

function LogoTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[72px] pr-[72px]" aria-hidden={ariaHidden}>
      {logos.map((logo) => (
        <div
          key={logo.file}
          className="relative flex shrink-0 items-center justify-center opacity-70 grayscale"
          style={{ width: logo.w, height: logo.h }}
        >
          <Image
            src={`/images/homepage/brands/${logo.file}`}
            alt={ariaHidden ? "" : logo.name}
            fill
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function LogoWall() {
  return (
    <section className="relative w-full overflow-hidden border-y border-middle-grey bg-white py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[190px] bg-gradient-to-r from-white to-white/0" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[190px] bg-gradient-to-l from-white to-white/0" />
      <div className="flex w-max animate-logo-scroll hover:[animation-play-state:paused]">
        <LogoTrack />
        <LogoTrack ariaHidden />
      </div>
    </section>
  );
}
