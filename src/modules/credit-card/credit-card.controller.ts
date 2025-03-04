import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { creditCardSchema } from "./creditCard.schema";
import { isValidCreditCard } from "@/common/utils/isValidCreditCard";
import { handleError } from "@/common/utils/handleError";

class CreditCardController {
  async validateCard(req: Request, res: Response) {
    try {
      const { error, value } = creditCardSchema.validate(req.body);
      if (error) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.details[0].message });
      }

      const { cardNumber, cardHolder, expiryDate, cvv } = value;

      const isValid = isValidCreditCard(cardNumber);
      if (!isValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid card number",
        });
      }

      res.json({
        valid: isValid,
        cardNumber,
        cardHolder,
        expiryDate,
        cvv,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default new CreditCardController();