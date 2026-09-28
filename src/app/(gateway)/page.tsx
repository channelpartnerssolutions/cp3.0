import { HeroRotator } from "@/components/home/hero/HeroRotator";
import { BrandStory } from "@/components/home/BrandStory";
import { LogoWall } from "@/components/home/LogoWall";
import { PillarsPreview } from "@/components/home/PillarsPreview";
import { ProofPoints } from "@/components/home/ProofPoints";
import { Retailers } from "@/components/home/Retailers";
import { GlobalReach } from "@/components/home/GlobalReach";
import { Careers } from "@/components/home/Careers";
import { FadeIn } from "@/components/ui/FadeIn";

export default function Home() {
  return (
    <>
      <HeroRotator />
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
