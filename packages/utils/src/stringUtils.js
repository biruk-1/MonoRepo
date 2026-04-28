/**
 * @param {string} str
 * @param {number} maxLen
 * @param {string} [suffix]
 * @returns {string}
 */
export function truncate(str, maxLen, suffix = "…") {
  if (typeof str !== "string") {
    return "";
  }
  if (str.length <= maxLen) {
    return str;
  }
  const end = Math.max(0, maxLen - suffix.length);
  return str.slice(0, end) + suffix;
}
