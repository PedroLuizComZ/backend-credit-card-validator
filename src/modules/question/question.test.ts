import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import QuestionController from "@/modules/question/question.controller";
import questionService from "@/modules/question/question.service";

vi.mock("./question.service", () => ({
  default: {
    getAllQuestions: vi.fn(),
    getQuestionById: vi.fn(),
    createQuestion: vi.fn(),
    updateQuestion: vi.fn(),
    deleteQuestion: vi.fn(),
  },
}));

const app = express();
app.use(express.json());

app.get("/api/question/", (req: Request, res: Response) =>
  QuestionController.getAllQuestions(req, res)
);
app.get("/api/question/:id", (req: Request, res: Response) =>
  QuestionController.getQuestionById(req, res)
);
app.post("/api/question", (req: Request, res: Response) =>
  QuestionController.createQuestion(req, res)
);
app.put("/api/question/:id", (req: Request, res: Response) =>
  QuestionController.updateQuestion(req, res)
);
app.delete("/api/question/:id", (req: Request, res: Response) =>
  QuestionController.deleteQuestion(req, res)
);

describe("question", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllQuestions", () => {
    it("should return all questions", async () => {
      const mockQuestions = [
        {
          id: 1,
          type: "mcq-multiple",
          questionText: "Select your favorite colors",
          options: ["Red", "Blue", "Green"],
        },
        {
          id: 2,
          type: "input",
          questionText: "What is your age?",
          options: [],
        },
      ];
      (questionService.getAllQuestions as any).mockResolvedValue(mockQuestions);

      const response = await request(app).get("/api/question").send();

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockQuestions);
    });

    it("should handle error during searching for questions", async () => {
      (questionService.getAllQuestions as any).mockRejectedValue(
        new Error("Searching failed")
      );

      const response = await request(app).get("/api/question").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while searching for questions",
      });
    });
  });

  describe("getQuestionById", () => {
    it("should return a question by id", async () => {
      const mockQuestion = {
        id: 1,
        type: "mcq-multiple",
        questionText: "Select your favorite colors",
        options: ["Red", "Blue", "Green"],
      };
      (questionService.getQuestionById as any).mockResolvedValue(mockQuestion);

      const response = await request(app).get("/api/question/1").send();

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockQuestion);
    });

    it("should handle error during searching for question", async () => {
      (questionService.getQuestionById as any).mockRejectedValue(
        new Error("Searching failed")
      );

      const response = await request(app).get("/api/question/1").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while searching for question",
      });
    });

    it("should handle error when user not found", async () => {
      (questionService.getQuestionById as any).mockResolvedValue(undefined);

      const response = await request(app).get("/api/question/1").send();

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({
        error: "Question not found",
      });
    });
  });

  describe("createQuestion", () => {
    it("should create a question", async () => {
      const payload = {
        type: "mcq-multiple",
        questionText: "Select your favorite colors",
        options: ["Red", "Blue", "Green"],
      };
      (questionService.createQuestion as any).mockResolvedValue(payload);

      const response = await request(app).post("/api/question").send(payload);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(payload);
      expect(questionService.createQuestion).toHaveBeenCalledWith(
        payload.type,
        payload.questionText,
        payload.options
      );
    });

    it("should handle error during creating a question failed", async () => {
      (questionService.createQuestion as any).mockRejectedValue(
        new Error("Creating a question failed")
      );

      const response = await request(app).post("/api/question").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while creating a question",
      });
    });
  });

  describe("updateQuestion", () => {
    it("should update a question", async () => {
      const payload = {
        type: "mcq-multiple",
        questionText: "Select your favorite colors",
        options: ["Red", "Blue", "Green"],
      };
      (questionService.updateQuestion as any).mockResolvedValue(payload);

      const response = await request(app).put("/api/question/1").send(payload);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(payload);
      expect(questionService.updateQuestion).toHaveBeenCalledWith(
        1,
        payload.type,
        payload.questionText,
        payload.options
      );
    });

    it("should handle error during updating a question failed", async () => {
      (questionService.updateQuestion as any).mockRejectedValue(
        new Error("Updating a question failed")
      );

      const response = await request(app).put("/api/question/1").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while updating a question",
      });
    });
  });

  describe("deleteQuestion", () => {
    it("should delete a question", async () => {
      (questionService.deleteQuestion as any).mockResolvedValue(true);

      const response = await request(app).delete("/api/question/1").send();

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    it("should handle error during deleting a question failed", async () => {
      (questionService.deleteQuestion as any).mockRejectedValue(
        new Error("Deleting a question failed")
      );

      const response = await request(app).delete("/api/question/1").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while deleting a question",
      });
    });
  });
});
