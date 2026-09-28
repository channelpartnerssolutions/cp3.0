"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useInView } from "@/components/ui/useInView";

export function EmployeesSection() {
  const { ref: teamImageRef, inView: teamImageInView } = useInView<HTMLDivElement>();
  const [teamImageVisible, setTeamImageVisible] = useState(false);

  useEffect(() => {
    if (!teamImageInView) return;
    // Double rAF so the browser paints the image at opacity 0 first,
    // otherwise toggling the class in the same tick it mounts skips the transition.
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTeamImageVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [teamImageInView]);

  return (
    <section className="bg-white pt-1 pb-[80px]">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="relative aspect-[692/525] w-full shrink-0 overflow-hidden rounded-lg md:w-[58%]">
            <Image
              src="/images/about/employees-large.jpg"
              alt="Channel Partners employee writing on a whiteboard"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col items-start gap-4 md:w-[42%]">
            <h2 className="header-2 text-black">empowering our employees</h2>
            <p className="text-2xl leading-8 text-black">
              Each and every one of our employees brings something special to the table that
              makes our brand unique. That&rsquo;s why we count on them to channel their inner
              abilities and bring what makes them different to the table every day.
            </p>
            <Button
              href="/careers"
              variant="primary"
              className="mt-4"
            >
              join the team
            </Button>
          </div>
        </div>

        <div className="flex items-stretch">
          <div className="hidden w-14 shrink-0 items-start justify-center pt-6 md:flex">
            <div className="flex flex-col items-center gap-8">
              <span className="header-6 whitespace-nowrap text-black [writing-mode:vertical-rl]">
                meet the team
              </span>
              <div className="relative h-[287px] w-[7px]">
                <Image
                  src="/images/about/arrow.svg"
                  alt=""
                  width={287}
                  height={7}
                  aria-hidden
                  className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90"
                />
              </div>
            </div>
          </div>
          <div
            ref={teamImageRef}
            className="relative aspect-[1152/682] w-full flex-1 overflow-hidden rounded-lg"
          >
            {teamImageInView && (
              <Image
                src="/images/about/employees-tall.jpg"
                alt="Channel Partners field team members on location"
                fill
                className={`object-cover fade-in-section ${teamImageVisible ? "is-visible" : ""}`}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
