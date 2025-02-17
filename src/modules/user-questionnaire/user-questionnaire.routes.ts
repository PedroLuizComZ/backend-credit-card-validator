import express from "express";
import userQuestionnaireController from "./user-questionnaire.controller";

const router = express.Router();

router.get("/", userQuestionnaireController.getAllUserQuestionnaire);

export default router;
