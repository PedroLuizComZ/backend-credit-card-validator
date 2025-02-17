import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import QuestionnaireController from "@/modules/questionnaire/questionnaire.controller";
import questionnaireService from "@/modules/questionnaire/questionnaire.service";

vi.mock("./questionnaire.service", () => ({
  default: {
    getAllQuestionnaires: vi.fn(),
    getQuestionnaireById: vi.fn(),
    createQuestionnaire: vi.fn(),
    updateQuestionnaire: vi.fn(),
    deleteQuestionnaire: vi.fn(),
    getQuestionsByQuestionnaireId: vi.fn(),
    saveUserResponses: vi.fn(),
  },
}));

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  req.user = { id: 1, isAdmin: true };
  next();
});

app.get("/api/questionnaire/", (req: Request, res: Response) =>
  QuestionnaireController.getAllQuestionnaires(req, res)
);
app.get("/api/questionnaire/:id", (req: Request, res: Response) =>
  QuestionnaireController.getQuestionnaireById(req, res)
);
app.post("/api/questionnaire", (req: Request, res: Response) =>
  QuestionnaireController.createQuestionnaire(req, res)
);
app.put("/api/questionnaire/:id", (req: Request, res: Response) =>
  QuestionnaireController.updateQuestionnaire(req, res)
);
app.delete("/api/questionnaire/:id", (req: Request, res: Response) =>
  QuestionnaireController.deleteQuestionnaire(req, res)
);

app.get(
  "/api/questionnaire/:questionnaireId/questions",
  (req: Request, res: Response) =>
    QuestionnaireController.getQuestionsByQuestionnaireId(req, res)
);

app.post(
  "/api/questionnaire/:questionnaireId/responses",
  (req: Request, res: Response) =>
    QuestionnaireController.saveUserResponses(req, res)
);

describe("questionnaire", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllQuestionnaires", () => {
    it("should return all questionnaires", async () => {
      const mockQuestionnaires = [{ id: 1, name: "Test Survey" }];
      (questionnaireService.getAllQuestionnaires as any).mockResolvedValue(
        mockQuestionnaires
      );

      const response = await request(app).get("/api/questionnaire").send();

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockQuestionnaires);
    });

    it("should handle error while searching for questionnaires", async () => {
      (questionnaireService.getAllQuestionnaires as any).mockRejectedValue(
        new Error("DB Error")
      );
      const response = await request(app).get("/api/questionnaire").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while searching for questionnaires",
      });
    });
  });

  describe("getQuestionnaireById", () => {
    it("should return a questionnaire by id", async () => {
      const mockQuestionnaire = { id: 1, name: "Test Survey" };
      (questionnaireService.getQuestionnaireById as any).mockResolvedValue(
        mockQuestionnaire
      );

      const response = await request(app).get("/api/questionnaire/1").send();

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockQuestionnaire);
    });

    it("should handle error while searching for questionnaire", async () => {
      (questionnaireService.getQuestionnaireById as any).mockRejectedValue(
        new Error("DB Error")
      );
      const response = await request(app).get("/api/questionnaire/1").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while searching for questionnaire",
      });
    });

    it("should handle error when questionnaire not found", async () => {
      (questionnaireService.getQuestionnaireById as any).mockResolvedValue(
        undefined
      );
      const response = await request(app).get("/api/questionnaire/1").send();

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({ error: "Questionnaire not found" });
    });
  });

  describe("createQuestionnaire", () => {
    it("should create a questionnaire", async () => {
      const payload = { name: "New Survey" };
      (questionnaireService.createQuestionnaire as any).mockResolvedValue(
        payload
      );

      const response = await request(app)
        .post("/api/questionnaire")
        .send(payload);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(payload);
      expect(questionnaireService.createQuestionnaire).toHaveBeenCalledWith(
        payload.name
      );
    });

    it("should handle error while creating a questionnaire", async () => {
      (questionnaireService.createQuestionnaire as any).mockRejectedValue(
        new Error("DB Error")
      );
      const response = await request(app).post("/api/questionnaire/").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while creating a questionnaires",
      });
    });
  });

  describe("updateQuestionnaire", () => {
    it("should update a questionnaire", async () => {
      const payload = { name: "Updated Survey" };
      (questionnaireService.updateQuestionnaire as any).mockResolvedValue(
        payload
      );

      const response = await request(app)
        .put("/api/questionnaire/1")
        .send(payload);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(payload);
      expect(questionnaireService.updateQuestionnaire).toHaveBeenCalledWith(
        1,
        payload.name
      );
    });

    it("should handle error while updating a questionnaire", async () => {
      (questionnaireService.updateQuestionnaire as any).mockRejectedValue(
        new Error("DB Error")
      );
      const response = await request(app).put("/api/questionnaire/1").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while updating a questionnaires",
      });
    });
  });

  describe("deleteQuestionnaire", () => {
    it("should delete a questionnaire", async () => {
      (questionnaireService.deleteQuestionnaire as any).mockResolvedValue(true);

      const response = await request(app).delete("/api/questionnaire/1").send();

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    });

    it("should handle error while deleting a questionnaire", async () => {
      (questionnaireService.deleteQuestionnaire as any).mockRejectedValue(
        new Error("DB Error")
      );
      const response = await request(app).delete("/api/questionnaire/1").send();

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while deleting for questionnaires",
      });
    });
  });

  describe("getQuestionsByQuestionnaireId", () => {
    it("should return questions when valid questionnaireId is provided", async () => {
      const questionnaireId = 1;
      const mockQuestions = [{ id: 1, text: "Question 1" }];

      (
        questionnaireService.getQuestionsByQuestionnaireId as any
      ).mockResolvedValue(mockQuestions);

      const response = await request(app).get(
        `/api/questionnaire/${questionnaireId}/questions`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(mockQuestions);
    });

    it("should handle error while searching for questionnaire questions", async () => {
      const questionnaireId = 1;
      (
        questionnaireService.getQuestionsByQuestionnaireId as any
      ).mockRejectedValue(new Error("DB Error"));

      const response = await request(app).get(
        `/api/questionnaire/${questionnaireId}/questions`
      );

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while searching for questionnaires questions",
      });
    });
  });

  describe("POST /questionnaire/save-responses", () => {
    it("should save user responses and return created status", async () => {
      const requestBody = {
        questionnaireId: 1,
        responses: [{ questionId: 1, answer: "Yes" }],
      };
      (questionnaireService.saveUserResponses as any).mockResolvedValue({
        success: true,
      });

      const response = await request(app)
        .post("/api/questionnaire/1/responses")
        .send(requestBody);

      expect(response.status).toBe(StatusCodes.CREATED);
    });

    it("should handle error while saving for questionnaire responses", async () => {
      const requestBody = {
        responses: [{ questionId: 1, answer: "Yes" }],
      };
      (questionnaireService.saveUserResponses as any).mockRejectedValue(
        new Error("DB Error")
      );

      const response = await request(app)
        .post("/api/questionnaire/1/responses")
        .send(requestBody);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toEqual({
        error: "Error while saving for questionnaires questions",
      });
    });
  });
});
