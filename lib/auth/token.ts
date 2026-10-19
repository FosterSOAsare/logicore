import { createHash, createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "logicore_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    console.error(
      "SESSION_SECRET is missing or shorter than 32 characters. Admin sign-in is disabled."
    );
    return null;
  }
  return secret;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  // Hash both sides so the comparison is constant-time regardless of length
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Token format: `<expiresAtUnixSeconds>.<hmac>`
 */
export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload, secret))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now() / 1000;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("ADMIN_PASSWORD is not set. Admin sign-in is disabled.");
    return false;
  }
  return safeEqual(password, expected);
}
