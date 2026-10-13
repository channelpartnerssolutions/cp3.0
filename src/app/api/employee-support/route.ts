import { NextResponse } from "next/server";
import { escapeHtml, sendEmail } from "@/lib/email";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

// The live site sends to HR; every other environment (local, previews) sends
// to the test inbox so trial submissions never reach HR.
const RECIPIENT =
  process.env.VERCEL_ENV === "production"
    ? "HR@ChannelPartners.com"
    : "Adam.Radabaugh@ChannelPartners.com";

const FIELD_LIMITS = {
  firstname: 100,
  lastname: 100,
  email: 254,
  situation: 2000,
} as const;

type Field = keyof typeof FIELD_LIMITS;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = "Something went wrong sending your message. Please try again.";

const isRateLimited = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const values = {} as Record<Field, string>;
  for (const [field, limit] of Object.entries(FIELD_LIMITS) as [Field, number][]) {
    const raw = body[field];
    values[field] = typeof raw === "string" ? raw.trim().slice(0, limit) : "";
    if (!values[field]) {
      return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
    }
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken : undefined;
  // Same local-testing allowance as the contact form: under `next dev` a
  // missing token is accepted. Production builds always verify.
  const skipRecaptcha = process.env.NODE_ENV === "development" && !recaptchaToken;
  const recaptcha = skipRecaptcha ? { success: true } : await verifyRecaptchaToken(recaptchaToken);
  if (!recaptcha.success) {
    return NextResponse.json(
      { error: "We couldn't verify your submission. Please try again." },
      { status: 400 }
    );
  }

  const name = `${values.firstname} ${values.lastname}`.replace(/\s+/g, " ");
  const rows: [string, string][] = [
    ["Name", name],
    ["Work email", values.email],
    ["Situation", values.situation],
  ];

  try {
    await sendEmail({
      to: RECIPIENT,
      // Replying goes straight to the employee.
      replyTo: values.email,
      subject: `Employee support request: ${name}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
      html: `<p>New employee support request from the Channel Partners website.</p>
${rows
  .map(
    ([label, value]) =>
      `<p><strong>${label}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`
  )
  .join("\n")}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[employee-support] Email send failed:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}
