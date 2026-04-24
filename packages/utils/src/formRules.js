/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * @param {unknown} value
 * @param {number} min
 * @returns {boolean}
 */
export function minLength(value, min) {
  if (typeof value !== "string") {
    return false;
  }
  return value.length >= min;
}
