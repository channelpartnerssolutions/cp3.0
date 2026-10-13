"use client";

import { useEffect, useState } from "react";

export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Browser autofill fires keydown events with no `key`, so guard it.
      if (e.key?.toLowerCase() !== "g" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      setVisible((v) => !v);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="fixed bottom-4 right-4 z-[9999] rounded-full bg-near-black px-3 py-1.5 text-xs font-bold uppercase tracking-[0.6px] text-white shadow-lg"
      >
        Grid {visible ? "On" : "Off"} <span className="opacity-50">(G)</span>
      </button>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[9998] mx-auto w-full max-w-[var(--grid-max-width)] px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
          <div className="grid h-full grid-cols-12 gap-[var(--grid-gutter)]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full bg-cerulean/10 outline outline-1 outline-cerulean/30" />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
