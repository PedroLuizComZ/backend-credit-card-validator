import { authenticate } from "@/common/middleware/auth";
import express from "express";
import questionnaireController from "./questionnaire.controller";

const router = express.Router();

router.get("/", authenticate, questionnaireController.getAllQuestionnaires);
router.get("/:id", authenticate, questionnaireController.getQuestionnaireById);
router.post("/", authenticate, questionnaireController.createQuestionnaire);
router.put("/:id", authenticate, questionnaireController.updateQuestionnaire);
router.delete("/:id", authenticate, questionnaireController.deleteQuestionnaire);

router.get("/:questionnaireId/questions", authenticate, questionnaireController.getQuestionsByQuestionnaireId);

router.post("/:questionnaireId/responses", authenticate, questionnaireController.saveUserResponses);

export default router;
