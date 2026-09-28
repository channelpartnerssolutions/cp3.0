"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ParticleWave } from "./ParticleWave";
import stateRetail from "../../../../public/images/hero/state-retail.jpg";
import stateExperiential from "../../../../public/images/hero/state-experiential.jpg";
import stateTraining from "../../../../public/images/hero/state-training.jpg";

const HOLD_MS = 2600;
const PERIOD_MS = 3400;
const STATES = 4;

const WORDS_A = ["Brand", "Strategy", "Idea", "Plan"];
const WORDS_B = ["Belief", "Shelf", "Activation", "Action"];

const CAPTIONS: Array<{ href: string; text: string } | null> = [
  null,
  { href: "/retail-execution", text: "Retail Execution: Samsung Assisted Selling Program" },
  { href: "/experiential-marketing", text: "Experiential Marketing: Microsoft Advertising Accelerate" },
  { href: "/training-enablement", text: "Training & Enablement: Meta Global Training Event" },
];

const BACKGROUNDS = [
  { state: 1, src: stateRetail },
  { state: 2, src: stateExperiential },
  { state: 3, src: stateTraining },
];

export function HeroRotator() {
  const heroRef = useRef<HTMLElement>(null);
  const stackARef = useRef<HTMLSpanElement>(null);
  const stackBRef = useRef<HTMLSpanElement>(null);
  const slotARef = useRef<HTMLSpanElement>(null);
  const slotBRef = useRef<HTMLSpanElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const periodTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const [waveOpacity, setWaveOpacity] = useState(1);
  const [activeBg, setActiveBg] = useState(0);
  const [waveMounted, setWaveMounted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const stackA = stackARef.current;
    const stackB = stackBRef.current;
    const slotA = slotARef.current;
    const slotB = slotBRef.current;
    const captions = captionsRef.current;
    if (!stackA || !stackB || !slotA || !slotB || !captions) return;

    const rowH = () => (stackA.firstElementChild as HTMLElement)?.getBoundingClientRect().height ?? 0;
    const capH = () => (captions.firstElementChild as HTMLElement)?.getBoundingClientRect().height ?? 0;

    const fit = () => {
      const i = stateRef.current;
      const a = stackA.children[i] as HTMLElement | undefined;
      const b = stackB.children[i] as HTMLElement | undefined;
      if (a) slotA.style.width = `${a.getBoundingClientRect().width}px`;
      if (b) slotB.style.width = `${b.getBoundingClientRect().width}px`;
      stackA.style.transform = `translateY(${-i * rowH()}px)`;
      stackB.style.transform = `translateY(${-i * rowH()}px)`;
      captions.style.transform = `translateY(${-i * capH()}px)`;
      setWaveOpacity(i === 0 ? 1 : 0);
      setActiveBg(i);
    };

    const stop = () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (periodTimer.current) clearInterval(periodTimer.current);
    };

    const start = () => {
      stop();
      stateRef.current = 0;
      fit();
      if (reducedMotion) return;
      holdTimer.current = setTimeout(() => {
        stateRef.current = 1;
        fit();
        periodTimer.current = setInterval(() => {
          stateRef.current = stateRef.current >= STATES - 1 ? 1 : stateRef.current + 1;
          fit();
        }, PERIOD_MS);
      }, HOLD_MS);
    };

    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);

    const hero = heroRef.current;
    let observer: IntersectionObserver | undefined;
    if (hero) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setWaveMounted(true);
              start();
            } else {
              stop();
              stateRef.current = 0;
              fit();
              setWaveMounted(false);
            }
          });
        },
        { threshold: 0.45 }
      );
      observer.observe(hero);
    }

    return () => {
      stop();
      window.removeEventListener("resize", fit);
      observer?.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative -mt-[var(--gateway-header-height)] flex h-[600px] flex-col items-center justify-center overflow-hidden bg-[#0e181c] md:h-screen md:min-h-[600px]"
    >
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(.4,0,.2,1)]"
        style={{ opacity: waveOpacity }}
      >
        {waveMounted && <ParticleWave className="block size-full" />}
      </div>

      {BACKGROUNDS.map((bg) => (
        <Image
          key={bg.state}
          src={bg.src}
          alt=""
          fill
          priority={bg.state === 1}
          className="object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ opacity: activeBg === bg.state ? 1 : 0 }}
        />
      ))}

      <div className="@container relative z-10 mx-auto flex h-full w-full max-w-[var(--grid-max-width)] flex-col items-center justify-center px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        <h1 className="relative flex h-[8.6cqw] min-h-[58px] items-center justify-center gap-[1.15cqw] whitespace-nowrap font-heading text-[5cqw] uppercase leading-[8.6cqw] tracking-[0.14em] text-white">
          {/* Screen readers and crawlers get the plain headline; the rotating words are visual only. */}
          <span className="sr-only">Where Brand Meets Belief</span>
          <span aria-hidden="true">Where</span>
          <span
            aria-hidden="true"
            ref={slotARef}
            className="inline-block h-[8.6cqw] min-h-[58px] overflow-hidden transition-[width] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]"
          >
            <span ref={stackARef} className="block transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]">
              {WORDS_A.map((word) => (
                <span
                  key={word}
                  className="relative top-[0.35cqw] block w-max h-[8.6cqw] min-h-[58px] whitespace-nowrap pr-[0.7cqw] font-display text-[5.9cqw] italic normal-case leading-[8.6cqw] tracking-[-0.02em] text-cerulean underline decoration-2 underline-offset-[0.12em]"
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
          <span aria-hidden="true">Meets</span>
          <span
            aria-hidden="true"
            ref={slotBRef}
            className="inline-block h-[8.6cqw] min-h-[58px] overflow-hidden transition-[width] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]"
          >
            <span ref={stackBRef} className="block transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]">
              {WORDS_B.map((word) => (
                <span
                  key={word}
                  className="relative top-[0.35cqw] block w-max h-[8.6cqw] min-h-[58px] whitespace-nowrap pr-[0.7cqw] font-display text-[5.9cqw] italic normal-case leading-[8.6cqw] tracking-[-0.02em] text-cerulean underline decoration-2 underline-offset-[0.12em]"
                >
                  {word}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="absolute left-0 right-0 top-[64.8%] h-[2.4cqw] min-h-[32px] overflow-hidden text-center">
          <div ref={captionsRef} className="transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]">
            <span className="block h-[2.4cqw] min-h-[32px] leading-[2.4cqw]">&nbsp;</span>
            {CAPTIONS.slice(1).map((caption) => (
              <Link
                key={caption!.href}
                href={caption!.href}
                className="block h-[2.4cqw] min-h-[32px] whitespace-nowrap text-[1.35cqw] uppercase leading-[2.4cqw] tracking-[0.08em] text-white hover:text-[#eaeaea]"
              >
                {caption!.text}{" "}
                <svg
                  viewBox="0 0 32 16"
                  className="ml-[0.4em] inline-block h-[0.7em] w-[1.4em] align-middle"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 8H29M25 4L29 8L25 12" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[52px] flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white">Scroll</span>
          <span className="block animate-scroll-bounce">
            <i className="block size-4 -rotate-45 border-b-[1.5px] border-l-[1.5px] border-white/85" />
          </span>
        </div>
      </div>
    </section>
  );
}
