// Best-effort per-IP rate limiting for form endpoints. Counts live in this
// server instance's memory, so separate serverless instances each keep their
// own; a Vercel Firewall rate-limit rule is the sturdier backstop (see go-live
// list).
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);

    // Keep the map from growing without bound on a long-lived instance.
    if (hits.size > 5000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return false;
  };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
