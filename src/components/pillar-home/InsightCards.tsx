import Image from "next/image";

export type InsightPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
};

// Dark band with two article cards whose bottoms overlap the blue closing
// CTA (render PillarFinalCta with `overlap` right after it).
export function InsightCards({ heading, intro, posts }: { heading: string; intro: string; posts: InsightPost[] }) {
  return (
    <section className="w-full bg-near-black py-20 md:py-28">
      <div className="mx-auto mb-16 w-full max-w-[var(--grid-max-width)] px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 mx-auto max-w-[1020px] text-white">{heading}</h2>
        <p className="mx-auto mt-4 max-w-[590px] text-base leading-relaxed text-white/70">{intro}</p>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[var(--grid-max-width)] grid-cols-1 gap-8 px-[var(--grid-margin)] md:grid-cols-2 md:px-[var(--grid-margin-md)]">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-lg bg-white shadow-[0_0_20px_rgba(0,0,0,0.25)]">
            <div className="relative aspect-[676/308] w-full overflow-hidden">
              <Image src={post.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-10 bg-white p-10 text-black">
              <h3 className="header-4">{post.title}</h3>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">{post.date}</p>
                <p className="text-base italic">By {post.author}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
