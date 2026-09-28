"use client";

import Script from "next/script";

export function ParticleWave({ className }: { className?: string }) {
  return (
    <>
      <Script src="/particle-wave.js" strategy="afterInteractive" />
      <particle-wave className={className} />
    </>
  );
}
