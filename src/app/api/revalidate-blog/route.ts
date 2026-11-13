import { revalidateTag } from "next/cache";
import { BLOG_CACHE_TAG } from "@/lib/blog";

// WordPress calls this when a post is published, updated or deleted so the
// blog shows the change right away instead of within the hourly refresh.
// POST /api/revalidate-blog with header `x-revalidate-secret: <BLOG_REVALIDATE_SECRET>`.
export async function POST(request: Request) {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  // A webhook can't use updateTag, so expire immediately (per the
  // revalidateTag docs) rather than serving stale content once more.
  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
