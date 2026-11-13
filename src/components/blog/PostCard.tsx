import Link from "next/link";
import { formatPostDate, postHref, type BlogPostSummary } from "@/lib/blog";
import { PostImage } from "./PostImage";

/** One post in the "All Posts" grid: image on top, title and date below. */
export function PostCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={postHref(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-white"
    >
      <div className="relative aspect-[1165/530] overflow-hidden">
        <PostImage post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 px-6 py-8 md:px-9 md:py-10">
        <h3 className="font-heading text-lg font-black uppercase leading-[21px] text-black transition-colors group-hover:text-cerulean">
          {post.title}
        </h3>
        <p className="text-lg font-bold leading-[1.46] text-black">{formatPostDate(post.date)}</p>
      </div>
    </Link>
  );
}
