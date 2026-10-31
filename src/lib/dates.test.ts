import { describe, expect, it } from "vitest";
import { formatYearRange, getDuration } from "./dates";

describe("getDuration", () => {
  it("measures a finished role between its start and end months", () => {
    expect(getDuration("2021-11", "2025-10")).toBe("3 yr 11 mo");
  });

  it("measures a current role up to the supplied date", () => {
    expect(getDuration("2025-10", undefined, new Date(2026, 3, 15))).toBe("6 mo");
    expect(getDuration("2025-10", undefined, new Date(2026, 10, 1))).toBe(
      "1 yr 1 mo",
    );
  });

  it("never reports less than one month", () => {
    expect(getDuration("2025-10", "2025-10")).toBe("1 mo");
  });
});

describe("formatYearRange", () => {
  it("shows Present for current roles", () => {
    expect(formatYearRange("2025-10")).toBe("2025 – Present");
  });

  it("collapses a range within one year", () => {
    expect(formatYearRange("2016-01", "2016-05")).toBe("2016");
  });

  it("handles year-only dates", () => {
    expect(formatYearRange("2012", "2015")).toBe("2012 – 2015");
  });
});
