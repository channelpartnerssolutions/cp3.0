import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type HeaderTheme = "dark" | "light";

/**
 * Watches for a `#hero` element on the page and reports whether the header
 * should render "dark" (white logo/text, hero still in view) or "light"
 * (dark logo/text, no hero or scrolled past it). Pages with no #hero default
 * straight to "light" — there's no dark background for a "dark" header to
 * sit on, so light avoids an invisible white-on-white flash.
 *
 * Depends on `pathname` (not just `headerHeight`) so it re-queries `#hero`
 * on every client-side route change — the header persists across
 * navigations within the (gateway) layout, so without this it keeps
 * observing the previous page's (possibly absent) hero.
 */
export function useHeaderTheme(headerHeight: number): HeaderTheme {
  const pathname = usePathname();
  const [theme, setTheme] = useState<HeaderTheme>("light");

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setTheme("light");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setTheme(entry.isIntersecting ? "dark" : "light"),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, [headerHeight, pathname]);

  return theme;
}
