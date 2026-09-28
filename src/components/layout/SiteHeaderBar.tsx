import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HamburgerToggle } from "./HamburgerToggle";

const navLinks = [
  { href: "/about", label: "Who We Are" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeaderBar({
  theme,
  menuOpen,
  onToggle,
}: {
  theme: "dark" | "light";
  menuOpen: boolean;
  onToggle: () => void;
}) {
  const barTheme = menuOpen ? "dark" : theme;
  const textColor = barTheme === "dark" ? "text-white" : "text-near-black";
  const barColor = barTheme === "dark" ? "bg-white" : "bg-near-black";

  return (
    <Container className="relative z-[60] flex items-center justify-between py-[15px]">
      <Link href="/" aria-label="Channel Partners home">
        <BrandMark theme={barTheme} />
      </Link>
      <nav className="flex flex-wrap items-center gap-8">
        <div
          className={`flex flex-wrap items-center gap-8 transition-opacity duration-300 ${
            menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-base hover:text-cerulean ${textColor}`}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/careers" variant="primary">
            We&rsquo;re Hiring!
          </Button>
        </div>
        <HamburgerToggle open={menuOpen} onClick={onToggle} barClassName={barColor} />
      </nav>
    </Container>
  );
}
