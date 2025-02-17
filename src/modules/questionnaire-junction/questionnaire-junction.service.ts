import prisma from "../../../prisma/client";

class QuestionnaireJunctionService {
  async getAllQuestionnaireJunctions() {
    return prisma.questionnaireJunction.findMany({
      include: {
        question: true,
        questionnaire: true,
      },
    });
  }

  async getQuestionnaireJunctionById(id: number) {
    return prisma.questionnaireJunction.findUnique({
      where: { id },
      include: {
        question: true,
        questionnaire: true,
      },
    });
  }

  async createQuestionnaireJunction(questionId: number, questionnaireId: number, priority: number) {
    return prisma.questionnaireJunction.create({
      data: {
        questionId,
        questionnaireId,
        priority,
      },
    });
  }

  async updateQuestionnaireJunction(id: number, questionId: number, questionnaireId: number, priority: number) {
    return prisma.questionnaireJunction.update({
      where: { id },
      data: {
        questionId,
        questionnaireId,
        priority,
      },
    });
  }

  async deleteQuestionnaireJunction(id: number) {
    return prisma.questionnaireJunction.delete({
      where: { id },
    });
  }
}

export default new QuestionnaireJunctionService();
