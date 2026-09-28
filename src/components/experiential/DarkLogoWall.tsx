import Image from "next/image";

const logos = [
  { file: "visa.svg", w: 68, h: 22 },
  { file: "verizon.svg", w: 103, h: 23 },
  { file: "qualcomm.svg", w: 132, h: 24 },
  { file: "oracle.svg", w: 146, h: 19 },
  { file: "microsoft.svg", w: 119, h: 25 },
  { file: "motorola.svg", w: 143, h: 33 },
  { file: "northwell.svg", w: 95, h: 52 },
  { file: "nbc.svg", w: 97, h: 24 },
  { file: "meta.svg", w: 93, h: 19 },
  // The source asset is stored upside-down in Figma; flipped to match.
  { file: "lufthansa.svg", w: 124, h: 22, flipY: true },
  { file: "dyson.svg", w: 73, h: 28 },
  { file: "google.svg", w: 97, h: 30 },
  { file: "anker.svg", w: 106, h: 25 },
  { file: "amd.svg", w: 97, h: 23 },
  { file: "adidas.svg", w: 56, h: 33 },
];

export function DarkLogoWall() {
  return (
    <section className="relative w-full bg-medium-blue py-8">
      <div className="mx-auto flex w-full max-w-[var(--grid-max-width)] flex-wrap items-center justify-center gap-x-12 gap-y-8 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        {logos.map((logo) => (
          <div
            key={logo.file}
            className="relative flex shrink-0 items-center justify-center"
            style={{ width: logo.w, height: logo.h }}
          >
            <Image
              src={`/images/experiential/brands/${logo.file}`}
              alt=""
              fill
              className="object-contain"
              style={logo.flipY ? { transform: "scaleY(-1)" } : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
