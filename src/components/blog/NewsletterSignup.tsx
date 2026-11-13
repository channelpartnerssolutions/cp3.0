import Image from "next/image";
import envelope from "../../../public/images/blog/envelope.png";

// Newsletter band that sits between the two halves of the post grid.
// TODO(hubspot): wire the form to HubSpot once the list/form exists there;
// per the Figma note the integration waits until that's set up, so the
// button doesn't submit anywhere yet.
export function NewsletterSignup() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-lg bg-white px-6 pt-12 pb-14 md:px-[68px] md:pt-[60px] md:pb-[68px] lg:grid-cols-[minmax(0,782px)_1fr]">
      <div className="flex flex-col gap-10">
        <h2 className="font-heading text-[32px] font-black uppercase leading-10 tracking-[0.02em] text-black md:text-[50px] md:leading-[58px]">
          Sign Up to Get the Latest Industry Trends Direct to Your Inbox
        </h2>
        <form className="flex w-full max-w-[641px]" aria-label="Newsletter sign-up">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address"
            className="h-14 min-w-0 flex-1 rounded-l-lg border border-r-0 border-[#c8c8c8] bg-off-white px-6 text-base text-black placeholder:text-middle-grey focus:border-cerulean focus:outline-none"
          />
          <button
            type="button"
            className="h-14 shrink-0 rounded-r border border-cerulean bg-cerulean px-4 text-xs font-bold uppercase tracking-[0.6px] text-white transition-colors hover:bg-cerulean-dark md:w-[153px]"
          >
            Sign Me Up!
          </button>
        </form>
      </div>
      <Image src={envelope} alt="" className="mx-auto hidden h-auto w-[281px] lg:block" />
    </section>
  );
}
