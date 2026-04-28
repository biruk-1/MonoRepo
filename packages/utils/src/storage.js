const hasWindow = () => typeof globalThis.window !== "undefined";

/**
 * Read and parse JSON from localStorage. Returns null if missing or invalid.
 * @template T
 * @param {string} key
 * @returns {T | null}
 */
export function getStorageJSON(key) {
  if (!hasWindow()) {
    return null;
  }
  try {
    const raw = globalThis.window.localStorage.getItem(key);
    if (raw == null) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * @param {string} key
 * @param {unknown} value
 * @returns {boolean}
 */
export function setStorageJSON(key, value) {
  if (!hasWindow()) {
    return false;
  }
  try {
    globalThis.window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** @param {string} key */
export function removeStorageItem(key) {
  if (!hasWindow()) {
    return;
  }
  try {
    globalThis.window.localStorage.removeItem(key);
  } catch {
    /* ignore quota / private mode */
  }
}

/** Workspace-local key for remembered login email (demo only). */
export const REMEMBER_EMAIL_KEY = "monorepo:remembered-email";
