import Link from "next/link";
import { formatPostDate, postHref, type BlogPostSummary } from "@/lib/blog";
import { PostImage } from "./PostImage";

/** The newest post, wide: image across ~60% with the title panel beside it. */
export function FeaturedPost({ post }: { post: BlogPostSummary }) {
  const ratio = post.image ? post.image.height / post.image.width : 530 / 1165;
  return (
    <Link
      href={postHref(post.slug)}
      className="group grid grid-cols-1 overflow-hidden rounded-lg bg-white xl:grid-cols-[59.14%_1fr]"
    >
      {/* Sized to the image's own shape (WordPress images vary), so it
          shows uncropped; posts without one use the Figma 1165:530 tile.
          Side by side only from xl, where the title panel fits beside the
          image; narrower screens stack it underneath. */}
      <div className="relative overflow-hidden">
        <div aria-hidden style={{ paddingBottom: `${ratio * 100}%` }} />
        <PostImage post={post} sizes="(min-width: 1280px) 60vw, 100vw" priority />
      </div>
      <div className="flex flex-col justify-between gap-6 px-6 py-8 md:px-9 md:py-10 xl:py-9">
        <h2 className="font-heading text-2xl font-black uppercase leading-8 tracking-[0.02em] text-black transition-colors group-hover:text-cerulean md:text-[30px] md:leading-9 xl:text-[clamp(22px,1.75vw,30px)] xl:leading-[1.2]">
          {post.title}
        </h2>
        <p className="text-lg font-bold leading-[1.46] text-black">{formatPostDate(post.date)}</p>
      </div>
    </Link>
  );
}
