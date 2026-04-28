import { describe, expect, it } from "vitest";
import { isNonEmpty, minLength } from "./formRules.js";

describe("formRules", () => {
  it("isNonEmpty rejects whitespace-only", () => {
    expect(isNonEmpty("   ")).toBe(false);
  });

  it("minLength accepts boundary", () => {
    expect(minLength("abcdef", 6)).toBe(true);
    expect(minLength("abcde", 6)).toBe(false);
  });
});
