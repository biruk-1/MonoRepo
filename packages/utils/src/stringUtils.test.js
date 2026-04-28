import { describe, expect, it } from "vitest";
import { truncate } from "./stringUtils.js";
import { passwordStrengthLabel } from "./passwordHint.js";

describe("truncate", () => {
  it("leaves short strings unchanged", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });

  it("adds suffix when longer", () => {
    expect(truncate("hello world", 8)).toBe("hello w…");
  });
});

describe("passwordStrengthLabel", () => {
  it("returns dash for empty", () => {
    expect(passwordStrengthLabel("")).toBe("—");
  });

  it("marks longer mixed passwords stronger", () => {
    expect(passwordStrengthLabel("abc")).toBe("weak");
    expect(passwordStrengthLabel("Abcdef1longer")).toMatch(/ok|strong/);
  });
});
