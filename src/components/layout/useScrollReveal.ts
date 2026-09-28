"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Lets the header scroll away with the page, then reappear as a fixed bar
 * once the user scrolls back up past `threshold` pixels.
 *
 * `animate` is only true once `pinned` has actually toggled at least once,
 * so the very first crossing into the fixed/hidden state snaps instantly
 * instead of animating a solid bar sliding off-screen.
 */
export function useScrollReveal(headerHeight: number, threshold = 64) {
  const [pinned, setPinned] = useState(false);
  const [pastHeader, setPastHeader] = useState(false);
  const wasPinnedRef = useRef(false);

  useLayoutEffect(() => {
    wasPinnedRef.current = pinned;
  }, [pinned]);

  useEffect(() => {
    let lastY = window.scrollY;
    let upDistance = 0;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;

      setPastHeader(y > headerHeight);

      if (y <= headerHeight) {
        upDistance = 0;
        setPinned(false);
      } else if (delta > 0) {
        upDistance = 0;
        setPinned(false);
      } else if (delta < 0) {
        upDistance += -delta;
        if (upDistance > threshold) setPinned(true);
      }

      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight, threshold]);

  return { pinned, pastHeader, animate: pinned || wasPinnedRef.current };
}
