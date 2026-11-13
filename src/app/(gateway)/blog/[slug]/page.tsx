import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/blog/AudioPlayer";
import { PostImage } from "@/components/blog/PostImage";
import { ShareRail } from "@/components/blog/ShareRail";
import { Container } from "@/components/ui/Container";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";

export const revalidate = 3600; // must be a literal; keep in sync with BLOG_REVALIDATE_SECONDS

// Prerender every current post at build; posts published later render on
// first request and are cached from then on.
export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.seo.title,
    description: post.seo.description || undefined,
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description || undefined,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="bg-light-grey pt-10 pb-24 md:pt-[87px] md:pb-28">
      <Container>
        <div className="relative mx-auto max-w-[1144px]">
          <ShareRail className="absolute top-0 right-full hidden xl:flex" />

          <div className="overflow-hidden rounded-lg bg-white">
            {post.videoSrc ? (
              <video
                src={post.videoSrc}
                poster={post.image?.src}
                controls
                playsInline
                preload="metadata"
                className="block aspect-video w-full bg-near-black"
              />
            ) : (
              <div className="relative aspect-[1144/520] overflow-hidden">
                <PostImage post={post} sizes="(min-width: 1200px) 1144px, 100vw" priority markClassName="w-[10.5%] max-w-[120px]" />
              </div>
            )}

            <div className="mx-auto flex max-w-[1144px] flex-col px-6 pt-10 pb-16 md:px-[116px] md:pt-[87px] md:pb-[92px]">
              <h1 className="font-heading text-[30px] font-black uppercase leading-9 tracking-[0.02em] text-black md:text-[50px] md:leading-[58px]">
                {post.title}
              </h1>
              <p className="mt-4 text-lg font-bold leading-[1.46] text-black">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </p>
              <ShareRail orientation="horizontal" className="mt-6 xl:hidden" />

              {post.audioSrc && (
                <div className="mt-10 flex flex-col gap-4 md:mt-[42px]">
                  <p className="text-xl font-bold leading-[1.46] text-black md:text-2xl">
                    Listen to the full article here
                  </p>
                  <AudioPlayer src={post.audioSrc} />
                </div>
              )}

              <div
                className="blog-content mt-12 md:mt-[85px]"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

