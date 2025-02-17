import prisma from "../../../prisma/client";

class QuestionnaireService {
  // Busca todos os questionários
  async getAllQuestionnaires() {
    return prisma.questionnaire.findMany();
  }

  async getQuestionnaireById(id: number) {
    return prisma.questionnaire.findUnique({
      where: { id },
      include: {
        junctions: {
          include: {
            question: true,
          },
        },
      },
    });
  }

  async createQuestionnaire(name: string) {
    return prisma.questionnaire.create({
      data: { name },
    });
  }

  async updateQuestionnaire(id: number, name: string) {
    return prisma.questionnaire.update({
      where: { id },
      data: { name },
    });
  }

  async deleteQuestionnaire(id: number) {
    return prisma.questionnaire.delete({
      where: { id },
    });
  }

  async getQuestionsByQuestionnaireId(questionnaireId: number, userId: number) {
    const questions = await prisma.questionnaireJunction.findMany({
      where: { questionnaireId },
      include: {
        question: true,
      },
      orderBy: {
        priority: "asc",
      },
    });
  
    const questionsWithResponses = await Promise.all(
      questions.map(async (q) => {
        let userAnswer = await prisma.answer.findFirst({
          where: {
            userId,
            questionId: q.questionId,
            questionnaireId, 
          },
          select: {
            answerText: true,
            selectedOptions: true,
          },
        });
  
        if (!userAnswer) {
          userAnswer = await prisma.answer.findFirst({
            where: {
              userId,
              questionId: q.questionId, 
            },
            select: {
              answerText: true,
              selectedOptions: true,
            },
          });
        }
  
        return {
          ...q,
          question: {
            ...q.question,
            userAnswer: userAnswer || null,
          },
        };
      })
    );
  
    return questionsWithResponses;
  }
  

  async saveUserResponses(
    userId: number,
    questionnaireId: number,
    responses: Array<{
      questionId: number;
      answerText?: string;
      selectedOptions?: string[];
    }>,
  ) {
    const userQuestionnaire = await prisma.userQuestionnaire.create({
      data: {
        userId,
        questionnaireId,
      },
    });

    const answers = await Promise.all(
      responses.map(async (response) => {
        const existingAnswer = await prisma.answer.findFirst({
          where: {
            userId,
            questionId: response.questionId,
            questionnaireId,
          },
        });

        if (existingAnswer) {
          return prisma.answer.update({
            where: { id: existingAnswer.id },
            data: {
              answerText: response.answerText || "",
              selectedOptions: response.selectedOptions || [],
            },
          });
        } else {
          return prisma.answer.create({
            data: {
              userId,
              questionId: response.questionId,
              questionnaireId,
              answerText: response.answerText || "",
              selectedOptions: response.selectedOptions || [],
            },
          });
        }
      }),
    );

    return { userQuestionnaire, answers };
  }
}

export default new QuestionnaireService();
