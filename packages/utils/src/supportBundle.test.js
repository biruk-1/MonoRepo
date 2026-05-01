import { describe, expect, it } from "vitest";
import { buildSupportBundle } from "./supportBundle.js";

describe("buildSupportBundle", () => {
  it("includes truncated email and fixed timestamp", () => {
    const now = new Date("2026-04-22T10:00:00.000Z");
    const s = buildSupportBundle({
      email: "teacher@example.com",
      lastSignInAt: "2026-04-20T08:00:00.000Z",
      now,
    });
    expect(s).toContain("teacher@example.com");
    expect(s).toContain("2026-04-22T10:00:00.000Z");
    expect(s).toContain("2026-04-20");
  });

  it("handles empty email", () => {
    const s = buildSupportBundle({
      email: "",
      lastSignInAt: null,
      now: new Date("2026-04-22T00:00:00.000Z"),
    });
    expect(s).toContain("(none)");
  });
});
