import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getStorageJSON,
  removeStorageItem,
  setStorageJSON,
} from "./storage.js";

describe("storage helpers", () => {
  const store = new Map();

  afterEach(() => {
    store.clear();
    vi.unstubAllGlobals();
  });

  it("round-trips JSON", () => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => {
          store.set(k, v);
        },
        removeItem: (k) => {
          store.delete(k);
        },
      },
    });
    expect(setStorageJSON("k", { a: 1 })).toBe(true);
    expect(getStorageJSON("k")).toEqual({ a: 1 });
    removeStorageItem("k");
    expect(getStorageJSON("k")).toBe(null);
  });

  it("returns null for invalid JSON", () => {
    store.set("bad", "{");
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, v),
        removeItem: (k) => store.delete(k),
      },
    });
    expect(getStorageJSON("bad")).toBe(null);
  });
});
