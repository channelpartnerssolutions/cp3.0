import freeEmailDomains from "./data/free-email-domains.json";

const FREE_EMAIL_DOMAINS = new Set<string>(freeEmailDomains as string[]);

export function isBusinessEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@").at(-1);
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}
