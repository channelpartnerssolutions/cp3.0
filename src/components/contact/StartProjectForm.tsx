"use client";

import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Hammer,
  HeartHandshake,
  Presentation,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { pillars, type PillarConfig } from "@/lib/pillars";
import { submitContactForm } from "@/lib/hubspot";
import { isBusinessEmail } from "@/lib/business-email";
import { getRecaptchaToken } from "@/lib/recaptcha";
import { PRIVACY_POLICY_URL } from "@/lib/legal";
import { VerifyBadge } from "@/components/ui/ContentPlaceholder";
import {
  EMAIL_PATTERN,
  errorClasses,
  inputClasses,
  labelClasses,
  primaryButtonClasses,
} from "./formStyles";

// Step 1 offers the three pillars; step 2 offers the chosen pillar's
// solutions from src/lib/pillars.ts. The solution label is what HubSpot
// receives in channel_partners_interest_contact_form, so its dropdown must
// list these labels exactly (see go-live list).
const PILLAR_ICONS: Record<string, string> = {
  "retail-execution": "/images/contact/pillar-retail.svg",
  "training-enablement": "/images/contact/pillar-training.svg",
  "experiential-marketing": "/images/contact/pillar-experiential.svg",
};

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  "audits-compliance": ClipboardCheck,
  "assisted-sales-training": Presentation,
  construction: Hammer,
  merchandising: ShoppingBag,
  "break-fix": Wrench,
  "warehousing-fulfillment-logistics": Truck,
  "curriculum-program-design": BookOpen,
  "instructor-sourcing-certification": BadgeCheck,
  "training-delivery": GraduationCap,
  "audience-enablement-program": Users,
  "brand-activations": Sparkles,
  "conferences-b2b-events": CalendarDays,
  "employee-engagement": HeartHandshake,
};

const MESSAGE_MAX_LENGTH = 2000;

/**
 * Reads the `?source=` value pillar pages link with: "<pillar>" starts on the
 * service step with that pillar chosen, "<pillar>-<solution>" starts on the
 * contact details with both chosen. Anything else starts at the beginning.
 */
function parseSource(source: string | undefined): {
  pillar: string;
  solution: string;
  step: number;
} {
  const none = { pillar: "", solution: "", step: 0 };
  if (!source) return none;
  for (const p of pillars) {
    if (source === p.slug) return { pillar: p.slug, solution: "", step: 1 };
    if (source.startsWith(`${p.slug}-`)) {
      const slug = source.slice(p.slug.length + 1);
      if (p.solutions.some((s) => s.slug === slug)) {
        return { pillar: p.slug, solution: slug, step: 2 };
      }
    }
  }
  return none;
}

/**
 * Keeps `?source=` in the address bar in step with the visitor's choices.
 * window.location.href goes to HubSpot with each submission (as the page URL
 * and tracking_landing_page), which is how the pillar reaches HubSpot without
 * a dedicated property.
 */
function setSourceParam(value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("source", value);
  window.history.replaceState(window.history.state, "", url);
}

const choiceButtonClasses =
  "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[3px] border border-[#d7e2e5] bg-white p-4 text-center text-xs leading-4 text-[#172d37] transition-colors hover:border-cerulean focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerulean aria-pressed:border-cerulean aria-pressed:bg-cerulean/5";
const choiceLegendClasses = "mb-2 text-base leading-6 font-bold text-[#172d37]";


/**
 * Best-effort substitute for the UTM/referrer attribution the site's CF7-HubSpot
 * plugin normally derives server-side — that plugin's classification logic isn't
 * ours to replicate, so this just forwards raw UTM params when a campaign link
 * includes them, rather than dropping attribution silently.
 */
function getUtmTrackingFields(): { name: string; value: string }[] {
  if (typeof window === "undefined") return [];
  const params = new URLSearchParams(window.location.search);

  return [
    { name: "tracking_channel", value: params.get("utm_source") ?? "" },
    { name: "tracking_channel_drilldown_1", value: params.get("utm_medium") ?? "" },
    { name: "tracking_channel_drilldown_2", value: params.get("utm_campaign") ?? "" },
    { name: "tracking_channel_drilldown_3", value: params.get("utm_term") ?? "" },
    { name: "tracking_landing_page", value: window.location.href },
  ];
}

function normalizeWebsite(value: string): string {
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function isValidWebsite(value: string): boolean {
  if (!value) return true;
  try {
    new URL(normalizeWebsite(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats as (nnn) nnn-nnnn while typing. Punctuation is only added once the
 * next digit exists, so backspacing through it never gets stuck. A leading
 * US country code from autofill or paste ("+1 555…") is dropped.
 */
function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const BUSINESS_EMAIL_ERROR = "Please use your business email address to submit this form.";

type FieldErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  website?: string;
};

function validateContactFields(formData: FormData): FieldErrors {
  const firstname = String(formData.get("firstname") || "").trim();
  const lastname = String(formData.get("lastname") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const website = String(formData.get("website") || "").trim();

  const errors: FieldErrors = {};
  if (!firstname) errors.firstname = "First name is required.";
  if (!lastname) errors.lastname = "Last name is required.";
  if (!email) {
    errors.email = "Business email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (!isBusinessEmail(email)) {
    errors.email = BUSINESS_EMAIL_ERROR;
  }
  if (website && !isValidWebsite(website)) {
    errors.website = "Please enter a valid website address.";
  }
  return errors;
}

// The form is shown one step at a time, but every field stays inside the one
// <form> (inactive steps are just hidden), so submission gathers all of them
// exactly as before.
const STEPS = ["How can we help", "What you need", "Your details", "Anything else"] as const;
const SERVICE_STEP = 1;
const CONTACT_STEP = 2;
const LAST_STEP = STEPS.length - 1;

export function StartProjectForm({ initialSource }: { initialSource?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [initial] = useState(() => parseSource(initialSource));
  const [step, setStep] = useState(initial.step);
  const [pillarSlug, setPillarSlug] = useState(initial.pillar);
  const [solutionSlug, setSolutionSlug] = useState(initial.solution);
  const pillar: PillarConfig | undefined = pillars.find((p) => p.slug === pillarSlug);
  const interest = pillar?.solutions.find((s) => s.slug === solutionSlug)?.label ?? "";
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);
  const movedRef = useRef(false);

  // After moving between steps (not on first render), put focus on the new
  // step's first field so keyboard and screen-reader users land in place.
  useEffect(() => {
    if (!movedRef.current) return;
    stepRefs.current[step]?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();
  }, [step]);

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function goToStep(next: number) {
    movedRef.current = true;
    setStep(next);
  }

  function choosePillar(slug: string) {
    // Solutions belong to one pillar, so switching pillars clears the old one.
    if (slug !== pillarSlug) setSolutionSlug("");
    setPillarSlug(slug);
    setSourceParam(slug);
    goToStep(SERVICE_STEP);
  }

  function chooseSolution(slug: string) {
    setSolutionSlug(slug);
    setSourceParam(`${pillarSlug}-${slug}`);
    goToStep(CONTACT_STEP);
  }

  function goNext() {
    if (step === CONTACT_STEP && formRef.current) {
      const nextFieldErrors = validateContactFields(new FormData(formRef.current));
      setFieldErrors(nextFieldErrors);
      if (Object.values(nextFieldErrors).some(Boolean)) return;
    }
    goToStep(Math.min(step + 1, LAST_STEP));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Enter on an earlier step advances instead of submitting.
    if (step < LAST_STEP) {
      goNext();
      return;
    }

    setError(null);

    const formData = new FormData(e.currentTarget);

    // Honeypot: real users never fill this hidden field. Bots that do get a
    // fake success so they don't learn to route around it.
    if (String(formData.get("company_website") || "").trim() !== "") {
      setStatus("success");
      return;
    }

    const firstname = String(formData.get("firstname") || "").trim();
    const lastname = String(formData.get("lastname") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim().slice(0, MESSAGE_MAX_LENGTH);

    const nextFieldErrors = validateContactFields(formData);
    setFieldErrors(nextFieldErrors);
    if (Object.values(nextFieldErrors).some(Boolean)) {
      goToStep(CONTACT_STEP);
      return;
    }

    setStatus("submitting");

    const fields = [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "phone", value: phone },
      { name: "email", value: email },
      { name: "website", value: website ? normalizeWebsite(website) : "" },
      {
        name: "channel_partners_interest_contact_form",
        value: String(formData.get("interest") || ""),
      },
      { name: "channel_partners_contact_form_additional_information", value: message },
      { name: "newsletter_request", value: formData.get("newsletter") ? "true" : "false" },
      ...getUtmTrackingFields(),
    ].filter((field) => field.value !== "");

    try {
      const recaptchaToken = await getRecaptchaToken("start_project_form").catch((err) => {
        // Local testing only: the current site key is rejected by Google, so let
        // `next dev` submit without a token. Production builds still require one.
        if (process.env.NODE_ENV !== "development") throw err;
        console.warn("[recaptcha] Skipping in development:", err);
        return undefined;
      });
      await submitContactForm(fields, recaptchaToken);
      window.dataLayer?.push({ event: "generate_lead", form_name: "start_project_form" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-base text-black">
        Thanks for reaching out — a member of our team will be in touch shortly.
      </p>
    );
  }

  const stepClasses = "flex min-w-0 flex-col gap-6 border-0 p-0";
  const nextButtonClasses = primaryButtonClasses;
  const backButtonClasses =
    "cursor-pointer text-xs font-bold uppercase tracking-[0.6px] text-middle-grey underline underline-offset-4 hover:text-cerulean";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot field — visually hidden from real users, left unfilled by them */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company Website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="interest" value={interest} />

      {/* The two choice steps read as part of the page intro, so the step
          counter only appears from the contact details on. */}
      <p
        className="text-xs font-bold uppercase tracking-[0.6px] text-cerulean"
        aria-live="polite"
        hidden={step < CONTACT_STEP}
      >
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>

      {/* Step 1: pillar. No Next button on the choice steps: picking an
          option records it and moves straight on. */}
      <fieldset
        ref={(el) => {
          stepRefs.current[0] = el;
        }}
        hidden={step !== 0}
        className={stepClasses}
      >
        <legend className="sr-only">{STEPS[0]}</legend>
        <fieldset className="min-w-0 border-0 p-0">
          <legend className={choiceLegendClasses}>How Can We Help?</legend>
          <div className="grid max-w-[516px] grid-cols-3 gap-2">
            {pillars.map((p) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={pillarSlug === p.slug}
                onClick={() => choosePillar(p.slug)}
                className={choiceButtonClasses}
              >
                <Image src={PILLAR_ICONS[p.slug]} alt="" width={24} height={24} aria-hidden />
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>
      </fieldset>

      {/* Step 2: the chosen pillar's solutions */}
      <fieldset
        ref={(el) => {
          stepRefs.current[1] = el;
        }}
        hidden={step !== 1}
        className={stepClasses}
      >
        <legend className="sr-only">{STEPS[1]}</legend>
        <fieldset className="min-w-0 border-0 p-0">
          <legend className={choiceLegendClasses}>I&rsquo;m Interested In:</legend>
          <div className="grid max-w-[516px] grid-cols-2 gap-2 sm:grid-cols-3">
            {pillar?.solutions.map((solution) => {
              const Icon = SOLUTION_ICONS[solution.slug];
              return (
                <button
                  key={solution.slug}
                  type="button"
                  aria-pressed={solutionSlug === solution.slug}
                  onClick={() => chooseSolution(solution.slug)}
                  className={choiceButtonClasses}
                >
                  {Icon && (
                    <Icon aria-hidden strokeWidth={1.5} className="size-6 shrink-0 text-[#087c83]" />
                  )}
                  {solution.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </fieldset>

      {/* Step 3: contact details */}
      <fieldset
        ref={(el) => {
          stepRefs.current[2] = el;
        }}
        hidden={step !== 2}
        className={stepClasses}
      >
        <legend className="sr-only">{STEPS[2]}</legend>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            <label className={labelClasses} htmlFor="firstname">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              className={inputClasses}
              onChange={() => clearFieldError("firstname")}
            />
            {fieldErrors.firstname && <p className={errorClasses}>{fieldErrors.firstname}</p>}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className={labelClasses} htmlFor="lastname">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              className={inputClasses}
              onChange={() => clearFieldError("lastname")}
            />
            {fieldErrors.lastname && <p className={errorClasses}>{fieldErrors.lastname}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1">
            <label className={labelClasses} htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              className={inputClasses}
              onChange={(e) => {
                e.currentTarget.value = formatPhone(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label className={labelClasses} htmlFor="email">
              Business Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClasses}
              onChange={() => clearFieldError("email")}
            />
            {fieldErrors.email && <p className={errorClasses}>{fieldErrors.email}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClasses} htmlFor="website">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            className={inputClasses}
            onChange={() => clearFieldError("website")}
          />
          {fieldErrors.website && <p className={errorClasses}>{fieldErrors.website}</p>}
        </div>
      </fieldset>

      {/* Step 4: anything else, then submit */}
      <fieldset
        ref={(el) => {
          stepRefs.current[3] = el;
        }}
        hidden={step !== 3}
        className={stepClasses}
      >
        <legend className="sr-only">{STEPS[3]}</legend>
        <div className="flex flex-col gap-1">
          <label className={labelClasses} htmlFor="message">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={MESSAGE_MAX_LENGTH}
            className={`${inputClasses} resize-y`}
          />
        </div>

        <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-middle-grey">
          <input type="checkbox" name="newsletter" className="size-5 rounded border border-middle-grey" />
          I would like to receive updates from Channel Partners
        </label>

        {/* Notice at collection. TODO(legal): wording to be approved by counsel. */}
        <p className="text-sm text-middle-grey">
          By submitting this form, you agree to our{" "}
          {PRIVACY_POLICY_URL ? (
            <a
              href={PRIVACY_POLICY_URL}
              className="underline underline-offset-2 hover:text-cerulean"
            >
              Privacy Policy
            </a>
          ) : (
            <>
              Privacy Policy{" "}
              <VerifyBadge owner="Legal" note="Link the Privacy Policy once the page exists" />
            </>
          )}
          . We&rsquo;ll use your information to respond to your inquiry.
        </p>
      </fieldset>

      {error && <p className={errorClasses}>{error}</p>}

      {/* The service step only needs Back (to change pillar); the pillar step
          needs neither. */}
      <div className="flex items-center gap-6" hidden={step === 0}>
        {/* Distinct keys make React swap in a new element instead of flipping
            the Next button's type to "submit" mid-click, which would let that
            same click submit the form as soon as the last step appears. */}
        {step === SERVICE_STEP ? null : step < LAST_STEP ? (
          <button key="next" type="button" onClick={goNext} className={nextButtonClasses}>
            Next
          </button>
        ) : (
          <button key="submit" type="submit" disabled={status === "submitting"} className={nextButtonClasses}>
            {status === "submitting" ? "Submitting…" : "Submit"}
          </button>
        )}
        {step > 0 && (
          <button type="button" onClick={() => goToStep(step - 1)} className={backButtonClasses}>
            Back
          </button>
        )}
      </div>
    </form>
  );
}
