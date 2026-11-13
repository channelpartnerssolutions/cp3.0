import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/blog";
import { FeaturedPost } from "./FeaturedPost";
import { NewsletterSignup } from "./NewsletterSignup";
import { Pagination } from "./Pagination";
import { PostCard } from "./PostCard";
import { SectionLabel } from "./SectionLabel";

// One page of the blog feed. Page 1 leads with the newest post as the
// featured "Latest post"; every page then shows up to 12 posts with the
// newsletter band after the first six.
export async function BlogIndex({ page }: { page: number }) {
  const posts = await getAllPosts();
  const [latest, ...rest] = posts;
  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();

  const pagePosts = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const firstHalf = pagePosts.slice(0, 6);
  const secondHalf = pagePosts.slice(6);

  return (
    <div className="bg-light-grey pt-10 pb-24 md:pt-14 md:pb-28">
      <Container className="flex flex-col gap-7">
        <h1 className="sr-only">Blog</h1>
        {page === 1 && latest && (
          <>
            <SectionLabel>Latest post</SectionLabel>
            <FeaturedPost post={latest} />
          </>
        )}
        <SectionLabel>All Posts</SectionLabel>
        <PostGrid posts={firstHalf} />
        <NewsletterSignup />
        {secondHalf.length > 0 && <PostGrid posts={secondHalf} />}
        <div className="pt-10">
          <Pagination current={page} total={totalPages} />
        </div>
      </Container>
    </div>
  );
}

function PostGrid({ posts }: { posts: Awaited<ReturnType<typeof getAllPosts>> }) {
  return (
    <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
