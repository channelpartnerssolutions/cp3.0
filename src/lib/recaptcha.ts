export const RECAPTCHA_SITE_KEY = "6LcBTCYsAAAAAFqqIM2wUvmExbz7rVvDtWJHmSxo";
const RECAPTCHA_MIN_SCORE = 0.5;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

  return scriptPromise;
}

/** Client-side: loads the reCAPTCHA v3 script and returns a fresh token for the given action. */
export async function getRecaptchaToken(action: string): Promise<string> {
  await loadRecaptchaScript();

  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA failed to load."));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve, reject);
    });
  });
}

/**
 * Server-side: verifies a reCAPTCHA v3 token against Google's siteverify endpoint.
 *
 * TODO: set the RECAPTCHA_SECRET_KEY env var once it's available (we currently only
 * have the public site key). Until then this is a no-op that always passes — the
 * client-side integration is wired up, but nothing is actually being verified yet.
 */
export async function verifyRecaptchaToken(
  token: string | undefined
): Promise<{ success: boolean; score?: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn(
      "[recaptcha] RECAPTCHA_SECRET_KEY is not set — skipping verification (inactive)."
    );
    return { success: true };
  }

  if (!token) return { success: false };

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: secretKey, response: token }),
  });

  const data = await res.json();
  const score = typeof data.score === "number" ? data.score : undefined;
  const success = Boolean(data.success) && (score === undefined || score >= RECAPTCHA_MIN_SCORE);

  return { success, score };
}
