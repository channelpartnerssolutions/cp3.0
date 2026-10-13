"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CloseButton } from "@/components/ui/CloseButton";
import { useDialog } from "@/components/ui/useDialog";
import { getRecaptchaToken } from "@/lib/recaptcha";
import {
  EMAIL_PATTERN,
  errorClasses,
  inputClasses,
  labelClasses,
  primaryButtonClasses,
} from "./formStyles";

const SITUATION_MAX_LENGTH = 2000;

type Field = "firstname" | "lastname" | "email" | "situation";
type FieldErrors = Partial<Record<Field, string>>;

const REQUIRED_MESSAGES: Record<Field, string> = {
  firstname: "First name is required.",
  lastname: "Last name is required.",
  email: "Work email is required.",
  situation: "Please describe your situation.",
};

function EmployeeSupportForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearFieldError(field: Field) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    // Honeypot: real users never fill this hidden field.
    if (String(formData.get("company_website") || "").trim() !== "") {
      setStatus("success");
      return;
    }

    const values = Object.fromEntries(
      (Object.keys(REQUIRED_MESSAGES) as Field[]).map((field) => [
        field,
        String(formData.get(field) || "").trim(),
      ])
    ) as Record<Field, string>;

    const nextErrors: FieldErrors = {};
    for (const field of Object.keys(REQUIRED_MESSAGES) as Field[]) {
      if (!values[field]) nextErrors[field] = REQUIRED_MESSAGES[field];
    }
    if (values.email && !EMAIL_PATTERN.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setFieldErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("submitting");
    try {
      const recaptchaToken = await getRecaptchaToken("employee_support").catch((err) => {
        // Local testing only, same as StartProjectForm: `next dev` may submit
        // without a token. Production builds still require one.
        if (process.env.NODE_ENV !== "development") throw err;
        console.warn("[recaptcha] Skipping in development:", err);
        return undefined;
      });
      const res = await fetch("/api/employee-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-base text-black">
        Thanks — your message is on its way to HR, and someone will follow up with you directly.
      </p>
    );
  }

  const field = (
    name: Field,
    label: string,
    input: (props: { id: string; name: string; className: string; onChange: () => void }) => ReactNode
  ) => (
    <div className="flex flex-1 flex-col gap-1">
      <label className={labelClasses} htmlFor={`es-${name}`}>
        {label}
        <span className="text-red-600">*</span>
      </label>
      {input({
        id: `es-${name}`,
        name,
        className: inputClasses,
        onChange: () => clearFieldError(name),
      })}
      {fieldErrors[name] && <p className={errorClasses}>{fieldErrors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot field — visually hidden from real users, left unfilled by them */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="es-company_website">Company Website</label>
        <input id="es-company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {field("firstname", "First Name", (props) => (
          <input {...props} type="text" autoComplete="given-name" />
        ))}
        {field("lastname", "Last Name", (props) => (
          <input {...props} type="text" autoComplete="family-name" />
        ))}
      </div>
      {field("email", "Work Email", (props) => (
        <input {...props} type="email" autoComplete="email" />
      ))}
      {field("situation", "Describe Your Situation", (props) => (
        <textarea
          {...props}
          rows={4}
          maxLength={SITUATION_MAX_LENGTH}
          className={`${props.className} resize-y`}
        />
      ))}

      {error && <p className={errorClasses}>{error}</p>}

      <button type="submit" disabled={status === "submitting"} className={primaryButtonClasses}>
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}

function EmployeeSupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useDialog<HTMLDivElement>(open, onClose);
  const headingId = useId();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121e23]/80 p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-lg border border-light-grey bg-[#fafafa] p-8 outline-none md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <h2 id={headingId} className="header-3 pr-10 text-black">
          employee support
        </h2>
        <p className="mt-2 text-base leading-6 text-black">
          Tell us what&rsquo;s going on and Channel Partners HR will follow up with you directly.
        </p>
        <div className="mt-6">
          <EmployeeSupportForm />
        </div>
      </div>
    </div>
  );
}

// "Already on the team?" link for the contact page. The modal unmounts when
// closed, so reopening it always starts with a fresh form.
export function EmployeeSupportLink() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <p className="text-base text-middle-grey">Already on the team?</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-left text-2xl leading-8 text-black underline underline-offset-4 hover:text-cerulean"
        >
          Get Employee Support
        </button>
      </div>
      <EmployeeSupportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
