import { describe, expect, it } from "vitest";
import { formatCompact, formatInteger } from "./numberFormat.js";

describe("formatInteger", () => {
  it("formats whole numbers with grouping", () => {
    const s = formatInteger(1200);
    expect(s).not.toBe("—");
    expect(s.replace(/\D/g, "")).toBe("1200");
  });

  it("rounds non-integers", () => {
    expect(formatInteger(3.7)).toBe("4");
  });

  it("returns em dash for non-finite", () => {
    expect(formatInteger(Number.NaN)).toBe("—");
  });
});

describe("formatCompact", () => {
  it("uses compact notation for large values", () => {
    const s = formatCompact(1500);
    expect(s.length).toBeLessThan(8);
    expect(s).toMatch(/1/);
  });
});
