import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

// TODO(content): final page title and description
export const metadata: Metadata = {
  title: "Blog",
  description: "News, insights and retail marketing perspectives from Channel Partners.",
};

export default function BlogPage() {
  return (
    <StubPage
      title="Blog"
      description="Served from WordPress via a rewrite once WORDPRESS_ORIGIN is configured — placeholder for this pass."
    />
  );
}
