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
    let observed: HTMLElement | null = null;
    const intersection = new IntersectionObserver(
      ([entry]) => setTheme(entry.isIntersecting ? "dark" : "light"),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 }
    );

    // (Re)attach to the current #hero. The hero element can be swapped out
    // without a route change (hot reload, or a page re-rendering its hero),
    // which would leave the observer watching a detached node that never
    // intersects, stranding the header in "light" over a dark hero.
    const attach = () => {
      const hero = document.getElementById("hero");
      if (hero === observed) return;
      if (observed) intersection.unobserve(observed);
      observed = hero;
      if (hero) intersection.observe(hero);
      else setTheme("light");
    };

    attach();
    const mutations = new MutationObserver(attach);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      intersection.disconnect();
    };
  }, [headerHeight, pathname]);

  return theme;
}
