import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { pillars } from "@/lib/pillars";
import { OFFICE_LOCATIONS } from "@/lib/locations";
import { SOCIAL_LINKS } from "./SocialIcons";

const companyLinks = [
  { href: "/about", label: "Who We Are" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Sitemap" },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full bg-near-black py-20 text-white">
      <Container className="grid grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-12">
        <div className="flex flex-col items-start gap-4 lg:col-span-5">
          <span className="header-1 text-white">let&rsquo;s talk</span>
          <a href="tel:+18137122525" className="text-2xl text-white/70 hover:text-cerulean">
            (813) 712-2525
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 lg:col-span-7">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.6px] text-white/50">
              Company
            </span>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base underline underline-offset-4 hover:text-cerulean"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.6px] text-white/50">
              Solutions
            </span>
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/${pillar.slug}`}
                className="text-base underline underline-offset-4 hover:text-cerulean"
              >
                {pillar.label}
              </Link>
            ))}
          </div>
          <div className="hidden sm:block" aria-hidden />

          {OFFICE_LOCATIONS.map((location) => {
            const address = location.lines.join(", ");
            return (
              <div key={location.name} className="flex flex-col items-start gap-1">
                <p className="text-base font-bold text-white">{location.name}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/60 underline underline-offset-4 hover:text-cerulean"
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
          })}
        </div>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
        <div className="flex items-center gap-4 lg:col-span-5">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-white/70 hover:text-cerulean"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50 lg:col-span-7 lg:col-start-6">
          <p>© {new Date().getFullYear()} Channel Partners. All rights reserved.</p>
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-cerulean">
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
