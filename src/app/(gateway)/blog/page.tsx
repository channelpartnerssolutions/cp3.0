import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

export const revalidate = 3600; // must be a literal; keep in sync with BLOG_REVALIDATE_SECONDS

export const metadata: Metadata = {
  title: "Industry Insights",
  description: "News, insights and retail marketing perspectives from Channel Partners.",
};

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
