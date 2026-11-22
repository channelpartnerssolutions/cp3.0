import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/blog";

export const revalidate = 3600; // must be a literal; keep in sync with BLOG_REVALIDATE_SECONDS

export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => []);
  const pages = Math.ceil(Math.max(0, posts.length - 1) / POSTS_PER_PAGE);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps<"/blog/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return { title: `Industry Insights: Page ${page}` };
}

export default async function BlogPagedPage({ params }: PageProps<"/blog/page/[page]">) {
  const page = Number((await params).page);
  // /blog/page/1 is just /blog.
  if (page === 1) permanentRedirect("/blog");
  return <BlogIndex page={page} />;
}
