import prisma from "../../../prisma/client";

class UserQuestionnaireService {
  async getAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        userQuestionnaires: {
          select: {
            questionnaireId: true,
            questionnaire: {
              select: {
                name: true,
              },
            },
          },
        },
        answers: {
          select: {
            questionnaire: {
              select: {
                name: true,
              },
            },
            question: {
              select: {
                questionText: true,
                type: true, // Incluímos o tipo da pergunta
              },
            },
            answerText: true,
            selectedOptions: true, // Incluímos o campo selectedOptions
          },
        },
      },
    });
  }
}

export default new UserQuestionnaireService();
