"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { StartProjectModal } from "./StartProjectModal";

export function ContactHero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative w-full bg-white">
      <Container className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 grid grid-cols-1 gap-x-6 gap-y-10 pt-[100px] pb-20 lg:col-span-10 lg:col-start-2 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-20 lg:col-span-7">
            <div className="flex flex-col items-start gap-4">
              <h1 className="header-1 text-black">let&rsquo;s talk</h1>
              <p className="max-w-[512px] text-2xl leading-8 text-black">
                Whether your starting your next project or looking for your next career move
                you&rsquo;re in the right place.
              </p>
            </div>
            <div className="flex items-start gap-20">
              <div className="flex flex-col items-start gap-2">
                <p className="text-base text-middle-grey">Become a Client</p>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="cursor-pointer text-2xl leading-8 text-black underline underline-offset-4 hover:text-cerulean"
                >
                  Start Your Project
                </button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-base text-middle-grey">Join Us</p>
                <a
                  href="/careers"
                  className="text-2xl leading-8 text-black underline underline-offset-4 hover:text-cerulean"
                >
                  See Open Positions
                </a>
              </div>
            </div>
          </div>
          <div className="relative z-10 lg:col-span-5">
            <div className="relative -mb-32 aspect-[557/646] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/contact/office.jpg"
                alt="Channel Partners headquarters sign and building"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="pointer-events-none absolute top-0 right-[-56px] hidden h-full items-start justify-center pt-6 lg:flex">
              <div className="flex flex-col items-center gap-8">
                <span className="header-6 whitespace-nowrap text-black [writing-mode:vertical-rl]">
                  our locations
                </span>
                <div className="relative h-[200px] w-[7px]">
                  <Image
                    src="/images/about/arrow.svg"
                    alt=""
                    width={200}
                    height={7}
                    aria-hidden
                    className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <StartProjectModal open={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
