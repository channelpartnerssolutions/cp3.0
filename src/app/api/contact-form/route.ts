import { NextResponse } from "next/server";
import { submitToHubspot, type HubspotContext, type HubspotFieldValue } from "@/lib/hubspot";
import { isBusinessEmail } from "@/lib/business-email";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

const HUBSPOT_PORTAL_ID = "45412593";
const HUBSPOT_FORM_ID = "4a6b1808-5dea-4843-8b32-0eb362bce2bd";

type ContactFormBody = {
  fields?: HubspotFieldValue[];
  context?: HubspotContext;
  recaptchaToken?: string;
};

export async function POST(request: Request) {
  let body: ContactFormBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fields = Array.isArray(body.fields) ? body.fields : [];
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

  // No-op until RECAPTCHA_SECRET_KEY is configured — see verifyRecaptchaToken.
  const recaptcha = await verifyRecaptchaToken(body.recaptchaToken);
  if (!recaptcha.success) {
    return NextResponse.json(
      { error: "We couldn't verify your submission. Please try again." },
      { status: 400 }
    );
  }

  try {
    const result = await submitToHubspot({
      portalId: HUBSPOT_PORTAL_ID,
      formId: HUBSPOT_FORM_ID,
      fields,
      context: body.context,
    });
    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong submitting the form.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
