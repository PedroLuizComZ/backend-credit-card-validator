import { describe, it, expect } from "vitest";
import { isValidExpiryDate } from "@/common/utils/dateValidator";

describe("isValidExpiryDate", () => {
  it("should return true for a valid expiry date", () => {
    const currentYear = new Date().getFullYear() % 100;
    const validExpiryDate = `12/${currentYear + 1}`;
    expect(isValidExpiryDate(validExpiryDate)).toBe(true);
  });

  it("should return false for an expired date", () => {
    const expiredDate = "12/20"; 
    expect(isValidExpiryDate(expiredDate)).toBe(false);
  });

  it("should return false for an invalid month", () => {
    const invalidMonth = "13/25"; 
    expect(isValidExpiryDate(invalidMonth)).toBe(false);
  });

  it("should return false for an invalid format", () => {
    const invalidFormat = "1225"; 
    expect(isValidExpiryDate(invalidFormat)).toBe(false);
  });

  it("should return false for a date with invalid year", () => {
    const invalidYear = "12/-123"; 
    expect(isValidExpiryDate(invalidYear)).toBe(false);
  });

  it("should return false for a date with month 00", () => {
    const invalidMonth = "00/25";
    expect(isValidExpiryDate(invalidMonth)).toBe(false);
  });
});