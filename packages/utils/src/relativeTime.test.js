import { afterEach, describe, expect, it, vi } from "vitest";
import { formatRelativeSince } from "./relativeTime.js";

describe("formatRelativeSince", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns em dash for invalid input", () => {
    expect(formatRelativeSince("not-a-date")).toBe("—");
  });

  it("describes a recent past time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-21T12:00:00Z"));
    const s = formatRelativeSince("2026-04-21T11:00:00Z");
    expect(s).not.toBe("—");
    expect(s.length).toBeGreaterThan(2);
  });
});
