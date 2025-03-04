import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import creditCardController from "./credit-card.controller";
import { creditCardSchema } from "./creditCard.schema";
import { isValidCreditCard } from "@/common/utils/isValidCreditCard";
import { handleError } from "@/common/utils/handleError";

vi.mock("./creditCard.schema");
vi.mock("@/common/utils/isValidCreditCard");
vi.mock("@/common/utils/handleError");

const app = express();
app.use(express.json());
app.post("/validate-card", (req: Request, res: Response) =>
  creditCardController.validateCard(req, res)
);

describe("CreditCardController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate a valid credit card", async () => {
    const validCard = {
      cardNumber: "4111111111111111",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      cvv: "123",
    };

    (creditCardSchema.validate as any).mockReturnValue({
      error: null,
      value: validCard,
    });

    (isValidCreditCard as any).mockReturnValue(true);

    const response = await request(app)
      .post("/validate-card")
      .send(validCard);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      valid: true,
      cardNumber: "4111111111111111",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      cvv: "123",
    });
    expect(creditCardSchema.validate).toHaveBeenCalledWith(validCard);
    expect(isValidCreditCard).toHaveBeenCalledWith("4111111111111111");
  });

  it("should return 400 for invalid card number", async () => {
    const invalidCard = {
      cardNumber: "1234",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      cvv: "123",
    };

    (creditCardSchema.validate as any).mockReturnValue({
      error: null,
      value: invalidCard,
    });

    (isValidCreditCard as any).mockReturnValue(false);

    const response = await request(app)
      .post("/validate-card")
      .send(invalidCard);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({
      error: "Invalid card number",
    });
    expect(creditCardSchema.validate).toHaveBeenCalledWith(invalidCard);
    expect(isValidCreditCard).toHaveBeenCalledWith("1234");
  });

  it("should return 400 for invalid schema", async () => {
    const invalidCard = {
      cardNumber: "4111111111111111",
      cardHolder: "JD",
      expiryDate: "12/25",
      cvv: "123",
    };

    (creditCardSchema.validate as any).mockReturnValue({
      error: { details: [{ message: "Card holder name must be at least 3 characters" }] },
      value: null,
    });

    const response = await request(app)
      .post("/validate-card")
      .send(invalidCard);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({
      error: "Card holder name must be at least 3 characters",
    });
    expect(creditCardSchema.validate).toHaveBeenCalledWith(invalidCard);
  });

  it("should return 500 for internal server error", async () => {
    const validCard = {
      cardNumber: "4111111111111111",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      cvv: "123",
    };

    (creditCardSchema.validate as any).mockReturnValue({
      error: null,
      value: validCard,
    });

    (isValidCreditCard as any).mockImplementation(() => {
      throw new Error("Internal server error");
    });

    (handleError as any).mockImplementation((res: Response, error: Error) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    });

    const response = await request(app)
      .post("/validate-card")
      .send(validCard);

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({
      error: "Internal server error",
    });
    expect(creditCardSchema.validate).toHaveBeenCalledWith(validCard);
    expect(isValidCreditCard).toHaveBeenCalledWith("4111111111111111");
    expect(handleError).toHaveBeenCalled();
  });
});