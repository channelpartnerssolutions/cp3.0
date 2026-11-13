import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero/HomeHero";
import { BrandStory } from "@/components/home/BrandStory";
import { LogoWall } from "@/components/home/LogoWall";
import { PillarsPreview } from "@/components/home/PillarsPreview";
import { ProofPoints } from "@/components/home/ProofPoints";
import { Retailers } from "@/components/home/Retailers";
import { GlobalReach } from "@/components/home/GlobalReach";
import { Careers } from "@/components/home/Careers";
import { FadeIn } from "@/components/ui/FadeIn";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: { absolute: "Channel Partners | One Partner, Endless Potential" },
  description: "Channel Partners connects brands with shoppers through retail merchandising, experiential marketing and field teams nationwide.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <FadeIn>
        <BrandStory />
      </FadeIn>
      <FadeIn>
        <LogoWall />
      </FadeIn>
      <FadeIn>
        <PillarsPreview />
      </FadeIn>
      <FadeIn>
        <ProofPoints />
      </FadeIn>
      <FadeIn>
        <Retailers />
      </FadeIn>
      <FadeIn>
        <GlobalReach />
      </FadeIn>
      <FadeIn>
        <Careers />
      </FadeIn>
    </>
  );
}
