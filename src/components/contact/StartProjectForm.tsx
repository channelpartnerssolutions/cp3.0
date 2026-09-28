"use client";

import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/lib/hubspot";
import { isBusinessEmail } from "@/lib/business-email";
import { getRecaptchaToken } from "@/lib/recaptcha";

const INTEREST_OPTIONS = [
  "Assisted Sales & Product Training (AS&T)",
  "Audits & Compliance Services",
  "Campaign Rollouts & Seasonal Support",
  "Experiential Marketing & Brand Ambassadors",
  "Fixture & Display Installation",
  "Graphics & Signage Installation",
  "Logistics, Warehousing & Distribution",
  "National Training and Award Events",
  "New Store Openings",
  "Retail Merchandising Services",
  "Store Construction & Remodels",
];

const MESSAGE_MAX_LENGTH = 2000;

const inputClasses =
  "w-full rounded border border-middle-grey bg-white p-4 text-base text-black focus:border-cerulean focus:outline-none";
const labelClasses =
  "flex items-center text-[11px] font-semibold uppercase tracking-[0.15em] text-middle-grey";
const errorClasses = "text-sm text-red-600";

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BUSINESS_EMAIL_ERROR = "Please use your business email address to submit this form.";

type FieldErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  website?: string;
};

export function StartProjectForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    const nextFieldErrors: FieldErrors = {};
    if (!firstname) nextFieldErrors.firstname = "First name is required.";
    if (!lastname) nextFieldErrors.lastname = "Last name is required.";
    if (!email) {
      nextFieldErrors.email = "Business email is required.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextFieldErrors.email = "Please enter a valid email address.";
    } else if (!isBusinessEmail(email)) {
      nextFieldErrors.email = BUSINESS_EMAIL_ERROR;
    }
    if (website && !isValidWebsite(website)) {
      nextFieldErrors.website = "Please enter a valid website address.";
    }

    setFieldErrors(nextFieldErrors);
    if (Object.values(nextFieldErrors).some(Boolean)) return;

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
      const recaptchaToken = await getRecaptchaToken("start_project_form");
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

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
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
          <input id="phone" name="phone" type="tel" className={inputClasses} />
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

      <div className="flex flex-col gap-1">
        <label className={labelClasses} htmlFor="interest">
          I&rsquo;m Most Interested In
        </label>
        <select id="interest" name="interest" defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Select Option
          </option>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-middle-grey">
        <input type="checkbox" name="newsletter" className="size-5 rounded border border-middle-grey" />
        I would like to receive updates from Channel Partners
      </label>

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

      {error && <p className={errorClasses}>{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit cursor-pointer items-center justify-center rounded bg-cerulean px-4 py-2 text-xs font-bold uppercase tracking-[0.6px] text-white transition-colors hover:bg-cerulean-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
