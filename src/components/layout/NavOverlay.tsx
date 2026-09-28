"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pillars } from "@/lib/pillars";

const companyLinks = [
  { href: "/about", label: "Who We Are" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
  { href: "/careers", label: "Careers" },
];

const retailPartnerships = [
  "Best Buy Approved 3PL Provider",
  "Target Preferred Merchandising Partner",
];

const socialLinks = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
];

export function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-near-black">
      <div className="relative hidden w-[512px] shrink-0 md:block">
        <div className="absolute inset-0 bg-near-black" />
        <Image
          src="/images/homepage/pillar-photo-retail.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-14 overflow-y-auto px-4 pb-16 pt-24 md:px-16 md:pt-16">
        <nav className="flex flex-col gap-6">
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/${pillar.slug}`}
              onClick={onClose}
              className={`font-heading text-2xl uppercase tracking-[5.4px] hover:text-cerulean md:text-4xl ${
                isActive(`/${pillar.slug}`) ? "text-cerulean" : "text-white"
              }`}
            >
              {pillar.navLabel}
            </Link>
          ))}
        </nav>

        <div className="flex max-w-[600px] flex-col gap-2 text-white">
          <span className="font-heading text-lg tracking-[3.24px] uppercase text-white">
            Our Company
          </span>
          <div className="flex flex-wrap gap-2 text-base">
            {companyLinks.map((link, i) => (
              <span key={link.href} className="flex gap-2">
                {i > 0 && <span>/</span>}
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`hover:text-cerulean ${isActive(link.href) ? "text-cerulean" : ""}`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        <div className="flex max-w-[600px] flex-col gap-2 text-white">
          <span className="font-heading text-lg tracking-[3.24px] uppercase text-white">
            Retail Partnerships
          </span>
          <div className="flex flex-wrap gap-2 text-base">
            {retailPartnerships.map((item, i) => (
              <span key={item} className="flex gap-2">
                {i > 0 && <span>/</span>}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          {socialLinks.map((link, i) => (
            <span key={link.label} className="flex items-center gap-3">
              {i > 0 && <span>/</span>}
              <a href={link.href} className="hover:text-cerulean">
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
