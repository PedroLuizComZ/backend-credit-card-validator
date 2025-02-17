import { handleError } from "@/common/utils/handleError";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserQuestionnaireService from "./user-questionnaire.service";

class UserQuestionnaireController {
  async getAllUserQuestionnaire(req: Request, res: Response) {
    try {
      const UserQuestionnaireList = await UserQuestionnaireService.getAll();

      const formattedUserQuestionnaireList = UserQuestionnaireList.map((user) => {
        const uniqueQuestionnaires = new Set<string>();

        const responses = user.answers.reduce(
          (acc, answer) => {
            const questionnaireName = answer.questionnaire.name;

            uniqueQuestionnaires.add(questionnaireName);

            if (!acc[questionnaireName]) {
              acc[questionnaireName] = {
                questionnaireName,
                answers: [],
              };
            }

            const responseData =
              answer.question.type === "mcq-multiple"
                ? {
                    question: answer.question.questionText,
                    answer: answer.selectedOptions || [], // Retorna selectedOptions para mcq-multiple
                  }
                : {
                    question: answer.question.questionText,
                    answer: answer.answerText || "", // Retorna answerText para mcq-single e input
                  };

            acc[questionnaireName].answers.push(responseData);
            return acc;
          },
          {} as Record<string, { questionnaireName: string; answers: any[] }>,
        );

        return {
          id: user.id.toString(),
          username: user.username,
          completedQuestionnaires: uniqueQuestionnaires.size,
          responses: Object.values(responses),
        };
      });
      res.status(StatusCodes.OK).json(formattedUserQuestionnaireList);
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default new UserQuestionnaireController();
