import { describe, expect, it } from "vitest";
import { isUnknownCompanyName, normalizeCompanyName } from "./company-normalization";

describe("normalizeCompanyName", () => {
  it("normalizes known aliases", () => {
    expect(normalizeCompanyName("pwc birmingham")).toBe("PwC");
    expect(normalizeCompanyName("  Deloitte UK ")).toBe("Deloitte");
    expect(normalizeCompanyName("sainsburys")).toBe("Sainsbury's");
  });

  it("returns Unknown/Other for empty-ish values", () => {
    expect(normalizeCompanyName("")).toBe("Unknown/Other");
    expect(normalizeCompanyName("none")).toBe("Unknown/Other");
    expect(isUnknownCompanyName("other")).toBe(true);
  });

  it("falls back to title casing for unknown values", () => {
    expect(normalizeCompanyName("my small startup")).toBe("My Small Startup");
  });
});
