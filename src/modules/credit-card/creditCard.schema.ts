import Joi from "joi";
import { isValidExpiryDate } from "@/common/utils/dateValidator";

export const creditCardSchema = Joi.object({
  cardNumber: Joi.string()
    .pattern(/^\d{16}$/)
    .required()
    .messages({
      "string.pattern.base": "Card number must be 16 digits",
      "any.required": "Card number is required",
    }),
  cardHolder: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.min": "Card holder name must be at least 3 characters",
      "string.max": "Card holder name must be at most 50 characters",
      "any.required": "Card holder name is required",
    }),
  expiryDate: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/) 
    .custom((value, helpers) => {
      if (!isValidExpiryDate(value)) {
        return helpers.error("any.invalid", {
          message: "Expiry date is invalid or in the past",
        });
      }
      return value;
    })
    .required()
    .messages({
      "string.pattern.base": "Expiry date must be in the format MM/YY",
      "any.required": "Expiry date is required",
      "any.invalid": "Expiry date is invalid or in the past",
    }),
  cvv: Joi.string()
    .pattern(/^\d{3,4}$/)
    .required()
    .messages({
      "string.pattern.base": "CVV must be 3 or 4 digits",
      "any.required": "CVV is required",
    }),
});