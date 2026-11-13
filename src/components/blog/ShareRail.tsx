"use client";

import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/layout/SocialIcons";

// Vertical "SHARE" tab beside the article image (Figma Blog Single): Facebook,
// X and LinkedIn, same as the old site minus the email option. Opens each
// network's share dialog for the current page URL.
const NETWORKS = [
  { label: "Facebook", Icon: FacebookIcon, url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { label: "X", Icon: XIcon, url: (u: string) => `https://twitter.com/intent/tweet?url=${u}` },
  { label: "LinkedIn", Icon: LinkedInIcon, url: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
];

export function ShareRail({
  className = "",
  orientation = "vertical",
}: {
  className?: string;
  /** Horizontal is the compact row used under the date on smaller screens. */
  orientation?: "vertical" | "horizontal";
}) {
  const share = (build: (u: string) => string) => {
    const shareUrl = build(encodeURIComponent(window.location.href));
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <p className="mr-2 font-heading text-sm font-black uppercase tracking-[0.1em] text-black">Share</p>
        {NETWORKS.map(({ label, Icon, url }) => (
          <button
            key={label}
            type="button"
            onClick={() => share(url)}
            aria-label={`Share on ${label}`}
            className="flex size-10 items-center justify-center border border-dark-blue bg-white text-middle-grey transition-colors hover:text-cerulean"
          >
            <Icon className="size-5" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex w-[50px] flex-col ${className}`}>
      <p className="flex h-[110px] items-center justify-center border border-dark-blue bg-dark-blue font-heading text-lg font-black uppercase leading-[18px] text-white [writing-mode:vertical-rl]">
        Share
      </p>
      {NETWORKS.map(({ label, Icon, url }) => (
        <button
          key={label}
          type="button"
          onClick={() => share(url)}
          aria-label={`Share on ${label}`}
          className="-mt-px flex size-[50px] items-center justify-center border border-dark-blue bg-white text-middle-grey transition-colors hover:text-cerulean"
        >
          <Icon className="size-6" />
        </button>
      ))}
    </div>
  );
}
