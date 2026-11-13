import Link from "next/link";
import { formatPostDate, postHref, type BlogPostSummary } from "@/lib/blog";
import { PostImage } from "./PostImage";

/** The newest post, wide: image across ~60% with the title panel beside it. */
export function FeaturedPost({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={postHref(post.slug)}
      className="group grid grid-cols-1 overflow-hidden rounded-lg bg-white lg:grid-cols-[59.14%_1fr]"
    >
      <div className="relative aspect-[1165/530] overflow-hidden">
        <PostImage post={post} sizes="(min-width: 1024px) 60vw, 100vw" priority />
      </div>
      <div className="flex flex-col justify-between gap-6 px-6 py-8 md:px-9 md:py-10">
        <h2 className="font-heading text-2xl font-black uppercase leading-8 tracking-[0.02em] text-black transition-colors group-hover:text-cerulean md:text-[30px] md:leading-9">
          {post.title}
        </h2>
        <p className="text-lg font-bold leading-[1.46] text-black">{formatPostDate(post.date)}</p>
      </div>
    </Link>
  );
}
