"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Figma "Endless Potential" fill: light-blue highlight easing out to cerulean.
const STOPS = "#61c0f3 0%, #49ade3 25%, #319ad3 50%, #1a88c3 75%, #0e7ebb 87.5%, #0275b3 100%";

// How far the highlight moves toward the cursor each frame (0–1); lower is floatier.
const EASE = 0.12;

/**
 * Text filled with a radial gradient whose highlight follows the pointer
 * anywhere inside the nearest `#hero` (or the text itself if there's no
 * hero), drifting back to center when the pointer leaves. Stays centered,
 * matching the static Figma fill, for touch-only devices and reduced motion.
 */
export function CursorGradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const area = text.closest<HTMLElement>("#hero") ?? text;
    const target = { x: 50, y: 50 };
    const current = { x: 50, y: 50 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      text.style.setProperty("--gx", `${current.x}%`);
      text.style.setProperty("--gy", `${current.y}%`);
      const settled =
        Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = text.getBoundingClientRect();
      // Clamp to the text box so the highlight always stays on the letters.
      target.x = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
      target.y = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
      run();
    };
    const onLeave = () => {
      target.x = 50;
      target.y = 50;
      run();
    };

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      ref={textRef}
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `radial-gradient(50% 50% at var(--gx, 50%) var(--gy, 50%), ${STOPS})`,
      }}
    >
      {children}
    </span>
  );
}
