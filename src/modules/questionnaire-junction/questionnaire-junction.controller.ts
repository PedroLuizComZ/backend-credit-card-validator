import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import questionnaireJunctionService from "./questionnaire-junction.service";

class QuestionnaireJunctionController {
  // Lista todos os relacionamentos
  async getAllQuestionnaireJunctions(req: Request, res: Response) {
    try {
      const junctions = await questionnaireJunctionService.getAllQuestionnaireJunctions();
      res.json(junctions);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao buscar relacionamentos" });
    }
  }

  // Busca um relacionamento por ID
  async getQuestionnaireJunctionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const junction = await questionnaireJunctionService.getQuestionnaireJunctionById(Number(id));
      if (junction) {
        res.json(junction);
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: "Relacionamento não encontrado" });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao buscar relacionamento" });
    }
  }

  // Cria um novo relacionamento
  async createQuestionnaireJunction(req: Request, res: Response) {
    try {
      const { questionId, questionnaireId, priority } = req.body;
      const newJunction = await questionnaireJunctionService.createQuestionnaireJunction(
        questionId,
        questionnaireId,
        priority,
      );
      res.status(StatusCodes.CREATED).json(newJunction);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao criar relacionamento" });
    }
  }

  // Atualiza um relacionamento existente
  async updateQuestionnaireJunction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { questionId, questionnaireId, priority } = req.body;
      const updatedJunction = await questionnaireJunctionService.updateQuestionnaireJunction(
        Number(id),
        questionId,
        questionnaireId,
        priority,
      );
      res.json(updatedJunction);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao atualizar relacionamento" });
    }
  }

  // Exclui um relacionamento
  async deleteQuestionnaireJunction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await questionnaireJunctionService.deleteQuestionnaireJunction(Number(id));
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao excluir relacionamento" });
    }
  }
}

export default new QuestionnaireJunctionController();
