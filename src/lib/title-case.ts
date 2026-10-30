// Title case for the italic Superior Title accents inside headlines: every
// word capitalized except articles, short conjunctions and short
// prepositions, which stay lowercase unless they open the headline
// ("Put Your Brand in Their Hands").
const MINOR_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "nor",
  "of", "on", "onto", "or", "per", "the", "to", "via", "vs", "with",
]);

export function titleCase(text: string, { startsHeadline = true } = {}): string {
  return text
    .split(/(\s+)/)
    .map((word, i) => {
      if (!word.trim()) return word;
      // Only the first part of a hyphenated word is capitalized: "Pop-ups".
      const lower = word.toLowerCase();
      if (MINOR_WORDS.has(lower) && !(i === 0 && startsHeadline)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
