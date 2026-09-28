"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/components/ui/useInView";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The server HTML always carries the final value, so crawlers, link previews and
// screenshots never see "000". The count-up is a client-only visual layer: the
// digits are zeroed while offscreen and animated once scrolled into view.
export function CountUp({ value, duration = 1500, className }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const digitsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textNode = digitsRef.current?.firstChild;
    const match = value.match(/\d+/);
    if (!textNode || !match || prefersReducedMotion()) return;

    if (!inView) {
      textNode.nodeValue = value.replace(/\d/g, "0");
      return;
    }

    const target = parseInt(match[0], 10);
    const digits = match[0].length;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index! + digits);
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(easeOutExpo(progress) * target);
      textNode.nodeValue = `${prefix}${String(current).padStart(digits, "0")}${suffix}`;
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      textNode.nodeValue = value;
    };
  }, [inView, duration, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span key={value} ref={digitsRef} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
