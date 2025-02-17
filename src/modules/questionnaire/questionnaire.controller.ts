import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import questionnaireService from "./questionnaire.service";

class QuestionnaireController {
  async getAllQuestionnaires(req: Request, res: Response) {
    try {
      const questionnaires = await questionnaireService.getAllQuestionnaires();
      res.json(questionnaires);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while searching for questionnaires" });
    }
  }

  async getQuestionnaireById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const questionnaire = await questionnaireService.getQuestionnaireById(
        Number(id)
      );
      if (questionnaire) {
        res.json(questionnaire);
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Questionnaire not found" });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while searching for questionnaire" });
    }
  }

  async createQuestionnaire(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const newQuestionnaire = await questionnaireService.createQuestionnaire(
        name
      );
      res.status(StatusCodes.CREATED).json(newQuestionnaire);
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while creating a questionnaires" });
    }
  }

  async updateQuestionnaire(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedQuestionnaire =
        await questionnaireService.updateQuestionnaire(Number(id), name);
      res.json(updatedQuestionnaire);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while updating a questionnaires" });
    }
  }

  async deleteQuestionnaire(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await questionnaireService.deleteQuestionnaire(Number(id));
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while deleting for questionnaires" });
    }
  }

  async getQuestionsByQuestionnaireId(req: Request, res: Response) {
    try {
      const { questionnaireId } = req.params;
      const userId = req.user!.id;

      if (!userId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "User not found" });
      }

      const questions =
        await questionnaireService.getQuestionsByQuestionnaireId(
          Number(questionnaireId),
          userId
        );
      res.json(questions);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while searching for questionnaires questions" });
    }
  }

  async saveUserResponses(req: Request, res: Response) {
    try {
      const { questionnaireId } = req.params;
      const { responses } = req.body;

      if (!responses || !questionnaireId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data" });
      }

      const userId = req.user!.id;

      const result = await questionnaireService.saveUserResponses(
        userId,
        parseInt(questionnaireId),
        responses
      );
      res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Error while saving for questionnaires questions" });
    }
  }
}

export default new QuestionnaireController();
