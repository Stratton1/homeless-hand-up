import { describe, expect, it } from "vitest";
import { sanitizeDonorName, sanitizeSupportMessage } from "./support-message";

describe("sanitizeSupportMessage", () => {
  it("removes links and control chars", () => {
    const input = "Hello\x00 visit https://example.com now";
    expect(sanitizeSupportMessage(input)).toBe("Hello visit [link removed] now");
  });

  it("masks blocked words and trims", () => {
    expect(sanitizeSupportMessage("  This is shit  ")).toBe("This is ***");
  });

  it("enforces max length", () => {
    const input = "a".repeat(500);
    expect(sanitizeSupportMessage(input)).toHaveLength(280);
  });
});

describe("sanitizeDonorName", () => {
  it("returns Anonymous for empty input", () => {
    expect(sanitizeDonorName("   ")).toBe("Anonymous");
    expect(sanitizeDonorName(undefined)).toBe("Anonymous");
  });
});
