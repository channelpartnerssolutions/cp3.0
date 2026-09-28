"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/components/ui/useInView";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function CountUp({ value, duration = 1500, className }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(value.replace(/\d/g, "0"));
  const hasAnimated = useRef(false);

  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : null;

  useEffect(() => {
    if (!inView || target === null || hasAnimated.current) return;
    hasAnimated.current = true;

    const currentMatch = value.match(/\d+/)!;
    const digits = currentMatch[0].length;
    const prefix = value.slice(0, currentMatch.index);
    const suffix = value.slice(currentMatch.index! + currentMatch[0].length);
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(easeOutExpo(progress) * target);
      setDisplay(`${prefix}${String(current).padStart(digits, "0")}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, value]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : display}
    </span>
  );
}
