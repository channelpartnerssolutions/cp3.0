"use client";

import { useEffect, useRef } from "react";

// Keyframes for each blob, spread evenly across the page's scroll range:
// [x vw, y vh, scaleX, scaleY, rotation deg, opacity, color]. The first five
// build to the peak at the halfway point; the rest hold that intensity and
// just drift, morph and trade colors for the second half of the page.
type Keyframe = [number, number, number, number, number, number, string];

const KEYFRAMES: Keyframe[][] = [
  [[-4, -4, 0.55, 0.45, 0, 0.55, "#173542"], [-2, -2, 0.5, 0.5, 0, 0.5, "#173542"], [0, 0, 0.3, 0.3, 0, 0, "#02b391"]],
  [[-14, -10, 1, 0.75, -20, 0.85, "#186188"], [-6, -20, 0.8, 0.6, 30, 0.6, "#173542"], [-4, -2, 0.5, 0.4, 0, 0.25, "#02b391"]],
  [[-6, -24, 0.7, 1.3, 35, 0.8, "#186188"], [-26, -6, 1.1, 0.6, -15, 0.55, "#0275b3"], [-10, -12, 0.8, 0.9, 20, 0.6, "#02b391"]],
  [[-30, -18, 1.4, 0.9, -35, 0.9, "#0275b3"], [-8, -30, 0.7, 1.2, 50, 0.7, "#02b391"], [-20, -4, 1.1, 0.5, -10, 0.45, "#186188"]],
  [[-22, -26, 1.7, 1.4, 10, 1, "#186188"], [-34, -12, 1.2, 1, -40, 0.75, "#02b391"], [-12, -34, 1, 1.3, 60, 0.7, "#0275b3"]],
  [[-30, -14, 1.5, 1.2, -15, 0.95, "#0275b3"], [-20, -28, 1.1, 1.2, 20, 0.8, "#186188"], [-26, -20, 1.1, 1, 30, 0.7, "#02b391"]],
  [[-18, -30, 1.6, 1.3, 40, 0.95, "#186188"], [-36, -8, 1.3, 0.9, -25, 0.75, "#0275b3"], [-8, -26, 1.1, 1.2, -20, 0.7, "#02b391"]],
  [[-28, -20, 1.5, 1.5, -10, 1, "#0275b3"], [-14, -34, 1, 1.3, 55, 0.8, "#02b391"], [-30, -10, 1.2, 0.8, 15, 0.65, "#186188"]],
  [[-20, -24, 1.7, 1.4, 15, 1, "#186188"], [-30, -16, 1.2, 1.1, -35, 0.75, "#02b391"], [-16, -30, 1, 1.2, 45, 0.7, "#0275b3"]],
];

// Blob diameters, anchored on the viewport's bottom-right corner.
const BLOB_SIZES = [90, 70, 50]; // vmax

// Fraction of the remaining distance the eased progress covers per frame.
const EASE = 0.08;

// Grain texture strength. Soft-light over the dark base, so it reads as
// fine texture on the gradient rather than a grey wash.
const GRAIN_OPACITY = 0.35;

const GRAIN_TILE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.6 -.3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function mixRgb(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",");
}

// Fixed, grain-textured gradient behind the page: three soft blobs grow to
// full strength by the page's midpoint, then keep drifting, morphing and
// shifting color through the rest of the scroll.
export function ScrollGradient() {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let target = 0;
    let frame: number | null = null;

    const apply = () => {
      const last = KEYFRAMES.length - 1;
      const f = current * last;
      const i = Math.min(last - 1, Math.floor(f));
      const t0 = f - i;
      const t = t0 * t0 * (3 - 2 * t0);

      blobRefs.current.forEach((el, b) => {
        if (!el) return;
        const A = KEYFRAMES[i][b];
        const B = KEYFRAMES[i + 1][b];
        const lerp = (k: number) => (A[k] as number) + ((B[k] as number) - (A[k] as number)) * t;
        const rgb = mixRgb(A[6], B[6], t);
        el.style.transform = `translate(${lerp(0)}vw, ${lerp(1)}vh) rotate(${lerp(4)}deg) scale(${lerp(2)}, ${lerp(3)})`;
        el.style.opacity = String(Math.min(1, lerp(5)));
        el.style.background = `radial-gradient(closest-side, rgb(${rgb}) 0%, rgba(${rgb}, 0.55) 45%, rgba(${rgb}, 0.18) 72%, rgba(${rgb}, 0) 100%)`;
      });

      if (grainRef.current) {
        grainRef.current.style.transform = `translate(${-current * 3}%, ${-current * 5}%)`;
      }
    };

    const step = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply();
      frame = current === target ? null : requestAnimationFrame(step);
    };

    const onScroll = () => {
      const el = document.scrollingElement ?? document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (reducedMotion) {
        current = target;
        apply();
      } else if (frame === null) {
        frame = requestAnimationFrame(step);
      }
    };

    onScroll();
    current = target;
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // The opaque base matters: the grain's blend mode needs a dark backdrop
    // inside this layer, or it renders as plain white noise.
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-near-black">
      <div className="absolute inset-0">
        {BLOB_SIZES.map((size, b) => (
          <div
            key={size}
            ref={(el) => {
              blobRefs.current[b] = el;
            }}
            className="absolute left-full top-full rounded-full will-change-[transform,opacity]"
            style={{
              width: `${size}vmax`,
              height: `${size}vmax`,
              margin: `-${size / 2}vmax 0 0 -${size / 2}vmax`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div
        ref={grainRef}
        className="absolute -inset-1/2 mix-blend-soft-light"
        style={{ backgroundImage: GRAIN_TILE, opacity: GRAIN_OPACITY }}
      />

      {/* Keeps the top-left (where the page's copy starts) near-black. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,var(--color-near-black)_30%,transparent_75%)]" />
    </div>
  );
}
