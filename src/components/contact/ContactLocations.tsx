import { Container } from "@/components/ui/Container";
import { OFFICE_LOCATIONS } from "@/lib/locations";

function LocationItem({ location }: { location: (typeof OFFICE_LOCATIONS)[number] }) {
  const address = location.lines.join(", ");
  return (
    <div className="flex flex-col items-start gap-4">
      <h3 className="header-2 text-black">{location.name.toLowerCase()}</h3>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noreferrer"
        className="text-2xl leading-8 text-middle-grey underline underline-offset-4 hover:text-cerulean"
      >
        {location.lines.map((line, i) => (
          <span key={line}>
            {line}
            {i < location.lines.length - 1 && <br />}
          </span>
        ))}
      </a>
    </div>
  );
}

export function ContactLocations() {
  return (
    <section className="relative w-full border-b border-light-grey bg-[#fafafa] pt-48 pb-24">
      <Container className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:col-span-10 lg:col-start-2">
          {OFFICE_LOCATIONS.map((location) => (
            <LocationItem key={location.name} location={location} />
          ))}
        </div>
      </Container>
    </section>
  );
}
