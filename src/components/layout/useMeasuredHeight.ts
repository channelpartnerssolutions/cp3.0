"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Measures the rendered height of the element the returned ref is attached
 * to, and keeps it in sync via ResizeObserver (nav wrapping, responsive text,
 * etc.). Returns 0 until the first measurement — callers should provide
 * their own fallback for anything rendered before mount.
 */
export function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setHeight(el.getBoundingClientRect().height);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, height };
}
