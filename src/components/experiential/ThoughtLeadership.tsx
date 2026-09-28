import Image from "next/image";

type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
};

const PLACEHOLDER_POSTS: Post[] = [
  {
    slug: "experiential-isnt-an-event",
    title: "Experiential isn't an event. It's a business strategy.",
    date: "09/10/2026",
    author: "Elizabeth Jones, SVP, Client Service, Experiential",
  },
  {
    slug: "what-makes-a-launch-worth-walking-into",
    title: "What makes a launch worth walking into",
    date: "08/22/2026",
    author: "Elizabeth Jones, SVP, Client Service, Experiential",
  },
];

export function ThoughtLeadership() {
  return (
    <section className="w-full py-20 md:py-28">
      <div className="mx-auto mb-16 w-full max-w-[var(--grid-max-width)] px-[var(--grid-margin)] text-center md:px-[var(--grid-margin-md)]">
        <h2 className="header-2 text-white">
          <span className="block">thought leadership</span>
          <span className="block">born in-house</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[590px] text-base leading-relaxed text-white/70">
          We&rsquo;ve packed our team with experts in their field, and it
          turns out they&rsquo;ve got a lot to say.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[var(--grid-max-width)] grid-cols-1 gap-8 px-[var(--grid-margin)] md:grid-cols-2 md:px-[var(--grid-margin-md)]">
        {PLACEHOLDER_POSTS.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded bg-white shadow-[0_0_20px_rgba(0,0,0,0.25)]"
          >
            <div className="relative aspect-[676/308] w-full overflow-hidden">
              <Image
                src="/images/experiential/blog/post-photo.png"
                alt=""
                fill
                className="object-cover"
              />
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
