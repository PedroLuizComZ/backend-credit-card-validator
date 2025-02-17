import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userQuestionnaireController from "@/modules/user-questionnaire/user-questionnaire.controller";
import UserQuestionnaireService from "@/modules/user-questionnaire/user-questionnaire.service";

vi.mock("./user-questionnaire.service", () => ({
  default: {
    getAll: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.get("/api/user-questionnaire", (req: Request, res: Response) =>
  userQuestionnaireController.getAllUserQuestionnaire(req, res)
);

describe("UserQuestionnaire", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the correctly formatted questionnaires", async () => {
    const mockUsers = [
      {
        id: 1,
        username: "JohnDoe",
        answers: [
          {
            questionnaire: { name: "Health" },
            question: { questionText: "How are you?", type: "mcq-single" },
            answerText: "Good",
            selectedOptions: null,
          },
          {
            questionnaire: { name: "Health" },
            question: {
              questionText: "Do you exercise?",
              type: "mcq-multiple",
            },
            answerText: null,
            selectedOptions: ["Yes", "Sometimes"],
          },
          {
            questionnaire: { name: "Health" },
            question: {
              questionText: "What is your age?",
              type: "input",
            },
            answerText: "30",
            selectedOptions: null,
          },
        ],
      },
    ];

    (UserQuestionnaireService.getAll as any).mockResolvedValue(mockUsers);

    const response = await request(app).get("/api/user-questionnaire");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual([
      {
        id: "1",
        username: "JohnDoe",
        completedQuestionnaires: 1,
        responses: [
          {
            questionnaireName: "Health",
            answers: [
              { question: "How are you?", answer: "Good" },
              { question: "Do you exercise?", answer: ["Yes", "Sometimes"] },
              { question: "What is your age?", answer: "30" },
            ],
          },
        ],
      },
    ]);
    expect(UserQuestionnaireService.getAll).toHaveBeenCalledTimes(1);
  });

  it("should handle error and return status 500", async () => {
    (UserQuestionnaireService.getAll as any).mockRejectedValue(
      new Error("Database error")
    );

    const response = await request(app).get("/api/user-questionnaire");

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual({ error: "Database error" });
  });

  it("should handle empty data and return an empty list", async () => {
    (UserQuestionnaireService.getAll as any).mockResolvedValue([]);

    const response = await request(app).get("/api/user-questionnaire");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual([]);
  });
});
