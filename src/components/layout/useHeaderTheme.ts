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
    let disposed = false;

    // Decide from the hero as it is now, not from the observer entry: an
    // entry can arrive late, after a back/forward navigation has already
    // swapped the page, and would strand the header in "dark" (white on
    // white). A hero that's gone or hidden (display: none) counts as none.
    const evaluate = () => {
      if (disposed) return;
      const hero = observed;
      if (!hero || !hero.isConnected || hero.getClientRects().length === 0) {
        setTheme("light");
        return;
      }
      const { top, bottom } = hero.getBoundingClientRect();
      setTheme(bottom > headerHeight && top < window.innerHeight ? "dark" : "light");
    };

    const intersection = new IntersectionObserver(evaluate, {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0,
    });

    // (Re)attach to the current #hero. The hero element can be swapped out
    // without a route change (hot reload, or a page re-rendering its hero),
    // which would leave the observer watching a detached node that never
    // intersects, stranding the header in "light" over a dark hero.
    const attach = () => {
      const hero = document.getElementById("hero");
      if (hero !== observed) {
        if (observed) intersection.unobserve(observed);
        observed = hero;
        if (hero) intersection.observe(hero);
      }
      evaluate();
    };

    attach();
    const mutations = new MutationObserver(attach);
    mutations.observe(document.body, { childList: true, subtree: true });
    // Back/forward restores the scroll position after the page renders.
    const onPopState = () => requestAnimationFrame(attach);
    window.addEventListener("popstate", onPopState);

    return () => {
      disposed = true;
      window.removeEventListener("popstate", onPopState);
      mutations.disconnect();
      intersection.disconnect();
    };
  }, [headerHeight, pathname]);

  return theme;
}
