import { TriangleAlert } from "lucide-react";

// Pre-launch reminder styling for copy that's still waiting on someone
// (HR, IT…). Intentionally visible on every build so it can't be missed.
const HIGHLIGHT = "box-decoration-clone rounded bg-amber-100 px-1.5 py-0.5 font-bold text-amber-900";

export function VerifyBadge({ owner, note }: { owner: string; note?: string }) {
  return (
    <span
      title={note}
      className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.6px] ${HIGHLIGHT}`}
    >
      <TriangleAlert aria-hidden className="size-3.5" />
      Verify with {owner}
    </span>
  );
}

// Highlights [bracketed] notes and {braced} values that still need filling in.
export function WithPlaceholders({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]|\{[^}]+\})/).map((part, i) =>
        /^[[{]/.test(part) ? (
          <mark key={i} className={HIGHLIGHT}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
