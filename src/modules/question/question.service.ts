import prisma from "../../../prisma/client";

class QuestionService {
  async getAllQuestions() {
    return prisma.question.findMany();
  }

  async getQuestionById(id: number) {
    return prisma.question.findUnique({
      where: { id },
    });
  }

  async createQuestion(type: string, questionText: string, options: string[]) {
    return prisma.question.create({
      data: {
        type,
        questionText,
        options,
      },
    });
  }

  async updateQuestion(id: number, type: string, questionText: string, options: string[]) {
    return prisma.question.update({
      where: { id },
      data: {
        type,
        questionText,
        options,
      },
    });
  }

  async deleteQuestion(id: number) {
    return prisma.question.delete({
      where: { id },
    });
  }
}

export default new QuestionService();
