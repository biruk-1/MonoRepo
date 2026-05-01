/**
 * Copy plain text using the Clipboard API when available.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyTextToClipboard(text) {
  if (typeof globalThis.navigator?.clipboard?.writeText !== "function") {
    return false;
  }
  try {
    await globalThis.navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
