import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import questionService from "./question.service";

class QuestionController {
  async getAllQuestions(req: Request, res: Response) {
    try {
      const questions = await questionService.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error while searching for questions" });
    }
  }

  async getQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await questionService.getQuestionById(Number(id));
      if (question) {
        res.json(question);
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: "Question not found" });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error while searching for question" });
    }
  }

  async createQuestion(req: Request, res: Response) {
    try {
      const { type, questionText, options } = req.body;
      const newQuestion = await questionService.createQuestion(type, questionText, options);
      res.status(StatusCodes.CREATED).json(newQuestion);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error while creating a question" });
    }
  }

  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { type, questionText, options } = req.body;
      const updatedQuestion = await questionService.updateQuestion(Number(id), type, questionText, options);
      res.json(updatedQuestion);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error while updating a question" });
    }
  }

  async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await questionService.deleteQuestion(Number(id));
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error while deleting a question" });
    }
  }
}

export default new QuestionController();
