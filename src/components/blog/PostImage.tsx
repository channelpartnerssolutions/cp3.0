import Image from "next/image";
import { CpIconMark } from "@/components/layout/CpIconMark";
import type { BlogPostSummary } from "@/lib/blog";

// Posts without an image get a brand tile instead: the CP mark on one of
// three blues, picked from the post ID so a given post always gets the same
// one and neighbouring cards vary (per the Figma annotation).
const FALLBACK_BACKGROUNDS = ["bg-medium-blue", "bg-dark-blue", "bg-cerulean"];

export function PostImage({
  post,
  sizes,
  priority = false,
  markClassName = "w-[17%] max-w-[120px]",
}: {
  post: BlogPostSummary;
  sizes: string;
  priority?: boolean;
  markClassName?: string;
}) {
  if (!post.image) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center text-white ${
          FALLBACK_BACKGROUNDS[post.id % FALLBACK_BACKGROUNDS.length]
        }`}
      >
        <CpIconMark className={`h-auto ${markClassName}`} />
        {post.isVideo && <PlayBadge />}
      </div>
    );
  }

  return (
    <>
      <Image
        src={post.image.src}
        alt={post.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {post.isVideo && <PlayBadge />}
    </>
  );
}

function PlayBadge() {
  return (
    <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-full bg-near-black/70 text-white">
      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5" aria-hidden>
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
      <span className="sr-only">Video</span>
    </span>
  );
}
