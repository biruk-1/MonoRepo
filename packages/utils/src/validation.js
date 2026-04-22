/**
 * Returns true if the string looks like a valid email (simple check for demos).
 * @param {string} value
 * @returns {boolean}
 */
export function isValidEmail(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
