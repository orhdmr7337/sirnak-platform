interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

function cleanExpired(entry: RateLimitEntry, windowMs: number): void {
  const now = Date.now();
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
}

export function checkRateLimit(
  identifier: string,
  limit = 3,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  let entry = store.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(identifier, entry);
  }

  cleanExpired(entry, windowMs);

  if (entry.timestamps.length >= limit) {
    const oldest = entry.timestamps[0];
    const retryAfterMs = windowMs - (Date.now() - oldest);
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  entry.timestamps.push(Date.now());
  return { allowed: true, remaining: limit - entry.timestamps.length, retryAfterMs: 0 };
}

export function getRateLimitInfo(
  identifier: string,
  limit = 3,
  windowMs = 10 * 60 * 1000
): { count: number; remaining: number; resetsAtMs: number } {
  let entry = store.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(identifier, entry);
  }

  cleanExpired(entry, windowMs);

  const count = entry.timestamps.length;
  const resetsAtMs =
    count > 0 ? entry.timestamps[0] + windowMs : Date.now();

  return { count, remaining: Math.max(0, limit - count), resetsAtMs };
}
