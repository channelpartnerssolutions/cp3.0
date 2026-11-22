"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HamburgerToggle } from "./HamburgerToggle";
import { SolutionsMenu } from "./SolutionsMenu";

// The header keeps to a short list: Solutions (a mega-menu, SolutionsMenu),
// these links, then the Connect With Us button. The footer carries the full
// site map. The mobile menu (NavOverlay) shows the same items.
export const headerLinks = [
  { href: "/about", label: "Who We Are" },
  { href: "/case-studies", label: "Results" },
  { href: "/careers", label: "Careers" },
];

export const connectLink = { href: "/contact", label: "Connect With Us" };

export function SiteHeaderBar({
  theme,
  menuOpen,
  onToggle,
}: {
  theme: "dark" | "light";
  menuOpen: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const barTheme = menuOpen ? "dark" : theme;
  const textColor = barTheme === "dark" ? "text-white" : "text-near-black";
  const barColor = barTheme === "dark" ? "bg-white" : "bg-near-black";
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Container className="relative z-[60] flex items-center justify-between py-[15px]">
      <Link href="/" aria-label="Channel Partners home">
        <BrandMark theme={barTheme} />
      </Link>
      {/* lg+: the inline links. Below lg: only the hamburger (NavOverlay). */}
      <nav className="hidden items-center gap-8 lg:flex">
        <SolutionsMenu textColor={textColor} />
        {headerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            className={`whitespace-nowrap text-base hover:text-cerulean ${
              isCurrent(link.href) ? "text-cerulean" : textColor
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Button href={connectLink.href} variant="primary">
          {connectLink.label}
        </Button>
      </nav>
      <HamburgerToggle open={menuOpen} onClick={onToggle} barClassName={barColor} className="lg:hidden" />
    </Container>
  );
}
