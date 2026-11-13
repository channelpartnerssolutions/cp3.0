// Blog posts come from the WordPress install at WORDPRESS_URL through its
// public REST API (no plugin needed). Articles and video posts (WordPress's
// "video" post format) share one feed. Responses are cached for an hour and
// tagged "blog", so /api/revalidate-blog can refresh them the moment a post
// is published.

export const WORDPRESS_URL = (process.env.WORDPRESS_URL ?? "https://channelpartners.com").replace(/\/$/, "");
export const BLOG_REVALIDATE_SECONDS = 3600;
export const BLOG_CACHE_TAG = "blog";
export const POSTS_PER_PAGE = 12;

export type BlogImage = { src: string; alt: string; width: number; height: number };

export type BlogPostSummary = {
  id: number;
  slug: string;
  title: string;
  date: string;
  isVideo: boolean;
  image: BlogImage | null;
};

export type BlogPost = BlogPostSummary & {
  modified: string;
  /** Post body HTML with any embedded audio pulled out into `audioSrc`. */
  html: string;
  audioSrc: string | null;
  videoSrc: string | null;
  seo: { title: string; description: string; ogImage: string | null };
};

type WpMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: { width?: number; height?: number };
};

type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  format: string;
  title: { rendered: string };
  content?: { rendered: string };
  excerpt?: { rendered: string };
  // ACF fields only appear once "Show in REST API" is on for the field group.
  acf?: { video_url?: string; video_image?: unknown } | [];
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_description?: string;
    og_image?: { url: string }[];
  };
  _embedded?: { "wp:featuredmedia"?: WpMedia[] };
};

const LIST_FIELDS = "id,slug,date,modified,format,title,acf,featured_media,_links,_embedded";

async function wpFetch(path: string): Promise<Response> {
  return fetch(`${WORDPRESS_URL}/wp-json/wp/v2/${path}`, {
    next: { revalidate: BLOG_REVALIDATE_SECONDS, tags: [BLOG_CACHE_TAG] },
  });
}

/** Every published post, newest first. Pages through the API 100 at a time. */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const posts: WpPost[] = [];
  for (let page = 1; ; page++) {
    const res = await wpFetch(
      `posts?per_page=100&page=${page}&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=${LIST_FIELDS}`
    );
    if (!res.ok) throw new Error(`WordPress posts request failed: ${res.status}`);
    posts.push(...((await res.json()) as WpPost[]));
    const totalPages = Number(res.headers.get("x-wp-totalpages") ?? 1);
    if (page >= totalPages) break;
  }
  return Promise.all(posts.map(toSummary));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await wpFetch(`posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`);
  if (!res.ok) throw new Error(`WordPress post request failed: ${res.status}`);
  const [post] = (await res.json()) as WpPost[];
  if (!post) return null;

  const summary = await toSummary(post);
  const { html, audioSrc } = extractAudio(post.content?.rendered ?? "");
  const yoast = post.yoast_head_json ?? {};
  const acf = Array.isArray(post.acf) ? undefined : post.acf;

  return {
    ...summary,
    modified: post.modified,
    html,
    audioSrc,
    videoSrc: acf?.video_url || null,
    seo: {
      title: decodeEntities(stripSiteSuffix(yoast.title ?? summary.title)),
      description: decodeEntities(
        yoast.description ?? yoast.og_description ?? stripTags(post.excerpt?.rendered ?? "")
      ).trim(),
      ogImage: yoast.og_image?.[0]?.url ?? summary.image?.src ?? null,
    },
  };
}

export function postHref(slug: string) {
  return `/blog/${slug}`;
}

export function pageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

/** MM/DD/YYYY, matching the Figma cards. Parsed from the string so the
 *  server's time zone can't shift the day. */
export function formatPostDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${m}/${d}/${y}`;
}

async function toSummary(post: WpPost): Promise<BlogPostSummary> {
  const acf = Array.isArray(post.acf) ? undefined : post.acf;
  const isVideo = post.format === "video";
  const featured = post._embedded?.["wp:featuredmedia"]?.[0];
  // Video posts carry their thumbnail in the ACF video_image field instead.
  const image = toImage(featured) ?? (isVideo ? await resolveAcfImage(acf?.video_image) : null);
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    date: post.date,
    isVideo,
    image,
  };
}

function toImage(media: WpMedia | undefined): BlogImage | null {
  if (!media?.source_url) return null;
  return {
    src: media.source_url,
    alt: media.alt_text ?? "",
    width: media.media_details?.width ?? 1200,
    height: media.media_details?.height ?? 630,
  };
}

// ACF image fields return an attachment ID, a URL or an image array depending
// on the field's "Return Format" setting; handle all three.
async function resolveAcfImage(value: unknown): Promise<BlogImage | null> {
  if (!value) return null;
  if (typeof value === "string") return { src: value, alt: "", width: 1200, height: 630 };
  if (typeof value === "number") {
    const res = await wpFetch(`media/${value}?_fields=source_url,alt_text,media_details`);
    return res.ok ? toImage((await res.json()) as WpMedia) : null;
  }
  if (typeof value === "object" && "url" in value) {
    const v = value as { url: string; alt?: string; width?: number; height?: number };
    return { src: v.url, alt: v.alt ?? "", width: v.width ?? 1200, height: v.height ?? 630 };
  }
  return null;
}

// WordPress's [audio] shortcode and the Audio block both render an <audio>
// element. Lift the first one out so the page can show the styled player above
// the article, as in the Figma "Listen to the full article here" row.
function extractAudio(html: string): { html: string; audioSrc: string | null } {
  const match = html.match(/<audio\b[^>]*>[\s\S]*?<\/audio>/i);
  if (!match) return { html, audioSrc: null };
  const src =
    match[0].match(/\ssrc="([^"]+)"/i)?.[1] ?? match[0].match(/<source[^>]+src="([^"]+)"/i)?.[1] ?? null;
  if (!src) return { html, audioSrc: null };
  const cleaned = html
    .replace(match[0], "")
    // Drop the now-empty wrappers the shortcode/block leave behind.
    .replace(/<figure class="wp-block-audio">\s*(<figcaption[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi, "")
    .replace(/<!--\[if lt IE 9\]>[\s\S]*?<!\[endif\]-->/gi, "");
  return { html: cleaned, audioSrc: src.replace(/&amp;/g, "&").split("?_=")[0] };
}

function stripSiteSuffix(title: string) {
  return title.replace(/\s+[-|–]\s+Channel Partners.*$/i, "");
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  reg: "®",
  trade: "™",
  copy: "©",
};

/** WordPress returns titles HTML-encoded (&#8217;, &amp;…); React would show those literally. */
export function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : entity;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? entity;
  });
}
