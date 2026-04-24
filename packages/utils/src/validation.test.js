import { describe, expect, it } from "vitest";
import { isValidEmail } from "./validation.js";
import { isNonEmpty, minLength } from "./formRules.js";

describe("isValidEmail", () => {
  it("accepts a simple valid address", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
  });

  it("rejects missing @", () => {
    expect(isValidEmail("ab.co")).toBe(false);
  });

  it("rejects empty or whitespace", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
  });
});

describe("formRules", () => {
  it("isNonEmpty", () => {
    expect(isNonEmpty("x")).toBe(true);
    expect(isNonEmpty("")).toBe(false);
    expect(isNonEmpty("  ")).toBe(false);
  });

  it("minLength", () => {
    expect(minLength("123456", 6)).toBe(true);
    expect(minLength("12345", 6)).toBe(false);
  });
});
