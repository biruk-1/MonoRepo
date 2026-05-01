import { describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "./clipboard.js";

describe("copyTextToClipboard", () => {
  it("returns true when writeText succeeds", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    await expect(copyTextToClipboard("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
    vi.unstubAllGlobals();
  });

  it("returns false when API is missing", async () => {
    vi.stubGlobal("navigator", {});
    await expect(copyTextToClipboard("x")).resolves.toBe(false);
    vi.unstubAllGlobals();
  });

  it("returns false when writeText rejects", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    await expect(copyTextToClipboard("x")).resolves.toBe(false);
    vi.unstubAllGlobals();
  });
});
