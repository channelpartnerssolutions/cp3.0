"use client";

import { useEffect } from "react";

/**
 * Reserves real document-flow space for a header whose visible bar is
 * absolutely/fixed positioned (and therefore contributes 0 height on its
 * own). Also broadcasts the measured height as a CSS custom property so
 * elements outside the header's own subtree (e.g. a full-bleed hero that
 * intentionally sits behind the header) can read the same value.
 */
export function HeaderSpacer({ height, cssVar }: { height: number; cssVar: string }) {
  useEffect(() => {
    document.documentElement.style.setProperty(cssVar, `${height}px`);
  }, [height, cssVar]);

  return <div aria-hidden="true" style={{ height }} />;
}
