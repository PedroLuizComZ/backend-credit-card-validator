import express from "express";
import questionnaireJunctionController from "./questionnaire-junction.controller";

const router = express.Router();

// Rotas para relacionamentos entre questionários e perguntas
router.get("/", questionnaireJunctionController.getAllQuestionnaireJunctions);
router.get("/:id", questionnaireJunctionController.getQuestionnaireJunctionById);
router.post("/", questionnaireJunctionController.createQuestionnaireJunction);
router.put("/:id", questionnaireJunctionController.updateQuestionnaireJunction);
router.delete("/:id", questionnaireJunctionController.deleteQuestionnaireJunction);

export default router;
