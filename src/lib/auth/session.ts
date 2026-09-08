// Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
// `crypto` module so this file works in both the Node.js runtime (API routes)
// and the Edge runtime (middleware).

const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 7 * 1000; // 7 days
const DEFAULT_FALLBACK_SECRET = "mramzan_admin_2025";

function getSecret(): string {
  return process.env.ADMIN_SECRET_KEY || DEFAULT_FALLBACK_SECRET;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function sign(payload: string): Promise<string> {
  const key = await importKey(getSecret());
  const signatureBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Buffer.from(signatureBuf).toString("hex");
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `admin:${expires}`;
  const signature = await sign(payload);
  return `${payload}:${signature}`;
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [scope, expiresStr, signature] = parts;
  const payload = `${scope}:${expiresStr}`;

  let expected: string;
  try {
    expected = await sign(payload);
  } catch {
    return false;
  }

  if (!timingSafeEqualHex(signature, expected)) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  return scope === "admin";
}

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;
