import { caseStudyHref, getCaseStudyBySlug, headlineResult } from "@/lib/case-studies";
import type { FeaturedWorkItem } from "./FeaturedWorkCarousel";

// Resolves a pillar home's Featured Work cards. A card whose slug has an
// entry in case-studies.ts takes its title, image and first result from it
// and links to its page; the rest keep the fallback copy given here (and
// their own `href`, if any).
export function featuredWorkItems(cards: FeaturedWorkItem[]): FeaturedWorkItem[] {
  return cards.map((card) => {
    const study = getCaseStudyBySlug(card.slug);
    if (!study) return card;
    const result = headlineResult(study);
    return {
      slug: card.slug,
      title: study.title,
      image: study.image.src,
      stat: result ? { value: result.value, label: result.label } : undefined,
      href: caseStudyHref(study),
    };
  });
}
