import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate.js";

describe("formatDate", () => {
  it("formats a valid ISO string", () => {
    const s = formatDate("2026-04-15T10:00:00.000Z");
    expect(s).not.toBe("Invalid date");
    expect(s).toMatch(/2026/);
  });

  it("formats a Date instance", () => {
    const s = formatDate(new Date("2026-01-05T12:00:00Z"));
    expect(s).not.toBe("Invalid date");
    expect(s).toMatch(/2026/);
  });

  it("returns Invalid date for bad input", () => {
    expect(formatDate("not-a-date")).toBe("Invalid date");
  });
});
