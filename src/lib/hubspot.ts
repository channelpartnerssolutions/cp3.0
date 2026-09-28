export type HubspotFieldValue = { name: string; value: string };
export type HubspotContext = { pageUri?: string; pageName?: string; hutk?: string };

/** Server-side: submits directly to HubSpot's Forms Submission API. */
export async function submitToHubspot({
  portalId,
  formId,
  fields,
  context,
}: {
  portalId: string;
  formId: string;
  fields: HubspotFieldValue[];
  context?: HubspotContext;
}) {
  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, context }),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const message =
      data?.errors?.[0]?.message || data?.message || "Something went wrong submitting the form.";
    throw new Error(message);
  }

  return res.json();
}

function getHubspotTrackingCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1];
}

/** Client-side: submits through our own API route, which re-validates and forwards to HubSpot. */
export async function submitContactForm(fields: HubspotFieldValue[], recaptchaToken?: string) {
  const hutk = getHubspotTrackingCookie();

  const res = await fetch("/api/contact-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields,
      recaptchaToken,
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        ...(hutk ? { hutk } : {}),
      },
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong submitting the form.");
  }
  return data;
}
