import { NextResponse } from "next/server";
import { submitToHubspot, type HubspotContext, type HubspotFieldValue } from "@/lib/hubspot";
import { isBusinessEmail } from "@/lib/business-email";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

const HUBSPOT_PORTAL_ID = "45412593";
const HUBSPOT_FORM_ID = "4a6b1808-5dea-4843-8b32-0eb362bce2bd";

// Only these HubSpot fields are forwarded, each capped in length. Anything else
// in the request is dropped, so a direct POST can't write other contact
// properties or push oversized values. Keep in sync with StartProjectForm.
const FIELD_LIMITS: Record<string, number> = {
  firstname: 100,
  lastname: 100,
  email: 254,
  phone: 40,
  website: 500,
  channel_partners_interest_contact_form: 200,
  channel_partners_contact_form_additional_information: 2000,
  newsletter_request: 5,
  tracking_channel: 500,
  tracking_channel_drilldown_1: 500,
  tracking_channel_drilldown_2: 500,
  tracking_channel_drilldown_3: 500,
  tracking_landing_page: 2000,
};

const GENERIC_ERROR = "Something went wrong submitting the form. Please try again.";

const isRateLimited = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function sanitizeFields(raw: unknown): HubspotFieldValue[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const fields: HubspotFieldValue[] = [];
  for (const item of raw) {
    if (!item || typeof item.name !== "string" || typeof item.value !== "string") continue;
    const limit = FIELD_LIMITS[item.name];
    if (!limit || seen.has(item.name)) continue;
    seen.add(item.name);
    const value = item.value.trim().slice(0, limit);
    if (value) fields.push({ name: item.name, value });
  }
  return fields;
}

function sanitizeContext(raw: unknown): HubspotContext | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const { pageUri, pageName, hutk } = raw as Record<string, unknown>;
  const text = (value: unknown, limit: number) =>
    typeof value === "string" && value ? value.slice(0, limit) : undefined;
  return {
    pageUri: text(pageUri, 2000),
    pageName: text(pageName, 300),
    hutk: text(hutk, 100),
  };
}

type ContactFormBody = {
  fields?: unknown;
  context?: unknown;
  recaptchaToken?: unknown;
};

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let body: ContactFormBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fields = sanitizeFields(body.fields);
  const email = fields.find((field) => field.name === "email")?.value;

  if (!email) {
    return NextResponse.json({ error: "Business email is required." }, { status: 400 });
  }
  if (!isBusinessEmail(email)) {
    return NextResponse.json(
      { error: "Please use your business email address to submit this form." },
      { status: 400 }
    );
  }

  const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken : undefined;
  // No-op until RECAPTCHA_SECRET_KEY is configured — see verifyRecaptchaToken.
  // Under `next dev` the form may arrive without a token (see StartProjectForm),
  // so only verify one when it's present there.
  const skipRecaptcha = process.env.NODE_ENV === "development" && !recaptchaToken;
  const recaptcha = skipRecaptcha ? { success: true } : await verifyRecaptchaToken(recaptchaToken);
  if (!recaptcha.success) {
    return NextResponse.json(
      { error: "We couldn't verify your submission. Please try again." },
      { status: 400 }
    );
  }

  try {
    await submitToHubspot({
      portalId: HUBSPOT_PORTAL_ID,
      formId: HUBSPOT_FORM_ID,
      fields,
      context: sanitizeContext(body.context),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    // HubSpot's own error text stays in the server logs, not in front of visitors.
    console.error("[contact-form] HubSpot submission failed:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}
