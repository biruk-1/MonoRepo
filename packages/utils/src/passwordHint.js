/**
 * Rough strength label for UI hints only (not security grading).
 * @param {string} password
 * @returns {"—" | "weak" | "ok" | "strong"}
 */
export function passwordStrengthLabel(password) {
  if (typeof password !== "string" || password.length === 0) {
    return "—";
  }
  const len = password.length;
  const hasMixed = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNum = /\d/.test(password);
  let score = 0;
  if (len >= 6) {
    score++;
  }
  if (len >= 10) {
    score++;
  }
  if (hasMixed) {
    score++;
  }
  if (hasNum) {
    score++;
  }
  if (score <= 1) {
    return "weak";
  }
  if (score <= 3) {
    return "ok";
  }
  return "strong";
}
