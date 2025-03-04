import express from "express";
import creditCardController from "./credit-card.controller";

const router = express.Router();

router.post("/validate-card", creditCardController.validateCard);

export default router;