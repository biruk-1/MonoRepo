import { truncate } from "./stringUtils.js";

/**
 * One-screen diagnostics string for instructors / support demos (no secrets beyond email).
 * @param {{ email: string, lastSignInAt: string | null | undefined, now?: Date }} p
 */
export function buildSupportBundle({ email, lastSignInAt, now = new Date() }) {
  const e =
    typeof email === "string" && email.trim()
      ? truncate(email.trim(), 48)
      : "(none)";
  const last = lastSignInAt && String(lastSignInAt).trim() ? String(lastSignInAt).trim() : "(none)";
  return [
    "bundle=system-app-login-support",
    `email=${e}`,
    `lastSignIn=${last}`,
    `generated=${now.toISOString()}`,
  ].join("\n");
}
