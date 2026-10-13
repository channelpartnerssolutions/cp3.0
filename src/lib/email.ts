// Server-side: sends a transactional email through Resend's REST API.
//
// Needs RESEND_API_KEY. RESEND_FROM must be an address on a domain verified in
// Resend (e.g. "Channel Partners Website <noreply@channelpartners.com>"). Until
// channelpartners.com is verified, the fallback onboarding@resend.dev sender
// only delivers to the Resend account owner's own address.
const DEFAULT_FROM = "Channel Partners Website <onboarding@resend.dev>";

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to,
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(`Resend ${res.status}: ${data?.message ?? "request failed"}`);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
