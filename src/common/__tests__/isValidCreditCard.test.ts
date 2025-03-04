import { describe, it, expect } from "vitest";
import { isValidCreditCard } from "@/common/utils/isValidCreditCard";

describe("isValidCreditCard", () => {
  it("should return true for a valid credit card number", () => {
    const validCardNumber = "4111111111111111"; 
    expect(isValidCreditCard(validCardNumber)).toBe(true);
  });

  it("should return true for another valid credit card number", () => {
    const validCardNumber = "5555555555554444"; 
    expect(isValidCreditCard(validCardNumber)).toBe(true);
  });

  it("should return false for an invalid credit card number", () => {
    const invalidCardNumber = "4111111111111112"; 
    expect(isValidCreditCard(invalidCardNumber)).toBe(false);
  });

  it("should return false for an empty string", () => {
    const emptyCardNumber = "";
    expect(isValidCreditCard(emptyCardNumber)).toBe(false);
  });

  it("should return false for a card number with less than 16 digits", () => {
    const shortCardNumber = "411111111111111";
    expect(isValidCreditCard(shortCardNumber)).toBe(false);
  });

  it("should return false for a card number with more than 16 digits", () => {
    const longCardNumber = "41111111111111111"; 
    expect(isValidCreditCard(longCardNumber)).toBe(false);
  });

  it("should return true for a valid American Express card number", () => {
    const amexCardNumber = "378282246310005"; 
    expect(isValidCreditCard(amexCardNumber)).toBe(true);
  });

  it("should return false for an invalid American Express card number", () => {
    const invalidAmexCardNumber = "378282246310006"; 
    expect(isValidCreditCard(invalidAmexCardNumber)).toBe(false);
  });
});